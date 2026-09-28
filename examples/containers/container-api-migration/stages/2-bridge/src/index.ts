import {
	Container,
	ContainerProxy,
	getContainer,
	switchPort,
	type StopParams,
} from "@cloudflare/containers";
import { WorkerEntrypoint } from "cloudflare:workers";
import {
	actionFrom,
	json,
	modeFrom,
	readEvents,
	recordEvent,
	requestForContainer,
	routeWorkbench,
	startWithRetry,
	waitForPort,
	type LabMode,
} from "../../../shared/lab";
import { renderWorkbench } from "../../../shared/workbench";

interface Env {
	MIGRATION_WORKBENCH: DurableObjectNamespace<MigrationWorkbench>;
}
interface OutboundProps {
	stage: string;
}
type InspectorFactory = (options: { props: OutboundProps }) => Fetcher;
const STAGE = "bridge" as const;

export class OutboundInspector extends WorkerEntrypoint<Env, OutboundProps> {
	override fetch(request: Request) {
		return new Response(
			JSON.stringify({
				interceptedBy: "ctx.container.interceptOutboundHttp",
				stage: this.ctx.props.stage,
				url: request.url,
			}),
			{
				headers: {
					"content-type": "application/json",
					"x-workbench-intercepted": "true",
				},
			},
		);
	}
}

export class MigrationWorkbench extends Container<Env> {
	defaultPort = 8080;
	requiredPorts = [8080, 9090];
	sleepAfter = "10m";
	envVars = { LAB_MODE: "helper", LAB_STAGE: STAGE };
	enableInternet = false;
	allowedHosts = ["workbench.internal"];
	pingEndpoint = "ping";
	private directMonitorAttached = false;
	private directOutboundInstalled = false;

	private runtime(): NonNullable<DurableObjectState["container"]> {
		if (!this.ctx.container) throw new Error("Container runtime unavailable");
		return this.ctx.container;
	}
	private record(mode: LabMode | "system", message: string, detail?: unknown) {
		return recordEvent(this.ctx.storage, STAGE, mode, message, detail);
	}
	private async installDirectOutbound() {
		if (this.directOutboundInstalled) return;
		const exports = this.ctx.exports as unknown as {
			OutboundInspector: InspectorFactory;
		};
		await this.runtime().interceptOutboundHttp(
			"workbench.internal",
			exports.OutboundInspector({ props: { stage: STAGE } }),
		);
		this.directOutboundInstalled = true;
		await this.record("direct", "interceptOutboundHttp installed");
	}
	private attachDirectMonitor() {
		if (this.directMonitorAttached) return;
		this.directMonitorAttached = true;
		this.ctx.waitUntil(
			this.runtime()
				.monitor()
				.then(() => this.record("direct", "monitor resolved: container exited"))
				.catch((error: unknown) =>
					this.record("direct", "monitor rejected", {
						message: error instanceof Error ? error.message : String(error),
					}),
				)
				.finally(() => {
					this.directMonitorAttached = false;
					this.directOutboundInstalled = false;
				}),
		);
	}
	private async ensureDirect() {
		const runtime = this.runtime();
		let startAttempts = 0;
		if (!runtime.running) {
			startAttempts = await startWithRetry(runtime, {
				enableInternet: false,
				env: { LAB_MODE: "direct", LAB_STAGE: STAGE },
			});
			await this.record("direct", "ctx.container.start", { startAttempts });
		}
		const readinessAttempts = await Promise.all([
			waitForPort(runtime, 8080),
			waitForPort(runtime, 9090),
		]);
		await this.installDirectOutbound();
		await runtime.setInactivityTimeout(10 * 60 * 1000);
		this.attachDirectMonitor();
		return { startAttempts, readinessAttempts };
	}

	override async onStart() {
		await this.record("helper", "onStart hook");
		await this.containerFetch("http://container/bootstrap", { method: "POST" });
	}
	override async onStop(params: StopParams) {
		await this.record("helper", "onStop hook", params);
	}
	override onError(error: unknown): never {
		void this.record("helper", "onError hook", {
			message: error instanceof Error ? error.message : String(error),
		});
		throw error;
	}
	override async onActivityExpired() {
		await this.record("helper", "onActivityExpired hook");
		await this.stop();
	}
	async scheduledProbe(payload: unknown) {
		const response = await this.containerFetch(
			requestForContainer("/scheduled", {
				body: JSON.stringify(payload),
				method: "POST",
			}),
		);
		await this.ctx.storage.delete("lab:pending-cutover");
		await this.record("helper", "Container.schedule callback", {
			payload,
			response: await response.json(),
		});
	}

	private async helperAction(
		action: string,
		request: Request,
	): Promise<Response> {
		this.renewActivityTimeout();
		switch (action) {
			case "start":
				await this.startAndWaitForPorts({
					ports: this.requiredPorts,
					startOptions: { envVars: this.envVars, enableInternet: false },
				});
				await this.record("helper", "startAndWaitForPorts", {
					ports: this.requiredPorts,
				});
				return json({ mode: "helper", state: await this.getState() });
			case "status":
				return json({
					classState: await this.getState(),
					mode: "helper",
					runtimeRunning: this.runtime().running,
				});
			case "echo":
				return this.containerFetch(
					requestForContainer("/echo?via=bridge-containerFetch", {
						body: JSON.stringify({ hello: "from the bridge helper path" }),
						method: "POST",
					}),
				);
			case "alternate":
				return this.containerFetch(
					"http://container/echo?via=bridge-containerFetch-port",
					{},
					9090,
				);
			case "switch-port":
				return super.fetch(
					switchPort(requestForContainer("/echo?via=bridge-switchPort"), 9090),
				);
			case "exec": {
				await this.startAndWaitForPorts({ ports: 8080 });
				const process = await this.runtime().exec(["node", "--version"]);
				const result = await process.output();
				return json({
					exitCode: result.exitCode,
					stdout: new TextDecoder().decode(result.stdout).trim(),
				});
			}
			case "outbound":
				return this.containerFetch("http://container/outbound");
			case "renew":
				this.renewActivityTimeout();
				await this.record("helper", "renewActivityTimeout");
				return json({ mode: "helper", renewed: true });
			case "schedule":
			case "schedule-cutover": {
				const rawDelay = new URL(request.url).searchParams.get("delay");
				const requested = rawDelay === null ? Number.NaN : Number(rawDelay);
				const delay = Number.isFinite(requested)
					? requested
					: action === "schedule-cutover"
						? 120
						: 3;
				const payload = {
					createdAt: new Date().toISOString(),
					delay,
					stage: STAGE,
				};
				await this.ctx.storage.put("lab:pending-cutover", payload);
				const schedule = await this.schedule(delay, "scheduledProbe", payload);
				await this.record("helper", "Container.schedule created", schedule);
				return json({ ...schedule, cutoverMarker: true }, 202);
			}
			case "stop":
				await this.stop("SIGTERM");
				await this.record("helper", "stop helper called");
				return json({ mode: "helper", stopping: true });
			case "destroy":
				await this.destroy();
				await this.record("helper", "destroy helper called");
				return json({ destroyed: true, mode: "helper" });
			default:
				return json({ error: `Unknown helper action: ${action}` }, 404);
		}
	}

	private async directAction(action: string): Promise<Response> {
		const runtime = this.runtime();
		switch (action) {
			case "start":
				return json({
					mode: "direct",
					running: runtime.running,
					...(await this.ensureDirect()),
				});
			case "status":
				return json({
					classState: await this.getState(),
					mode: "direct",
					runtimeRunning: runtime.running,
				});
			case "echo":
				await this.ensureDirect();
				return runtime.getTcpPort(8080).fetch(
					requestForContainer("/echo?via=ctx.container", {
						body: JSON.stringify({ hello: "from the bridge direct path" }),
						method: "POST",
					}),
				);
			case "alternate":
			case "switch-port":
				await this.ensureDirect();
				return runtime
					.getTcpPort(9090)
					.fetch(`http://container/echo?via=ctx.container-${action}`);
			case "exec": {
				await this.ensureDirect();
				const process = await runtime.exec(["node", "--version"]);
				const result = await process.output();
				return json({
					exitCode: result.exitCode,
					stdout: new TextDecoder().decode(result.stdout).trim(),
				});
			}
			case "outbound":
				await this.ensureDirect();
				return runtime.getTcpPort(8080).fetch("http://container/outbound");
			case "renew":
				await runtime.setInactivityTimeout(10 * 60 * 1000);
				await this.record("direct", "setInactivityTimeout renewed");
				return json({ mode: "direct", renewed: true });
			case "schedule":
				return json(
					{
						error:
							"The Container class owns alarm() during the bridge stage. Migrate scheduling during the final cutover.",
					},
					409,
				);
			case "stop":
				runtime.signal(15);
				await this.record("direct", "signal(15) called");
				return json({ mode: "direct", stopping: true });
			case "destroy":
				await runtime.destroy("Bridge direct path destroy");
				await this.record("direct", "destroy called");
				return json({ destroyed: true, mode: "direct" });
			default:
				return json({ error: `Unknown direct action: ${action}` }, 404);
		}
	}

	override async fetch(request: Request) {
		const action = actionFrom(request);
		if (action === "events") return json(await readEvents(this.ctx.storage));
		return modeFrom(request, "helper") === "direct"
			? this.directAction(action)
			: this.helperAction(action, request);
	}
}

MigrationWorkbench.outboundByHost = {
	"workbench.internal": (request, _env, context) =>
		new Response(
			JSON.stringify({
				containerId: context.containerId,
				interceptedBy: "Container.outboundByHost",
				url: request.url,
			}),
			{
				headers: {
					"content-type": "application/json",
					"x-workbench-intercepted": "true",
				},
			},
		),
};
export { ContainerProxy };
export default {
	async fetch(request: Request, env: Env) {
		if (new URL(request.url).pathname.startsWith("/api/")) {
			const instance =
				new URL(request.url).searchParams.get("instance") || "reference";
			return getContainer(env.MIGRATION_WORKBENCH, instance).fetch(request);
		}
		return routeWorkbench(
			request,
			env.MIGRATION_WORKBENCH,
			{
				availableModes: ["helper", "direct"],
				description:
					"Both routes control the same Durable Object and container instance. Runtime calls migrate first; alarm ownership remains with the Container class until cutover.",
				stage: STAGE,
			},
			renderWorkbench,
		);
	},
} satisfies ExportedHandler<Env>;

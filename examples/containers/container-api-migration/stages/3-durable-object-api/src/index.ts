import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";
import {
	actionFrom,
	json,
	readEvents,
	recordEvent,
	requestForContainer,
	routeWorkbench,
	startWithRetry,
	waitForPort,
} from "../../../shared/lab";
import { renderWorkbench } from "../../../shared/workbench";

interface Env {
	MIGRATION_WORKBENCH: DurableObjectNamespace<MigrationWorkbench>;
}
interface OutboundProps {
	stage: string;
}
interface ScheduledPayload {
	createdAt: string;
	delay: number;
	stage: string;
}
type InspectorFactory = (options: { props: OutboundProps }) => Fetcher;
const STAGE = "direct" as const;
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

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

export class MigrationWorkbench extends DurableObject<Env> {
	private monitorAttached = false;
	private outboundInstalled = false;
	private runtime(): NonNullable<DurableObjectState["container"]> {
		if (!this.ctx.container) throw new Error("Container runtime unavailable");
		return this.ctx.container;
	}
	private record(message: string, detail?: unknown) {
		return recordEvent(this.ctx.storage, STAGE, "direct", message, detail);
	}
	private async installOutbound() {
		if (this.outboundInstalled) return;
		const exports = this.ctx.exports as unknown as {
			OutboundInspector: InspectorFactory;
		};
		await this.runtime().interceptOutboundHttp(
			"workbench.internal",
			exports.OutboundInspector({ props: { stage: STAGE } }),
		);
		this.outboundInstalled = true;
		await this.record("interceptOutboundHttp installed");
	}
	private attachMonitor() {
		if (this.monitorAttached) return;
		this.monitorAttached = true;
		this.ctx.waitUntil(
			this.runtime()
				.monitor()
				.then(() => this.record("monitor resolved: container exited"))
				.catch((error: unknown) =>
					this.record("monitor rejected", {
						message: error instanceof Error ? error.message : String(error),
					}),
				)
				.finally(() => {
					this.monitorAttached = false;
					this.outboundInstalled = false;
				}),
		);
	}
	private async ensureContainer() {
		const runtime = this.runtime();
		let startAttempts = 0;
		if (!runtime.running) {
			startAttempts = await startWithRetry(runtime, {
				enableInternet: false,
				env: { LAB_MODE: "direct", LAB_STAGE: STAGE },
			});
			await this.record("ctx.container.start", { startAttempts });
		}
		const readinessAttempts = await Promise.all([
			waitForPort(runtime, 8080),
			waitForPort(runtime, 9090),
		]);
		await this.installOutbound();
		await runtime.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		this.attachMonitor();
		return { startAttempts, readinessAttempts };
	}

	async alarm() {
		const pending = await this.ctx.storage.get<ScheduledPayload>(
			"lab:pending-cutover",
		);
		if (!pending) {
			await this.record("alarm fired without a workbench marker");
			return;
		}
		await this.ensureContainer();
		const response = await this.runtime()
			.getTcpPort(8080)
			.fetch(
				requestForContainer("/scheduled", {
					body: JSON.stringify(pending),
					method: "POST",
				}),
			);
		await this.ctx.storage.delete("lab:pending-cutover");
		await this.record("Durable Object alarm handled scheduled work", {
			payload: pending,
			response: await response.json(),
		});
	}

	async fetch(request: Request): Promise<Response> {
		const action = actionFrom(request),
			runtime = this.runtime();
		switch (action) {
			case "start":
				return json({
					running: runtime.running,
					stage: STAGE,
					...(await this.ensureContainer()),
				});
			case "status":
				return json({
					alarm: await this.ctx.storage.getAlarm(),
					pendingCutover: await this.ctx.storage.get("lab:pending-cutover"),
					running: runtime.running,
					stage: STAGE,
				});
			case "echo":
				await this.ensureContainer();
				return runtime.getTcpPort(8080).fetch(
					requestForContainer("/echo?via=ctx.container", {
						body: JSON.stringify({ hello: "from the direct Durable Object" }),
						method: "POST",
					}),
				);
			case "alternate":
			case "switch-port":
				await this.ensureContainer();
				return runtime
					.getTcpPort(9090)
					.fetch(`http://container/echo?via=ctx.container-${action}`);
			case "exec": {
				await this.ensureContainer();
				const process = await runtime.exec(["node", "--version"]);
				const result = await process.output();
				return json({
					exitCode: result.exitCode,
					stdout: new TextDecoder().decode(result.stdout).trim(),
				});
			}
			case "outbound":
				await this.ensureContainer();
				return runtime.getTcpPort(8080).fetch("http://container/outbound");
			case "renew":
				await runtime.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
				await this.record("setInactivityTimeout renewed");
				return json({ renewed: true, timeoutMs: INACTIVITY_TIMEOUT_MS });
			case "schedule":
			case "schedule-cutover": {
				const rawDelay = new URL(request.url).searchParams.get("delay");
				const requested = rawDelay === null ? Number.NaN : Number(rawDelay);
				const delay = Number.isFinite(requested) ? requested : 3;
				const payload = {
					createdAt: new Date().toISOString(),
					delay,
					stage: STAGE,
				};
				await this.ctx.storage.put("lab:pending-cutover", payload);
				await this.ctx.storage.setAlarm(Date.now() + delay * 1000);
				await this.record("Durable Object alarm scheduled", payload);
				return json({ payload, scheduled: true }, 202);
			}
			case "events":
				return json(await readEvents(this.ctx.storage));
			case "stop":
				runtime.signal(15);
				await this.record("signal(15) called");
				return json({ stopping: true });
			case "destroy":
				await runtime.destroy("Direct API workbench destroy");
				await this.record("destroy called");
				return json({ destroyed: true });
			default:
				return json({ error: `Unknown action: ${action}` }, 404);
		}
	}
}

export default {
	async fetch(request: Request, env: Env) {
		return routeWorkbench(
			request,
			env.MIGRATION_WORKBENCH,
			{
				availableModes: ["direct"],
				description:
					"The exported class and Durable Object namespace are unchanged. Runtime lifecycle, routing, monitoring, inactivity, outbound interception, and alarms now use platform APIs directly.",
				stage: STAGE,
			},
			renderWorkbench,
		);
	},
} satisfies ExportedHandler<Env>;

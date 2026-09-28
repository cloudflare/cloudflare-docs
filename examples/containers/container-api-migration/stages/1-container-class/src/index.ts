import {
	Container,
	ContainerProxy,
	getContainer,
	switchPort,
	type StopParams,
} from "@cloudflare/containers";
import {
	actionFrom,
	json,
	readEvents,
	recordEvent,
	requestForContainer,
	routeWorkbench,
} from "../../../shared/lab";
import { renderWorkbench } from "../../../shared/workbench";

interface Env {
	MIGRATION_WORKBENCH: DurableObjectNamespace<MigrationWorkbench>;
}
const STAGE = "legacy" as const;

export class MigrationWorkbench extends Container<Env> {
	defaultPort = 8080;
	requiredPorts = [8080, 9090];
	sleepAfter = "10m";
	envVars = { LAB_MODE: "helper", LAB_STAGE: STAGE };
	enableInternet = false;
	allowedHosts = ["workbench.internal"];
	pingEndpoint = "ping";

	private record(message: string, detail?: unknown) {
		return recordEvent(this.ctx.storage, STAGE, "helper", message, detail);
	}
	override async onStart() {
		await this.record("onStart hook");
		await this.containerFetch("http://container/bootstrap", { method: "POST" });
	}
	override async onStop(params: StopParams) {
		await this.record("onStop hook", params);
	}
	override onError(error: unknown): never {
		void this.record("onError hook", {
			message: error instanceof Error ? error.message : String(error),
		});
		throw error;
	}
	override async onActivityExpired() {
		await this.record("onActivityExpired hook");
		await this.stop();
	}

	async scheduledProbe(payload: unknown) {
		const response = await this.containerFetch(
			requestForContainer("/scheduled", {
				body: JSON.stringify(payload),
				method: "POST",
			}),
		);
		await this.record("Container.schedule callback", {
			payload,
			response: await response.json(),
		});
	}

	override async fetch(request: Request): Promise<Response> {
		const action = actionFrom(request);
		this.renewActivityTimeout();
		switch (action) {
			case "start":
				await this.startAndWaitForPorts({
					ports: this.requiredPorts,
					startOptions: { envVars: this.envVars, enableInternet: false },
				});
				await this.record("startAndWaitForPorts", {
					ports: this.requiredPorts,
				});
				return json({ stage: STAGE, state: await this.getState() });
			case "status":
				return json({ stage: STAGE, state: await this.getState() });
			case "echo":
				return this.containerFetch(
					requestForContainer("/echo?via=containerFetch", {
						body: JSON.stringify({ hello: "from the Container class" }),
						method: "POST",
					}),
				);
			case "alternate":
				return this.containerFetch(
					"http://container/echo?via=containerFetch-port-argument",
					{},
					9090,
				);
			case "switch-port":
				return super.fetch(
					switchPort(requestForContainer("/echo?via=switchPort"), 9090),
				);
			case "exec": {
				await this.startAndWaitForPorts({ ports: 8080 });
				const process = await this.ctx.container?.exec(["node", "--version"]);
				if (!process)
					return json({ error: "Container runtime unavailable" }, 503);
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
				await this.record("renewActivityTimeout");
				return json({ renewed: true, sleepAfter: this.sleepAfter });
			case "schedule": {
				const schedule = await this.schedule(3, "scheduledProbe", {
					createdAt: new Date().toISOString(),
					stage: STAGE,
				});
				await this.record("Container.schedule created", schedule);
				return json(schedule, 202);
			}
			case "events":
				return json(await readEvents(this.ctx.storage));
			case "stop":
				await this.stop("SIGTERM");
				await this.record("stop helper called");
				return json({ stopping: true });
			case "destroy":
				await this.destroy();
				await this.record("destroy helper called");
				return json({ destroyed: true });
			default:
				return json({ error: `Unknown action: ${action}` }, 404);
		}
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
				availableModes: ["helper"],
				description:
					"The baseline uses Container class routing, readiness, lifecycle hooks, scheduling, state, inactivity, port switching, and outbound interception.",
				stage: STAGE,
			},
			renderWorkbench,
		);
	},
} satisfies ExportedHandler<Env>;

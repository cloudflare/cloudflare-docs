export type LabStage = "legacy" | "bridge" | "direct";
export type LabMode = "helper" | "direct";

export interface LabEvent {
	at: string;
	detail?: unknown;
	message: string;
	mode: LabMode | "system";
	stage: LabStage;
}

export interface WorkbenchOptions {
	availableModes: LabMode[];
	description: string;
	stage: LabStage;
}

const EVENT_KEY = "lab:events";

export async function recordEvent(
	storage: DurableObjectStorage,
	stage: LabStage,
	mode: LabEvent["mode"],
	message: string,
	detail?: unknown,
): Promise<LabEvent> {
	const event: LabEvent = {
		at: new Date().toISOString(),
		detail,
		message,
		mode,
		stage,
	};
	const events = (await storage.get<LabEvent[]>(EVENT_KEY)) ?? [];
	events.push(event);
	await storage.put(EVENT_KEY, events.slice(-100));
	return event;
}

export async function readEvents(
	storage: DurableObjectStorage,
): Promise<LabEvent[]> {
	return (await storage.get<LabEvent[]>(EVENT_KEY)) ?? [];
}

export function json(value: unknown, status = 200): Response {
	return Response.json(value, {
		status,
		headers: { "cache-control": "no-store" },
	});
}

export function actionFrom(request: Request): string {
	return (
		new URL(request.url).pathname.split("/").filter(Boolean).at(-1) ?? "status"
	);
}

export function modeFrom(request: Request, fallback: LabMode): LabMode {
	return new URL(request.url).searchParams.get("mode") === "direct"
		? "direct"
		: fallback;
}

export function requestForContainer(path: string, init?: RequestInit): Request {
	return new Request(`http://container${path}`, init);
}

export async function startWithRetry(
	container: NonNullable<DurableObjectState["container"]>,
	options: Parameters<NonNullable<DurableObjectState["container"]>["start"]>[0],
	attempts = 20,
): Promise<number> {
	let lastError: unknown;
	for (let attempt = 1; attempt <= attempts; attempt += 1) {
		if (container.running) return attempt;
		try {
			container.start(options);
			return attempt;
		} catch (error) {
			lastError = error;
			if (attempt < attempts) await scheduler.wait(1000);
		}
	}
	throw new Error(
		`Container could not be allocated after ${attempts} attempts: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
	);
}

export async function waitForPort(
	container: NonNullable<DurableObjectState["container"]>,
	port: number,
	attempts = 40,
): Promise<number> {
	let lastError: unknown;
	for (let attempt = 1; attempt <= attempts; attempt += 1) {
		try {
			const response = await container
				.getTcpPort(port)
				.fetch("http://container/ping");
			if (response.ok) return attempt;
		} catch (error) {
			lastError = error;
		}
		await scheduler.wait(250);
	}
	throw new Error(
		`Port ${port} did not become ready: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
	);
}

export async function routeWorkbench<
	T extends Rpc.DurableObjectBranded | undefined,
>(
	request: Request,
	namespace: DurableObjectNamespace<T>,
	options: WorkbenchOptions,
	render: (options: WorkbenchOptions) => string,
): Promise<Response> {
	const url = new URL(request.url);
	if (!url.pathname.startsWith("/api/")) {
		return new Response(render(options), {
			headers: {
				"cache-control": "no-store",
				"content-type": "text/html; charset=utf-8",
			},
		});
	}
	const instance = url.searchParams.get("instance")?.trim() || "reference";
	if (!/^[a-zA-Z0-9_-]{1,64}$/.test(instance)) {
		return json(
			{ error: "Instance names may contain letters, numbers, _ and -." },
			400,
		);
	}
	return namespace.getByName(instance).fetch(request);
}

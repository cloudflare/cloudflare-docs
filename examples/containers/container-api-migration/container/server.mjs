import { createServer } from "node:http";

const startedAt = new Date().toISOString();
let bootstrapCount = 0;
let requestCount = 0;

async function readBody(request) {
	const chunks = [];
	for await (const chunk of request) chunks.push(chunk);
	return Buffer.concat(chunks).toString("utf8");
}

function send(response, status, value) {
	response.writeHead(status, {
		"content-type": "application/json; charset=utf-8",
	});
	response.end(`${JSON.stringify(value, null, 2)}\n`);
}

function createHandler(port) {
	return async (request, response) => {
		requestCount += 1;
		const url = new URL(request.url ?? "/", `http://container:${port}`);
		if (url.pathname === "/ping" || url.pathname === "/health") {
			send(response, 200, { ok: true, port, startedAt });
			return;
		}
		if (url.pathname === "/bootstrap" && request.method === "POST") {
			bootstrapCount += 1;
			send(response, 200, { bootstrapped: true, bootstrapCount, port });
			return;
		}
		if (url.pathname === "/echo") {
			send(response, 200, {
				body: await readBody(request),
				bootstrapCount,
				environment: {
					LAB_MODE: process.env.LAB_MODE ?? null,
					LAB_STAGE: process.env.LAB_STAGE ?? null,
				},
				method: request.method,
				pid: process.pid,
				port,
				requestCount,
				startedAt,
				via: url.searchParams.get("via"),
			});
			return;
		}
		if (url.pathname === "/outbound") {
			try {
				const outbound = await fetch("http://workbench.internal/probe");
				send(response, outbound.status, {
					body: await outbound.text(),
					intercepted:
						outbound.headers.get("x-workbench-intercepted") === "true",
					status: outbound.status,
				});
			} catch (error) {
				send(response, 502, {
					error: error instanceof Error ? error.message : String(error),
					intercepted: false,
				});
			}
			return;
		}
		if (url.pathname === "/scheduled" && request.method === "POST") {
			send(response, 200, {
				body: await readBody(request),
				handledAt: new Date().toISOString(),
				port,
			});
			return;
		}
		send(response, 404, {
			error: "Unknown container route",
			path: url.pathname,
		});
	};
}

for (const port of [
	Number(process.env.PORT ?? 8080),
	Number(process.env.ALT_PORT ?? 9090),
]) {
	createServer(createHandler(port)).listen(port, "0.0.0.0", () => {
		console.log(`Migration workbench listening on ${port}`);
	});
}

for (const signal of ["SIGINT", "SIGTERM"]) {
	process.on(signal, () => {
		console.log(`Migration workbench received ${signal}`);
		process.exit(0);
	});
}

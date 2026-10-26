#!/usr/bin/env tsx
/**
 * Starts the Flue dev server, waits for it to be ready, runs agent evals,
 * and tears down the server. Used by `pnpm run flue:evals`.
 */
import { spawn } from "node:child_process";
import { join } from "node:path";
import { loadEnvValue } from "./dotenv";

const PORT = 5173;
const HOST = "localhost";
const FLUE_DIR = join(import.meta.dirname, "..");

const TOKEN = loadEnvValue("DOCS_FLUE_INTERNAL_TOKEN");
if (!TOKEN) {
	console.error(
		"DOCS_FLUE_INTERNAL_TOKEN not found in process.env or .flue/.env(.local)",
	);
	process.exit(1);
}

async function waitForServer(timeoutMs = 60_000): Promise<void> {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const res = await fetch(`http://${HOST}:${PORT}/health`);
			if (res.ok) return;
		} catch {
			// not ready yet
		}
		await new Promise((r) => setTimeout(r, 1000));
	}
	throw new Error(`Server did not become ready within ${timeoutMs / 1000}s`);
}

async function main() {
	const env = {
		...process.env,
		DOCS_FLUE_INTERNAL_TOKEN: TOKEN,
		DOCS_FLUE_AGENT_EVALS: "1",
	};

	// Start the dev server. The Vite config reads DOCS_FLUE_INTERNAL_TOKEN
	// from process.env and injects it into the Worker's vars.
	const server = spawn(
		"pnpm",
		["exec", "vite", "dev", "--port", String(PORT), "--host", HOST],
		{
			cwd: FLUE_DIR,
			env: {
				...env,
				NODE_OPTIONS: "--max-old-space-size=8192",
			},
			stdio: ["ignore", "pipe", "pipe"],
		},
	);

	server.stdout?.on("data", (data: Buffer) => {
		process.stderr.write(data);
	});
	server.stderr?.on("data", (data: Buffer) => {
		process.stderr.write(data);
	});

	let exiting = false;
	const cleanup = () => {
		if (exiting) return;
		exiting = true;
		server.kill("SIGTERM");
	};

	process.on("SIGINT", () => {
		cleanup();
		process.exit(130);
	});
	process.on("SIGTERM", () => {
		cleanup();
		process.exit(143);
	});
	process.on("exit", cleanup);

	server.on("error", (err) => {
		console.error("Failed to start dev server:", err);
		cleanup();
		process.exit(1);
	});

	try {
		await waitForServer();
		console.log("Server ready, running evals...");

		const evalsCmd = process.env.EVALS_CMD ?? "evals";
		const result = spawn("pnpm", ["run", evalsCmd], {
			cwd: FLUE_DIR,
			env: {
				...env,
				FLUE_BASE_URL: `http://${HOST}:${PORT}`,
			},
			stdio: "inherit",
		});

		const code = await new Promise<number>((resolve) => {
			result.on("exit", (code, signal) => {
				if (signal) resolve(128);
				else resolve(code ?? 1);
			});
			result.on("error", () => resolve(1));
		});

		process.exit(code);
	} finally {
		cleanup();
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

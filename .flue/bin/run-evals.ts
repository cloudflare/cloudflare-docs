#!/usr/bin/env tsx
/**
 * Starts the Flue dev server, waits for it to be ready, runs agent evals,
 * and tears down the server. Used by `pnpm run flue:evals`.
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const PORT = 5173;
const HOST = "localhost";
const FLUE_DIR = join(import.meta.dirname, "..");

function loadDotenvValue(key: string): string | undefined {
	for (const file of [".env.local", ".env"]) {
		try {
			const content = readFileSync(join(FLUE_DIR, file), "utf-8");
			for (const line of content.split("\n")) {
				const match = line.match(new RegExp(`^${key}=(.+)$`));
				if (match) return match[1].trim();
			}
		} catch {
			// file may not exist
		}
	}
	return undefined;
}

const TOKEN =
	process.env.DOCS_FLUE_INTERNAL_TOKEN ??
	loadDotenvValue("DOCS_FLUE_INTERNAL_TOKEN");
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
	};

	// Start the dev server
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

	const cleanup = () => {
		server.kill("SIGTERM");
	};
	process.on("SIGINT", cleanup);
	process.on("SIGTERM", cleanup);
	process.on("exit", cleanup);

	try {
		await waitForServer();
		console.log("Server ready, running evals...");

		const evalsCmd = process.env.EVALS_CMD ?? "evals";
		const result = await spawn("pnpm", ["run", evalsCmd], {
			cwd: FLUE_DIR,
			env: {
				...env,
				FLUE_BASE_URL: `http://${HOST}:${PORT}`,
			},
			stdio: "inherit",
		});

		const code = await new Promise<number>((resolve) => {
			result.on("exit", resolve);
		});

		process.exit(code);
	} finally {
		server.kill("SIGTERM");
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

import { readFileSync } from "node:fs";
import { join } from "node:path";

const FLUE_DIR = join(import.meta.dirname, "..");

/**
 * Read one key for local scripts: the shell environment wins, then
 * .flue/.env.local, then .flue/.env (the same files the dev server loads).
 */
export function loadEnvValue(key: string): string | undefined {
	if (process.env[key]) return process.env[key];
	for (const file of [".env.local", ".env"]) {
		let content: string;
		try {
			content = readFileSync(join(FLUE_DIR, file), "utf-8");
		} catch {
			continue;
		}
		for (const line of content.split("\n")) {
			if (!line.startsWith(`${key}=`)) continue;
			const value = line
				.slice(key.length + 1)
				.trim()
				.replace(/^(["'])(.*)\1$/, "$2");
			if (value) return value;
		}
	}
	return undefined;
}

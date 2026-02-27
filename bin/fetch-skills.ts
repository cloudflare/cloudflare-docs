#!/usr/bin/env tsx

import { spawn } from "child_process";
import fs from "fs";

const SKILLS_URL =
	"https://middlecache.ced.cloudflare.com/v1/cloudflare-skills/skills.tar.gz";
const SKILLS_DIR = "./skills";

// --soft: warn and continue on failure instead of exiting non-zero.
//         Used by the predev hook so a network failure doesn't block local development.
// --force: re-fetch even if skills/ already exists.
const soft = process.argv.includes("--soft");
const force = process.argv.includes("--force");

const fail = (message: string): never => {
	if (soft) {
		const hasExisting = fs.existsSync(SKILLS_DIR);
		console.warn(
			hasExisting
				? `Warning: ${message} — continuing with existing Cloudflare Skills`
				: `Warning: ${message} — skills/ does not exist, /.well-known/skills/ will not work`,
		);
		process.exit(0);
	}
	console.error(`Error: ${message}`);
	process.exit(1);
};

if (fs.existsSync(SKILLS_DIR) && !force) {
	console.log(
		"/skills directory already exists, skipping fetch. (run `npx tsx bin/fetch-skills.ts --force` to re-fetch)",
	);
	process.exit(0);
}

console.log("Fetching Cloudflare Skills from middlecache");

let res!: Response;
try {
	res = await fetch(SKILLS_URL);
} catch (err) {
	fail(`fetch failed: ${err}`);
}

if (!res.ok) {
	fail(`fetch failed: ${res.status} ${res.statusText}`);
}

// Remove existing skills/ directory so stale Cloudflare Skills don't accumulate
fs.rmSync(SKILLS_DIR, { recursive: true, force: true });
fs.mkdirSync(SKILLS_DIR, { recursive: true });

// Pipe the response body directly into tar, extracting the skills/ subdirectory.
// The archive contains skills/<skill-name>/... so we strip the leading "skills/"
// component and extract into SKILLS_DIR.
const tar = spawn("tar", ["--strip-components=1", "-xz", "-C", SKILLS_DIR], {
	stdio: ["pipe", "inherit", "inherit"],
});

const reader = res.body!.getReader();

const pump = async (): Promise<void> => {
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		tar.stdin!.write(value);
	}
	tar.stdin!.end();
};

await pump();

const exitCode = await new Promise<number | null>((resolve) =>
	tar.on("close", resolve),
);

if (exitCode !== 0) {
	fail(`tar exited with code ${exitCode}`);
}

const cloudflareSkills = fs
	.readdirSync(SKILLS_DIR)
	.filter((entry) => fs.statSync(`${SKILLS_DIR}/${entry}`).isDirectory());

console.log(
	`Fetched ${cloudflareSkills.length} Cloudflare Skills: ${cloudflareSkills.join(", ")}`,
);

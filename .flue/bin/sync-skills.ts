/**
 * Syncs all SKILL.md files under .flue/.agents/skills/ to R2.
 *
 * Usage:
 *   pnpm flue:sync-skills:local   (--local flag, uses wrangler dev state)
 *   pnpm flue:sync-skills:remote  (no --local flag, uploads to production R2)
 */
import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const isLocal = process.argv.includes("--local");
const bucket = "docs-flue-bucket";
const skillsDir = new URL("../.agents/skills", import.meta.url).pathname;

function findSkills(dir: string): string[] {
	const skills: string[] = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			const skill = join(full, "SKILL.md");
			try {
				statSync(skill);
				skills.push(skill);
			} catch {
				// no SKILL.md in this dir
			}
		}
	}
	return skills;
}

const skills = findSkills(skillsDir);

if (skills.length === 0) {
	console.error(`No SKILL.md files found in ${skillsDir}`);
	process.exit(1);
}

let failed = false;
for (const skillPath of skills) {
	// Key in R2: .agents/skills/<name>/SKILL.md
	const relativeToFlue = skillPath.slice(
		skillPath.indexOf("/.agents/skills/") + 1,
	);
	const r2Key = `${bucket}/${relativeToFlue}`;

	const localFlag = isLocal
		? "--local --persist-to .flue/dist/.wrangler/state"
		: "--remote";

	const cmd = `wrangler r2 object put ${r2Key} --file ${skillPath} ${localFlag}`;

	console.log(`Uploading: ${relativeToFlue}`);
	try {
		execSync(cmd, { stdio: "inherit" });
	} catch {
		console.error(`Failed to upload ${relativeToFlue}`);
		failed = true;
	}
}

if (failed) {
	process.exit(1);
}

console.log(
	`\nSynced ${skills.length} skill(s) to R2 (${isLocal ? "local" : "remote"}).`,
);

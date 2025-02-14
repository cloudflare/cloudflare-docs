import { spawnSync } from "node:child_process";
import { loadOwners, matchPattern } from "codeowners-utils";

let owners = await loadOwners(process.cwd());

if (!owners) {
	throw new Error("Unable to load CODEOWNERS file.");
}

const result = spawnSync("git", ["ls-files"], { encoding: "utf-8" });
const files = result.stdout.trim().split("\n");

owners = owners.filter((entry) => entry.pattern !== "*");

const unmatchedPatterns = owners
	.filter((entry) => {
		for (const file of files) {
			const match = matchPattern(file, entry.pattern);

			if (match) {
				return false;
			}
		}

		return true;
	})
	.map((entry) => entry.pattern);

if (unmatchedPatterns.length > 0) {
	console.error(
		`CODEOWNERS contains ${unmatchedPatterns.length} patterns that do not match any files in the repository:`,
	);
	console.error(unmatchedPatterns);
}

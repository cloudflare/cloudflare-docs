// NOTE: This is the source file!
// ~> Run `pnpm run build` to produce `index.js`

import * as core from "@actions/core";
import * as github from "@actions/github";

type Octokit = ReturnType<typeof github.getOctokit>;

function getActor(): string {
	const { eventName, payload } = github.context;

	switch (eventName) {
		case "pull_request_target":
			return payload.pull_request?.user?.login ?? "";
		case "issue_comment":
		case "pull_request_review_comment":
			return payload.comment?.user?.login ?? "";
		case "pull_request_review":
			return payload.review?.user?.login ?? "";
		default:
			return "";
	}
}

async function isTeamMember(
	octokit: Octokit,
	org: string,
	teamSlug: string,
	username: string,
): Promise<boolean> {
	try {
		const { data } = await octokit.rest.teams.getMembershipForUserInOrg({
			org,
			team_slug: teamSlug,
			username,
		});
		return data.state === "active";
	} catch {
		return false;
	}
}

async function isCodeowner(octokit: Octokit, actor: string): Promise<boolean> {
	const { repo, owner } = github.context.repo;

	// Fetch CODEOWNERS from the base branch via API — never from a checkout,
	// so a PR branch cannot tamper with it.
	const { data } = await octokit.rest.repos.getContent({
		owner,
		repo,
		path: ".github/CODEOWNERS",
	});

	if (!("content" in data)) {
		throw new Error("CODEOWNERS is not a file");
	}

	const content = Buffer.from(data.content, "base64").toString("utf-8");

	// Collect all unique owner tokens from the file, ignoring comments and blank lines.
	const ownerPattern = new RegExp(
		"@([a-zA-Z0-9_.-]+(?:/[a-zA-Z0-9_.-]+)?)",
		"g",
	);
	const owners = Array.from(
		new Set(
			content
				.split("\n")
				.filter((line) => line.trim() && !line.trim().startsWith("#"))
				.flatMap((line) =>
					Array.from(line.matchAll(ownerPattern)).map((m) => m[1]),
				),
		),
	);

	for (const ownerEntry of owners) {
		if (ownerEntry.includes("/")) {
			// Team reference: org/team-slug
			const [org, teamSlug] = ownerEntry.split("/");
			if (await isTeamMember(octokit, org, teamSlug, actor)) {
				return true;
			}
		} else {
			// Individual user
			if (ownerEntry.toLowerCase() === actor.toLowerCase()) {
				return true;
			}
		}
	}

	return false;
}

(async function () {
	try {
		const token = core.getInput("GH_ORG_TOKEN", { required: true });
		const octokit = github.getOctokit(token);

		const actor = getActor();

		if (!actor) {
			core.info(`Unsupported event: ${github.context.eventName}. Skipping.`);
			core.setOutput("is-codeowner", "false");
			return;
		}

		core.info(`Checking CODEOWNERS for actor: ${actor}`);

		const result = await isCodeowner(octokit, actor);

		core.info(`${actor} is${result ? "" : " not"} a CODEOWNER`);
		core.setOutput("is-codeowner", String(result));
	} catch (error) {
		core.setFailed(error instanceof Error ? error.message : String(error));
	}
})();

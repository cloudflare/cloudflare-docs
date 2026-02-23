import * as core from "@actions/core";
import * as github from "@actions/github";
import type { PullRequestEvent } from "@octokit/webhooks-types";

import { loadOwners, matchFile } from "codeowners-utils";
import { GITHUB_ACTIONS_BOT_ID, COMMENT_PREFIX } from "./constants.ts";

async function run(): Promise<void> {
	try {
		if (!process.env.GITHUB_TOKEN) {
			core.setFailed(`Could not find GITHUB_TOKEN in env`);
			process.exit();
		}

		const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
		const payload = github.context.payload as PullRequestEvent;

		const { owner, repo } = github.context.repo;
		const pullRequestNumber = payload.number;

		const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
			owner,
			repo,
			pull_number: pullRequestNumber,
		});

		const codeowners = await loadOwners(process.cwd());

		if (!codeowners) {
			throw new Error("Unable to load CODEOWNERS file.");
		}

		const matchedPatterns = [
			...new Set(
				files.flatMap((file) => matchFile(file.filename, codeowners) ?? []),
			),
		];

		const { data: comments } = await octokit.rest.issues.listComments({
			owner,
			repo,
			issue_number: pullRequestNumber,
			per_page: 100,
		});

		const existingComment = comments.find(
			(comment) =>
				comment.user?.id === GITHUB_ACTIONS_BOT_ID &&
				comment.body?.includes(COMMENT_PREFIX),
		);

		if (existingComment) {
			core.info(`Found existing comment with ID ${existingComment.id}`);
		} else {
			core.info(`No existing comment found`);
		}

		const comment = [
			COMMENT_PREFIX,
			"| Pattern | Owners |",
			"| ------- | ------ |",
			...matchedPatterns.map(
				(pattern) =>
					`| \`${pattern.pattern}\` | ${pattern.owners.map((owner) => `\`${owner}\``).join(", ")} |`,
			),
		].join("\n");

		if (existingComment) {
			core.info(
				`Updating ${existingComment.id} with ${JSON.stringify(comment)}`,
			);
			await octokit.rest.issues.updateComment({
				owner,
				repo,
				comment_id: existingComment.id,
				body: comment,
			});
		} else {
			core.info(`Creating new comment with ${JSON.stringify(comment)}`);
			await octokit.rest.issues.createComment({
				owner,
				repo,
				issue_number: pullRequestNumber,
				body: comment,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		}
		process.exit();
	}
}

run();

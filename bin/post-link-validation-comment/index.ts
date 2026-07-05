import { existsSync, readFileSync } from "node:fs";

import * as core from "@actions/core";
import * as github from "@actions/github";

import { COMMENT_MARKER, GITHUB_ACTIONS_BOT_ID } from "./constants";

interface LinkValidationError {
	docsPath: string;
	link: string;
	position: { line: number; column: number } | null;
	message: string;
	documentationUrl: string;
}

interface LinkValidationReport {
	errorCount: number;
	errorFileCount: number;
	errors: LinkValidationError[];
}

async function findExistingComment(
	octokit: ReturnType<typeof github.getOctokit>,
	owner: string,
	repo: string,
	pullRequestNumber: number,
) {
	const { data: comments } = await octokit.rest.issues.listComments({
		owner,
		repo,
		issue_number: pullRequestNumber,
		per_page: 100,
	});

	return comments.find(
		(c) =>
			c.user?.id === GITHUB_ACTIONS_BOT_ID && c.body?.includes(COMMENT_MARKER),
	);
}

async function run(): Promise<void> {
	try {
		if (!process.env.GITHUB_TOKEN) {
			core.setFailed("Could not find GITHUB_TOKEN in env");
			process.exit();
		}

		const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
		const { owner, repo } = github.context.repo;
		const payload = github.context.payload;
		const pullRequestNumber = payload.pull_request?.number;

		if (!pullRequestNumber) {
			core.setFailed("Could not find pull request number");
			process.exit();
			return;
		}

		const reportPath =
			process.env.REPORT_PATH ?? ".starlight-links-validator/errors.json";

		// No report means no broken links — clean up any existing comment
		if (!existsSync(reportPath)) {
			const existing = await findExistingComment(
				octokit,
				owner,
				repo,
				pullRequestNumber,
			);

			if (existing) {
				core.info(
					`No broken links found. Removing existing comment ${existing.id}`,
				);
				await octokit.rest.issues.deleteComment({
					owner,
					repo,
					comment_id: existing.id,
				});
			} else {
				core.info("No broken links found.");
			}

			return;
		}

		let report: LinkValidationReport;
		try {
			report = JSON.parse(readFileSync(reportPath, "utf8"));
		} catch {
			core.setFailed(`Could not read report at ${reportPath}`);
			process.exit();
			return;
		}

		// Build the comment body
		const rows = report.errors.map((error) => {
			const position = error.position
				? `\`${error.position.line}:${error.position.column}\``
				: "-";
			const link = decodeURIComponent(error.link);
			return `| \`${error.docsPath}\` | \`${link}\` | ${position} | ${error.message} |`;
		});

		const comment = [
			`## ${COMMENT_MARKER}`,
			"",
			`Found **${report.errorCount}** broken link(s) across **${report.errorFileCount}** file(s).`,
			"",
			"| File | Link | Position | Error |",
			"| --- | --- | :---: | --- |",
			...rows,
		].join("\n");

		// Find existing comment
		const existingComment = await findExistingComment(
			octokit,
			owner,
			repo,
			pullRequestNumber,
		);

		if (existingComment) {
			core.info(`Updating existing comment ${existingComment.id}`);
			await octokit.rest.issues.updateComment({
				owner,
				repo,
				comment_id: existingComment.id,
				body: comment,
			});
		} else {
			core.info("Creating new comment");
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

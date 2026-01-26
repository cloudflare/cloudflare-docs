import * as core from "@actions/core";
import * as github from "@actions/github";
import * as fs from "fs";
import * as path from "path";
import type { PullRequestEvent } from "@octokit/webhooks-types";

import { analyzeFile } from "./analyzer";
import { generateReport, aggregateResults } from "./report";
import {
	GITHUB_ACTIONS_BOT_ID,
	COMMENT_IDENTIFIER,
	DOCS_CONTENT_PATH,
	PARTIALS_PATH,
} from "./constants";

async function run(): Promise<void> {
	try {
		if (!process.env.GITHUB_TOKEN) {
			core.setFailed("Could not find GITHUB_TOKEN in env");
			process.exit(1);
		}

		const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
		const payload = github.context.payload as PullRequestEvent;

		const { owner, repo } = github.context.repo;
		const pullRequestNumber = payload.number;

		core.info(`Reviewing PR #${pullRequestNumber}`);

		// Get changed files in the PR
		const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
			owner,
			repo,
			pull_number: pullRequestNumber,
		});

		// Filter to only documentation files (.mdx in docs or partials)
		const docsFiles = files.filter(
			(file) =>
				file.filename.endsWith(".mdx") &&
				(file.filename.startsWith(DOCS_CONTENT_PATH) ||
					file.filename.startsWith(PARTIALS_PATH)) &&
				file.status !== "removed",
		);

		core.info(`Found ${docsFiles.length} documentation files to review`);

		if (docsFiles.length === 0) {
			core.info("No documentation files to review");
			await removeExistingComment(octokit, owner, repo, pullRequestNumber);
			return;
		}

		// Analyze each file
		const fileResults = [];

		for (const file of docsFiles) {
			const filePath = path.join(process.cwd(), file.filename);

			// Check if file exists (might have been deleted in a later commit)
			if (!fs.existsSync(filePath)) {
				core.warning(`File not found: ${file.filename}`);
				continue;
			}

			const content = fs.readFileSync(filePath, "utf-8");
			core.info(`Analyzing: ${file.filename}`);

			try {
				const result = analyzeFile(file.filename, content);
				fileResults.push(result);
			} catch (error) {
				core.warning(
					`Error analyzing ${file.filename}: ${error instanceof Error ? error.message : String(error)}`,
				);
			}
		}

		if (fileResults.length === 0) {
			core.info("No files were successfully analyzed");
			await removeExistingComment(octokit, owner, repo, pullRequestNumber);
			return;
		}

		// Generate report
		const report = aggregateResults(fileResults);

		core.info(
			`Review complete: ${report.summary.totalErrors} errors, ${report.summary.totalWarnings} warnings, ${report.summary.totalSuggestions} suggestions`,
		);

		// Only post comment if files contain API-related content
		if (!report.hasApiContent) {
			core.info(
				"No API-related content found in changed files, skipping comment",
			);
			await removeExistingComment(octokit, owner, repo, pullRequestNumber);
			return;
		}

		const reportMarkdown = generateReport(report);

		// Post or update comment
		await postOrUpdateComment(
			octokit,
			owner,
			repo,
			pullRequestNumber,
			reportMarkdown,
		);

		// Log summary
		core.summary
			.addHeading("API Documentation Review")
			.addTable([
				[
					{ data: "Metric", header: true },
					{ data: "Value", header: true },
				],
				["Files Reviewed", String(report.summary.totalFiles)],
				["Errors", String(report.summary.totalErrors)],
				["Warnings", String(report.summary.totalWarnings)],
				["Suggestions", String(report.summary.totalSuggestions)],
				["Average Score", `${report.summary.averageScore.toFixed(0)}/100`],
			])
			.write();
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message);
		} else {
			core.setFailed(String(error));
		}
		process.exit(1);
	}
}

async function postOrUpdateComment(
	octokit: ReturnType<typeof github.getOctokit>,
	owner: string,
	repo: string,
	pullRequestNumber: number,
	body: string,
): Promise<void> {
	const { data: comments } = await octokit.rest.issues.listComments({
		owner,
		repo,
		issue_number: pullRequestNumber,
		per_page: 100,
	});

	const existingComment = comments.find(
		(comment) =>
			comment.user?.id === GITHUB_ACTIONS_BOT_ID &&
			comment.body?.includes(COMMENT_IDENTIFIER),
	);

	if (existingComment) {
		core.info(`Updating existing comment ${existingComment.id}`);
		await octokit.rest.issues.updateComment({
			owner,
			repo,
			comment_id: existingComment.id,
			body,
		});
	} else {
		core.info("Creating new comment");
		await octokit.rest.issues.createComment({
			owner,
			repo,
			issue_number: pullRequestNumber,
			body,
		});
	}
}

async function removeExistingComment(
	octokit: ReturnType<typeof github.getOctokit>,
	owner: string,
	repo: string,
	pullRequestNumber: number,
): Promise<void> {
	const { data: comments } = await octokit.rest.issues.listComments({
		owner,
		repo,
		issue_number: pullRequestNumber,
		per_page: 100,
	});

	const existingComment = comments.find(
		(comment) =>
			comment.user?.id === GITHUB_ACTIONS_BOT_ID &&
			comment.body?.includes(COMMENT_IDENTIFIER),
	);

	if (existingComment) {
		core.info(`Removing existing comment ${existingComment.id}`);
		await octokit.rest.issues.deleteComment({
			owner,
			repo,
			comment_id: existingComment.id,
		});
	}
}

run();

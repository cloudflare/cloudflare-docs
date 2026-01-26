import * as core from "@actions/core";
import * as github from "@actions/github";
import * as fs from "fs";
import * as path from "path";
import type { PullRequestEvent } from "@octokit/webhooks-types";
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";

import { analyzeFile, enrichWithSchemaInfo } from "./analyzer";
import { generateReport, aggregateResults } from "./report";
import {
	GITHUB_ACTIONS_BOT_ID,
	COMMENT_IDENTIFIER,
	DOCS_CONTENT_PATH,
	PARTIALS_PATH,
} from "./constants";

// Schema commit - keep in sync with src/util/api.ts
const SCHEMA_COMMIT = "6b852f9040e6f578aa91b159af2f933527465f72";

async function getSchema(): Promise<OpenAPI.Document> {
	const response = await fetch(
		`https://gh-code.developers.cloudflare.com/cloudflare/api-schemas/${SCHEMA_COMMIT}/openapi.json`,
	);
	const obj = await response.json();
	return SwaggerParser.dereference(obj);
}

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

		// Analyze each file for curl commands
		const fileResults = [];

		for (const file of docsFiles) {
			const filePath = path.join(process.cwd(), file.filename);

			if (!fs.existsSync(filePath)) {
				core.warning(`File not found: ${file.filename}`);
				continue;
			}

			const content = fs.readFileSync(filePath, "utf-8");
			core.info(`Analyzing: ${file.filename}`);

			try {
				const result = analyzeFile(file.filename, content);
				if (result.curlCommands.length > 0) {
					fileResults.push(result);
				}
			} catch (error) {
				core.warning(
					`Error analyzing ${file.filename}: ${error instanceof Error ? error.message : String(error)}`,
				);
			}
		}

		if (fileResults.length === 0) {
			core.info("No curl commands found in changed files");
			await removeExistingComment(octokit, owner, repo, pullRequestNumber);
			return;
		}

		// Load schema and check endpoints
		core.info("Loading API schema...");
		const schema = await getSchema();

		core.info("Checking endpoints against schema...");
		await enrichWithSchemaInfo(fileResults, schema);

		// Generate report
		const report = aggregateResults(fileResults);

		core.info(
			`Found ${report.totalCurlCommands} curl commands, ${report.totalWithSchemaEndpoint} have schema endpoints`,
		);

		// Only post comment if there are curl commands with schema endpoints
		if (report.totalWithSchemaEndpoint === 0) {
			core.info("No curl commands with matching schema endpoints found");
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

		core.info("Comment posted successfully");
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

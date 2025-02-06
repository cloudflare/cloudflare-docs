import * as core from "@actions/core";
import * as github from "@actions/github";

import {
	CONTENT_BASE_PATH,
	DOCS_BASE_URL,
	EXISTING_COMMENT_SUBSTRING,
	GITHUB_ACTIONS_BOT_ID,
	PREVIEW_URL_REGEX,
} from "./constants";

import { filenameToPath } from "./util";

async function run(): Promise<void> {
	try {
		const token = core.getInput("GITHUB_TOKEN", { required: true });
		const octokit = github.getOctokit(token);

		const ctx = github.context;

		if (!ctx.payload.issue) {
			core.setFailed(`Payload ${ctx.payload} is missing an 'issue' property`);
			process.exit();
		}

		const issue = ctx.payload.issue.number;

		const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
			...ctx.repo,
			pull_number: issue,
			per_page: 100,
		});

		const { data: comments } = await octokit.rest.issues.listComments({
			owner: ctx.repo.owner,
			repo: ctx.repo.repo,
			issue_number: issue,
			per_page: 100,
		});

		const existingComment = comments.find(
			(comment) =>
				comment.user?.id === GITHUB_ACTIONS_BOT_ID &&
				comment.body?.includes(EXISTING_COMMENT_SUBSTRING),
		);

		const urlComment = comments.find(
			(comment) =>
				comment.user?.id === GITHUB_ACTIONS_BOT_ID &&
				PREVIEW_URL_REGEX.test(comment.body ?? ""),
		);

		if (!urlComment || !urlComment.body) {
			core.setFailed(
				`Could not find a comment from ${GITHUB_ACTIONS_BOT_ID} on ${issue}`,
			);
			process.exit();
		}

		const match = urlComment.body.match(PREVIEW_URL_REGEX);

		if (!match) {
			core.setFailed(`Could not extract URL from ${urlComment.body}`);
			process.exit();
		}

		const previewUrl = match[1];

		core.debug(previewUrl);

		const changedFiles = files
			.filter(
				(file) =>
					file.filename.endsWith(".mdx") &&
					(file.filename.startsWith(`${CONTENT_BASE_PATH}/docs/`) ||
						file.filename.startsWith(`${CONTENT_BASE_PATH}/changelogs-next/`)),
			)
			.sort((a, b) => b.changes - a.changes)
			.slice(0, 15) // Limit to 15 entries
			.map(({ filename }) => {
				const original = `${DOCS_BASE_URL}/${filenameToPath(filename)}`;
				const preview = `${previewUrl}/${filenameToPath(filename)}`;

				core.debug([filename, original, preview].toString());

				return { original, preview };
			});

		if (changedFiles.length === 0) {
			return;
		}

		const commentBody = `**Files with changes (up to 15)**\n\n| Original Link | Updated Link |\n| --- | --- |\n${changedFiles
			.map(
				(file) =>
					`| [${file.original}](${file.original}) | [${file.preview}](${file.preview}) |`,
			)
			.join("\n")}`;

		if (existingComment) {
			await octokit.rest.issues.updateComment({
				owner: ctx.repo.owner,
				repo: ctx.repo.repo,
				comment_id: existingComment.id,
				body: commentBody,
			});
		} else {
			await octokit.rest.issues.createComment({
				owner: ctx.repo.owner,
				repo: ctx.repo.repo,
				issue_number: issue,
				body: commentBody,
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

import * as core from "@actions/core";
import * as github from "@actions/github";

import { readFile } from "node:fs/promises";

import {
	CONTENT_BASE_PATH,
	DOCS_BASE_URL,
	GITHUB_ACTIONS_BOT_ID,
	PREVIEW_URL_REGEX,
	WRANGLER_LOGS_PATH,
} from "./constants";

import { filenameToPath } from "./util";

async function run(): Promise<void> {
	try {
		const token = core.getInput("GITHUB_TOKEN", { required: true });
		const octokit = github.getOctokit(token);
		const ctx = github.context;

		const { data: pulls } = await octokit.rest.pulls.list({
			...ctx.repo,
			head: ctx.ref,
		});

		const pull_number = pulls.at(0)?.number;

		if (!pull_number) {
			core.setFailed(`Could not find pull requests for ${ctx.ref}`);
			process.exit();
		}

		const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
			...ctx.repo,
			pull_number,
			per_page: 100,
		});

		const { data: comments } = await octokit.rest.issues.listComments({
			...ctx.repo,
			issue_number: pull_number,
			per_page: 100,
		});

		const existingComment = comments.find(
			(comment) =>
				comment.user?.id === GITHUB_ACTIONS_BOT_ID &&
				PREVIEW_URL_REGEX.test(comment.body ?? ""),
		);

		const previewUrl: string = (
			await readFile(WRANGLER_LOGS_PATH, { encoding: "utf-8" })
		)
			.split("\n")
			.filter(Boolean)
			.map((json) => JSON.parse(json))
			.filter((json) => json.type === "version-upload")
			.map((json) => json.preview_url)
			.at(0);

		if (!previewUrl) {
			core.setFailed(`Found no version-upload at ${WRANGLER_LOGS_PATH}`);
			process.exit();
		}

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

		let comment = `**Preview URL:** ${previewUrl}`;
		if (changedFiles.length !== 0) {
			comment = comment.concat(
				`**Files with changes (up to 15)**\n\n| Original Link | Updated Link |\n| --- | --- |\n${changedFiles
					.map(
						(file) =>
							`| [${file.original}](${file.original}) | [${file.preview}](${file.preview}) |`,
					)
					.join("\n")}`,
			);
		}

		if (existingComment) {
			await octokit.rest.issues.updateComment({
				owner: ctx.repo.owner,
				repo: ctx.repo.repo,
				comment_id: existingComment.id,
				body: comment,
			});
		} else {
			await octokit.rest.issues.createComment({
				owner: ctx.repo.owner,
				repo: ctx.repo.repo,
				issue_number: pull_number,
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

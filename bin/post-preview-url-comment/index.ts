import * as core from "@actions/core";
import * as github from "@actions/github";

import {
	CONTENT_BASE_PATH,
	DOCS_BASE_URL,
	GITHUB_ACTIONS_BOT_ID,
	PREVIEW_URL_REGEX,
} from "./constants";

import { filenameToPath, branchToSubdomain } from "./util";

async function run(): Promise<void> {
	try {
		if (!process.env.GITHUB_TOKEN) {
			core.setFailed(`Could not find GITHUB_TOKEN in env`);
			process.exit();
		}

		const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
		const ctx = github.context;
		const branch = ctx.ref.replace("refs/heads/", "");

		core.info(`Finding pull requests for ${ctx.ref}`);

		const { data: pulls } = await octokit.rest.pulls.list({
			...ctx.repo,
			head: `${ctx.repo.owner}:${branch}`,
		});

		const pull_number = pulls.at(0)?.number;

		if (!pull_number) {
			core.setFailed(`Could not find pull requests for ${ctx.ref}`);
			process.exit();
		}

		core.info(`Found ${pull_number}`);

		const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
			...ctx.repo,
			pull_number,
			per_page: 100,
		});

		core.info(`Found ${files.length} changed files for ${pull_number}`);

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

		if (existingComment) {
			core.info(`Found existing comment with ID ${existingComment.id}`);
		} else {
			core.info(`No existing comment found`);
		}

		const previewUrl = {
			branch: `https://${branchToSubdomain(branch)}.preview.developers.cloudflare.com`,
			commit: `https://${ctx.sha.slice(0, 8)}.preview.developers.cloudflare.com`,
		};

		core.info(
			`Commit URL: ${previewUrl.commit}\nBranch URL: ${previewUrl.branch}`,
		);

		const changedFiles = files
			.filter(
				(file) =>
					file.filename.endsWith(".mdx") &&
					(file.filename.startsWith(`${CONTENT_BASE_PATH}/docs/`) ||
						file.filename.startsWith(`${CONTENT_BASE_PATH}/changelog/`)),
			)
			.sort((a, b) => b.changes - a.changes)
			.slice(0, 15) // Limit to 15 entries
			.map(({ filename }) => {
				const original = `${DOCS_BASE_URL}/${filenameToPath(filename)}`;
				const preview = `${previewUrl.branch}/${filenameToPath(filename)}`;

				core.info(
					`Filename: ${filename}\nOriginal: ${original}\nPreview: ${preview}`,
				);

				return { original, preview };
			});

		let comment = `**Preview URL:** ${previewUrl.commit}\n**Preview Branch URL:** ${previewUrl.branch}`;
		if (changedFiles.length !== 0) {
			core.info(`Found ${changedFiles.length} after filtering paths`);

			comment = comment.concat(
				`\n\n**Files with changes (up to 15)**\n\n| Original Link | Updated Link |\n| --- | --- |\n${changedFiles
					.map(
						(file) =>
							`| [${file.original}](${file.original}) | [${file.preview}](${file.preview}) |`,
					)
					.join("\n")}`,
			);
		}

		if (existingComment) {
			core.info(
				`Updating ${existingComment.id} with ${JSON.stringify(comment)}`,
			);
			await octokit.rest.issues.updateComment({
				owner: ctx.repo.owner,
				repo: ctx.repo.repo,
				comment_id: existingComment.id,
				body: comment,
			});
		} else {
			core.info(`Creating new comment with ${JSON.stringify(comment)}`);
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

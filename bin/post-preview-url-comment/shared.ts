import * as core from "@actions/core";
import * as github from "@actions/github";

import {
	CONTENT_BASE_PATH,
	DOCS_BASE_URL,
	GITHUB_ACTIONS_BOT_ID,
} from "./constants";
import { filenameToPath } from "./util";

export async function getPullContext() {
	if (!process.env.GITHUB_TOKEN) {
		throw new Error("Could not find GITHUB_TOKEN in env");
	}

	const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
	const ctx = github.context;
	const payload = ctx.payload;

	// Support both pull_request and push event contexts
	let branch: string;
	let commitSha: string;
	let pull_number: number | undefined;

	if (payload.pull_request) {
		branch = payload.pull_request.head.ref;
		commitSha = payload.pull_request.head.sha;
		pull_number = payload.pull_request.number;
	} else {
		branch = ctx.ref.replace("refs/heads/", "");
		commitSha = ctx.sha;

		core.info(`Finding pull requests for ${ctx.ref}`);
		const { data: pulls } = await octokit.rest.pulls.list({
			...ctx.repo,
			head: `${ctx.repo.owner}:${branch}`,
		});
		pull_number = pulls.at(0)?.number;
	}

	if (!pull_number) {
		throw new Error("Could not find pull request number");
	}

	core.info(`Found PR #${pull_number}`);
	return { octokit, ctx, branch, commitSha, pull_number };
}

type PullContext = Awaited<ReturnType<typeof getPullContext>>;

/** Paths of the most-changed docs/changelog pages in the PR (up to 15). */
export async function getChangedPaths({
	octokit,
	ctx,
	pull_number,
}: PullContext) {
	const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
		...ctx.repo,
		pull_number,
		per_page: 100,
	});

	core.info(`Found ${files.length} changed files for ${pull_number}`);

	const paths = files
		.filter(
			(file) =>
				file.filename.endsWith(".mdx") &&
				(file.filename.startsWith(`${CONTENT_BASE_PATH}/docs/`) ||
					file.filename.startsWith(`${CONTENT_BASE_PATH}/changelog/`)),
		)
		.sort((a, b) => b.changes - a.changes)
		.slice(0, 15) // Limit to 15 entries
		.map(({ filename }) => filenameToPath(filename));

	core.info(`Found ${paths.length} after filtering paths`);
	return paths;
}

export function filesTable(paths: string[], previewBase: string) {
	if (paths.length === 0) return "";

	const rows = paths.map((path) => {
		const original = `${DOCS_BASE_URL}/${path}`;
		const preview = `${previewBase}/${path}`;
		return `| [${original}](${original}) | [${preview}](${preview}) |`;
	});

	return `\n\n**Files with changes (up to 15)**\n\n| Original Link | Updated Link |\n| --- | --- |\n${rows.join("\n")}`;
}

/**
 * Updates the bot comment matching `marker`, or creates it. Each preview kind
 * uses its own marker so one never overwrites the other.
 */
export async function upsertComment(
	{ octokit, ctx, pull_number }: PullContext,
	marker: RegExp,
	body: string,
) {
	const { data: comments } = await octokit.rest.issues.listComments({
		...ctx.repo,
		issue_number: pull_number,
		per_page: 100,
	});

	const existing = comments.find(
		(comment) =>
			comment.user?.id === GITHUB_ACTIONS_BOT_ID &&
			marker.test(comment.body ?? ""),
	);

	if (existing) {
		core.info(`Updating comment ${existing.id}`);
		await octokit.rest.issues.updateComment({
			owner: ctx.repo.owner,
			repo: ctx.repo.repo,
			comment_id: existing.id,
			body,
		});
	} else {
		core.info("Creating new comment");
		await octokit.rest.issues.createComment({
			owner: ctx.repo.owner,
			repo: ctx.repo.repo,
			issue_number: pull_number,
			body,
		});
	}
}

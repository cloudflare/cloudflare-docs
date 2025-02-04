import * as core from "@actions/core";
import * as github from "@actions/github";

import { slug } from "github-slugger";

const GITHUB_ACTIONS_BOT_ID = 41898282;
const DOCS_BASE_URL = "https://developers.cloudflare.com";
const CONTENT_BASE_PATH = "src/content/docs/";

async function run(): Promise<void> {
	try {
		const token = core.getInput("GITHUB_TOKEN", { required: true });
		const octokit = github.getOctokit(token);

		const ctx = github.context;
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
				comment.user.id === GITHUB_ACTIONS_BOT_ID &&
				comment.body.includes("| Original Link | Updated Link |"),
		);

		const urlComment = comments.find(
			(comment) =>
				comment.user.id === GITHUB_ACTIONS_BOT_ID &&
				comment.body.includes("**Preview URL:**"),
		);

		let previewUrl: string;

		if (urlComment) {
			if (!urlComment.body) {
				core.setFailed(`${urlComment.id} has no body`);
				process.exit();
			}

			const match = urlComment.body.match(/^\*\*Preview URL:\*\* (.*)$/m)[1];

			if (!match) {
				core.setFailed(`Could not extract URL from ${urlComment.body}`);
				process.exit();
			}

			previewUrl = match;
		}

		core.debug(previewUrl);

		const changedFiles = files
			.filter(
				(file) =>
					file.filename.endsWith(".mdx") &&
					file.filename.startsWith(CONTENT_BASE_PATH),
			)
			.sort((a, b) => b.changes - a.changes)
			.slice(0, 15) // Limit to 15 entries
			.map(({ filename }) => {
				const filenameToPath = (filename: string) => {
					return filename
						.replace(".mdx", "")
						.split("/")
						.map((segment, idx) => {
							const slugified = slug(segment);

							if (idx === 0 && slugified === "1111") {
								return "1.1.1.1";
							}

							return slugified;
						})
						.join("/")
						.replace(/\/index$/, "")
						.concat("/");
				};

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
		core.setFailed(error.message);
		process.exit();
	}
}

run();

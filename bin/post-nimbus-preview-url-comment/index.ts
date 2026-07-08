import * as core from "@actions/core";
import * as github from "@actions/github";

const GITHUB_ACTIONS_BOT_ID = 41898282;
const NIMBUS_PREVIEW_URL_REGEX = /^\*\*Nimbus Preview URL:\*\* (.*)$/m;

async function run(): Promise<void> {
	try {
		if (!process.env.GITHUB_TOKEN) {
			core.setFailed(`Could not find GITHUB_TOKEN in env`);
			process.exit();
		}
		if (!process.env.BRANCH_SLUG) {
			core.setFailed(`Could not find BRANCH_SLUG in env`);
			process.exit();
		}
		if (!process.env.SHORT_SHA) {
			core.setFailed(`Could not find SHORT_SHA in env`);
			process.exit();
		}

		const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
		const ctx = github.context;
		const pull_number = ctx.payload.pull_request?.number;

		if (!pull_number) {
			core.setFailed(`Could not find pull request number`);
			process.exit();
		}

		const commitUrl = `https://${process.env.SHORT_SHA}.preview.developers.cloudflare.com`;
		const branchUrl = `https://${process.env.BRANCH_SLUG}.preview.developers.cloudflare.com`;

		core.info(
			`Nimbus Commit URL: ${commitUrl}\nNimbus Branch URL: ${branchUrl}`,
		);

		const comment = `**Nimbus Preview URL:** ${commitUrl}\n**Nimbus Preview Branch URL:** ${branchUrl}`;

		const { data: comments } = await octokit.rest.issues.listComments({
			...ctx.repo,
			issue_number: pull_number,
			per_page: 100,
		});

		const existingComment = comments.find(
			(c) =>
				c.user?.id === GITHUB_ACTIONS_BOT_ID &&
				NIMBUS_PREVIEW_URL_REGEX.test(c.body ?? ""),
		);

		if (existingComment) {
			core.info(`Updating existing Nimbus comment ${existingComment.id}`);
			await octokit.rest.issues.updateComment({
				owner: ctx.repo.owner,
				repo: ctx.repo.repo,
				comment_id: existingComment.id,
				body: comment,
			});
		} else {
			core.info(`Creating new Nimbus preview comment`);
			await octokit.rest.issues.createComment({
				owner: ctx.repo.owner,
				repo: ctx.repo.repo,
				issue_number: pull_number,
				body: comment,
			});
		}
	} catch (error) {
		core.setFailed(error instanceof Error ? error.message : String(error));
		process.exit();
	}
}

run();

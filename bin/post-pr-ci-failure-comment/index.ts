import * as core from "@actions/core";
import * as github from "@actions/github";
import type { PullRequestEvent } from "@octokit/webhooks-types";

import { GITHUB_ACTIONS_BOT_ID } from "./constants";

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
		const runId = github.context.runId;

		const { data: run } = await octokit.rest.actions.listJobsForWorkflowRun({
			owner,
			repo,
			run_id: runId,
		});

		const job = run.jobs.findLast((job) => job.name === "Compiles");

		if (!job) {
			core.setFailed(`Could not find a job called 'Compiles'`);
			process.exit();
		}

		const failedStep = job.steps?.find((step) => step.conclusion === "failure");

		if (failedStep) {
			core.info(`Found failed step ${failedStep.name}`);
		}

		const conclusion = failedStep ? "failure" : "success";

		const { data: comments } = await octokit.rest.issues.listComments({
			owner,
			repo,
			issue_number: pullRequestNumber,
			per_page: 100,
		});

		const existingComment = comments.find(
			(comment) =>
				comment.user?.id === GITHUB_ACTIONS_BOT_ID &&
				comment.body?.includes("**CI run failed:**"),
		);

		if (existingComment) {
			core.info(`Found existing comment with ID ${existingComment.id}`);
		} else {
			core.info(`No existing comment found`);
		}

		const url = `https://github.com/${owner}/${repo}/actions/runs/${runId}/job/${job.id}`;
		const comment = `**CI run failed:** [build logs](${url})`;

		if (conclusion === "failure") {
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
		} else if (conclusion === "success" && existingComment) {
			core.info(`Removing ${existingComment.id}`);
			await octokit.rest.issues.deleteComment({
				owner,
				repo,
				issue_number: pullRequestNumber,
				comment_id: existingComment.id,
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

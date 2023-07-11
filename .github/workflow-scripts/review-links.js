import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';

async function run() {
  try {
    const prNumber = github.context.payload.pull_request.number;
    const changedFiles = fs
      .readFileSync('/github/workspace/changed_files.txt', 'utf8')
      .trim()
      .split('\n')
      .filter((file) => file.endsWith('.md') && !file.includes('_partials'));

    const commentBody = `Files changed in this PR:\n\n${changedFiles
      .map((file) => `* ${file}`)
      .join('\n')}`;

    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

    const { data: comments } = await octokit.rest.issues.listComments({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: prNumber,
      per_page: 100,
    });

    const existingComment = comments.find(
      (comment) => comment.user.id === 73139402
    );

    if (existingComment) {
      await octokit.rest.issues.updateComment({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        comment_id: existingComment.id,
        body: commentBody,
      });
    } else {
      await octokit.rest.issues.createComment({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: prNumber,
        body: commentBody,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

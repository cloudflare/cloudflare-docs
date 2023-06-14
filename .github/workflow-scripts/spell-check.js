import * as core from '@actions/core';
import * as github from '@actions/github';
import { execSync } from 'child_process';

async function run() {
  try {
    const ctx = github.context;
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);
    const prNumber = ctx.payload.pull_request.number;
    const owner = ctx.repo.owner;
    const repo = ctx.repo.repo;

    // List changed files
    const filesResponse = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber,
    });
    const files = filesResponse.data.map(file => file.filename);

    // Filter files by desired directory (e.g., 'content')
    const filteredFiles = files.filter(file => file.startsWith('content/'));

    if (filteredFiles.length > 0) {
      // Run codespell
      const codespellCommand = `codespell --check-filenames --ignore-words-list .codespellignore --quiet ${filteredFiles.join(' ')}`;
      const codespellOutput = execSync(codespellCommand).toString();

      if (codespellOutput.trim().length > 0) {
        // Add comment to PR
        const octokitWithToken = octokit.getOctokit(token);
        const commentBody = `
        Hi @${ctx.payload.pull_request.user.login},

        I've noticed some spelling issues in your code. Please review and make the necessary corrections.

        Here are the spelling errors detected by codespell:
        ${codespellOutput}

        Thank you!
        `;

        await octokitWithToken.issues.createComment({
          owner,
          repo,
          issue_number: prNumber,
          body: commentBody
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

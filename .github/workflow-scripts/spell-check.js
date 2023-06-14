import * as core from '@actions/core';
import * as github from '@actions/github';
import { execSync } from 'child_process';

async function run() {
  try {
    const ctx = github.context;
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);
    const pr = ctx.payload.pull_request;
    const owner = ctx.repo.owner;
    const repo = ctx.repo.repo;

    // List changed files
    const filesResponse = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: pr.number,
      per_page: 100
    });
    const files = filesResponse.data.map(file => file.filename);

    // Filter files by desired directory (e.g., 'content')
    const filteredFiles = files.filter(file => file.startsWith('content/'));

    if (filteredFiles.length > 0) {
      // Run codespell
      const codespellCommand = `codespell --check-filenames --quiet ${filteredFiles.join(' ')}`;
      const codespellOutput = execSync(codespellCommand).toString();

      if (codespellOutput.trim().length > 0) {
        // Add comment to PR
        const commentBody = `

        Here are the spelling errors detected by codespell:
        ${codespellOutput}

        Thank you!
        `;

        await octokit.issues.createComment({
          owner,
          repo,
          issue_number: pr.number,
          body: commentBody
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

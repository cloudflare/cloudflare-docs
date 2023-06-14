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

    const warnings = [];

    for (const file of filteredFiles) {
      // Run codespell on each file
      const codespellCommand = `codespell ${file}`;
      console.log(codespellOutput)
      const codespellOutput = execSync(codespellCommand).toString();

      if (codespellOutput.trim().length > 0) {
        const fileWarnings = codespellOutput.trim().split('\n');
        warnings.push({
          file,
          fileWarnings,
        });
      }
    }

    if (warnings.length > 0) {
      // Add comment to PR
      const octokitWithToken = octokit.getOctokit(token);
      let commentBody = 'Here are the spelling warnings:\n\n';

      for (const { file, fileWarnings } of warnings) {
        commentBody += `File: ${file}\n\n`;

        for (const fileWarning of fileWarnings) {
          commentBody += `- ${fileWarning}\n`;
        }

        commentBody += '\n';
      }

      commentBody += 'Thank you!\n';

      await octokitWithToken.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body: commentBody,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

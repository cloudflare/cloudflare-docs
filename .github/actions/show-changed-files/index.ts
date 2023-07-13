import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const ctx = github.context;
    const token = core.getInput('GITHUB_TOKEN', { required: true });
    const octokit = github.getOctokit(token);
    const issue = ctx.payload.issue;
    const issueNumber = issue.number;

    const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
      ...ctx.repo,
      pull_number: issueNumber,
      per_page: 100,
    });

    const { data: comments } = await octokit.rest.issues.listComments({
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
      issue_number: issueNumber,
      per_page: 100,
    });

    const existingComment = comments.find(
      (comment) =>
        comment.user.id === 41898282 &&
        comment.body.includes('| Original Link | Updated Link |')
    );

    const pagesComment = comments.find(
      (comment) =>
        comment.user.id === 73139402 &&
        comment.body.includes('Deploy successful!')
    );

    let previewBaseURL = 'https://www.example.com';

    if (pagesComment) {
      const regex = /(https:\/\/.*?\.cloudflare-docs-7ou\.pages\.dev)/gm;
      const urlMatches = pagesComment.body.match(regex);
      previewBaseURL = urlMatches[3];
    }

    const changedFiles = files
      .filter(
        (file) =>
          file.filename.endsWith('.md') &&
          !file.filename.includes('_partials') &&
          file.filename.startsWith('content/')
      )
      .map((file) => ({
        file,
        changes: file.changes,
      }))
      .sort((a, b) => b.changes - a.changes)
      .slice(0, 15) // Limit to 15 entries
      .map((file) => {
        const removeContentAndMd = (link: string): string =>
          link.replace(/^content/, '').replace(/_index\.md$/, '').replace(/\.md$/, '/');

        const originalLink = `https://developers.cloudflare.com${removeContentAndMd(
          file.file.filename
        )}`;
        const updatedLink = previewBaseURL.concat(
          removeContentAndMd(file.file.filename)
        );

        return { originalLink, updatedLink };
      });

    const commentBody = `**Files with changes (up to 15)**\n\n| Original Link | Updated Link |\n| --- | --- |\n${changedFiles
      .map(
        (file) =>
          `| [${file.originalLink}](${file.originalLink}) | [${file.updatedLink}](${file.updatedLink}) |`
      )
      .join('\n')}`;

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
        issue_number: issueNumber,
        body: commentBody,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

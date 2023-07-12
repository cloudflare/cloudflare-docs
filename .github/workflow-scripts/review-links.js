import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
    const prNumber = github.context.payload.pull_request.number;

    const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
      ...github.context.repo,
      pull_number: prNumber,
      per_page: 100,
    });

    console.log(files)

    const { data: comments } = await octokit.rest.issues.listComments({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: prNumber,
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
    
    let previewBaseURL = "https://www.example.com"

    if (pagesComment) {
        const regex = /(https:\/\/.*?\.cloudflare-docs-7ou\.pages\.dev)/gm;
        const urlMatches = pagesComment.body.match(regex)
        previewBaseURL = urlMatches[3]
    }

    const changedFiles = files
      .filter(
        (file) =>
          file.filename.endsWith('.md') &&
          !file.filename.includes('_partials')
      )
      .map((file) => {
        const removeContentAndMd = (link) =>
          link.replace(/^content/, '').replace(/\.md$/, '/');

        const originalLink = `https://developers.cloudflare.com${removeContentAndMd(
          file.filename
        )}`;
        const updatedLink = previewBaseURL.concat(removeContentAndMd(file.filename));

        return { originalLink, updatedLink };
      });

    const commentBody = `| Original Link | Updated Link |\n| --- | --- |\n${changedFiles
      .map(
        (file) =>
          `| [${file.originalLink}](${file.originalLink}) | [${file.updatedLink}](${file.updatedLink}) |`
      )
      .join('\n')}`;

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

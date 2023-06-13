import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const ctx = github.context;
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);
    const pr = ctx.payload.pull_request;
    const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
      ...ctx.repo,
      pull_number: pr.number,
      per_page: 100
    });

    const changes = files.reduce((total, file) => total + file.changes, 0);

    let label;

    switch (true) {
      case changes <= parseInt(process.env.xs_max_size, 10):
        label = process.env.xs_label;
        break;
      case changes <= parseInt(process.env.s_max_size, 10):
        label = process.env.s_label;
        break;
      case changes <= parseInt(process.env.m_max_size, 10):
        label = process.env.m_label;
        break;
      case changes <= parseInt(process.env.l_max_size, 10):
        label = process.env.l_label;
        break;
      default:
        label = process.env.xl_label;
        break;
    }

    const currentLabels = pr.labels.map((label) => label.name);
    const sizeLabels = [
      process.env.xs_label,
      process.env.s_label,
      process.env.m_label,
      process.env.l_label,
      process.env.xl_label
    ];

    // Remove previous size-related labels that are different from the current label
    const labelsToRemove = currentLabels.filter((currentLabel) =>
      sizeLabels.includes(currentLabel) && currentLabel !== label
    );

    for (const labelToRemove of labelsToRemove) {
      await octokit.rest.issues.removeLabel({
        ...ctx.repo,
        issue_number: pr.number,
        name: labelToRemove
      });
    }

    // Add the current label
    if (!currentLabels.includes(label)) {
      await octokit.rest.issues.addLabels({
        ...ctx.repo,
        issue_number: pr.number,
        labels: [label]
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

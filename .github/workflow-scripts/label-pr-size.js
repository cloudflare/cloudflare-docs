import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const ctx = github.context;
    const octokit = github.getOctokit(core.getInput('github-token'));
    const pr = ctx.payload.pull_request;
    const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
      ...ctx.repo,
      pull_number: pr.number,
      per_page: 100
    });

    const xsLabel = core.getInput('xs_label');
    const xsMaxSize = parseInt(core.getInput('xs_max_size'), 10);
    const sLabel = core.getInput('s_label');
    const sMaxSize = parseInt(core.getInput('s_max_size'), 10);
    const mLabel = core.getInput('m_label');
    const mMaxSize = parseInt(core.getInput('m_max_size'), 10);
    const lLabel = core.getInput('l_label');
    const lMaxSize = parseInt(core.getInput('l_max_size'), 10);
    const xlLabel = core.getInput('xl_label');

    const changes = files.reduce((total, file) => total + file.changes, 0);

    let label;

    if (changes <= xsMaxSize) {
      label = xsLabel;
    } else if (changes <= sMaxSize) {
      label = sLabel;
    } else if (changes <= mMaxSize) {
      label = mLabel;
    } else if (changes <= lMaxSize) {
      label = lLabel;
    } else {
      label = xlLabel;
    }

    const currentLabels = pr.labels.map((label) => label.name);

    if (currentLabels.includes(label)) {
      await octokit.rest.issues.removeLabel({
        ...ctx.repo,
        issue_number: pr.number,
        name: label
      });
    }

    await octokit.rest.issues.addLabels({
      ...ctx.repo,
      issue_number: pr.number,
      labels: [label]
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

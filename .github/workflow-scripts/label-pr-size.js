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
      case changes <= parseInt(core.getInput('xs_max_size'), 10):
        label = core.getInput('xs_label');
        break;
      case changes <= parseInt(core.getInput('s_max_size'), 10):
        label = core.getInput('s_label');
        break;
      case changes <= parseInt(core.getInput('m_max_size'), 10):
        label = core.getInput('m_label');
        break;
      case changes <= parseInt(core.getInput('l_max_size'), 10):
        label = core.getInput('l_label');
        break;
      default:
        label = core.getInput('xl_label');
        break;
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

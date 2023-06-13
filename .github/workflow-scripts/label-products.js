import * as github from '@actions/github';

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);
    const prNumber = github.context.payload.pull_request.number;
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;

    // Get the changed sub-folders within the top-level /content folder
    const changedFolders = await getChangedSubFolders(octokit, owner, repo);

    // Remove existing changed folder labels
    await removeExistingLabels(octokit, owner, repo, prNumber);

    // Apply labels based on changed sub-folders
    await applyFolderLabels(octokit, owner, repo, prNumber, changedFolders);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

async function getChangedSubFolders(octokit, owner, repo, prNumber) {
    const response = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber
    });
  
    const files = response.data.files;
    const changedFolders = new Set();
  
    for (const file of files) {
      const path = file.filename;
      const topLevelFolder = getTopLevelFolder(path);
  
      // Check if the file is within the top-level /content folder
      if (topLevelFolder === 'content') {
        const subFolder = getSubFolder(path);
        changedFolders.add(subFolder);
      }
    }
  
    return Array.from(changedFolders);
  }  

function getTopLevelFolder(path) {
  const parts = path.split('/');
  if (parts.length >= 2) {
    return parts[1];
  }
  return null;
}

function getSubFolder(path) {
  const parts = path.split('/');
  if (parts.length >= 3) {
    return parts[2];
  }
  return null;
}

async function removeExistingLabels(octokit, owner, repo, prNumber) {
  const { data: labels } = await octokit.issues.listLabelsOnIssue({
    owner,
    repo,
    issue_number: prNumber
  });

  const changedFolderLabels = labels.filter(label => label.name.startsWith('product:'));

  for (const label of changedFolderLabels) {
    await octokit.issues.removeLabel({
      owner,
      repo,
      issue_number: prNumber,
      name: label.name
    });
  }
}

async function applyFolderLabels(octokit, owner, repo, prNumber, folders) {
  const labelPrefix = 'product:';

  for (const folder of folders) {
    const label = labelPrefix + folder;

    // Check if the label already exists
    const { data: existingLabel } = await octokit.issues.getLabel({
      owner,
      repo,
      name: label
    });

    if (!existingLabel) {
      // Create the label if it doesn't exist
      await octokit.issues.createLabel({
        owner,
        repo,
        name: label,
        color: '0366d6',
        description: `Changes to the ${folder} sub-folder in the /content folder`
      });
    }

    // Add the label to the pull request
    await octokit.issues.addLabels({
      owner,
      repo,
      issue_number: prNumber,
      labels: [label]
    });
  }
}

run();

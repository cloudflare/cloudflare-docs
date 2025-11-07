// NOTE: This is the source file!
// ~> Run `npm run build` to produce `index.js`

import * as github from "@actions/github";
import * as core from "@actions/core";

function getTopLevelFolder(path: string): string {
	const parts = path.split("/");
	return parts[2];
}

function getSubFolder(path: string): string {
	const parts = path.split("/");
	return parts[3];
}

function getChangedSubFolders(files: any[]): string[] {
	const changedFolders = new Set<string>();

	for (const file of files) {
		const path = file.filename;
		const topLevelFolder = getTopLevelFolder(path);

		// Check if the file is within the top-level /content folder
		if (topLevelFolder === "docs") {
			const subFolder = getSubFolder(path);
			changedFolders.add(subFolder);
		}
	}

	return Array.from(changedFolders);
}

async function run(): Promise<void> {
	try {
		const ctx = github.context;
		const token = core.getInput("GITHUB_TOKEN", { required: true });
		const octokit = github.getOctokit(token);
		const pr = ctx.payload.pull_request;
		const prNumber = pr.number;
		const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
			...ctx.repo,
			pull_number: pr.number,
			per_page: 100,
		});

		// Get the changed sub-folders within the top-level /content folder
		const changedFolders = getChangedSubFolders(files);

		// ...

		// Label the PR based on the changed sub-folders
		await labelPRSubFolders(octokit, ctx.repo, prNumber, changedFolders);

		// ...
	} catch (error) {
		console.error("An error occurred:", error);
		process.exit(1);
	}
}

async function labelPRSubFolders(
	octokit: any,
	repo: any,
	prNumber: number,
	changedFolders: string[],
): Promise<void> {
	const labelPrefix = "product:";
	const labelsToRemove: string[] = [];
	const labelsToAdd: string[] = [];

	for (const label of github.context.payload.pull_request.labels) {
		if (label.name.startsWith(labelPrefix)) {
			labelsToRemove.push(label.name);
		}
	}

	for (const folder of changedFolders) {
		const label = labelPrefix + folder;
		labelsToAdd.push(label);
	}

	const currentLabels = new Set(
		github.context.payload.pull_request.labels.map((label: any) => label.name),
	);

	for (const labelToRemove of labelsToRemove) {
		if (!labelsToAdd.includes(labelToRemove)) {
			await octokit.rest.issues.removeLabel({
				...repo,
				issue_number: prNumber,
				name: labelToRemove,
			});
		}
	}

	let newLabels: string[] = [];
	for (const labelToAdd of labelsToAdd) {
		if (!currentLabels.has(labelToAdd)) {
			newLabels.push(labelToAdd);
		}
	}

	if (newLabels.length > 0) {
		await octokit.rest.issues.addLabels({
			...repo,
			issue_number: prNumber,
			labels: newLabels,
		});
	}
}

run();

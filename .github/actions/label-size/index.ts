import * as core from "@actions/core";
import * as github from "@actions/github";

async function run(): Promise<void> {
	try {
		const ctx = github.context;
		const token = core.getInput("GITHUB_TOKEN", { required: true });
		const octokit = github.getOctokit(token);
		const pr = ctx.payload.pull_request;
		const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
			...ctx.repo,
			pull_number: pr.number,
			per_page: 100,
		});

		const changes = files.reduce((total, file) => total + file.changes, 0);

		let label: string | undefined;

		switch (true) {
			case changes <= 10:
				label = "size/xs";
				break;
			case changes <= 100:
				label = "size/s";
				break;
			case changes <= 500:
				label = "size/m";
				break;
			case changes <= 1000:
				label = "size/l";
				break;
			default:
				label = "size/xl";
				break;
		}

		const currentLabels = pr.labels.map((label) => label.name);
		const sizeLabels = ["size/xs", "size/s", "size/m", "size/l", "size/xl"];

		// Remove previous size-related labels that are different from the current label
		const labelsToRemove = currentLabels.filter(
			(currentLabel) =>
				sizeLabels.includes(currentLabel) && currentLabel !== label,
		);

		for (const labelToRemove of labelsToRemove) {
			await octokit.rest.issues.removeLabel({
				...ctx.repo,
				issue_number: pr.number,
				name: labelToRemove,
			});
		}

		// Add the current label
		if (!currentLabels.includes(label)) {
			await octokit.rest.issues.addLabels({
				...ctx.repo,
				issue_number: pr.number,
				labels: [label],
			});
		}
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();

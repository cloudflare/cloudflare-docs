// NOTE: This is the source file!
// ~> Run `pnpm run build` to produce `index.js`

import * as core from "@actions/core";
import * as github from "@actions/github";
import * as codeOwnersUtils from "codeowners-utils";
import { classifyProductPath } from "../../../bin/cloudflare-one-labels";
import {
	extractDeveloperDocsPaths,
	removeStaleProductLabels,
	shouldSkipEditedEvent,
} from "./helpers";

// This pulls assignment logic from our codeowners file

(async function () {
	try {
		const token = core.getInput("GITHUB_TOKEN", { required: true });

		const payload = github.context.payload;

		const { action, repository, issue } = payload;
		if (!issue) throw new Error('Missing "issue" object!');
		if (!repository) throw new Error('Missing "repository" object!');
		if (action !== "opened" && action !== "edited") {
			throw new Error('Must be an "issues.opened" or "issues.edited" event!');
		}
		if (shouldSkipEditedEvent(action, payload.changes)) {
			return console.log("ignore issue edit without body change");
		}

		const labels: string[] = (issue.labels || []).map((x) => x.name);
		if (labels.includes("engineering")) {
			return console.log('ignore "engineering" issues');
		}

		// continue for other assignments
		let cwd = process.cwd();
		let codeowners = await codeOwnersUtils.loadOwners(cwd);
		const assignees = new Set<string>();
		const content = issue.body ?? "";
		if (!issue.number) throw new Error('Missing "issue.number" value!');

		const links = extractDeveloperDocsPaths(content);

		console.log("Links are:");
		console.log(links);

		for (const item of links) {
			const updatedLink = "src/content/docs".concat(item);
			console.log("Updated link is:");
			console.log(updatedLink);
			const match = codeOwnersUtils.matchFile(updatedLink, codeowners);
			for (const owner of match.owners) {
				if (!owner.includes("/")) {
					assignees.add(owner.replace(/^@/, ""));
				}
			}
		}
		console.log("Assignees are:");
		console.log(assignees);
		const client = github.getOctokit(token);

		if (assignees.size > 0) {
			await client.rest.issues.addAssignees({
				owner: repository.owner.login,
				issue_number: issue.number,
				repo: repository.name,
				assignees: [...assignees],
			});
		}

		console.log("Assignees added (if present)");

		const newLabels = new Set<string>();

		for (const link of links) {
			const label = classifyProductPath(link);
			if (label) newLabels.add(label);
		}

		console.log(newLabels);

		const currentLabels = await client.paginate(
			client.rest.issues.listLabelsOnIssue,
			{
				owner: repository.owner.login,
				issue_number: issue.number,
				repo: repository.name,
				per_page: 100,
			},
		);
		const currentProductLabels = new Set(
			currentLabels
				.map((label) => label.name)
				.filter((label): label is string =>
					Boolean(label?.startsWith("product:")),
				),
		);

		const labelsToAdd = [...newLabels].filter(
			(label) => !currentProductLabels.has(label),
		);
		if (labelsToAdd.length > 0) {
			await client.rest.issues.addLabels({
				owner: repository.owner.login,
				issue_number: issue.number,
				repo: repository.name,
				labels: labelsToAdd,
			});
		}

		await removeStaleProductLabels(currentProductLabels, newLabels, (label) =>
			client.rest.issues.removeLabel({
				owner: repository.owner.login,
				issue_number: issue.number,
				repo: repository.name,
				name: label,
			}),
		);

		console.log("Labels added");

		console.log("DONE~!");
	} catch (error) {
		core.setFailed(error.message);
	}
})();

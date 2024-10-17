// NOTE: This is the source file!
// ~> Run `npm run build` to produce `index.js`

import * as core from "@actions/core";
import * as github from "@actions/github";
import * as codeOwnersUtils from "codeowners-utils";

// This pulls assignment logic from our codeowners file

(async function () {
	try {
		const token = core.getInput("GITHUB_TOKEN", { required: true });

		const payload = github.context.payload;

		const { action, repository, issue } = payload;
		if (!issue) throw new Error('Missing "issue" object!');
		if (!repository) throw new Error('Missing "repository" object!');
		if (action !== "opened") throw new Error('Must be "issues.opened" event!');

		// stop here if "engineering" issue
		const labels: string[] = (issue.labels || []).map((x) => x.name);
		if (labels.includes("engineering"))
			return console.log('ignore "engineering" issues');

		// continue for other assignments
		let cwd = process.cwd();
		let codeowners = await codeOwnersUtils.loadOwners(cwd);
		const assignees = new Set<string>();
		const content = issue.body;
		if (!content) throw new Error('Missing "issue.body" content!');
		if (!issue.number) throw new Error('Missing "issue.number" value!');

		const regex = /https?:\/\/developers\.cloudflare\.com([^\s|)]*)/gm;
		let links = [];
		let m;

		while ((m = regex.exec(content)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}

			// The result can be accessed through the `m`-variable.
			m.forEach((match, groupIndex) => {
				if (groupIndex === 1) {
					links.push(match);
				}
			});
		}

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

		if (assignees.size === 0) {
			// assign folks which will manually reassign
			["haleycode", "pedrosousa", "dcpena", "patriciasantaana"].forEach(
				(username) => assignees.add(username),
			);
		}

		const client = github.getOctokit(token);

		await client.rest.issues.addAssignees({
			owner: repository.owner.login,
			issue_number: issue.number,
			repo: repository.name,
			assignees: [...assignees],
		});

		console.log("Assignees added (if present)");

		// Add labels for future reporting

		const labelPrefix = "product:";
		const newLabels = new Set<string>();

		for (const link of links) {
			const parts = link.split("/");
			if (parts[1] !== undefined) {
				newLabels.add(labelPrefix.concat(parts[1]));
			}
		}

		console.log(newLabels);

		if (newLabels.size > 0) {
			await client.rest.issues.addLabels({
				owner: repository.owner.login,
				issue_number: issue.number,
				repo: repository.name,
				labels: [...newLabels],
			});
		}

		console.log("Labels added");

		console.log("DONE~!");
	} catch (error) {
		core.setFailed(error.message);
	}
})();

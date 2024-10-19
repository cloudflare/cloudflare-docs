// NOTE: This is the source file!
// ~> Run `npm run build` to produce `index.js`

import * as core from "@actions/core";
import * as github from "@actions/github";
import * as codeOwnersUtils from "codeowners-utils";

type Octokit = ReturnType<typeof github.getOctokit>;

type Options = {
	repo: string;
	owner: string;
	pull_number: number;
	per_page?: number;
	page?: number;
};

// @see https://octokit.github.io/rest.js/v18#pulls-list-files
async function list(
	client: Octokit,
	options: Options,
	products?: Set<string>,
): Promise<Set<string>> {
	products = products || new Set();
	options.page = options.page || 1;

	let limit = (options.per_page = options.per_page || 100);
	let res = await client.rest.pulls.listFiles(options);

	// retrieve the filenames
	let i = 0,
		len = res.data.length;
	for (let file, tmp: string | void; i < len; i++) {
		file = res.data[i];
		products.add(file.filename);
	}

	// if less than limit, stop
	if (len < limit) return products;

	options.page++; //~> next page
	return list(client, options, products);
}

(async function () {
	try {
		let cwd = process.cwd();
		let codeowners = await codeOwnersUtils.loadOwners(cwd);
		const token = core.getInput("GITHUB_TOKEN", { required: true });

		const payload = github.context.payload;

		const { repository, pull_request } = payload;
		if (!pull_request) throw new Error('Missing "pull_request" object!');

		// establish variables
		const assignees = new Set<string>();
		const prnumber = pull_request.number;
		const author = pull_request.user.login;
		const client = github.getOctokit(token);

		// Determine assignees based on files in PR diff.

		// https://octokit.github.io/rest.js/v18#pulls-list-files

		const files = await list(client, {
			repo: repository.name,
			owner: repository.owner.login,
			pull_number: prnumber,
		});

		for (const file of files) {
			const match = codeOwnersUtils.matchFile(file, codeowners);
			if (match.owners) {
				for (const owner of match.owners) {
					if (!owner.includes("/")) {
						assignees.add(owner.replace(/^@/, ""));
					}
				}
			}

			if (assignees.size === 0) {
				// assign folks which will manually reassign
				["haleycode", "pedrosousa", "dcpena", "patriciasantaana"].forEach(
					(username) => assignees.add(username),
				);
			}

			// don't self-assign
			assignees.delete(author);

			try {
				await client.rest.issues.addAssignees({
					repo: repository.name,
					owner: repository.owner.login,
					issue_number: prnumber,
					assignees: [...assignees],
				});
			} catch (error) {
				core.setFailed(error.message);
			}
			console.log("DONE~!");
		}
	} catch (error) {
		core.setFailed(error.message);
	}
})();

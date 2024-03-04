// NOTE: This is the source file!
// ~> Run `npm run build` to produce `index.js`

import * as core from "@actions/core";
import * as github from "@actions/github";
import * as codeOwnersUtils from 'codeowners-utils';
import { OWNERS, REVIEWERS } from "../owners";
// import fs from "fs";

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
  products?: Set<string>
): Promise<Set<string>> {
  products = products || new Set();
  options.page = options.page || 1;

  let limit = (options.per_page = options.per_page || 100);
  let res = await client.rest.pulls.listFiles(options);

  // retrieve the product name
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

// https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#webhook-payload-object-34
// const ACTIONS = new Set(['ready_for_review', 'reopened', 'opened']);

(async function () {
  try {
    let cwd = process.cwd();
    let codeowners = await codeOwnersUtils.loadOwners(cwd);
    const token = core.getInput("GITHUB_TOKEN", { required: true });

    const payload = github.context.payload;

    const { repository, pull_request } = payload;
    if (!pull_request) throw new Error('Missing "pull_request" object!');

    // @see https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request_target
    // TODO: may also want to do "edited" event & recompute -> apply differences
    // if (!ACTIONS.has(payload.action)) throw new Error('Invalid "pull_request" action event!');

    // the pcx team member usernames
    const PCX = new Set<string>();

    for (let p in OWNERS) {
      OWNERS[p].forEach((x) => PCX.add(x));
    }

    const reviewers = new Set<string>();
    const prnumber = pull_request.number;
    const author = pull_request.user.login;

    const client = github.getOctokit(token);

    // Determine reviewers based on files in PR diff.

    // https://octokit.github.io/rest.js/v18#pulls-list-files
    
    const files = await list(client, {
      repo: repository.name,
      owner: repository.owner.login,
      pull_number: prnumber,
    });

    for (const file of files) {
      console.log(codeOwnersUtils.matchFile(file, codeowners))
    }

    /* if (PCX.has(author)) {
      console.log("~> request PCX team review");
      await client.rest.issues.addLabels({
        ...github.context.repo,
        issue_number: prnumber,
        labels: ["pcx_team_review"],
      });
    }
    const requested = new Set<string>();

    // will throw if already assigned
    for (const u of pull_request.requested_reviewers) {
      requested.add(u.login);
      reviewers.delete(u.login);
    }

    // cannot self-review
    reviewers.delete(author);

    console.log({ products, reviewers, requested });

    if (reviewers.size === 0) {
      if (requested.size > 0) {
        console.log("~> had reviewers at creation");
      } else if (products.size > 0) {
        console.log('~> ping "kodster28" for assignment');
        await client.rest.issues.addAssignees({
          repo: repository.name,
          owner: repository.owner.login,
          issue_number: prnumber,
          assignees: ["kodster28"],
        });
      } else {
        console.log("~> no products changed; engineering?");
      }
    } else {
      await client.rest.issues.addAssignees({
        repo: repository.name,
        owner: repository.owner.login,
        issue_number: prnumber,
        assignees: [...reviewers],
      });
    }

    console.log("DONE~!"); */
  } catch (error) {
    core.setFailed(error.message);
  }
})();

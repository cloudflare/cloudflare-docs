// NOTE: This is the source file!
// ~> Run `npm run build` to produce `index.js`

import * as core from '@actions/core';
import * as github from '@actions/github';
import { OWNERS, REVIEWERS } from '../owners';

type Octokit = ReturnType<typeof github.getOctokit>;

type Options = {
  repo: string;
  owner: string;
  pull_number: number;
  per_page?: number;
  page?: number;
};

// @see https://octokit.github.io/rest.js/v18#pulls-list-files
async function list(client: Octokit, options: Options, products?: Set<string>): Promise<Set<string>> {
  products = products || new Set;
  options.page = options.page || 1;

  let limit = (options.per_page = options.per_page || 100);
  let res = await client.rest.pulls.listFiles(options);

  // retrieve the product name
  let i=0, len=res.data.length;
  for (let file, tmp: string|void; i < len; i++) {
    file = res.data[i];

    tmp = parse(file.filename);
    if (tmp) products.add(tmp);

    if (tmp = file.previous_filename) {
      tmp = parse(tmp);
      if (tmp) products.add(tmp);
    }
  }

  // if less than limit, stop
  if (len < limit) return products;

  options.page++; //~> next page
  return list(client, options, products);
}

/**
 * Get the product slug from a file path.
 * @note code runs in posix environment ("/" not "\\")
 */
function parse(filename: string): string | void {
  return (/^data[/](.*).ya?ml$/.exec(filename) || /^content[/]([^\/]+)[/]/.exec(filename) || [])[1];
}

// https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#webhook-payload-object-34
// const ACTIONS = new Set(['ready_for_review', 'reopened', 'opened']);

(async function () {
  try {
    const token = core.getInput('GITHUB_TOKEN', { required: true });

    const payload = github.context.payload;
    console.log('event payload:', JSON.stringify(payload, null, 2));

    const { repository, pull_request } = payload;
    if (!pull_request) throw new Error('Missing "pull_request" object!');

    // @see https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request_target
    // TODO: may also want to do "edited" event & recompute -> apply differences
    // if (!ACTIONS.has(payload.action)) throw new Error('Invalid "pull_request" action event!');

    // the pcx team member usernames
    const PCX = new Set<string>();

    for (let p in OWNERS) {
      OWNERS[p].forEach(x => PCX.add(x));
    }

    const reviewers = new Set<string>();
    const prnumber = pull_request.number;
    const author = pull_request.user.login;

    const client = github.getOctokit(token);

    // Determine reviewers based on files in PR diff.

    // https://octokit.github.io/rest.js/v18#pulls-list-files
    const products = await list(client, {
      repo: repository.name,
      owner: repository.owner.login,
      pull_number: prnumber,
    });

    for (const slug of products) {
      let owners_list = OWNERS[slug];

      if (!owners_list) {
        throw new Error(`Unknown "${slug}" product!`);
      }

      if (owners_list.length > 0) {
        owners_list.forEach(x => reviewers.add(x));
      }

      let reviewers_list = REVIEWERS[slug];

      if (reviewers_list && reviewers_list.length > 0) {
        reviewers_list.forEach(x => reviewers.add(x));
      }
    }

    if (PCX.has(author)) {
      const pcx_and_reviewers = new Set([...PCX, ...reviewers]);
      pcx_and_reviewers.delete(author); // no self-review
      console.log('~> request PCX team review');
      return await client.rest.issues.addLabels({
        ...github.context.repo,
        issue_number: prnumber,
        labels: ["pcx_team_review"]
      });
    }

    // ---
    // At this point, author is external and/or not PCX member.
    // ---

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
        console.log('~> had reviewers at creation');
      } else if (products.size > 0) {
        console.log('~> ping "haleycode" for assignment');
        await client.rest.issues.addAssignees({
          repo: repository.name,
          owner: repository.owner.login,
          issue_number: prnumber,
          assignees: ['haleycode'],
        });
      } else {
        console.log('~> no products changed; engineering?');
      }
    } else {
      console.log('~> request individual reviews');
      await client.rest.pulls.requestReviewers({
        repo: repository.name,
        owner: repository.owner.login,
        pull_number: prnumber,
        reviewers: [...reviewers],
      });
      await client.rest.issues.addAssignees({
        repo: repository.name,
        owner: repository.owner.login,
        issue_number: prnumber,
        assignees: [...reviewers],
      });
    }

    console.log('DONE~!');
  } catch (error) {
    core.setFailed(error.message);
  }
})();

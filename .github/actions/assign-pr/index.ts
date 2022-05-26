// NOTE: This is the source file!
// ~> Run `npm run build` to produce `index.js`

import * as core from '@actions/core';
import * as github from '@actions/github';
import { OWNERS } from '../owners';

type Octokit = ReturnType<typeof github.getOctokit>;

type Options = {
  repo: string;
  owner: string;
  pull_number: number;
  per_page?: number;
  page?: number;
};

// @see https://octokit.github.io/rest.js/v18#pulls-list-files
async function list(client: Octokit, options: Options, products?: Set<string>) {
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

(async function () {
  try {
    const token = core.getInput('GITHUB_TOKEN', { required: true });

    const payload = github.context.payload;
    console.log('event payload:', JSON.stringify(payload, null, 2));

    const { action, repository, pull_request } = payload;
    if (!pull_request) throw new Error('Missing "pull_request" object!');

    // TODO: may also want to do "edited" event & recompute -> apply differences
    if (action !== 'opened') throw new Error('Must be "pull_request.opened" event!');

    const users = new Set<string>();
    const prnumber = pull_request.number;
    const author = pull_request.user.login;

    const client = github.getOctokit(token);

    // https://octokit.github.io/rest.js/v18#pulls-list-files
    const products = await list(client, {
      repo: repository.name,
      owner: repository.owner.login,
      pull_number: prnumber,
    });

    for (const slug of products) {
      let list = OWNERS[slug];

      if (!list) {
        throw new Error(`Unknown "${slug}" product!`);
      }

      if (list.length > 0) {
        list.forEach(x => users.add(x));
      }
    }

    const requested = new Set<string>();

    // will throw if already assigned
    for (const u of pull_request.requested_reviewers) {
      requested.add(u.login);
      users.delete(u.login);
    }

    console.log({ products, users });

    // is PR author the assigned PCX owner?
    if (users.size === 1 && users.has(author)) {
      // initiate "@cloudflare/pcx" team review
      await client.rest.pulls.requestReviewers({
        repo: repository.name,
        owner: repository.owner.login,
        pull_number: prnumber,
        team_reviewers: ['@cloudflare/PCX'],
      });
    } else {
      // cannot self-review
      users.delete(author);

      if (users.size === 0 && requested.size === 0) {
        // ping haley for assignment
        await client.rest.issues.addAssignees({
          repo: repository.name,
          owner: repository.owner.login,
          issue_number: prnumber,
          assignees: ['haleycodes'],
        });
      } else {
        // request individual reviews
        await client.rest.pulls.requestReviewers({
          repo: repository.name,
          owner: repository.owner.login,
          pull_number: prnumber,
          reviewers: [...users],
        });
      }
    }

    console.log('DONE~!');
  } catch (error) {
    core.setFailed(error.message);
  }
})();
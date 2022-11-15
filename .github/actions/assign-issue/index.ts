// NOTE: This is the source file!
// ~> Run `npm run build` to produce `index.js`

import * as core from '@actions/core';
import * as github from '@actions/github';
import { OWNERS } from '../owners';

/**
 * Map "Product Name" => "product-slug"
 * The slug must match the `content/{slug}` and `data/{slug}.yml` value.
 * The "Name" must match the names/values from the ISSUE_TEMPLATE file(s).
 */
function slugify(input: string): string {
  input = input.toLowerCase().replace(/\s+/g, '-');
  if (input === 'image-optimization') return 'images';
  if (input === 'pub/sub') return 'pub-sub';
  if (input === 'zero-trust') return 'cloudflare-one';
  return input.replace(/\//g, '');
}

(async function () {
  try {
    const token = core.getInput('GITHUB_TOKEN', { required: true });

    const payload = github.context.payload;
    console.log('event payload:', JSON.stringify(payload, null, 2));

    const { action, repository, issue } = payload;
    if (!issue) throw new Error('Missing "issue" object!');
    if (!repository) throw new Error('Missing "repository" object!');
    if (action !== 'opened') throw new Error('Must be "issues.opened" event!');

    // stop here if "engineering" issue
    const labels: string[] = (issue.labels || []).map(x => x.name);
    if (labels.includes('engineering')) return console.log('ignore "engineering" issues');

    const content = issue.body;
    if (!content) throw new Error('Missing "issue.body" content!');
    if (!issue.number) throw new Error('Missing "issue.number" value!');

    if (!content.startsWith('### Which Cloudflare product')) {
      throw new Error('Missing "Which Cloudflare product(s)" dropdown!');
    }

    const [, answer] = /\n\n([^\n]+)\n\n/.exec(content) || [];
    if (!answer) throw new Error('Error parsing "products" response');

    const users = new Set<string>();
    const products = answer.split(/,\s*/g).filter(Boolean);

    for (const p of products) {
      let slug = slugify(p);
      let list = OWNERS[slug];

      if (!list) {
        console.error({ name: p, slug });
        throw new Error('Unknown product!');
      }

      if (list.length > 0) {
        list.forEach(x => users.add(x));
      } else {
        // ping Haley for assignment
        users.add('haleycode');
      }
    }

    // will throw if already assigned
    for (const u of issue.assignees) {
      users.delete(u.login);
    }

    console.log({ products, users });

    const client = github.getOctokit(token);

    await client.rest.issues.addAssignees({
      owner: repository.owner.login,
      issue_number: issue.number,
      repo: repository.name,
      assignees: [...users],
    });

    console.log('DONE~!');
  } catch (error) {
    core.setFailed(error.message);
  }
})();
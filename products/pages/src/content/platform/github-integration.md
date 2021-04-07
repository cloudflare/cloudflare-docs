# GitHub integration

We support connecting Cloudflare Pages to your GitHub repositories to look for new changes to your project.

## Custom branches

If you have a custom Git workflow that makes use of specific branches for representing your "production" build of your project, you can specify a custom branch when creating (or managing an existing) Cloudflare Pages project.

For instance, imagine that you merge new code into the `main` branch, and when it's time to deploy your project, you merge a set of commits into the `production` branch. In the Cloudflare Pages UI, you can set the default branch to `production`.

In fact, you can also use [preview deployments](/platform/preview-deployments) to get a glimpse at how the new version of your project looks _before_ even merging to `production`. To do this, enable preview deployments, and you'll be able to access a deployed version of your `main` branch, or whatever other branches exist, whether created manually or via pull requests.

## Organizational access

When authorizing Cloudflare Pages to access your GitHub account, you can also specify access to _organizations_ that you belong to on GitHub. This means that you can deploy projects to Cloudflare Pages from your open-source team, company, or side project.

## Removing access to your GitHub account

You can remove Cloudflare Pages' access to your GitHub account by viewing the ["Applications" page](https://github.com/settings/installations) on GitHub. Note that removing access to GitHub will also disable new builds, though the last build of your site will continue to be hosted via Cloudflare Pages.

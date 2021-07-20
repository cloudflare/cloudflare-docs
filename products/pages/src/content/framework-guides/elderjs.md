---
pcx-content-type: how-to
---

# Deploy an Elder.js site

[Elder.js](https://elderguide.com/tech/elderjs/) is an SEO-focused framework for building static sites with [Svelte](/framework-guides/deploy-a-svelte-site).

In this guide, you will create a new Elder.js application and deploy it using Cloudflare Pages.

## Setting up a new project

Create a new project using [`npx degit Elderjs/template`](https://docs.npmjs.com/cli/v6/commands/npm-init), giving it a project name:

```sh
$ npx degit Elderjs/template elderjs-app
$ cd elderjs-app
```

The Elder.js template includes a number of pages and examples showing how to build your static site, but by simply generating the project, it's already ready to be deployed to Cloudflare Pages.

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). You can then push your application to GitHub:

```sh
# setup the local repository
$ git init
$ git remote add origin https://github.com/<username>/<repo>
$ git branch -M main

# commit all initial files
$ git add -A
$ git commit -m "initial commit"

# send commit to new GitHub repo
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Pages by going to the [Cloudflare dashboard](https://dash.cloudflare.com/) and clicking the "Create a project" button.

You will be asked to authorize access to your GitHub account, if you haven't already done so. Cloudflare needs this so that it can monitor and deploy your projects from source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) as you wish to attach more repositories to Cloudflare Pages.

Select the new GitHub repository that you created above and, in the configuration section, provide the following information:

<TableLayout>

| Configuration option | Value             |
| -------------------- | ---------------   |
| Production branch    | `main`            |
| Build command        | `npm run build`   |
| Build directory      | `public`          |

</TableLayout>

Optionally, you can customize the `Project Name` setting. It defaults to the repository's name, but it does not need to match. This value is assigned as your `pages.dev` subdomain.

### Finalize Setup

Once you've configured your site, click the "Save and Deploy" button!

You'll see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you'll have access to [preview deployments](/platform/preview-deployments), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project _with a real URL_ before deploying them to production.

## Learn more

Congratulations! You've deployed your Elder.js site to Cloudflare Pages!

To learn more about what you can do with the platform, [check out our How To section](/how-to).

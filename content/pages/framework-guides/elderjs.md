---
pcx-content-type: how-to
title: Deploy an Elder.js site
---

import TutorialsBeforeYouStart from "../\_partials/\_tutorials-before-you-start.md"

# Deploy an Elder.js site

[Elder.js](https://elderguide.com/tech/elderjs/) is an SEO-focused framework for building static sites with [Svelte](/pages/framework-guides/deploy-a-svelte-site/).

In this guide, you will create a new Elder.js application and deploy it using Cloudflare Pages.

## Setting up a new project

Create a new project using [`npx degit Elderjs/template`](https://docs.npmjs.com/cli/v6/commands/npm-init), giving it a project name:

```sh
$ npx degit Elderjs/template elderjs-app
$ cd elderjs-app
```

The Elder.js template includes a number of pages and examples showing how to build your static site, but by simply generating the project, it is already ready to be deployed to Cloudflare Pages.

<TutorialsBeforeYouStart/>

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After your repository is set up, push your application to GitHub by running the following commands in your terminal:

```sh
# Setup the local repository
$ git init
$ git remote add origin https://github.com/<username>/<repo>
$ git branch -M main

# Commit all initial files
$ git add -A
$ git commit -m "initial commit"

# Send commit to new GitHub repo
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value             |
| -------------------- | ---------------   |
| Production branch    | `main`            |
| Build command        | `npm run build`   |
| Build directory      | `public`          |

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

### Finalize Setup

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

## Learn more

By completing this guide, you have successfully deployed your Elder.js site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

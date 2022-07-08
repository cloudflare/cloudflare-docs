---
pcx-content-type: how-to
title: Deploy a Svelte site
---

# Deploy a Svelte site

[Svelte](https://svelte.dev) is an increasingly popular, open-source framework for building user interfaces and web applications. Unlike most frameworks, Svelte is primarily a compiler that converts your component code into efficient JavaScript that surgically updates the DOM when your application state changes.

In this guide, you will create a new Svelte application and deploy it using Cloudflare Pages.
You will use [`SvelteKit`](https://kit.svelte.dev/), the official Svelte framework for building web applications of all sizes.

{{<Aside type="warning">}}

**Note:** At this guide's time of publication, SvelteKit is still in beta. However, the Svelte team is confident that the steps below are stable. This guide will be updated as needed, both during and after the beta phase.

{{</Aside>}}

## Setting up a new project

Create a new project by running the [`npm init`](https://docs.npmjs.com/cli/v6/commands/npm-init) command in your terminal, giving it a title:

```sh
$ npm init svelte@next my-svelte-app
$ cd my-svelte-app
```

During `init`, SvelteKit will prompt you for customization choices. Your answers will not affect the rest of this tutorial. Choose the option that is ideal for your project.

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

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

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option  | Value              |
| --------------------- | ------------------ |
| Production branch     | `main`             |
| Build command         | `npm run build`    |
| Build directory       | `build`            |
| Environment Variables | `NODE_VERSION: 14` |

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

{{<Aside type="warning">}}

**Important:** SvelteKit requires Node.js v14.x or later to build successfully. You must expand the **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `14` or greater.

{{</Aside>}}

### SvelteKit Configuration

By default, SvelteKit projects are configured to use [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto) which automatically chooses the adapter for your current environment. In this case, Cloudflare Pages. To deploy your Sveltekit application on Pages, First update the **Build directory** to `.svelte-kit/cloudflare` this lets the [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto) know you are deploying to a Cloudflare Pages environment.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option  | Value                   |
| --------------------- | ----------------------- |
| Production branch     | `main`                  |
| Build command         | `npm run build`         |
| Build directory       | `.svelte-kit/cloudflare`|
| Environment Variables | `NODE_VERSION: 16 or 14`|

</div>

{{<Aside type= "Note">}}

Although you can use [`@sveltejs/adapter-cloudflare`](https://www.npmjs.com/package/@sveltejs/adapter-cloudflare) to deploy Sveltekit apps to Pages, you may not need to since [`@sveltejs/adapter-auto`](https://www.npmjs.com/package/@sveltejs/adapter-auto) detects the environment automatically.

{{</Aside>}}

### Finalize Setup

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

## Learn more

By completing this guide, you have successfully deployed your Svelte site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

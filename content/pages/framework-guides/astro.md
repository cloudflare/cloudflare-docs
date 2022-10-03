---
pcx_content_type: how-to
title: Deploy an Astro site
---

# Deploy an Astro site

[Astro](https://astro.build) is an all-in-one web framework for building fast, content-focused websites. By default, Astro builds websites that have zero JavaScript runtime code.

Refer to the [Astro Docs](https://docs.astro.build/) to learn more about Astro or for assistance with an Astro project.  

In this guide, you will create a new Astro application and deploy it using Cloudflare Pages.

## Setting up a new project

Create a new project directory and then initiate Astro's official setup tool by running:

```sh
$ npm create astro@latest
# cd into created project
$ cd <project-name>
```

Astro will ask you which project type you would like to set up. Your answers will not affect the rest of this tutorial. Select an answer ideal for your project.

{{<Aside type="note">}}
Refer to Astro's available templates at [astro.new](https://astro.new).
{{</Aside>}}


{{<render file="_tutorials-before-you-start.md">}}

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

## Using Pages Functions

[Pages Functions](/pages/platform/functions/) enable you to run server-side code to add dynamic functionality without running a dedicated server.

To get started, create a `functions` directory at the root of your project. Writing your Functions files in this directory automatically generates a Worker with custom functionality at the predesignated routes. To learn more, refer to [Pages Functions](/pages/platform/functions/).

### Astro Configuration

You can deploy an Astro Server-side Rendered (SSR) site to Cloudflare Pages using the [`@astrojs/cloudflare` adapter](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare#readme). SSR sites render on Pages Functions and allow for dynamic functionality and customizations.

To enable an SSR site and deploy to Cloudflare Pages, add the [`@astrojs/cloudflare` adapter](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare#readme) to your project's `package.json` by running:

```sh
$ npm run astro add cloudflare
```

### Modes

There are currently two modes supported when using Pages Functions with the [`@astrojs/cloudflare`](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare#readme) adapter. 

1. **Advanced** mode: This mode is used when you want to run your Function in `advanced` mode. This mode picks up the `_worker.js` in `dist`, or a directory mode where Pages will compile the Worker out of a Functions folder in the project root.  

{{<Aside type="note">}}

If no mode is set, the default is `"advanced"`

{{</Aside>}}

2. **Directory** mode: This mode is used when you want to run your Function in `directory` mode. In this mode, the adapter will compile the client-side part of your application the same way, but it will move the Worker into a `functions` folder in the project root. The adapter will allow you to access your Pages Functions from your `functions` folder, allowing you to add [Pages Plugins](/pages/platform/functions/plugins/) and [Middleware](/pages/platform/functions/#adding-middleware) which can be checked into version control.

To use Directory mode, modify your `astro.config.mjs` file to add `mode: "directory"` to the adapter configuration:

```js
--- 
filename: astro.config.mjs
highlight: [2]
---
export default defineConfig({
  output: 'server',
  adapter: cloudflare({ mode: "directory" }),
});
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
| Build directory       | `dist`             |
| Environment Variables | `NODE_VERSION: 14` |

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

{{<Aside type="warning" header="Important">}}

Cloudflare requires [node v16.13](https://miniflare.dev/get-started/cli#installation), which is a more recent version than Astro’s out-of-the-box minimum. Go to your **Pages** project > **Settings** > **Environment Variables (advanced)** and add a `NODE_VERSION` variable with a value of `16.13` or greater. Check the version of node you are using locally (by running `node -v`) matches the version you are specifying in the environment variable.

{{</Aside>}}

After completing configuration, select **Save and Deploy**.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

## Learn more

By completing this guide, you have successfully deployed your Astro site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

---
pcx_content_type: how-to
title: Deploy an Astro site
---

# Deploy an Astro site

[Astro](https://astro.build) Astro is an **all-in-one web framework** for building fast, **content-focused websites**. By default, Astro builds websites that have zero JavaScript runtime code.

Visit the [Astro Docs](https://docs.astro.build/) to learn more about Astro or for any assistance with an Astro project.  

In this guide, you will create a new Astro application and deploy it using Cloudflare Pages.

## Setting up a new project

Get a new Astro project up and running locally with the helpful `create-astro` CLI wizard!

```sh
$ npm create astro@latest
```

Astro will ask you which project type you would like to set up. Your answers will not affect the rest of this tutorial. Select an answer ideal for your project.

> **Note**
> You can explore Astro's available templates at [astro.new](https://astro.new)


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

Astro requires Node.js `v14.18.0` or higher to build successfully. You must expand the **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `14` or greater.

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

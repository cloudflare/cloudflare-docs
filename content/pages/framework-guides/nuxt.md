---
pcx-content-type: how-to
title: Deploy a Nuxt.js site
---

# Deploy a Nuxt.js site

[Nuxt.js](https://nuxtjs.org/) is a framework making web development simple and powerful.

In this guide, you will create a new Nuxt.js application and deploy it using Cloudflare Pages.

## Setting up a new project

Create a new project using `npx`, giving it the title `my-nuxt-app` in your terminal.

```sh
$ npx create-nuxt-app my-nuxt-app
```

You will be prompted to fill in various fields, such as `Project name`, `UI option`, `Linting tools`, and `Testing framework`, in your terminal. When asked which deployment target to use, you will be given two options: **Server** and **Static**. Select **Static** as your option for hosting.

Next, navigate to the project and run it using the command:

```sh
$ cd my-nuxt-app
$ npm run dev
```

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

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `dist`          |

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
  
{{<Aside type="warning" header="Auto Minify and Nuxt.js">}}

If you are going to use a custom domain that is proxied through Cloudflare, you may run into issues with the Auto Minify feature. If enabled for HTML, it will strip comments which Nuxt.js and some other frameworks may rely on.

Refer to [Using Cloudflare Auto Minify](https://support.cloudflare.com/hc/en-us/articles/200168196-Using-Cloudflare-Auto-Minify) for how to configure this feature.

{{</Aside>}}

## Learn more

By completing this guide, you have successfully deployed your Nuxt.js site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

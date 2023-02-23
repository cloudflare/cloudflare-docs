---
pcx_content_type: how-to
title: Deploy a Nuxt.js site
---

# Deploy a Nuxt site

[Nuxt](https://nuxt.com) is a web framework making web Vue.js-based development simple and powerful.

In this guide, you will create a new Nuxt application and deploy it using Cloudflare Pages.

## Create a new project

Create a new project by running the following commands in your terminal:

```sh
$ npx nuxi init my-nuxt-app
$ cd my-nuxt-app
$ npm install
```

Next, run the application using the command:

```sh
$ npm run dev
```

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After your repository is set up, push your application to GitHub by running the following commands in your terminal:

```sh
$ git init
$ git remote add origin https://github.com/<username>/<repo>
$ git add .
$ git commit -m "Initial commit"
$ git branch -M main
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
| Build directory       | `.output/public`   |
| Environment Variables | `NODE_VERSION: 17` |

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

## Use bindings in your Nuxt application

It is not currently possible to access bindings from a Nuxt application (refer to this [Nuxt GitHub issue](https://github.com/nuxt/nuxt/issues/18599)).

When bindings are accessible from a Nuxt application, we will update this guide accordingly.

## Learn more

By completing this guide, you have successfully deployed your Nuxt.js site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

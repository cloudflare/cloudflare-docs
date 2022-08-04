---
pcx_content_type: how-to
title: Deploying your site
---

# Deploying your site

Cloudflare supports deploying any static HTML website to Cloudflare Pages. If you manage your website without using a framework or static site generator, or if your framework is not listed in [Framework guides](/pages/framework-guides/), you can still deploy it using this guide.

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After your repository is set up, push your application to GitHub by running the following commands in your terminal:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option     | Value                 |
| ------------------------ | --------------------- |
| Production branch        | `main`                |
| Build command (optional) | `<YOUR_BUILD_COMMAND>`|
| Build output directory   | `<YOUR_BUILD_DIR>`    |

</div>

Unlike many of the framework guides, the build command and build directory for your site are going to be completely custom. If you do not need a build step, leave the **Build command** field empty and specify a **Build output directory**. The build output directory is where your application's content lives.

After configuring your site, you can begin your first deploy. Your custom build command (if provided) will run, and Pages will deploy your static site.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After you have deployed your site, you will receive a unique subdomain for your project on `*.pages.dev`. Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your site on Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

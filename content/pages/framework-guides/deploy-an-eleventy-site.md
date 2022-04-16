---
pcx-content-type: how-to
title: Deploy an Eleventy site
---

# Deploy an Eleventy site

[Eleventy](https://www.11ty.dev/) is a simple static site generator. In this guide, you will create a new Eleventy site and deploy it using Cloudflare Pages. You will be using the `eleventy` CLI to create a new Eleventy site.

## Installing Eleventy

Install the `eleventy` CLI by running the following command in your terminal:

```sh
$ npm install -g @11ty/eleventy
```

## Creating a new project

There are a lot of [starter projects](https://www.11ty.dev/docs/starter/) available on the Eleventy website. As an example, use the `eleventy-base-blog` project by running the following commands in your terminal:

```sh
$ git clone https://github.com/11ty/eleventy-base-blog.git my-blog-name
$ cd my-blog-name
$ npm install
```

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following command in your terminal:

```sh
$ git remote set-url origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and choose "Eleventy" from the Framework preset dropdown.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Eleventy site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Eleventy site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

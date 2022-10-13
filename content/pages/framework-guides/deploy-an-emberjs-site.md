---
pcx_content_type: how-to
title: Deploy an Ember site
---

# Deploy an Ember site

[Ember.js](https://emberjs.com) is a productive, battle-tested JavaScript framework for building modern web applications. It includes everything you need to build rich UIs that work on any device.

## Install Ember

To begin, install Ember:

```sh
$ npm install -g ember-cli
```

## Create an Ember project

Use the `ember new` command to create a new application:

```sh
$ ember new ember-quickstart --lang en
```

{{<render file="_tutorials-before-you-start.md">}}

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). When creating your repository, do not select to add a README file, `.gitignore` template or a license as these selections will cause the push to GitHub to fail.

In your terminal, `cd` into your new Ember project directory and run:

```sh
$ git remote add origin <YOUR_NEW_GITHUB_REPOSITORY_URL>
$ git push -u origin main
```

You have successfully created a GitHub repository and pushed your Ember project to that repository.

## Deploy with Cloudflare Pages

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**. 
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select *Ember* as your **Framework preset**. Your selection will provide the following information:

{{<table-wrap>}}

| Configuration option | Value                       |
| -------------------- | --------------------------- |
| Production branch    | `main`                      |
| Build command        | `ember build`               |
| Build directory      | `dist`                      |

{{</table-wrap>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Every time you commit new code to your Ember site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests and be able to preview how changes to your site look before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

## Related resources

By completing this guide, you have successfully deployed your Ember site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

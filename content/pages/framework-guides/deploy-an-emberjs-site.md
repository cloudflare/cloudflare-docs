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
$ npx ember new ember-quickstart --lang en
```

After the application is generated, change the directory to your project and run your project by running the following commands:

```sh
$ cd ember-quickstart
$ npm start
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Ember_ as your **Framework preset**. Your selection will provide the following information:

{{<pages-build-preset framework="ember-js">}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Every time you commit new code to your Ember site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests and be able to preview how changes to your site look before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{<render file="_learn-more.md" withParameters="Ember">}}
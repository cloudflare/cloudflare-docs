---
pcx_content_type: how-to
title: Deploy a Brunch site
---

# Deploy a Brunch site

[Brunch](https://brunch.io/) is a fast front-end web application build tool with simple declarative configuration and seamless incremental compilation for rapid development.

## Install Brunch

To begin, install Brunch:

```sh
$ npm install -g brunch
```

## Create a Brunch project

Brunch maintains a library of community-provided [skeletons](https://brunch.io/skeletons) to offer you a boilerplate for your project. Run Brunch's recommended `es6` skeleton with the `brunch new` command:

```sh
$ brunch new proj -s es6
```

{{<render file="_tutorials-before-you-start.md">}}

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new).

In your terminal, `cd` into your new Brunch project directory and run:

```sh
$ git init
$ git add -A
$ git commit -m "<YOUR_COMMIT_MESSAGE>"
$ git remote add origin <YOUR_NEW_GITHUB_REPOSITORY_URL>
$ git push -u origin main
```

You have successfully created a GitHub repository and pushed your Brunch project to that repository.

## Deploy with Cloudflare Pages

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select _Brunch_ as your **Framework preset**. Your selection will provide the following information.

{{<table-wrap>}}

| Configuration option | Value                       |
| -------------------- | --------------------------- |
| Production branch    | `main`                      |
| Build command        | `brunch build --production` |
| Build directory      | `public`                    |

{{</table-wrap>}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Every time you commit new code to your Brunch site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests and be able to preview how changes look to your site before deploying them to production.

## Related resources

By completing this guide, you have successfully deployed your Brunch site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).

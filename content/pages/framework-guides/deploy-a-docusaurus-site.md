---
pcx_content_type: how-to
title: Deploy a Docusaurus site
---

# Deploy a Docusaurus site

[Docusaurus](https://docusaurus.io) is a static-site generator. It builds a single-page application with fast client-side navigation, leveraging the full power of React to make your site interactive. It provides out-of-the-box documentation features but can be used to create any kind of site (personal website, product, blog, marketing landing pages, etc).

## Install Docusaurus

To begin, with [Node.js](https://nodejs.org/en/download/) installed, create a new Docusaurus site by running:

```sh
$ npx create-docusaurus@latest my-website classic
```

{{<render file="_tutorials-before-you-start.md">}}

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). When creating your repository, do not select to add a README file, .gitignore template or a license as these selections will cause the push to GitHub to fail.

In your terminal, `cd` into your new Docusaurus project directory and run:

```sh
# Setup the local repository
$ git init
$ git remote add origin <YOUR_NEW_GITHUB_REPOSITORY_URL>
$ git branch -M main

# Commit all initial files
$ git add -A
$ git commit -m "<COMMIT_MESSAGE>"

# Send commit to new GitHub repository
$ git push -u origin main
```

You have successfully created a GitHub repository and pushed your Docusaurus project to that repository.

## Deploy with Cloudflare Pages

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**. 
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select *Docusaurus* as your **Framework preset**. Your selection will provide the following information.

{{<table-wrap>}}

| Configuration option | Value                       |
| -------------------- | --------------------------- |
| Production branch    | `main`                      |
| Build command        | `npm run build`             |
| Build directory      | `build`                    |

{{</table-wrap>}}

4. Go to **Environment variables (advanced)** and create a variable name `NODE_VERSION` with a value of `16`.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Every time you commit new code to your Docusaurus site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests and be able to preview how changes look to your site before deploying them to production.

## Related resources

By completing this guide, you have successfully deployed your Docusaurus site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
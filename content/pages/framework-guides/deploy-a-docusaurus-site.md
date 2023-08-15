---
pcx_content_type: how-to
title: Deploy a Docusaurus site
---

# Deploy a Docusaurus site

[Docusaurus](https://docusaurus.io) is a static site generator. It builds a single-page application with fast client-side navigation, leveraging the full power of React to make your site interactive. It provides out-of-the-box documentation features but can be used to create any kind of site such as a personal website, a product site, a blog, or marketing landing pages.

## Setting up a new project

The quickest way to get started is to use the create-cloudflare CLI (c3) tool. This will create a new project directory, initiate Docusaurus' official setup tool, and provide the option to deploy instantly.

To use create-cloudflare to create a new Docusaurus project, run the following command:

```sh
$ npm create cloudflare@latest my-docusaurus-app -- --framework=docusaurus
```

Create-cloudflare will install additional dependencies including the Wrangler CLI and any necessary adapters, and ask a few more setup questions.

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploy with Cloudflare Pages

{{<render file="_deploy-via-c3.md" withParameters="Docusaurus">}}

### Deploy via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select *Docusaurus* as your **Framework preset**. Your selection will provide the following information.

{{<pages-build-preset framework="docusaurus">}}

4. Go to **Environment variables (advanced)** > **Add variable** > create a `NODE_VERSION` variable with a value of `16`.

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Every time you commit new code to your Docusaurus site and push those changes to GitHub, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests and be able to preview how changes look to your site before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{<render file="_learn-more.md" withParameters="Docusaurus">}}
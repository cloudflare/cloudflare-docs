---
pcx_content_type: how-to
title: VitePress
---

# VitePress

[VitePress](https://vitepress.dev/) is a [static site generator](https://en.wikipedia.org/wiki/Static_site_generator) (SSG) designed for building fast, content-centric websites. VitePress takes your source content written in [Markdown](https://en.wikipedia.org/wiki/Markdown), applies a theme to it, and generates static HTML pages that can be easily deployed anywhere.

In this guide, you will create a new VitePress project and deploy it using Cloudflare Pages.

## Set up a new project

VitePress ships with a command line setup wizard that will help you scaffold a basic project.

Run the following command in your terminal to create a new VitePress project:

{{<tabs labels="npm | pnpm | yarn | bun">}}
{{<tab label="npm" default="true">}}

```sh
$ npx vitepress@latest init
```
{{</tab>}}
{{<tab label="pnpm">}}

```sh
$ pnpm dlx vitepress@latest init
```
{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn dlx vitepress@latest init
```
{{</tab>}}
{{<tab label="bun">}}

```sh
$ bunx vitepress@latest init
```
{{</tab>}}
{{</tabs>}}

Amongst other questions, the setup wizard will ask you in which directory to save your new project, make sure
to be in the project's directory and then install the `vitepress` dependency with the following command:

{{<tabs labels="npm | pnpm | yarn | bun">}}
{{<tab label="npm" default="true">}}

```sh
$ npm add -D vitepress
```
{{</tab>}}
{{<tab label="pnpm">}}

```sh
$ pnpm add -D vitepress
```
{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn add -D vitepress
```
{{</tab>}}
{{<tab label="bun">}}

```sh
$ bun add -D vitepress
```
{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

If you encounter errors, make sure your local machine meets the [Prerequisites for VitePress](https://vitepress.dev/guide/getting-started#prerequisites).

{{</Aside>}}

Finally create a `.gitignore` file with the following content:
```
---
filename: .gitignore
---
node_modules
.vitepress
```

This step makes sure that unnecessary files are not going to be included in the project's git repository (which we will set up next).

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository.md">}}

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, the following information will be provided:

{{<pages-build-preset framework="vitepress">}}

After configuring your site, you can begin your first deploy. Cloudflare Pages will install `vitepress`, your project dependencies, and build your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit and push new code to your VitePress project, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes to your site look before deploying them to production.

{{<render file="/_framework-guides/_learn-more.md" withParameters="VitePress">}}
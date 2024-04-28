---
pcx_content_type: how-to
title: Deploy a VitePress site
---

# Deploy a VitePress site
From [VitePress](https://vitepress.dev/):

> VitePress is a [Static Site Generator](https://en.wikipedia.org/wiki/Static_site_generator) (SSG) designed for building fast, content-centric websites. In a nutshell, VitePress takes your source content written in [Markdown](https://en.wikipedia.org/wiki/Markdown), applies a theme to it, and generates static HTML pages that can be easily deployed anywhere.

In this guide, you will create a new VitePress project and deploy it using Cloudflare Pages. 

## Set up a new project

Initialize your git repository.

Scaffold your VitePress site by first adding VitePress locally and then using the bootstrapping tool.

```sh
npm add -D vitepress

npx vitepress init
```

The command will interactively prompt for details to configure your VuePress site’s metadata: 

```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./
│
◇  Site title:
│  My Awesome VitePress site
│
◇  Site description:
│  All the cool kids are doing it
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run npm run docs:dev and start writing.

Tips:

- Make sure to add .vitepress/dist and .vitepress/cache to your .gitignore file.
```

Push a commit to your repository with the changes.

## Deploy your site

1. From the account home page, go to _Workers & Pages_
1. Click _Create Application_. 
1. On the following page, click the _Pages_ tab
1. Click _Connect to Git._ 
1. Connect your repository vendor and then select a repository. 
1. Click _Begin Setup_.
1. Fill in the _Project name_ which you will use later when setting up DNS.
1. Select the _Production branch_ of your repository. It can be any branch you wish. When you publish to this branch, your production site will be updated.
1. Under _Build settings_ select _None_ for a _Framework preset_. Alternatively, select VuePress and make edits since the setup is practically identical.
1. Enter `npx vitepress build` for _Build command_.
1. Enter `/.vitepress/dist` for the _Build output directory_.
1. Click _Save and deploy_.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).
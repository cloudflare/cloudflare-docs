---
pcx_content_type: how-to
title: Deploy a Vite 3 project
---

# Deploying a Vite 3 project

[Vite](https://vitejs.dev) is a next-generation build tool for frontend developers. With [the recent release of Vite 3](https://vitejs.dev/blog/announcing-vite3.html), developers can make use of new CLI improvements, starter templates, and [more](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#300-2022-07-13) to help build their frontend applications.

Cloudflare Pages has native support for Vite 3 projects in our build environment. And with the recent improvements to our [build process](https://blog.cloudflare.com/cloudflare-pages-build-improvements/), including sub-second build initialization, it's a great time to start using Vite 3 and Cloudflare Pages to optimize your application's build tooling.

If you want to start a new project, and deploy it to Cloudflare Pages, Vite 3's new templating system makes it a breeze to select and create a new project with the defaults you need to hit the ground running. Vite plays great with Cloudflare Pages – in this blog post, I’ll show you how to deploy a Vue application, powered by Vite, in just a few minutes.

```sh
$ npm create vite@latest
✔ Project name: … vite-on-pages
✔ Select a framework: › vue
✔ Select a variant: › vue

Scaffolding project in ~/src/vite-on-pages...

Done. Now run:

  cd vite-on-pages
  npm install
  npm run dev
```

Get started deploying a Vite 3-powered Vue application to Cloudflare Pages with a single command:

```sh
$ git clone https://github.com/codewithkristian/vite-vue3-on-pages
```

With a generated project, deploying to Cloudflare Pages just takes a few minutes. You can create a new GitHub repository, and push your code, using [GitHub's `gh` CLI](https://cli.github.com):

```sh
$ git init
Initialized empty Git repository in ~/vite-vue3-on-pages/.git/
$ git add .
$ git commit -m "Initial commit"                                           vite-vue3-on-pages/git/main +
[main (root-commit) dad4177] Initial commit
 14 files changed, 1452 insertions(+)
$ gh repo create
✓ Created repository codewithkristian/vite-vue3-on-pages on GitHub
✓ Added remote git@github.com:codewithkristian/vite-vue3-on-pages.git
$ git push
```

Visit the Cloudflare Pages dashboard, and select the option to create a new project [based on a GitHub repository](https://dash.cloudflare.com/?to=/:account/pages/new/provider/github).

Select your new GitHub project (mine's called `vite-on-pages`), and in the project configuration, set `npm run dev` as the "Build command", and `dist` as the "Build output directory".

Finally, using the "Environment variables" section, configure `NODE_VERSION` to any version of Node greater than v14.18 -- in our example, we'll use `16`:

![Build settings](/pages/framework-guides/media/vite3-guide-build-settings.png)

![Environment variables](/pages/framework-guides/media/vite3-guide-environment-variables.png)

In just a few seconds, your project will be deployed to Pages. Check out an example of it at [vite-on-pages.pages.dev](https://vite-on-pages.pages.dev)!

![Vite3 Site Preview](/pages/framework-guides/media/vite3-site-preview.png)

Vite is seeing an incredible rise in popularity as it becomes the JavaScript build tool of choice for projects like Nuxt 3, SvelteKit, and Astro. With first-class support for Vite 3 in Cloudflare Pages, and with tools like [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/), building modern, dynamic applications using Cloudflare's global compute platform can be done in just a few lines of code.

It’s easy to get started with Cloudflare Pages – sign up at [pages.cloudflare.com](https://pages.cloudflare.com), connect a GitHub or GitLab account, and deploy your first project in just minutes. If you want to explore more of what you can do with Cloudflare Pages, including deploying various frontend frameworks or building full-stack applications with Pages Functions, check out [our docs](/pages)!



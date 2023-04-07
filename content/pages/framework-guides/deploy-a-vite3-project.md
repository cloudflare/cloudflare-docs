---
pcx_content_type: how-to
title: Deploy a Vite 3 site
---

# Deploy a Vite 3 site

[Vite](https://vitejs.dev) is a next-generation build tool for front-end developers. With [the release of Vite 3](https://vitejs.dev/blog/announcing-vite3.html), developers can make use of new command line (CLI) improvements, starter templates, and [more](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#300-2022-07-13) to help build their front-end applications.

Cloudflare Pages has native support for Vite 3 projects. Refer to the blog post on [improvements to the Pages build process](https://blog.cloudflare.com/cloudflare-pages-build-improvements/), including sub-second build initialization, for more information on using Vite 3 and Cloudflare Pages to optimize your application's build tooling.

In this guide, you will learn how to start a new project using Vite 3, and deploy it to Cloudflare Pages.

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

You will now create a new GitHub repository, and push your code using [GitHub's `gh` command line (CLI)](https://cli.github.com):

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

To deploy your project with Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Pages** > **Create a project** > **Connect to git**.
3. Select your new GitHub repository.
4. In the **Set up builds and deployments**, set `npm run build` as the **Build command**, and `dist` as the **Build output directory**.
5. Select **Environment variables (advanced)** > **+ Add variable** > configure a `NODE_VERSION` variable with a value of any version of Node greater than `14.18` -- this example uses `16`:

After completing configuration, select **Save and Deploy**.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified. After you have deployed your project, it will be available at the `<YOUR_PROJECT_NAME>.pages.dev` subdomain. Find your project's subdomain in **Pages** > select your project > **Deployments**.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<render file="_learn-more.md" withParameters="Vite 3">}}

---
pcx-content-type: how-to
---

# Deploy an Astro site

[Astro](https://astro.build) is a new static-site generator that allows you to build faster, SEO-friendly websites that use less client-side JavaScript code. By default, Astro builds websites that have _zero_ JavaScript runtime code.

In this guide, you'll create a new Astro application and deploy it using Cloudflare Pages.

<Aside type="warning">

**Note:** At the time of writing, Astro is in early beta. Please check out its [GitHub repository](https://github.com/snowpackjs/astro) to stay current with the project's status.

</Aside>

## Setting up a new project

Create a new project directory (eg, `astro-site`) and then use [`npm init`](https://docs.npmjs.com/cli/v6/commands/npm-init) inside that directory to run the official Astro setup tool:

```sh
$ mkdir astro-site && cd astro-site
$ npm init astro
```

During `init`, Astro will ask you which project type you'd like to set up. Your answers _will not_ affect the rest of this tutorial, so please feel free to select what's ideal for your project.

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). You can then push your application to GitHub:

```sh
# setup the local repository
$ git init
$ git remote add origin https://github.com/<username>/<repo>
$ git branch -M main

# commit all initial files
$ git add -A
$ git commit -m "initial commit"

# send commit to new GitHub repo
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Pages by going to the [Cloudflare dashboard](https://dash.cloudflare.com/) and clicking the "Create a project" button.

You will be asked to authorize access to your GitHub account, if you haven't already done so. Cloudflare needs this so that it can monitor and deploy your projects from source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) as you wish to attach more repositories to Cloudflare Pages.

Select the new GitHub repository that you created above and, in the configuration section, provide the following information:

<TableLayout>

| Configuration option  | Value              |
| --------------------- | ------------------ |
| Production branch     | `main`             |
| Build command         | `npm run build`    |
| Build directory       | `dist`             |
| Environment Variables | `NODE_VERSION: 14` |

</TableLayout>

Optionally, you can customize the `Project Name` setting. It defaults to the repository's name, but it does not need to match. This value is assigned as your `pages.dev` subdomain.

<Aside type="warning">

**Important:** Astro requires Node.js v14.x or later to build successfully! You must expand the "Environment Variables (advanced)" section and add a `NODE_VERSION` variable with a value of `14` or greater.

</Aside>

Once you've configured your site, click the "Save and Deploy" button!

You'll see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you'll have access to [preview deployments](/platform/preview-deployments), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project _with a real URL_ before deploying them to production.


## Learn more

Congratulations! You've deployed your Astro site to Cloudflare Pages!

To learn more about what you can do with the platform, [check out our How To section](/how-to).

---
pcx-content-type: how-to
---

import TutorialsBeforeYouStart from "../_partials/_tutorials-before-you-start.md" 

# Deploy an Astro site

[Astro](https://astro.build) is a new static-site generator that allows you to build faster, SEO-friendly websites that use less client-side JavaScript code. By default, Astro builds websites that have zero JavaScript runtime code.

In this guide, you will create a new Astro application and deploy it using Cloudflare Pages.

<Aside type="warning">

**Note:** At the time of publication, Astro is in early beta. Refer to the Astro [GitHub repository](https://github.com/snowpackjs/astro) to stay current with the project's status.

</Aside>

## Setting up a new project

Create a new project directory (e.g., `astro-site`) and then initiate Astro's official setup tool by running [`yarn init`](https://classic.yarnpkg.com/en/docs/cli/init) in your terminal inside that new `astro-site` directory:

```sh
$ mkdir astro-site && cd astro-site
$ yarn init astro
```

During `init`, Astro will ask you which project type you would like to set up. Your answers will not affect the rest of this tutorial. Select an answer ideal for your project.

<TutorialsBeforeYouStart/>

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After your repository is set up, push your application to GitHub by running the following commands in your terminal:

```sh
# Setup the local repository
$ git init
$ git remote add origin https://github.com/<username>/<repo>
$ git branch -M main

# Commit all initial files
$ git add -A
$ git commit -m "initial commit"

# Send commit to new GitHub repo
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<TableLayout>

| Configuration option  | Value              |
| --------------------- | ------------------ |
| Production branch     | `main`             |
| Build command         | `yarn build`    |
| Build directory       | `dist`             |
| Environment Variables | `NODE_VERSION: 14` |

</TableLayout>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

<Aside type="warning">

**Important:** Astro requires Node.js v14.x or later to build successfully. You must expand the **Environment Variables (advanced)** section and add a `NODE_VERSION` variable with a value of `14` or greater.

</Aside>

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/platform/preview-deployments), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

<Aside type="note">

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/get-started).

</Aside>


## Learn more

By completing this guide, you have successfully deployed your Astro site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/framework-guides).

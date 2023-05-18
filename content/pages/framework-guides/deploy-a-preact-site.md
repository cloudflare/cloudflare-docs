---
pcx_content_type: how-to
title: Deploy a Preact site
---

# Deploy a Preact site

[Preact](https://preactjs.com) is a popular, open-source framework for building modern web applications. Preact can also be used as a lightweight alternative to React because the two share the same API and component model.

In this guide, you will create a new Preact application and deploy it using Cloudflare Pages.
You will use [`wmr`](https://github.com/preactjs/wmr), an all-in-one development tool built by the Preact team, to quickly generate an optimized web application.

## Setting up a new project

Create a new project by running the [`npm init`](https://docs.npmjs.com/cli/v6/commands/npm-init) command in your terminal, giving it a title:

```sh
$ npm init wmr your-project-name
$ cd your-project-name
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `dist`          |

</div>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, select **Save and Deploy**.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

{{<Aside type="note">}}

**Note:** You will notice that within the `package.json` file, the `"build"` script uses the `--prerender` flag. With this, `wmr` produces static HTML pages – along with their assets – which is perfect for Pages.

{{</Aside>}}

After you have deployed your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

{{<render file="_learn-more.md" withParameters="Preact">}}

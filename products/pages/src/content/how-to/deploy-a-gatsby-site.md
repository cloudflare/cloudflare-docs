# Deploy a Gatsby site

Gatsby is an open-source React framework for creating websites and apps. In this guide, you'll create a new Gatsby application and deploy it using Cloudflare Pages. We'll be using the `gatsby` CLI to create a new Gatsby site.

## Installing Gatsby

First, install the `gatsby` CLI:

```sh
$ npm install -g gatsby-cli
```

## Creating a new project

With Gatsby installed, you can create a new project using `gatsby new`. The `new` command accepts a GitHub URL for using an existing template. For now, we'll use the `gatsby-starter-lumen` template, but you can find more in [Gatsby's Starters section](https://www.gatsbyjs.com/starters/?v=2):

```sh
$ gatsby new my-gatsby-site https://github.com/alxshelepenok/gatsby-starter-lumen
```

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). Once you've created a new repository, you can push your local application to GitHub:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Cloudflare Pages by going to the dashboard, and creating a new site. Select your new GitHub repository that you created above, and in the configuration section, provide the following information:

<TableLayout>

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `gatsby build` |
| Build directory      | `public`       |

</TableLayout>

Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `gatsby`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. Every time you commit new code to your Gatsby site, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your Gatsby site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).

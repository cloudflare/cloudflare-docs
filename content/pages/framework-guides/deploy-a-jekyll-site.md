---
pcx_content_type: how-to
title: Deploy a Jekyll site
---

# Deploy a Jekyll site

[Jekyll](https://jekyllrb.com/) is an open-source framework for creating websites, based around Markdown with Liquid templates. In this guide, you will create a new Jekyll application and deploy it using Cloudflare Pages. You use the `jekyll` CLI to create a new Jekyll site.

{{<Aside type="note">}}

If you have an existing Jekyll site on GitHub Pages, refer to [the Jekyll migration guide](/pages/migrations/migrating-jekyll-from-github-pages/).

{{</Aside>}}

## Installing Jekyll

Jekyll is written in Ruby, meaning that you will need a functioning Ruby installation, like `rbenv`, to install Jekyll.

To install Ruby on your computer, follow the [`rbenv` installation instructions](https://github.com/rbenv/rbenv#installation) and select a recent version of Ruby by running the `rbenv` command in your terminal:

```sh
$ rbenv install 2.7.2
```

With Ruby installed, you can install the `jekyll` Ruby gem:

```sh
$ gem install jekyll
```

## Creating a new project

With Jekyll installed, you can create a new project running the `jekyll new` in your terminal:

```sh
$ jekyll new my-jekyll-site
```

Create a base `index.html` in your newly created folder to give your site content:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello from Cloudflare Pages</title>
  </head>
  <body>
    <h1>Hello from Cloudflare Pages</h1>
  </body>
</html>
```

Optionally, you may use a theme with your new Jekyll site if you would like to start with great styling defaults. For example, the [`minimal-mistakes`](https://github.com/mmistakes/minimal-mistakes) theme has a ["Starting from `jekyll new`"](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#starting-from-jekyll-new) section to help you add the theme to your new site.

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

If you are migrating an existing Jekyll project to Pages, confirm that your `Gemfile` is committed as part of your codebase. Pages will look at your Gemfile and run `bundle install` to install the required dependencies for your project, including the `jekyll` gem.

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="jekyll">}}

After configuring your site, you can begin your first deployment. You should see Cloudflare Pages installing `jekyll`, your project dependencies, and building your site before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to [the Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Jekyll site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

{{<render file="_learn-more.md" withParameters="Jekyll">}}
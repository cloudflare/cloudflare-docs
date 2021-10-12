---
pcx-content-type: how-to
---

import TutorialsBeforeYouStart from "../_partials/_tutorials-before-you-start.md" 

# Deploy a Jekyll site

Jekyll is an open-source framework for creating websites, based around Markdown with Liquid templates. In this guide, you will create a new Jekyll application and deploy it using Cloudflare Pages. You use the `jekyll` CLI to create a new Jekyll site.

<Aside type="note">

If you have an existing Jekyll site on GitHub Pages, refer to [the Jekyll migration guide](/migrations/migrating-jekyll-from-github-pages).

</Aside>

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

<TutorialsBeforeYouStart/>

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

If you are migrating an existing Jekyll project to Pages, confirm that your `Gemfile` is committed as part of your codebase. Pages will look at your Gemfile and run `bundle install` to install the required dependencies for your project, including the `jekyll` gem.

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<TableLayout>

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `jekyll build` |
| Build directory      | `_site`        |

</TableLayout>

After configuring your site, you can begin your first deployment. You should see Cloudflare Pages installing `jekyll`, your project dependencies, and building your site before deploying it.

<Aside type="note">

For the complete guide to deploying your first site to Cloudflare Pages, refer to [the Get started guide](/get-started).

</Aside>

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. 
Every time you commit new code to your Jekyll site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Jekyll site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/framework-guides).

# Deploy a Jekyll site

Jekyll is an open-source React framework for creating websites and apps. In this guide, you'll create a new Jekyll application and deploy it using Cloudflare Pages. We'll be the `jekyll` CLI to create a new Jekyll site.

## Installing Jekyll

Jekyll is written in Ruby, meaning that you'll need a functioning Ruby installation in order to install Jekyll.

We recommend using [`rbenv`](https://github.com/rbenv/rbenv) to install Ruby on your computer. Follow the [`rbenv` install instructions](https://github.com/rbenv/rbenv#installation), and install a recent version of Ruby using `rbenv`:

```sh
$ rbenv install 2.7.2
```

With Ruby installed, you can install the `jekyll` Ruby gem:

```sh
$ gem install jekyll
```

## Creating a new project

With Jekyll installed, you can create a new project using `jekyll new`:

```sh
$ jekyll new my-jekyll-site
```

You should create a base `index.html` in your newly created folder so that your site has content:

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

Optionally, you can also use include a theme with your new Jekyll site if you'd like to start with great styling defaults. For instance, the [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) theme has a ["Starting from `jekyll new`"](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#starting-from-jekyll-new) section to help you add the theme to your new site.

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). Once you've created a new repository, you can push your local application to GitHub:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

If you're migrating an existing Jekyll project to Pages, you should confirm that your `Gemfile` is committed as part of your codebase. Pages will look at your Gemfile and run `bundle install` to install the required dependencies for your project, including the `jekyll` gem.

## Deploying with Cloudflare Pages

You can deploy your site to Cloudflare Pages by going to the dashboard, and creating a new site. Select your new GitHub repository that you created above, and in the configuration section, provide the following information:

<TableLayout>

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `jekyll build` |
| Build directory      | `_site`        |

</TableLayout>

Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `jekyll`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. Every time you commit new code to your Jekyll site, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your Jekyll site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).

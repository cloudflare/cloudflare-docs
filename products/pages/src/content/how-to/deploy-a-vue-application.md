# Deploy a Vue application

Vue is a progressive JavaScript framework for building user interfaces. A core principle of Vue is "incremental adoption": this makes it easy to build Vue applications that live side-by-side with your existing code.

In this guide, you'll create a new Vue application and deploy it using Cloudflare Pages. We'll be using `vue-cli`, a batteries-included tool for generating new Vue applications.

## Setting up a new project

First, install the Vue CLI using NPM, and then run `vue create` to create a new project called `my-vue-app`:

```sh
$ npm install -g @vue/cli
$ vue create my-vue-app
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

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `dist`          |

</TableLayout>

Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `vue`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. Every time you commit new code to your Vue application, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your Vue site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).

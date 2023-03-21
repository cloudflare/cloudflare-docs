---
pcx_content_type: how-to
title: Deploy a Hexo site
---

# Deploy a Hexo site

[Hexo](https://hexo.io/) is a tool for generating static websites, powered by Node.js. Hexo's benefits include speed, simplicity, and flexibility, allowing it to render Markdown files into static web pages via Node.js.

In this guide, you will create a new Hexo application and deploy it using Cloudflare Pages. You will use the `hexo` CLI to create a new Hexo site.

## Installing Hexo

First, install the Hexo CLI with `npm` or `yarn` by running either of the following commands in your terminal:

```sh
$ npm install hexo-cli -g
# or
$ yarn global add hexo-cli
```

On macOS and Linux, you can install with [brew](https://brew.sh/):

```sh
$ brew install hexo
```

{{<render file="_tutorials-before-you-start.md">}}

## Creating a new project

With Hexo CLI installed, create a new project by running the `hexo init` command in your terminal:

```sh
$ hexo init my-hexo-site
$ cd my-hexo-site
$ npm install
```

Hexo sites use themes to customize the appearance of statically built HTML sites. Hexo has a default theme automatically installed, which you can find on [Hexo's Themes page](https://hexo.io/themes/).

## Creating a post

Create a new post to give your Hexo site some initial content. Run the `hexo new` command in your terminal to generate a new post:

```sh
$ hexo new "hello hexo"
```

Inside of `hello-hexo.md`, use Markdown to write the content of the article. You can customize the tags, categories or other variables in the article. Refer to the [Front Matter section](https://hexo.io/docs/front-matter) of the [Hexo documentation](https://hexo.io/docs/) for more information.

{{<render file="_create-github-repository.md">}}

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `hexo generate` |
| Build directory      | `public`        |

</div>

After completing configuration, click the **Save and Deploy** button. You should see Cloudflare Pages installing `hexo` and your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Hexo site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Using a specific Node.js version

Some Hexo themes or plugins have additional requirements for different Node.js versions. To use a specific Node.js version for Hexo:

1. Go to **your Pages project**.
2. Go to **Settings** > **Environment variables**.
3. Set the environment variable `NODE_VERSION` and a value of your required Node.js version (for example, `14.3`).

![Follow the instructions above to set up an environment variable in the Pages dashboard](/pages/framework-guides/media/node-version-pages.png)

{{<render file="_learn-more.md" withParameters="Hexo">}}

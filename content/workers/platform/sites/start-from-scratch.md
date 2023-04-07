---
pcx_content_type: how-to
title: Start from scratch
weight: 2
---

# Start a Workers Sites project from scratch

{{<Aside type="note" header="Cloudflare Pages">}}
Consider using [Cloudflare Pages](/pages/) for hosting static applications instead of Workers Sites.
{{</Aside>}}

This guide shows how to quickly start a new Workers Sites project from scratch.

## Getting started

1.  Ensure you have the latest version of [git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download/) installed.

2.  In your terminal, clone the `worker-sites-template` starter repository.
    The following example creates a project called `my-site`:

    ```sh
    $ git clone --depth=1 --branch=wrangler2 https://github.com/cloudflare/worker-sites-template my-site
    ```
2.  Run `npm install` to install all dependencies.
3.  You can preview your site by running the [`wrangler dev`](/workers/wrangler/commands/#dev) command:

    ```sh
    $ wrangler dev
    ```
4.  Publish your site to Cloudflare:

    ```sh
    $ wrangler publish
    ```

## Project layout

The template project contains the following files and directories:

- `public`: The static assets for your project. By default it contains an `index.html` and a `favicon.ico`.
- `src`: The Worker configured for serving your assets. You do not need to edit this but if you want to see how it works or add more functionality to your Worker, you can edit `src/index.ts`.
- `wrangler.toml`: The file containing project configuration.
  The `bucket` property tells Wrangler where to find the static assets (e.g. `site = { bucket = "./public" }`).
- `package.json`/`package-lock.json`: define the required Node.js dependencies.

## Customize `wrangler.toml`:

- Change the `name` property to the name of your project:

  ```toml
  name = "my-site"
  ```

- Consider updating`compatibility_date` to today's date to get access to the most recent Workers features:

  ```toml
  compatibility_date = "yyyy-mm-dd"
  ```

- Publish your site to a [custom domain](/workers/platform/triggers/custom-domains/) that you own and have already attached as a Cloudflare zone:

  ```toml
  route = "https://example.com/*"
  ```

  {{<Aside type="note">}}
  Refer to the documentation on [Routes](/workers/platform/triggers/routes/) to configure a `route` properly.
  {{</Aside>}}

Learn more about [configuring your project](/workers/wrangler/configuration/).

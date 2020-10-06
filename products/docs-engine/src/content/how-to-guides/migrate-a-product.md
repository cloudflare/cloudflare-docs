---
order: 0
---

# Migrate a product

<Aside>

__Note for Cloudflare employees:__ The details of this process are still being worked out. For the time being, please do not migrate any Cloudflare products without first checking in with Adam ([afs@cloudflare.com](mailto:afs@cloudflare.com), [@adamschwartz on GitHub](https://github.com/adamschwartz)). Thanks for your patience.

</Aside>

This document is intended to help __Cloudflare employees__ migrate [existing docs sites](https://developers.cloudflare.com/docs/) to the [`products/` folder](https://github.com/cloudflare/cloudflare-docs/tree/master/products) inside the [@cloudflare/cloudflare-docs](https://github.com/cloudflare/cloudflare-docs) repo on GitHub.

--------------------------------

## Prerequisites

This document assumes a basic understanding of software development, how GitHub works, as well as familiarity with the Markdown syntax and YAML frontmatter.

It also assumes you have read through [how the Docs Engine works](/how-it-works).

It’s also helpful to understand how [Gatsby handles Markdown](https://www.gatsbyjs.com/docs/adding-markdown-pages/).


--------------------------------

## Step 1: Verify migration status

The first thing you’ll want to do is make sure you know the current migration status of your product. The source of truth for this is the [migration table](https://github.com/cloudflare/cloudflare-docs#migration-progress).

Most likely your project will be listed in the left-column of the table, but the `Content` column and `Prod` columns will be blank. This is good. It means your ready is ready to begin migration.

You can view its corresponding `Test` column link to see what your project looks like now.

## Step 2: Set up local development

The next thing you’ll want to do is get a local development setup going.

1. Clone [@cloudflare/cloudflare-docs-engine](http://github.com/cloudflare/cloudflare-docs-engine) and [@cloudflare/cloudflare-docs](http://github.com/cloudflare/cloudflare-docs):

  ```sh
  ~/ $ git clone git@github.com:cloudflare/cloudflare-docs-engine.git
  ~/ $ git clone git@github.com:cloudflare/cloudflare-docs.git
  ```

2. `cd` into `cloudflare-docs-engine`, run `npm link`, then return to the parent directory.

  ```sh
  ~/ $ cd cloudflare-docs-engine
  ~/cloudflare-docs-engine $ npm link
  ~/cloudflare-docs-engine $ cd ..
  ```

3. `cd` into your project’s folder (e.g. `spectrum`) inside `cloudflare-docs`:

  ```sh
  ~/ $ cd cloudflare-docs/products/spectrum
  ```

5. Inside your project’s folder, link the engine:

  ```sh
  ~/cloudflare-docs/products/spectrum $ npm link cloudfare-docs-engine
  ```

6. Run the engine’s [`bootstrap` command](https://github.com/cloudflare/cloudflare-docs-engine/blob/765bc30127b0e80b570aade7044036925928c3ea/bin/commands.sh#L19-L39):

  ```sh
  ~/cloudflare-docs/products/spectrum $ npm run bootstrap
  ```

7. Run the local development server:

  ```sh
  ~/cloudflare-docs/products/spectrum $ npm run develop
  ```

8. Open up `localhost:8000` in your browser to see your docs site.

## Step 3: Make changes

<Aside>

__Note:__ Unfortunately, for now you’ll need to stop and restart `npm run develop` every time you make changes. This is something we’re urgently looking to fix and can be tracked [in this GitHub issue](https://github.com/cloudflare/cloudflare-docs-engine/issues/279), which also includes a workaround which may help in the interim.

</Aside>

At this point, you can make changes to the Markdown files inside the contect directory (e.g. `cloudflare-docs/products/spectrum/src/content` from above) to improve your docs site.

In terms of improving/updating the content itself, there are a number of great resources available to help:

- __[Content framework](/contributing/content-framework)__ – Cloudflare’s new docs sites (e.g. [Workers](https://developers.cloudflare.com/workers/)) are starting to adhere to a content framework which may be helpful when thinking about how to structure your [pages](/reference/pages) (folders and Markdown files) and create logical [side navigation](/reference/sidebar).


- __[Markdown (MDX) built-in components](/reference/markdown)__ – Migrating to the new Docs Engine means you can take advantage of all of its powerful [built-in components](/reference/markdown). Add an [aside](/reference/markdown), [display code beautifully](/reference/markdown/code-block-examples), [embed a video](/reference/markdown), add a buttons, definition list, and [so much more](/reference/markdown).


- [__Workers docs site__ example](https://developers.cloudflare.com/workers) – You can also take a look at the [Workers content](https://github.com/cloudflare/cloudflare-docs/tree/4fd3a4af9507b20bb23fea4d7c4f4cd349c0f463/products/workers/src/content) for an example of a well-structured docs site.


- Feel free to [@adamschwartz](https://github.com/adamschwartz) in an issue on GitHub, or DM @afs in chat.


## Step 4: Deploy your new site

This is still being worked out, but in essence, this requires three easy steps (which the ETI team will help you with):

1. Uncomment a few lines inside your `wrangler.toml` file to enable `[env.production]`.

2. Add a second `wrangler publish` with the new `production` environment in the GitHub Action [`deploy.yml` file](https://github.com/cloudflare/cloudflare-docs/blob/4fd3a4af9507b20bb23fea4d7c4f4cd349c0f463/.github/workflows/deploy.yml).

3. Make a pull request to remove the corresponding content from inside Bitbucket (`@DOCS/developer-docs/browse/src/content`).

--------------------------------

## Get help

If you get stuck in any part of this process, please DM @afs in chat.

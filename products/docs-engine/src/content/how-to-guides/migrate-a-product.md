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

1. Ensure you’re running node version `>=12.0.0`, as [specified by Docs Engine](https://github.com/cloudflare/cloudflare-docs-engine/blob/765bc30127b0e80b570aade7044036925928c3ea/package.json#L50).

2. Fork [@cloudflare/cloudflare-docs](http://github.com/cloudflare/cloudflare-docs) on GitHub and clone your fork:

  ```sh
  ~/ $ git clone git@github.com:username/cloudflare-docs.git
  ```

  <Aside>

  __Note:__ If you have write access on @cloudflare/cloudflare-docs you can clone that.

  </Aside>

3. `cd` into your project’s folder (e.g. `spectrum`) inside `cloudflare-docs`:

  ```sh
  ~/ $ cd cloudflare-docs/products/spectrum
  ```

4. Run `npm install`:

  ```sh
  ~/cloudflare-docs/products/spectrum $ npm install
  ```

5. Run the engine’s [`bootstrap` command](https://github.com/cloudflare/cloudflare-docs-engine/blob/765bc30127b0e80b570aade7044036925928c3ea/bin/commands.sh#L19-L39):

  ```sh
  ~/cloudflare-docs/products/spectrum $ npm run bootstrap
  ```

6. Run the local development server:

  ```sh
  ~/cloudflare-docs/products/spectrum $ npm run develop
  ```

7. Open up `localhost:8000` in your browser to see your docs site.

## Step 3: Make changes

<Aside header="Note">

Unfortunately, for now you’ll need to stop and restart `npm run develop` every time you make changes.

This is something we’d like to fix and can be tracked [in this GitHub issue](https://github.com/cloudflare/cloudflare-docs-engine/issues/279).

The workaround (noted in the issue) is to make your changes inside `.docs/src/content` instead. When you’re done you can run `npm run savechanges` (inside the project directory) and that will copy the contents of `.docs/src/content` into `src/content`.

</Aside>

At this point, you can make changes to the Markdown files inside the contect directory (e.g. `cloudflare-docs/products/spectrum/src/content` from above) to improve your docs site.

In terms of improving/updating the content itself, there are a number of great resources available to help:

- __[Content framework](/contributing/content-framework)__ – Cloudflare’s new docs sites (e.g. [Workers](https://developers.cloudflare.com/workers/)) are starting to adhere to a content framework which may be helpful when thinking about how to structure your [pages](/reference/pages) (folders and Markdown files) and create logical [side navigation](reference/pages#url-paths).


- __[Markdown (MDX) built-in components](/reference/markdown)__ – Migrating to the new Docs Engine means you can take advantage of all of its powerful [built-in components](/reference/markdown). Add an [aside](/reference/markdown#asides), [display code beautifully](reference/markdown#code-blocks), [embed a video](/reference/markdown#youtube), add a buttons, definition list, and [so much more](/reference/markdown).


- [__Workers docs site__ example](https://developers.cloudflare.com/workers) – You can also take a look at the [Workers content](https://github.com/cloudflare/cloudflare-docs/tree/4fd3a4af9507b20bb23fea4d7c4f4cd349c0f463/products/workers/src/content) for an example of a well-structured docs site.


- Feel free to [@adamschwartz](https://github.com/adamschwartz) in an issue on GitHub, or DM @afs in chat.


## Step 4: Deploy your new site

This is still being worked out, but in essence, this requires three easy steps (which the ETI team will help you with):

1. Uncomment a few lines inside your `wrangler.toml` file to enable `[env.production]`.

2. Add a second `wrangler publish` with the new `production` environment in the GitHub Action [`deploy.yml` file](https://github.com/cloudflare/cloudflare-docs/blob/4fd3a4af9507b20bb23fea4d7c4f4cd349c0f463/.github/workflows/deploy.yml).

3. Make a pull request to remove the corresponding content from inside Bitbucket (`@DOCS/developer-docs/browse/src/content`).

## Step 5: Prepare for the future

Add the appropriate maintainer for your docs in the [CODEOWNERS](https://github.com/cloudflare/cloudflare-docs/blob/master/CODEOWNERS) file in the root of @cloudflare/cloudflare-docs.

--------------------------------

## Get help

If you get stuck in any part of this process, please DM @afs in chat.

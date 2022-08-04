---
pcx_content_type: how-to
title: Start from existing
weight: 1
---

# Deploy an existing static site

{{<Aside type="note" header="Cloudflare Pages">}}
Consider using [Cloudflare Pages](/pages/) for hosting static applications instead of Workers Sites.
{{</Aside>}}

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler2) — make sure to use the [latest version](/workers/wrangler/get-started/#update).

To deploy a pre-existing static site project, start with a pre-generated site. Workers Sites works with all static site generators, for example:

- [Hugo](https://gohugo.io/getting-started/quick-start/)
- [Gatsby](https://www.gatsbyjs.org/docs/quick-start/), requires Node
- [Jekyll](https://jekyllrb.com/docs/), requires Ruby
- [Eleventy](https://www.11ty.io/#quick-start), requires Node
- [WordPress](https://wordpress.org) (refer to the tutorial on [deploying static WordPress sites with Workers](/workers/tutorials/deploy-a-static-wordpress-site/))

## Getting started

1.  Run the `wrangler init` command in the root of your project’s directory to generate a basic Worker:

    ```sh
    $ wrangler init -y
    ```

    This command adds/update the following files:

    - `wrangler.toml`: The file containing project configuration.
    - `package.json`: Wrangler `devDependencies` are added.
    - `tsconfig.json`: Added if not already there to support writing the Worker in TypeScript.
    - `src/index.ts`: A basic Cloudflare Worker, written in TypeScript.

2.  Add your site’s build/output directory to the `wrangler.toml` file:

    ```toml
    [site]
    bucket = "./public" # <-- Add your build directory name here.
    ```

    The default directories for the most popular static site generators are listed below:

    - Hugo: `public`
    - Gatsby: `public`
    - Jekyll: `_site`
    - Eleventy: `_site`

3.  Install the `@cloudflare/kv-asset-handler` package in your project:

    ```sh
    $ npm i -D @cloudflare/kv-asset-handler
    ```

4.  Replace the contents of `src/index.ts` with the following code snippet:

    ```js
    import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

    addEventListener("fetch", (event) => {
      event.respondWith(handleEvent(event));
    });

    async function handleEvent(event) {
      try {
        // Add logic to decide whether to serve an asset or run your original Worker code
        return await getAssetFromKV(event);
      } catch (e) {
        let pathname = new URL(event.request.url).pathname;
        return new Response(`"${pathname}" not found`, {
          status: 404,
          statusText: "not found",
        });
      }
    }
    ```

5.  Run `wrangler dev` or `wrangler publish` to preview or publish your site on Cloudflare.
    Wrangler will automatically upload the assets found in the configured directory.

    ```sh
    $ wrangler publish
    ```

6.  Publish your site to a [custom domain](/workers/get-started/guide/#optional-configure-for-deploying-to-a-registered-domain) that you own and have already attached as a Cloudflare zone. Add a `route` property to the `wrangler.toml` file.

    ```toml
    route = "https://example.com/*"
    ```

    {{<Aside type="note">}}
Refer to the documentation on [Routes](/workers/platform/routing/routes/) to configure a `route` properly.
    {{</Aside>}}

Learn more about [configuring your project](/workers/get-started/guide/#7-configure-your-project-for-deployment).

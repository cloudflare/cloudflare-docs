---
pcx_content_type: how-to
title: Start from existing
weight: 1
---

# Deploy an existing static site

{{<Aside type="note" header="Cloudflare Pages">}}
Consider using [Cloudflare Pages](/pages/) for hosting static applications instead of Workers Sites.
{{</Aside>}}

Workers Sites require [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) — make sure to use the [latest version](/workers/wrangler/install-and-update/#update-wrangler).

To deploy a pre-existing static site project, start with a pre-generated site. Workers Sites works with all static site generators, for example:

- [Hugo](https://gohugo.io/getting-started/quick-start/)
- [Gatsby](https://www.gatsbyjs.org/docs/quick-start/), requires Node
- [Jekyll](https://jekyllrb.com/docs/), requires Ruby
- [Eleventy](https://www.11ty.io/#quick-start), requires Node
- [WordPress](https://wordpress.org) (refer to the tutorial on [deploying static WordPress sites with Pages](/pages/how-to/deploy-a-wordpress-site/))

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

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    try {
      // Add logic to decide whether to serve an asset or run your original Worker code
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      let pathname = new URL(request.url).pathname;
      return new Response(`"${pathname}" not found`, {
        status: 404,
        statusText: "not found",
      });
    }
  },
};
```

{{</tab>}}
{{<tab label="js/sw">}}

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

{{</tab>}}
{{</tabs>}}

5.  Run `wrangler dev` or `wrangler deploy` to preview or publish your site on Cloudflare.
    Wrangler will automatically upload the assets found in the configured directory.

    ```sh
    $ wrangler deploy
    ```

6.  Deploy your site to a [custom domain](/workers/platform/triggers/custom-domains/) that you own and have already attached as a Cloudflare zone. Add a `route` property to the `wrangler.toml` file.

        ```toml
        route = "https://example.com/*"
        ```

        {{<Aside type="note">}}

    Refer to the documentation on [Routes](/workers/platform/triggers/routes/) to configure a `route` properly.
    {{</Aside>}}

Learn more about [configuring your project](/workers/wrangler/configuration/).

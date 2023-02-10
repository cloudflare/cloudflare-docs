---
pcx_content_type: how-to
title: Start from worker
weight: 3
---

# Add static assets to an existing Workers project

{{<Aside type="note" header="Cloudflare Pages">}}
Consider using [Cloudflare Pages](/pages/) for hosting static applications instead of Workers Sites.
{{</Aside>}}

Workers Sites require [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) — make sure to use the [latest version](/workers/wrangler/install-and-update/#update-wrangler).

If you have a pre-existing Worker project, you can use Workers Sites to serve static assets to the Worker.

## Getting started

1.  Create a directory that will contain the assets in the root of your project (for example, `./public`)
2.  Add configuration to your `wrangler.toml` file to point to it.

    ```toml
    [site]
    bucket = "./public" # Add the directory with your static assets!
    ```

3.  Install the `@cloudflare/kv-asset-handler` package in your project:

    ```sh
    $ npm i -D @cloudflare/kv-asset-handler
    ```

4.  Import the `getAssetFromKV()` function into your Worker script and use it to respond with static assets.

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
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
        statusText: 'not found',
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

    For more information on the configurable options of `getAssetFromKV()` refer to [kv-asset-handler docs](https://github.com/cloudflare/kv-asset-handler).

5.  Run `wrangler dev` or `wrangler publish` as you would normally with your Worker project.
    Wrangler will automatically upload the assets found in the configured directory.

    ```sh
    $ wrangler publish
    ```

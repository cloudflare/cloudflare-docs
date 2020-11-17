---
order: 2
---

# Start from worker

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) — make sure to be on the [latest version](/cli-wrangler/install-update#update).

Make sure to be on the latest version.

If you have a pre-existing Worker project, you can use Workers Sites to serve static assets to the Worker. To do so, follow these instructions:

1. Create a directory in the root of your project (e.g. `workers-site`) and add configuration to your `wrangler.toml` to point to it. Also add the path to your Worker script (probably `index.js`).

  ```toml
  ---
  filename: wrangler.toml
  ---
  # ... (whatever you already have here)

  [site]
  bucket = "./my-dir" # Add the directory with your static assets!
  entry-point = "./workers-site" # JS folder serving your assets
  ```

2. Add the `@cloudflare/kv-asset-handler` package to your project:

  ```sh
  $ npm i @cloudflare/kv-asset-handler
  ```

3. Import the package’s code into your Worker script, and use it in the handler you’d like to respond with static assets:

  ```js
  import { getAssetFromKV } from "@cloudflare/kv-asset-handler"

  addEventListener("fetch", event => {
    event.respondWith(handleEvent(event))
  })

  async function handleEvent(event) {
    try {
      return await getAssetFromKV(event)
    } catch (e) {
      let pathname = new URL(event.request.url).pathname
      return new Response(`"${pathname}" not found`, {
        status: 404,
        statusText: "not found",
      })
    }
  }
  ```

  For more information on the configurable options of `getAssetFromKV` see [the template’s source](https://github.com/cloudflare/worker-sites-template/blob/master/workers-site/index.js).

4. You should now be all set you can run `preview` or `publish` as you would normally with your Worker project!

  ```sh
  $ wrangler publish
  ```
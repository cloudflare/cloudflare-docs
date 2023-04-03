---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning">}}
In local development, you must use [`wrangler dev --experimental-local`](https://developers.cloudflare.com/workers/wrangler/commands/#dev) instead of `wrangler dev --local`, when using the `nodejs_compat` compatibility flag. This is a temporary limitation. [`--experimental-local` will soon become the default](https://blog.cloudflare.com/miniflare-and-workerd/) for local development in Wrangler.
{{</Aside>}}
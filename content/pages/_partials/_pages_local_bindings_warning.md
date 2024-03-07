---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note">}}

`wrangler.toml` is currently **only** used for local development. Bindings specified in it are not available remotely. In order to use bindings for production and preview deployments, you will need to set them up in the Cloudflare dashboard.

{{</Aside>}}
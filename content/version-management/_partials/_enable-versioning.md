---
_build:
  publishResources: false
  render: never
  list: never
---

By default, Version Management is not enabled on a zone.

To enable [Version Management](https://dash.cloudflare.com/?to=/:account/:zone/versioning):

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Enable versioning**.

Once you enable this setting, Cloudflare will automatically create **Version 1** of your zone, as well as environments for **Production**, **Staging**, and **Development**.
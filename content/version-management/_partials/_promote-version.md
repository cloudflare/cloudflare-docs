---
_build:
  publishResources: false
  render: never
  list: never
---

To promote a version:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Environments**.
5. On the environment that has successfully tested your version, select **Promote**. This option will only be available if the lower-ranked environment has a different version than the higher-ranked environment.
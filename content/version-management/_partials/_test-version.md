---
_build:
  publishResources: false
  render: never
  list: never
---

Once you have made changes to a version, apply that version to your lowest-ranked environment.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. Go to **Environments**.
5. On your lowest-ranked environment, use the **Version** dropdown to select your desired version.

To test your version, send requests to that environment that match the pattern specified in its [traffic filters](/version-management/reference/traffic-filters/).

For more details about what happens to these requests, refer to the version's [metrics](/version-management/how-to/versions/#view-metrics).
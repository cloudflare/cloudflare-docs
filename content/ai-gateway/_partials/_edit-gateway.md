---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To edit an AI Gateway in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** > **AI Gateway**.
3. Select your gateway.
4. Go to **Settings** and update as needed.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To edit an AI Gateway, send a [`PUT` request](/api/operations/aig-config-update-gateway) to the Cloudflare API.

{{</tab>}}
{{</tabs>}}
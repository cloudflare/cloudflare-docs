---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To delete an AI Gateway in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** > **AI Gateway**.
3. Select your gateway from the list of available options.
4. Go to **Settings**.
5. For **Delete Gateway**, select **Delete** (and confirm your deletion).

{{</tab>}}
{{<tab label="api" no-code="true">}}

To delete an AI Gateway, send a [`DELETE` request](/api/operations/aig-config-delete-gateway) to the Cloudflare API.

{{</tab>}}
{{</tabs>}}
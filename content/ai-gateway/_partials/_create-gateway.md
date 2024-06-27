---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To set up an AI Gateway in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** > **AI Gateway**.
3. Select **Create Gateway**.
4. Enter your **Gateway name**. Note: Gateway name has a 64 character limit.
5. Select **Create**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To set up an AI Gateway using the API:

1. [Create an API token](/fundamentals/api/get-started/create-token/) with the following permissions:
    - `AI Gateway - Read`
    - `AI Gateway - Edit`

2. Get your [Account ID](/fundamentals/setup/find-account-and-zone-ids/).
3. Using that API token and Account ID, send a [`POST` request](/api/operations/aig-config-create-gateway) to the Cloudflare API.

{{</tab>}}
{{</tabs>}}
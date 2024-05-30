---
_build:
  publishResources: false
  render: never
  list: never
---

### Dashboard

Editing in the dashboard is helpful for simpler use cases.

Once you have created your Worker script, you can edit and deploy your Worker using the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. Select your application.
4. Select **Edit Code**.

  ![Edit code directly within the Cloudflare dashboard](/images/workers/workers-edit-code.png)

### Wrangler CLI

To develop more advanced applications or [implement tests](/workers/testing/), start working in the Wrangler CLI:

1. [Install Wrangler](/workers/wrangler/install-and-update/).
2. Run `wrangler init --from-dash {worker_name}`.

{{<render file="_wrangler-from-dash-rec.md">}}
<br/>
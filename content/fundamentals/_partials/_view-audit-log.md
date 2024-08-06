---
_build:
  publishResources: false
  render: never
  list: never
---

To access audit logs in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Audit Log**.

You can search these audit logs by user email or domain and filter by date range. To download audit logs, click **Download CSV**.

{{<Aside type="note">}}

Depending on the volume of data, the export of large amounts of events from Audit Logs might fail with errors. We always recommend using Cloudflare [Log Push](/logs/about/) to make sure Audit Logs are always available and stored externally.

{{</Aside>}}

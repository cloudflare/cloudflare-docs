---
_build:
  publishResources: false
  render: never
  list: never
---

When you integrate a third-party SaaS application with Cloudflare CASB, you allow CASB to make API calls to the application and read relevant data on your behalf. The CASB integration permissions are read-only and follow the least privileged model. In other words, only the minimum access required to perform a scan is granted.

### Prerequisites

Before you can integrate a SaaS application with CASB, your SaaS account must meet certain requirements. To view the prerequisites and permissions for your application, refer to its [integration guide](/cloudflare-one/applications/scan-apps/casb-integrations/).

### Add an integration

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Integrations**.
2. Select **Add integration**.
3. Browse the available SaaS integrations and select the application you would like to add.
4. Follow the step-by-step integration instructions in the UI.
5. To run your first scan, select **Save integration**. You will be redirected to the [Findings page](/cloudflare-one/applications/scan-apps/manage-findings/) to see an in-depth listing of issues found.

After the first scan, CASB will automatically scan your application on a frequent basis to keep up with any changes. Due to each application having their own set of requirements, scan intervals will vary, but the frequency is typically between every 1 hour and every 24 hours.

### Pause an integration

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Integrations**.
2. Find the integration you would like to pause and select **Manage**.
3. To stop scanning the application, turn off **Scan findings**.

You can resume application scanning at any time by turning on **Scan findings**.

### Delete an integration

{{<Aside type="warning">}}

When you delete an integration, all keys and OAuth data will be deleted. This means you cannot restore a deleted integration or its scanned data.

{{</Aside>}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Integrations**.
2. Find the integration you would like to delete and select **Manage**.
3. Select **Delete**.

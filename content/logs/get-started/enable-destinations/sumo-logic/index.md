---
title: Enable Sumo Logic
pcx-content-type: how-to
weight: 66
meta:
  title: Enable Logpush to Sumo Logic
---

import EnableReadPermissions from "../../../\_partials/\_enable-read-permissions.md"

# Enable Logpush to Sumo Logic

Cloudflare Logpush supports pushing logs directly to Sumo Logic via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Sumo Logic via the dashboard.

To enable the Cloudflare Logpush service:

1.  Log in to the Cloudflare dashboard.

2.  Select the Enterprise domain you want to use with Logpush.

3.  Go to **Analytics** > **Logs**.

4.  Click **Connect a service**. A modal window opens where you will need to complete several steps.

5.  Select the dataset you want to push to a storage service.

6.  Select the data fields to include in your logs. Add or remove fields later by modifying your settings in **Logs** > **Logpush**.

7.  Select **Sumo Logic**.

8.  Enter or select the **HTTP Source Address**. Note that the same collector can be used for multiple Logpush jobs, but each job must have a dedicated source.

9.  Click **Validate access**.

10. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and click **Prove ownership**. To find the ownership token, click the **Open** button in the **Overview** tab of the ownership challenge file.

11. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Sumo Logic as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Manage via API

Cloudflare can send logs to a Hosted Collector with **HTTP Logs & Metrics** as the source. Once you have set up a collector, you simply provide the HTTP Source Address (a unique URL) to which logs can be posted.

<EnableReadPermissions/>

To enable Logpush to Sumo Logic:

1.  Configure a Hosted Collector. Refer to [instructions from Sumo Logic](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector).

2.  Configure an HTTP Logs & Metrics Source. Refer to [instructions from Sumo Logic](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source). The last step indicates how to get the HTTP Source Address (URL).

3.  Provide the HTTP Source Address (URL) when prompted by the Logpush API or UI.

<Aside type="note" header="Note">

Logpush will stop working if you regenerate the HTTP Source Address (URL). Refer to [generate a new URL for an HTTP Source from Sumo Logic](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source/zGenerate-a-new-URL-for-an-HTTP-Source). To use the new URL, you will have to get a new ownership challenge and update the destination for your job.

</Aside>

<Aside type="info" header="Info">

Sumo Logic may impose throttling and caps on your log ingestion to prevent your account from using **On-Demand Capacity**. Refer to [manage ingestion](https://help.sumologic.com/Manage/Ingestion-and-Volume/01Manage-Ingestion).

</Aside>

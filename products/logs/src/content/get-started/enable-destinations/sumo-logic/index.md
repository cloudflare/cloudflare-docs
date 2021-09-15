---
title: Enable Sumo Logic
order: 65
pcx-content-type: how-to
---

import EnableReadPermissions from "../../../_partials/_enable-read-permissions.md"

# Enable Logpush to Sumo Logic

Cloudflare Logpush supports pushing logs directly to Sumo Logic via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Sumo Logic via the dashboard.

To enable the Cloudflare Logpush service:

1. Log in to the Cloudflare dashboard.

1. Select the Enterprise domain you want to use with Logpush.

1. Go to **Analytics** > **Logs**.

1. Click **Connect a service**. A modal window opens where you will need to complete several steps.

1. Select the data set you want to push to a storage service.

1. Select the data fields to include in your logs. You can add or remove fields later by modifying your settings in **Logs** > **Logpush**.

1. Select **Sumo Logic**.

1. Enter or select the **HTTP Source Address**.

1. Click **Validate access**.
    
1. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and click **Prove ownership**. To find the ownership token, click the **Open** button in the **Overview** tab of the ownership challenge file.

1. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Sumo Logic as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Manage via API

Cloudflare can send logs to a Hosted Collector with "HTTP Logs & Metrics" as the source. Once you've set up a collector, you simply provide the HTTP Source Address (a unique URL) to which logs can be posted.

<EnableReadPermissions/>

To enable Logpush to Sumo Logic:

1. Configure a Hosted Collector. *See [instructions from Sumo Logic](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector)*.

1. Configure an HTTP Logs & Metrics Source. *See [instructions from Sumo Logic](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)*. The last step indicates how to get the HTTP Source Address (URL).

1. Provide the HTTP Source Address (URL) when prompted by the Logpush API or UI.

<Aside type="note" header="Note">

Logpush will stop working if you regenerate the HTTP Source Address (URL). *See [generate a new URL for an HTTP Source from Sumo Logic](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source/zGenerate-a-new-URL-for-an-HTTP-Source)*. To use the new URL, you will have to get a new ownership challenge and update the destination for your job.
</Aside>

<Aside type="info" header="Info">

Sumo Logic may impose throttling and caps on your log ingestion to prevent your account from using "On-Demand Capacity." *See [manage ingestion](https://help.sumologic.com/Manage/Ingestion-and-Volume/01Manage-Ingestion)*.
</Aside>

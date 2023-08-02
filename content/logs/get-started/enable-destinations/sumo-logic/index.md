---
title: Enable Sumo Logic
pcx_content_type: how-to
weight: 66
layout: single
meta:
  title: Enable Logpush to Sumo Logic
---

# Enable Logpush to Sumo Logic

Cloudflare Logpush supports pushing logs directly to Sumo Logic via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Sumo Logic via the dashboard.

To enable the Cloudflare Logpush service:

{{<render file="_enable-logpush-job.md">}}

7. In **Select a destination**, choose **Sumo Logic**.

8. Enter or select the **HTTP Source Address**. Note that the same collector can be used for multiple Logpush jobs, but each job must have a dedicated source.

9. Select **Validate access**.

10. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and select **Prove ownership**. To find the ownership token, select **Open** in the **Overview** tab of the ownership challenge file.

11. Select **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Sumo Logic as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Configure a Hosted Collector

Cloudflare can send logs to a Hosted Collector with **HTTP Logs & Metrics** as the source. Once you have set up a collector, you simply provide the HTTP Source Address (a unique URL) to which logs can be posted.

{{<render file="_enable-read-permissions.md">}}
<br/>

To enable Logpush to Sumo Logic:

1. Configure a Hosted Collector. Refer to [instructions from Sumo Logic](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/).

2. Configure an HTTP Logs & Metrics Source. Refer to [instructions from Sumo Logic](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/). The last step indicates how to get the HTTP Source Address (URL).

3. Provide the HTTP Source Address (URL) when prompted by the Logpush API or UI.

{{<Aside type="note" header="Notes">}}
* Logpush will stop working if you regenerate the HTTP Source Address (URL). Refer to [generate a new URL for an HTTP Source from Sumo Logic](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/generate-new-url/). To use the new URL, you will have to get a new ownership challenge and update the destination for your job.

* Sumo Logic may impose throttling and caps on your log ingestion to prevent your account from using **On-Demand Capacity**. Refer to [manage ingestion](https://help.sumologic.com/docs/manage/ingestion-volume/log-ingestion/).

* To analyze and visualize Cloudflare Logs using the Cloudflare App for Sumo Logic, follow the steps in the Sumo Logic integration documentation to [install the Cloudflare App](https://help.sumologic.com/docs/integrations/saas-cloud/cloudflare/#installing-the-cloudflare-app) and [view the Cloudflare dashboards](https://help.sumologic.com/docs/integrations/saas-cloud/cloudflare/#viewing-the-cloudflare-dashboards).
{{</Aside>}}
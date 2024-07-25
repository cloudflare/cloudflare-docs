---
title: Enable Sumo Logic
pcx_content_type: how-to
weight: 66
meta:
  title: Enable Logpush to Sumo Logic
---

# Enable Logpush to Sumo Logic

Cloudflare Logpush supports pushing logs directly to Sumo Logic via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5.  In **Select a destination**, choose **Sumo Logic**.

6. Enter the **HTTP Source Address**. To get the HTTP Source Address (URL) configure a [Sumo Logic Hosted Collector](https://help.sumologic.com/docs/send-data/hosted-collectors/) with an [HTTP Logs & Metrics Source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/). Note that the same collector can be used for multiple Logpush jobs, but each job must have a dedicated source. When you are done entering the destination details, select **Continue**.

7. To prove ownership, Cloudflare will send a file to your designated destination. To find the token, select the **Open** button in the **Overview** tab of the ownership challenge file, then paste it into the Cloudflare dashboard to verify your access to the bucket. Enter the **Ownership Token** and select **Continue**.

8. Select the dataset to push to the storage service.

9. In the next step, you need to configure your logpush job:
    - Enter the **Job name**.
    - Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](/logs/reference/filters/) for more information. Not all datasets have this option available.
    - In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.

10. In **Advanced Options**, you can:
    - Choose the format of timestamp fields in your logs (`RFC3339`(default),`Unix`, or `UnixNano`).
    - Select a [sampling rate](/logs/get-started/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.
    - Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.

11. Select **Submit** once you are done configuring your logpush job.

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
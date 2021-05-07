---
title: Enable Sumo Logic
order: 65
---

# Enable Sumo Logic

Cloudflare can send logs to a Hosted Collector with "HTTP Logs & Metrics" as the source. Once you've set up a collector, you simply provide the HTTP Source Address (a unique URL) to which logs can be posted.

To enable Logpush to Sumo Logic:

1. Configure a Hosted Collector. *See [instructions from Sumo Logic](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector)*.

2. Configure an HTTP Logs & Metrics Source. *See [instructions from Sumo Logic](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)*. The last step indicates how to get the HTTP Source Address (URL).

3. Provide the HTTP Source Address (URL) when prompted by the Logpush API or UI.

<Aside type="note" header="Note">

Logpush will stop working if you regenerate the HTTP Source Address (URL). *See [generate a new URL for an HTTP Source from Sumo Logic](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source/zGenerate-a-new-URL-for-an-HTTP-Source)*. To use the new URL, you will have to get a new ownership challenge and update the destination for your job.
</Aside>

<Aside type="info" header="Info">

Sumo Logic may impose throttling and caps on your log ingestion to prevent your account from using "On-Demand Capacity." *See [manage ingestion](https://help.sumologic.com/Manage/Ingestion-and-Volume/01Manage-Ingestion)*.
</Aside>

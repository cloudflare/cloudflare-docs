---
pcx_content_type: concept
title: Edge Log Delivery
weight: 22
---

# Edge Log Delivery

Edge Log Delivery allows customers to send logs directly from Cloudflare’s edge to their destination of choice. Logs are delivered in under 10 seconds. Compared to Logpush, Edge Log Delivery sends logs with lower latency, more frequently and in smaller batches.

For [Data Localization Suite](https://www.cloudflare.com/data-localization/) customers, Edge Log Delivery can be configured to deliver logs directly to your destination without first flowing through either of our US or EU core data centers. This means that your logs are delivered from data centers inside your selected region to your destination — for example, an Azure storage bucket in your preferred region, or an instance of Splunk that runs in an on-premise data center.

Edge Log Delivery is only available for HTTP request logs. Refer to the [API configuration](/logs/get-started/api-configuration/#kind) page for steps on how to configure a job to use Edge Log Delivery.

{{<button-group>}}
{{<button type="primary" href="/logs/get-started/">}}Get started{{</button>}}
{{</button-group>}}
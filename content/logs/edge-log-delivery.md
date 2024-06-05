---
pcx_content_type: concept
title: Edge Log Delivery
weight: 22
---

# Edge Log Delivery

Edge Log Delivery allows customers to send logs directly from Cloudflare’s edge to their destination of choice. You can configure the maximum interval for your log batches between 30 seconds and 5 minutes. However, you cannot specify a minimum interval for log batches, meaning that log files may be sent in shorter intervals than the maximum specified. Compared to Logpush, Edge Log Delivery sends logs with lower latency, more frequently, and in smaller batches.

Edge Log Delivery is only available for HTTP request logs. Refer to the [API configuration](/logs/get-started/api-configuration/#kind) page for steps on how to configure a job to use Edge Log Delivery.

{{<button-group>}}
{{<button type="primary" href="/logs/get-started/">}}Get started{{</button>}}
{{</button-group>}}

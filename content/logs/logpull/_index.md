---
pcx_content_type: concept
title: Logpull
weight: 121
---

# Logpull

Cloudflare Logpull is a REST API for consuming request logs over HTTP. These logs contain data related to the connecting client, the request path through the Cloudflare network, and the response from the origin web server. This data is useful for enriching existing logs on an origin server. Logpull is available to customers on the Enterprise plan.

{{<Aside type="warning">}}

Logpull is considered a legacy feature and we recommend using [Logpush](/logs/about/) or [Logs Engine](/logs/r2-log-retrieval/) instead for better performance and functionality.

{{</Aside>}}

Review the following content to learn more about Logpull.

{{<directory-listing>}}

## Availability

{{<feature-table id="analytics.logpull">}}
---
pcx_content_type: concept
title: Logpush
weight: 21
---

# Logpush

Logpush delivers logs in batches as quickly as possible, with no minimum batch size, potentially delivering files more than once per minute. This capability enables Cloudflare to provide information almost in real time, in smaller file sizes. 

Logpush does not offer storage or search functionality for logs; its primary aim is to send logs as quickly as they arrive.

## Availability

{{<feature-table id="analytics.logpush">}}

{{<Aside type="note">}}

Users without an Enterprise plan can still access [Workers Trace Events Logpush](/workers/observability/logging/logpush/) by subscribing to the [Workers Paid](/workers/platform/pricing/) plan.

{{</Aside>}}

## Next steps

{{<button-group>}}
{{<button type="primary" href="/logs/get-started/">}}Get started{{</button>}}
{{</button-group>}}

---
pcx_content_type: concept
title: Logpush
weight: 21
---

# Logpush

Logpush delivers logs in less than one minute with batches of no more than 100,000 records per file. This limit may be raised in the future. There is no minimum batch size, and Logpush may deliver files more than one time per minute. This capability allows Cloudflare to deliver information to you as close to real time as possible in smaller files. You may receive log files that contain fewer lines - that is expected.

Logpush does not store logs; we attempt to send logs as quickly as they arrive. In the event of an error or loss of connection, logs may be buffered for up to a few hours before being dropped. Note that Logpush itself does not provide a way to store or search logs. 

## Availability

{{<feature-table id="analytics.logpush">}}

{{<Aside type="note">}}

Users without an Enterprise plan can still access [Workers Trace Events Logpush](/workers/observability/logging/logpush/) by subscribing to the [Workers Paid](/workers/platform/pricing/) plan.

{{</Aside>}}

## Next steps

{{<button-group>}}
{{<button type="primary" href="/logs/get-started/">}}Get started{{</button>}}
{{</button-group>}}

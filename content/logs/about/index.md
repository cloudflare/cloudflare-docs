---
pcx_content_type: concept
title: Logpush
weight: 21
---

# Logpush

Logpush delivers logs in less than one minute with batches of no more than 100,000 records per file. This limit may be raised in the future. There is no minimum batch size, and Logpush may deliver files more than one time per minute.

Prior to mid-2020, Logpush sent logs once every five minutes (referred to as Logpush v1). The change to more frequent log pushing allows Cloudflare to deliver information to you as close to real time as possible in smaller files. You may receive log files that contain fewer lines - that is expected. If you have legacy Logpush jobs configured to the old settings, use the Logpush API to upgrade your job to Logpush v2. All new jobs will use Logpush v2 by default.

## Availability

{{<feature-table id="analytics.logpush">}}
  
In addition, [Workers Trace Events Logpush](/workers/platform/logpush/) is available on the [Workers Paid](/workers/platform/pricing/) plan.

## Next steps

{{<button-group>}}
{{<button type="primary" href="/logs/get-started/">}}Get started{{</button>}}
{{</button-group>}}

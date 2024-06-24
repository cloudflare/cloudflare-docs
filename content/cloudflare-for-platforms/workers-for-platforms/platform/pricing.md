---
pcx_content_type: concept
title: Pricing
weight: 1
layout: wide
---

# Pricing

The Workers for Platforms Paid plan is **$25 monthly**. Workers for Platforms can be purchased through the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers-for-platforms).

Workers for Platforms comes with the following usage allotments and overage pricing.


{{<table-wrap>}}
|             |  Requests<sup>1</sup> <sup>2</sup>                                                                                                | Duration                | CPU time<sup>2</sup>| Scripts                                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------- |------------------------------------------------ |
||  20 million requests included per month <br /><br /> +$0.30 per additional million | No charge or limit for duration  | 60 million CPU milliseconds included per month<br /><br /> +$0.02 per additional million CPU milliseconds<br /><br/> Max of 30 seconds of CPU time per invocation <br /> Max of 15 minutes of CPU time per [Cron Trigger](/workers/configuration/cron-triggers/) or [Queue Consumer](/queues/configuration/javascript-apis/#consumer) invocation| 1000 scripts <br /> <br />+$0.02 per additional script

{{</table-wrap>}}
<sup>1</sup>  Inbound requests to your Worker. Cloudflare does not bill for [subrequests](/workers/platform/limits/#subrequests) you make from your Worker. <br />
<sup>2</sup>  Workers for Platforms only charges for 1 request across the chain of [dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dynamic-dispatch-worker) -> [user Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers) -> [outbound Worker](/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/). CPU time is charged across these Workers.

## Example pricing:

A Workers for Platforms project that serves 100 million requests per month, uses an average of 10 milliseconds (ms) of CPU time per request and uses 1200 scripts would have the following estimated costs:

|                    |  Monthly Costs      |  Formula                                                                                                 |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------- |
| **Subscription**   |  $25.00              |                                                                                                          |
| **Requests**       |  $24.00             | (100,000,000 requests - 20,000,000 included requests) / 1,000,000 * $0.30                                |
| **CPU time**       |  $18.80             | ((10 ms of CPU time per request * 100,000,000 requests) - 60,000,000 included CPU ms) / 1,000,000 * $0.02  |
| **Scripts**       |  $4.00             | 1200 scripts - 1000 included scripts * $0.02  |
| **Total**          |  $71.80             |                                                                                                          |

{{<Aside type="note" header="Custom limits">}}

Set [custom limits](/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/) for user Workers to get control over your Cloudflare bill, prevent accidental runaway bills or denial-of-wallet attacks. Configure the maximum amount of CPU time that can be used per invocation by [defining custom limits in your dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/#set-custom-limits).

{{</Aside>}}


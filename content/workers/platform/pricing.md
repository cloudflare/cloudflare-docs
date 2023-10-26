---
pcx_content_type: concept
title: Pricing
weight: 12
meta:
  description: Workers plans and pricing information.
---

# Pricing

By default, users have access to the Workers Free plan. The Workers free plan includes limited usage of Workers, Pages Functions and Workers KV. Read more about the [Free plan limits](/workers/platform/limits/#worker-limits).

The Workers Paid plan includes Workers, Pages Functions, Workers KV, and Durable Objects usage for a minimum charge of $5 USD per month for an account. The plan includes increased initial usage allotments, with clear charges for usage that exceeds the base plan.

All included usage is on a monthly basis.

{{<Aside type="note" header="Pages Functions billing">}}
  
All [Pages Functions](/pages/platform/functions/) are billed as Workers. All pricing and inclusions in this document apply to Pages Functions. Refer to [Functions Billing](/pages/platform/functions/pricing/) for more information on Pages Functions pricing.

{{</Aside>}}

## Workers
Workers are available under two Usage Models: Bundled and Unbound. Usage Models are settings on your Workers that specify how you are billed for usage, as well as the upper [limits](/workers/platform/limits/#worker-limits) for how many milliseconds of CPU time your Worker can use per invocation. Worker size, number of Workers, and available memory are not affected by plan type. Refer to [Limits](/workers/platform/limits/).

{{<table-wrap>}}

|             |  Requests<sup>1</sup>                                               | Duration                                                                                  | CPU time |
| ----------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Free**    |  100,000 per day                                                    | No charge for duration                                                                    | 10 milliseconds of CPU time per invocation                 |
| **Bundled** |  10 million included per month <br /> +$0.50 per additional million | No charge for duration                                                                    | 50 milliseconds CPU time per invocation                    |
| **Unbound** |  1 million included per month <br /> +$0.15 per additional million  | 400,000 GB-s included per month <br /> +$12.50 per additional million GB-s  | 30 seconds of CPU time per invocation <br /> 15 minutes of CPU time per [Cron Trigger](/workers/configuration/cron-triggers/) or [Queue Consumer](/queues/platform/javascript-apis/#consumer) invocation        |

{{</table-wrap>}}

1.  Inbound requests to your Worker. [Subrequests](/workers/platform/limits/#subrequests) to external services are not billed on a unit basis, but do impact the duration (wall-clock time) of your Worker.

### Bundled Usage Model

The Bundled Usage Model is billed exclusively based on the number of incoming requests to your Worker, and has a limit of 50 ms of CPU time per invocation.

{{<table-wrap>}}

|             |  Requests                                              | Duration                                                                                  | CPU time |
| ----------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Bundled** |  10 million included per month <br /> +$0.50 per additional million | no charge for duration                                                                    | 50 milliseconds CPU time per invocation                    |

{{</table-wrap>}}

#### Example pricing

A Worker that serves 100 million requests per month would have the following estimated costs:

{{<table-wrap>}}

|                    |  Monthly Costs      |  Formula                                                                      |
| ------------------ | ------------------- | ----------------------------------------------------------------------------- |
| **Workers Paid Plan**   |  $5                 |                                                                               |
| **Requests**       |  $45                | (100,000,000 requests - 10,000,000 included requests) / 1,000,000 * $0.50     |
| **Total**          |  $50                |                                                                                |

{{</table-wrap>}}

### Unbound Usage Model

The Unbound Usage Model is billed based on the number of incoming requests to your Worker, and the duration (wall-clock time) of each invocation, measured in gigabyte seconds (GB-s).

{{<table-wrap>}}

|             |  Requests                                                           | Duration                                                                                  | CPU time |
| ----------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Unbound** |  1 million included per month <br /> +$0.15 per additional million  | 400,000 GB-s included per month <br /> +$12.50 per additional million GB-s<sup>1, 2</sup>  | 30 seconds of CPU time per invocation <br /> 15 minutes of CPU time per [Cron Trigger](/workers/configuration/cron-triggers/) or [Queue Consumer](/queues/platform/javascript-apis/#consumer) invocation        |

{{</table-wrap>}}

1.  Cloudflare will bill for duration charges based on the higher of your wall time or CPU time, with a multiple of 8 applied to the CPU time to account for the processing power allotted to your Worker. Cloudflare will not bill for wall time duration charges beyond the execution [limit](/workers/platform/limits/#worker-limits) given.

2.  Duration billing will charge for the 128 MB of memory allocated to your Worker, regardless of actual usage. If your account has significant traffic to a single Worker, multiple instances of that Worker may run in the same isolate on the same physical machine and share the 128 MB of memory. These Workers are still billed as if they were separate instances, with each being charged as if it had its own 128 MB of memory.

#### Example pricing

Consider a Worker that serves 100 million requests per month, with an average duration (wall-clock time) of 200 milliseconds per request. This translates to the following duration (wall-clock time) metrics:

- 0.2 seconds per request (200 milliseconds / 1000)
- 0.025 gigabyte seconds (GB-s) per request (0.2 seconds * 128 MB / 1024 MB)
- 2,500,000 gigabyte seconds (GB-s) per month (0.025 GB-s per request * 100,000,000 requests)

Resulting in the following estimated costs:

{{<table-wrap>}}

|                    |  Monthly Costs      |  Formula                                                                  |
| ------------------ | ------------------- | ------------------------------------------------------------------------- |
| **Workers Paid Plan**   |  $5.00              |                                                                           |
| **Requests**       |  $14.85             | (100,000,000 requests - 1,000,000 included requests) / 1,000,000 * $0.15  |
| **Duration**       |  $26.25             | (2,500,000 GB-s per month - 400,000 included GB-s) / 1,000,000 * $12.50   |
| **Total**          |  $46.10             |                                                                           |

{{</table-wrap>}}

### Standard Usage Model

Starting October 31st, 2023, [new, simplified pricing](https://blog.cloudflare.com/workers-pricing-scale-to-zero) will be available for Workers under a new Usage Model, called Workers Standard.

{{<table-wrap>}}

|             |  Requests<sup>1</sup>                                                                                                | Duration                | CPU time                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------- |
| **Standard** |  10 million included per month <br /> +$0.30 per additional million | No charge or limit for duration  | 30 million CPU milliseconds included per month<br /> +$0.02 per additional million CPU milliseconds<br /><br/> Max of 30 seconds of CPU time per invocation <br /> Max of 15 minutes of CPU time per [Cron Trigger](/workers/configuration/cron-triggers/) or [Queue Consumer](/queues/platform/javascript-apis/#consumer) invocation                    |

{{</table-wrap>}}

#### Example pricing

A Worker that serves 100 million requests per month, and uses an average of 7 milliseconds (ms) of CPU time per request, would have the following estimated costs:

{{<table-wrap>}}

|                    |  Monthly Costs      |  Formula                                                                                                 |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------- |
| **Subscription**   |  $5.00              |                                                                                                          |
| **Requests**       |  $27.00             | (100,000,000 requests - 10,000,000 included requests) / 1,000,000 * $0.30                                |
| **CPU time**       |  $13.40             | (7 ms of CPU time per request * 100,000,000 requests - 30,000,000 included CPU ms) / 1,000,000 * $0.02  |
| **Total**          |  $45.40             |                                                                                                          |

{{</table-wrap>}}

### How to switch Usage Models

When an account is first upgraded to the Paid plan, the Unbound plan is used as the default Usage Model. To change your default account-wide Usage Model:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. Find **Default Usage Model** on the right-side menu > **Change**. 

Existing Workers will not be impacted when changing the default Usage Model. You may change the Usage Model for individual Workers without affecting your account-wide default.


To change the Usage Model for individual Workers:
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Worker > **Settings** > **Usage Model**.

## Workers Trace Events Logpush

Workers Logpush is only available on the Workers Paid plan. 

{{<table-wrap>}}

|                             | Paid plan                          |
| --------------------------- | ---------------------------------- |
| Requests <sup>1</sup>       | 10 million / month, +$0.05/million |

{{</table-wrap>}}

<sup>1</sup> Workers Logpush charges for request logs that reach your end destination after applying filtering or sampling. 

## Workers KV

{{<render file="_kv_pricing.md">}}

{{<Aside type="note" header="KV documentation">}}

To learn more about KV, refer to the [KV documentation](/kv/).

{{</Aside>}}
## Queues

{{<render file="_queues_pricing.md">}}

{{<Aside type="note" header="Queues billing examples">}}

To learn more about Queues pricing and review billing examples, refer to [Queues Pricing](/queues/platform/pricing/).

{{</Aside>}}

## D1

D1 is available on both the [Workers Free](#workers) and [Workers Paid](#workers) plans. 

{{<render file="_d1-pricing.md">}}

{{<Aside type="note" header="D1 billing">}}

Refer to [D1 Pricing](/d1/platform/pricing/) to learn more about how D1 is billed.

{{</Aside>}}

## Durable Objects

{{<render file="_durable_objects_pricing.md">}}

{{<Aside type="note" header="Durable Objects billing examples">}}

For more information and [examples of Durable Objects billing](/durable-objects/platform/pricing/#durable-objects-billing-examples), refer to [Durable Objects Pricing](/durable-objects/platform/pricing/).

{{</Aside>}}

## Durable Objects Transactional Storage API

{{<render file="_transactional_storage_api_pricing.md">}}

## Vectorize

Vectorize is currently only available on the Workers paid plan.

{{<render file="_vectorize-pricing.md">}}

## Service bindings

Service bindings cost the same as any normal Worker. Each invocation is charged as if it is a request from the Internet with one important difference. You will be charged a single billable duration across all Workers triggered by a single incoming request.

For more information on how service bindings work, refer to [About Service bindings](/workers/configuration/bindings/about-service-bindings/).

## Fine Print

Workers Paid plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. Refer to [Limits](/workers/platform/limits/) to review definitions and behavior after a limit is hit.

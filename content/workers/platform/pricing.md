---
pcx_content_type: concept
title: Pricing
weight: 12
---

# Pricing

By default, users have access to the Workers Free plan. The Workers free plan includes limited usage of Workers, Pages Functions and Workers KV. Read more about the [Free plan limits](/workers/platform/limits/#worker-limits).

The Workers Paid plan includes Workers, Pages Functions, Workers KV, and Durable Objects usage for a minimum charge of $5 USD per month for an account. The plan includes increased initial usage allotments, with clear charges for usage that exceeds the base plan.

All included usage is on a monthly basis.

{{<Aside type="note" header="Pages Functions billing">}}
  
All [Pages Functions](/pages/platform/functions/) are billed as Workers. All pricing and inclusions in this document apply to Pages Functions. Refer to [Functions Billing](/pages/platform/functions/pricing/) for more information on Pages Functions pricing.

{{</Aside>}}

## Workers

### Usage models

Workers are available under two Usage Models: Bundled and Unbound. Usage Models are settings on your Workers that specify how you are billed for usage, as well as the upper [limits](/workers/platform/limits/#worker-limits) for how many milliseconds of CPU time your Worker can use per invocation.

{{<table-wrap>}}

|             |  Requests<sup>1</sup>                                               | Duration                                                                                  | CPU time |
| ----------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Free**    |  100,000 per day                                                    | No charge for duration                                                                    | 10 milliseconds of CPU time per invocation                 |
| **Bundled** |  10 million included per month <br /> +$0.50 per additional million | No charge for duration                                                                    | 50 milliseconds CPU time per invocation                    |
| **Unbound** |  1 million included per month <br /> +$0.15 per additional million  | 400,000 GB-s included per month <br /> +$12.50 per additional million GB-s<sup>2,3</sup>  | 30 seconds of CPU time per invocation <br /> 15 minutes of CPU time per [Cron Trigger](/workers/configuration/cron-triggers/) or [Queue Consumer](/queues/platform/javascript-apis/#consumer) invocation        |

{{</table-wrap>}}

1.  Requests inbound to your Worker from the Internet are charged on a unit basis for paid plans. [Subrequests](/workers/platform/limits/#subrequests) to external services are not billed on a unit basis, but network time incurred may slightly increase any duration-based billing.

2.  Cloudflare will bill for duration charges based on the higher of your wall time or CPU time, with a multiple of 8 applied to the CPU time to account for the processing power allotted to your Worker. Cloudflare will not bill for wall time duration charges beyond the execution [limit](/workers/platform/limits/#worker-limits) given.

3.  Duration billing will charge for the 128 MB of memory allocated to your Worker, regardless of actual usage. If your account has significant traffic to a single Worker, multiple instances of that Worker may run in the same isolate on the same physical machine and share the 128 MB of memory. These Workers are still billed as if they were separate instances, with each being charged as if it had its own 128 MB of memory.

#### Default usage model

When an account is first upgraded to the Paid plan, the Unbound plan is used as the default Usage Model. To change your default account-wide Usage Model:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. Find **Default Usage Model** on the right-side menu > **Change**. 

Cloudflare recommends setting the default to the type of Worker you create the most. Existing Workers will not be impacted when changing the default Usage Model.

You may change the Usage Model for individual Workers without affecting your account-wide default. You can do this through the [`usage_model` key](/workers/wrangler/configuration/) in your `wranger.toml` file and in the dashboard.

To change the Usage Model for individual Workers:
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Worker > **Settings** > **Usage Model**.

### Same features

Worker size, number of Workers, and available memory are not affected by plan type. The Unbound usage model includes a higher number of subrequests. Refer to [Limits](/workers/platform/limits/).

### Workers Unbound billing examples

#### Example 1

If an Unbound Worker executed 1.5 million times and was active a total of 200,000 seconds, the estimated cost in a month would be:

Total = ~$0.08 USD + Minimum $5/mo usage = $5.08

- (1.5 million requests - included 1 million requests) x $0.15 / 1,000,000 = $0.075
- (200,000 seconds) \* 128 MB / 1 GB = 25,000 GB-seconds
- (25,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $0.00

#### Example 2

If an Unbound Worker executed 10 million times and was active a total of 6,400,000 seconds the estimated cost in a month would be:

Total = ~$6.35 + Minimum $5/mo usage = $11.35

- (10 million requests - included 1 million requests) x $0.15 / 1,000,000 requests = $1.35
- (6,400,000 seconds) \* 128 MB / 1 GB = 800,000 GB-seconds
- (800,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 GB-s = $5.00

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

## Service bindings

Service bindings cost the same as any normal Worker. Each invocation is charged as if it is a request from the Internet with one important difference. You will be charged a single billable duration across all Workers triggered by a single incoming request.

For more information on how service bindings work, refer to [About Service bindings](/workers/configuration/bindings/about-service-bindings/).

## Fine Print

Workers Paid plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. See definitions and behavior after a limit is hit in the [limits article](/workers/platform/limits/).

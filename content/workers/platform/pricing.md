---
pcx_content_type: concept
title: Pricing
weight: 1
meta:
  description: Workers plans and pricing information.
---

<style>
  .DocsMarkdown--table-wrap tr > :first-child {
    word-break: normal;
  }
</style>

# Pricing

{{<Aside type="warning">}}

All users on the Workers Paid plan have been **automatically migrated** from the Bundled and Unbound usage models to the [Standard usage model](https://blog.cloudflare.com/workers-pricing-scale-to-zero/) on March 1, 2024.

- To learn what this migration means for Workers pricing, refer to [Pricing](/workers/platform/pricing/).
- To learn about how this migration impacts Worker limits, refer to [Limits](/workers/platform/limits/).


{{</Aside>}}

By default, users have access to the Workers Free plan. The Workers Free plan includes limited usage of Workers, Pages Functions and Workers KV. Read more about the [Free plan limits](/workers/platform/limits/#worker-limits).

The Workers Paid plan includes Workers, Pages Functions, Workers KV, and Durable Objects usage for a minimum charge of $5 USD per month for an account. The plan includes increased initial usage allotments, with clear charges for usage that exceeds the base plan.

All included usage is on a monthly basis.

{{<Aside type="note" header="Pages Functions billing">}}

All [Pages Functions](/pages/functions/) are billed as Workers. All pricing and inclusions in this document apply to Pages Functions. Refer to [Functions Pricing](/pages/functions/pricing/) for more information on Pages Functions pricing.

{{</Aside>}}

## Workers

Usage models are settings on your Workers that specify how you are billed for usage, as well as the upper [limits](/workers/platform/limits/#worker-limits) for how many milliseconds of {{<glossary-tooltip term_id="CPU time" link="/workers/glossary/?term=cpu+time">}}CPU time{{</glossary-tooltip>}} your Worker can use per invocation.

Users on the Workers Paid plan only have access to the Standard usage model.

Workers Enterprise accounts are billed based on the usage model specified in their contract. To switch to the Standard usage model, reach out to your CSM. Some Workers Enterprise customers maintain the ability to change usage models.

{{<table-wrap>}}
|             |  Requests<sup>1</sup>                                                                                                | Duration                | CPU time                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------- |
| **Free**    |  100,000 per day                                                    | No charge for duration                                                                    | 10 milliseconds of CPU time per invocation                 |
| **Standard** |  10 million included per month <br /> +$0.30 per additional million | No charge or limit for duration  | 30 million CPU milliseconds included per month<br /> +$0.02 per additional million CPU milliseconds<br /><br/> Max of 30 seconds of CPU time per invocation <br /> Max of 15 minutes of CPU time per [Cron Trigger](/workers/configuration/cron-triggers/) or [Queue Consumer](/queues/configuration/javascript-apis/#consumer) invocation                    |

{{</table-wrap>}}
<sup>1</sup>  Inbound requests to your Worker. Cloudflare does not bill for [subrequests](/workers/platform/limits/#subrequests) you make from your Worker.

### Example pricing: Standard Usage Model

#### Example 1

A Worker that serves 15 million requests per month, and uses an average of 7 milliseconds (ms) of CPU time per request, would have the following estimated costs:

{{<table-wrap>}}

|                    |  Monthly Costs      |  Formula                                                                                                 |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------- |
| **Subscription**   |  $5.00              |                                                                                                          |
| **Requests**       |  $1.50             | (15,000,000 requests - 10,000,000 included requests) / 1,000,000 * $0.30                                |
| **CPU time**       |  $1.50             | ((7 ms of CPU time per request * 15,000,000 requests) - 30,000,000 included CPU ms) / 1,000,000 * $0.02  |
| **Total**          |  $8.00             |                                                                                                          |

{{</table-wrap>}}

#### Example 2

A Worker that runs on a [Cron Trigger](/workers/configuration/cron-triggers/) once an hour to collect data from multiple APIs, process the data and create a report.
- 720 requests/month
- 3 minutes (180,000ms) of CPU time per request

In this scenario, the estimated monthly cost would be calculated as:

{{<table-wrap>}}

|                    |  Monthly Costs      |  Formula                                                                                                 |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------- |
| **Subscription**   |  $5.00              |                                                                                                          |
| **Requests**       |  $0.00             | -                                |
| **CPU time**       |  $1.99             | ((180,000 ms of CPU time per request * 720 requests) - 30,000,000 included CPU ms) / 1,000,000 * $0.02  |
| **Total**          |  $6.99            |                                                                                                          |
{{</table-wrap>}}

#### Example 3

A high traffic Worker that serves 100 million requests per month, and uses an average of 7 milliseconds (ms) of CPU time per request, would have the following estimated costs:

{{<table-wrap>}}

|                    |  Monthly Costs      |  Formula                                                                                                 |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------- |
| **Subscription**   |  $5.00              |                                                                                                          |
| **Requests**       |  $27.00             | (100,000,000 requests - 10,000,000 included requests) / 1,000,000 * $0.30                                |
| **CPU time**       |  $13.40             | ((7 ms of CPU time per request * 100,000,000 requests) - 30,000,000 included CPU ms) / 1,000,000 * $0.02  |
| **Total**          |  $45.40

{{</table-wrap>}}

{{<Aside type="note" header="Custom limits">}}

To prevent accidental runaway bills or denial-of-wallet attacks, configure the maximum amount of CPU time that can be used per invocation by [defining limits in your Worker's `wrangler.toml` file](/workers/wrangler/configuration/#limits), or via the Cloudflare dashboard (Workers & Pages > Select your Worker > Settings > CPU Limits).

If you had a Worker on the Bundled usage model prior to the migration to Standard pricing on March 1, 2024, Cloudflare has automatically added a 50 ms CPU limit on your Worker.

{{</Aside>}}

### Deprecated usage models

{{<table-wrap>}}

|             |  Requests<sup>1</sup>                                               | Duration                                                                                  | CPU time |
| ----------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Bundled** |  10 million included per month <br /> +$0.50 per additional million | No charge for duration                                                                    | 50 milliseconds CPU time per invocation                    |
| **Unbound** |  1 million included per month <br /> +$0.15 per additional million  | 400,000 GB-s included per month <br /> +$12.50 per additional million GB-s<sup>2, 3</sup>  | 30 seconds of CPU time per invocation <br /> 15 minutes of CPU time per [Cron Trigger](/workers/configuration/cron-triggers/) or [Queue Consumer](/queues/configuration/javascript-apis/#consumer) invocation        |

{{</table-wrap>}}

<sup>1</sup>  Inbound requests to your Worker. [Subrequests](/workers/platform/limits/#subrequests) to external services are not billed on a unit basis, but do impact the duration (wall-clock time) of your Worker.

<sup>2</sup>  Cloudflare will bill for duration charges based on the higher of your wall time or CPU time, with a multiple of 8 applied to the CPU time to account for the processing power allotted to your Worker. Cloudflare will not bill for wall time duration charges beyond the execution [limit](/workers/platform/limits/#worker-limits) given.

<sup>3</sup>  Duration billing will charge for the 128 MB of memory allocated to your Worker, regardless of actual usage. If your account has significant traffic to a single Worker, multiple instances of that Worker may run in the same isolate on the same physical machine and share the 128 MB of memory. These Workers are still billed as if they were separate instances, with each being charged as if it had its own 128 MB of memory.

#### Example pricing: Bundled Usage Model

A Worker that serves 100 million requests per month would have the following estimated costs:

{{<table-wrap>}}

|                    |  Monthly Costs      |  Formula                                                                      |
| ------------------ | ------------------- | ----------------------------------------------------------------------------- |
| **Workers Paid Plan**   |  $5                 |                                                                               |
| **Requests**       |  $45                | (100,000,000 requests - 10,000,000 included requests) / 1,000,000 * $0.50     |
| **Total**          |  $50                |                                                                                |

{{</table-wrap>}}

#### Example pricing: Unbound Usage Model

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

### How to switch usage models

{{<Aside type="note">}}
Only some Workers Enterprise customers maintain the ability to change usage models.
{{</Aside>}}

Usage models can be changed at the individual Worker level:
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Worker > **Settings** > **Usage Model**.

To change your default account-wide usage model:
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. Find **Usage Model** on the right-side menu > **Change**.

Existing Workers will not be impacted when changing the default usage model. You may change the usage model for individual Workers without affecting your account-wide default usage model.

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

Service bindings cost the same as any normal Worker. Each invocation is charged as if it is a request from the Internet.

If your Worker is on the Unbound usage model, you will be charged a single billable duration across all Workers triggered by a single incoming request.

For more information on how service bindings work, refer to [About Service bindings](/workers/runtime-apis/bindings/service-bindings/).

## Fine Print

Workers Paid plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. Refer to [Limits](/workers/platform/limits/) to review definitions and behavior after a limit is hit.

---
pcx_content_type: concept
title: Pricing
weight: 12
---

# Pricing

By default, users have access to the Workers Free plan. The Workers free plan includes limited usage of Workers, Pages Functions and Workers KV. Read more about the [Free plan limits](/workers/platform/limits/#worker-limits).

The Workers Paid plan includes Workers, Pages Functions, Workers KV, and Durable Objects usage for a minimum charge of $5 USD per month for an account. The plan includes increased initial usage allotments, with clear charges for usage that exceeds the base plan.

All included usage is on a monthly basis.

{{<Aside type="note">}}
  
All [Pages Functions](/pages/platform/functions/) are billed as Workers. All pricing and inclusions in this document apply to Pages Functions. Refer to [Functions Billing](/pages/platform/functions/pricing/) for more information on Pages Functions pricing.

{{</Aside>}}

## Workers

{{<table-wrap>}}

|          | Free plan                  | Paid Plan - Bundled                | Paid plan - Unbound                               |
| -------- | -------------------------- | ---------------------------------- | ------------------------------------------------- |
| Requests<sup>1</sup> | 100,000 / day              | 10 million / month, +$0.50/million | 1 million / month, + $0.15/million                |
| Duration | 10 ms CPU time / invocation | 50 ms CPU time / invocation        | 400,000 GB-s, + $12.50/million GB-s<sup>2,3</sup> |

{{</table-wrap>}}

1.  Requests inbound to your Worker from the Internet are charged on a unit basis for paid plans. [Subrequests](/workers/platform/limits/#subrequests) to external services are not billed on a unit basis, but network time incurred may slightly increase any duration-based billing.

2.  Cloudflare will bill for duration charges based on the higher of your wall time or CPU time, with a multiple of 8 applied to the CPU time to account for the processing power allotted to your Worker. Cloudflare will not bill for wall time duration charges beyond the execution [limit](/workers/platform/limits/#worker-limits) given.

3.  Duration billing will charge for the 128 MB of memory allocated to your Worker, regardless of actual usage. If your account has significant traffic to a single Worker, multiple instances of that Worker may run in the same isolate on the same physical machine and share the 128 MB of memory. These Workers are still billed as if they were separate instances, with each being charged as if it had its own 128 MB of memory.

### Usage models

Workers are available under two Usage Models: Bundled and Unbound. Usage Models are settings on your Workers that specify the upper [limits](/workers/platform/limits/) for how long a Worker can execute. In addition to different limits, Workers on the Bundled Usage Model have usage billing based on requests only, while Workers on Unbound have usage billing based on requests and duration at the rates shown under [Pricing](/workers/platform/pricing/#pricing).

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

{{<table-wrap>}}

|                 | Free plan<sup>1</sup> | Paid plan                         |
| --------------- | --------------------- | --------------------------------- |
| Read requests   | 100,000 / day         | 10 million/month, + $0.50/million |
| Write requests  | 1,000 / day           | 1 million/month, + $5.00/million  |
| Delete requests | 1,000 / day           | 1 million/month, + $5.00/million  |
| List requests   | 1,000 / day           | 1 million/month, + $5.00/million  |
| Stored data     | 1 GB                  | 1 GB, + $0.50/ GB-month           |

{{</table-wrap>}}

1.  The Workers Free plan includes limited Workers KV usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error.

## Queues

Queues are only available on the Workers Paid plan. To learn more about Queues pricing, refer to [Queues Pricing](/queues/platform/pricing/).

## D1

D1 is available on both the [Workers Free](#workers) and [Workers Paid](#workers) plans. 

{{<render file="_d1-pricing.md">}}

Refer to [the D1 documentation](/d1/platform/pricing/) to learn more about how D1 is billed.

## Durable Objects

Durable Objects are only available on the Workers Paid plan.

{{<table-wrap>}}

|          | Paid plan                                         |
| -------- | ------------------------------------------------- |
| Requests | 1 million, + $0.15/million                        |
| Duration | 400,000 GB-s, + $12.50/million GB-s<sup>1,2</sup> |

{{</table-wrap>}}

1.  Duration is billed in wall-clock time as long as the Object is active, but is shared across all requests active on an Object at once. Once your Object finishes responding to all requests, it will stop incurring duration charges. Calling `.accept()` on a WebSocket in an Object will incur duration charges for the entire time the WebSocket is connected. [Prefer using `state.acceptWebSocket()`](/workers/runtime-apis/durable-objects/#websockets-hibernation-api), which will stop incurring duration charges once all event handlers finish running.
2.  Duration billing charges for the 128 MB of memory your Durable Object is allocated, regardless of actual usage. If your account creates many instances of a single Durable Object class, Durable Objects may run in the same isolate on the same physical machine and share the 128 MB of memory. These Durable Objects are still billed as if they are allocated a full 128 MB of memory.
3.  Requests including all incoming HTTP requests, WebSocket messages, and alarm invocations. There is no charge for outgoing WebSocket messages, nor for incoming [WebSocket protocol pings](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2).

### Durable Objects billing examples

These examples exclude the costs for the Workers calling the Durable Objects.

#### Example 1

If a single Durable Object was called by a Worker 1.5 million times, and was active for 1,000,000 seconds in the month, the estimated cost in a month would be:

Total = ~$0.08 USD + Minimum $5/mo usage = $5.08

- (1.5 million requests - included 1 million requests) x $0.15 / 1,000,000 = $0.075
- 1,000,000 seconds \* 128 MB / 1 GB = 128,000 GB-s
- (128,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $0.00

#### Example 2

If 100 Durable Objects each had 100 WebSocket connections established to each of them which sent approximately one message a minute for a month, the estimated cost in a month would be, if the messages overlapped so that the Objects were actually active for half the month:

Total = ~$64.65 USD + $202.36 USD + Minimum $5/mo usage = $272.01

- 100 requests to establish the WebSockets.
- 100 messages per minute \* 100 Durable Objects \* 60 minutes \* 24 hours \* 30 days = 432,000,000 requests
- (432 million requests - included 1 million requests) x $0.15 / 1,000,000 = $64.65
- 100 Durable Objects \* 60 seconds \* 60 minutes \* 24 hours \* 30 days / 2 = 129,600,000 seconds
- 129,600,000 seconds \* 128 MB / 1 GB = 16,588,800 GB-s
- (16,588,800 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $202.36

#### Example 3

If 100 Durable Objects each had a single WebSocket connection established to each of them, which sent one message a second for a month, and the messages overlapped so that the Objects were actually active for the entire month, the estimated cost in a month would be:

Total = ~$38.73 USD + $409.72 USD + Minimum $5/mo usage = $453.45

- 100 requests to establish the WebSockets.
- 1 message per second \* 100 connections \* 60 seconds \* 60 minutes \* 24 hours \* 30 days = 259,200,000 requests
- (259.2 million requests - included 1 million requests) x $0.15 / 1,000,000 = $38.73
- 100 Durable Objects \* 60 seconds \* 60 minutes \* 24 hours \* 30 days = 259,200,000 seconds
- 259,200,000 seconds \* 128 MB / 1 GB = 33,177,600 GB-s
- (33,177,600 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $409.72

## Durable Objects storage API

The [Durable Objects storage API](/workers/runtime-apis/durable-objects/#transactional-storage-api) is only accessible from within Durable Objects. Durable Objects do not have to use the storage API, but if your code does call methods on `state.storage`, it will incur the following additional charges:

{{<table-wrap>}}

|                                  | Paid plan                  |
| -------------------------------- | -------------------------- |
| Read request units<sup>1,2</sup> | 1 million, + $0.20/million |
| Write request units<sup>1</sup>  | 1 million, + $1.00/million |
| Delete requests<sup>3</sup>      | 1 million, + $1.00/million |
| Stored data<sup>4</sup>          | 1 GB, + $0.20/ GB-month    |

{{</table-wrap>}}

1.  A request unit is defined as 4 KB of data read or written. A request that writes or reads more than 4 KB will consume multiple units, for example, a 9 KB write will consume 3 write request units.
2.  List operations are billed by read request units, based on the amount of data examined, for example, a list request that returns a combined 80 KB of keys and values will be billed 20 read request units. A list request that does not return anything is billed for 1 read request unit.
3.  Delete requests are unmetered, for example, deleting a 100 KB value will be charged one delete request.
4.  Objects will be billed for stored data until the data is removed. Once the data is removed, the object will be cleaned up automatically by the system.
5.  Each alarm write is billed as a single write request unit.

Requests that hit the [Durable Objects in-memory cache](/workers/learning/using-durable-objects/#accessing-persistent-storage-from-a-durable-object) or that use the [multi-key versions of get/put/delete methods](/workers/runtime-apis/durable-objects/#transactional-storage-api) are billed the same as if they were a normal, individual request for each key.

## Service bindings

Service bindings cost the same as any normal Worker. Each invocation is charged as if it is a request from the Internet with one important difference. You will be charged a single billable duration across all Workers triggered by a single incoming request.

For more information on how service bindings work, refer to [About Service bindings](/workers/platform/bindings/about-service-bindings/).

## Fine Print

Workers Paid plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. See definitions and behavior after a limit is hit in the [limits article](/workers/platform/limits/).

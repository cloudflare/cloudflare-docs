---
order: 3
pcx-content-type: concept
---

# Pricing

By default, users have access to the Workers Free plan. The Workers free plan includes limited usage of Workers and Workers KV. Read more about the [Free plan limits](/platform/limits#worker-limits).

The Workers Paid plan includes Workers, Workers KV, and Durable Objects usage for a minimum charge of $5 USD per month for an account. The plan includes increased initial usage allotments, with clear charges for usage that exceeds the base plan.

All included usage is on a monthly basis.

## Workers

<TableWrap>

|                      | Free plan                    | Paid Plan - Unbound                                          | Paid plan - Bundled          |
| -------------------- | ---------------------------- | ------------------------------------------------------------ | ---------------------------- |
| Requests             | 100,000 / day                | 1 million, + $0.15/million                                   | 10 million, +$0.50/million   |
| Duration             | 10ms CPU time / invocation   | 400,000 GB-s, + $12.50/million GB-s<sup>1,2</sup>            | 50 ms CPU time / invocation  |
  
</TableWrap>

1. Cloudflare will bill for duration charges based on the higher of your wall time or CPU time, with a multiple applied to the CPU time to account for the processing power allotted to your script. Cloudflare will not bill for wall time duration charges beyond the execution [limit](/platform/limits#worker-limits) given.
2. Duration billing will charge for the 128 MB of memory allocated to your Worker, regardless of actual usage. If your account has significant traffic to a single Worker, multiple instances of that Worker may run in the same isolate on the same physical machine and share the 128 MB of memory. These Workers are still billed as if they are allocated a full 128 MB of memory.

### Usage models

Workers are available under two Usage Models: Bundled and Unbound. Usage Models are settings on your Workers that specify the upper [limits](/platform/limits) for how long a Worker can execute. In addition to different limits, Workers on the Bundled Usage Model have usage billing based on requests only, while Workers on Unbound have usage billing based on requests and duration at the rates shown under [pricing](/platform/pricing#pricing).

#### Default usage model

When an account is first upgraded to the Paid plan, the Unbound plan is used as the default Usage Model. You may change your default Usage Model account-wide by going to the **Account Home** > **Workers** > **Overview** > **Default Usage Model** > **Change**. Cloudflare recommends setting the default to the type of Worker you create the most. Existing Workers will not be impacted when changing the default Usage Model.

You may change the Usage Model for individual Workers without affecting your account-wide default. You can do this through the [`usage_model` key](https://developers.cloudflare.com/workers/cli-wrangler/configuration#keys) in your `wranger.toml` file or through the dashboard: **Workers** > **select your Worker** > **Settings** > **Usage Model**.

### Same features

Script size, number of scripts, subrequests, and available memory are not affected by plan type.

### Workers billing examples

#### Example 1

If an Unbound Worker executed 1.5 million times and used a total of 200,000 GB-s, the estimated cost in a month would be:

Total = ~$0.08 USD + Minimum $5/mo usage = $5.08

- (1.5 million requests - included 1 million requests) x $0.15 / 1,000,000 = $0.075
- (200,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $0.00

#### Example 2

If an Unbound Worker executed 5 million times and used a total of 800,000 GB-s the estimated cost in a month would be:

Total = ~$5.60 + Minimum $5/mo usage = $10.60

- (5 million requests - included 1 million requests) x $0.15 / 1,000,000 requests = $0.60
- (800,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 GB-s = $5.00

## Workers KV

<TableWrap>

|                    | Free plan<sup>1</sup> | Paid plan                   |
| ------------------ | --------------------- | --------------------------- |
| Read requests      | 100,000 / day         | 10 million, + $0.50/million |
| Write requests     | 1,000 / day           | 1 million, + $5.00/million  |
| Delete requests    | 1,000 / day           | 1 million, + $5.00/million  |
| List requests      | 1,000 / day           | 1 million, + $5.00/million  |
| Stored data        | 1 GB                  | 1 GB, + $0.50/ GB-month     |
  
</TableWrap>

1. The Workers Free plan includes limited Workers KV usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error.

## Durable Objects

Durable Objects are currently only available on the Workers Paid plan.

<TableWrap>

|               | Paid plan                                                    |
| ------------- | ------------------------------------------------------------ |
| Requests      | 1 million, + $0.15/million                                   | 
| Duration      | 400,000 GB-s, + $12.50/million GB-s<sup>1,2</sup>            |
  
</TableWrap>

1. Duration is billed in wall-clock time as long as the Object is active, but is shared across all requests active on an Object at once.  Once your Object stops receiving requests, it will be removed from memory and stop incurring duration charges. A WebSocket being connected to the Durable Object counts as the Object being active.
2. Duration billing charges for the 128 MB of memory your Durable Object is allocated, regardless of actual usage.  If your account creates many instances of a single Durable Object class, Durable Objects may run in the same isolate on the same physical machine and share the 128 MB of memory. These Durable Objects are still billed as if they are allocated a full 128 MB of memory.

### Durable Objects billing examples

These examples exclude the costs for the Workers calling the Durable Objects.

#### Example 1

If a single Durable Object was called by a Worker 1.5 million times, and was active for 1,000,000 seconds in the month, the estimated cost in a month would be:

Total = ~$0.08 USD + Minimum $5/mo usage = $5.08

- (1.5 million requests - included 1 million requests) x $0.15 / 1,000,000 = $0.075
- 1,000,000 seconds * 128 MB / 1 GB = 128,000 GB-s
- (128,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $0.00

#### Example 2

If 100 Durable Objects each had 100 WebSocket connections established to each of them which sent approximately one message a minute for a month, the estimated cost in a month would be, if the messages overlapped so that the Objects were actually active for half the month:

Total = ~$64.65 USD + $202.36 USD + Minimum $5/mo usage = $272.01

- 100 requests to establish the WebSockets.
- 100 messages per minute * 100 Durable Objects * 60 minutes * 24 hours * 30 days = 432,000,000 requests
- (432 million requests - included 1 million requests) x $0.15 / 1,000,000 = $64.65
- 100 Durable Objects * 60 seconds * 60 minutes * 24 hours * 30 days / 2 = 129,600,000 seconds
- 129,600,000 seconds * 128 MB / 1 GB = 16,588,800 GB-s
- (16,588,800 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $202.36

#### Example 3

If 100 Durable Objects each had a single WebSocket connection established to each of them, which sent one message a second for a month, and the messages overlapped so that the Objects were actually active for the entire month, the estimated cost in a month would be:

Total = ~$38.73 USD + $409.72 USD + Minimum $5/mo usage = $453.45

- 100 requests to establish the WebSockets.
- 1 message per second * 100 connections * 60 seconds * 60 minutes * 24 hours * 30 days = 259,200,000 requests
- (259.2 million requests - included 1 million requests) x $0.15 / 1,000,000 = $38.73
- 100 Durable Objects * 60 seconds * 60 minutes * 24 hours * 30 days = 259,200,000 seconds
- 259,200,000 seconds * 128 MB / 1 GB = 33,177,600 GB-s
- (33,177,600 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $409.72

## Durable Objects storage API

The Durable Objects storage API is only accessible from within Durable Objects.

<TableWrap>

|                                               | Paid plan                   |
| --------------------------------------------- | --------------------------- |
| Read request units<sup>1,2</sup>              | 10 million, + $0.20/million |
| Write request units<sup>1</sup>               | 1 million, + $1.00/million  |
| Delete requests<sup>3</sup>                   | 1 million, + $1.00/million  |
| Stored data<sup>4</sup>                       | 1 GB, + $0.20/ GB-month     |
    
</TableWrap>

1. A request unit is defined as 4 KB of data read or written. A request that writes or reads more than 4 KB will consume multiple units, for example, a 9 KB write will consume 3 write request units.
2. List operations are billed by read request units, based on the amount of data examined, for example, a list request that returns 80 KB of keys will be billed 20 request units.
3. Delete requests are unmetered, for example, deleting a 100 KB value will be charged one delete request.
4. Objects will be billed for stored data until the data is removed.  Once the data is removed, the object will be cleaned up automatically by the system.

## Fine Print

Workers Paid plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker script will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. See definitions and behavior after a limit is hit in the [limits article](/platform/limits).


---
order: 3
---

# Pricing

Workers and Workers KV are now free to enable for all, subject to some limits.

## Free plan

The Workers Free plan makes it easy to experience the Workers ecosystem without a commitment. The Free plan provides access to Workers and Worker KV, giving you the tools to start building your service. Learn about the [Free plan limits](/platform/limits#worker-limits).

## Paid plan

To avoid the Free plan limits, you can subscribe to the Workers Paid plan for a minimum **$5 USD per month for an account**.

### Usage Models

Under the Paid plan, you have access to two Usage Models: Bundled and Unbound. Usage Models are **settings on your Workers** that specify the upper [limits](/platform/limits) for how long a Worker can execute. In addition to different limits, each Usage Model is billed on different usage measurements.

By default, when an account is first upgraded to the Paid plan, the default Usage Model is set to Unbound. This default can be changed at any time by using the Default Usage Model setting on the Workers overview page.

### Pricing

<TableWrap>

|          | Bundled requests | Unbound requests | Unbound duration<sup>1</sup> | Unbound egress data transfer<sup>2</sup> |
| -------- | ---------------- | ---------------- | ---------------------------- | ---------------------------------------- |
| Included | 10 million       | 1 million        | 400,000 GB-s                 | 5 GB                                     |
| +        | $0.50/million    | $0.15/million    | $12.50/million GB-s          | $0.045/GB                                |

</TableWrap>

1. Cloudflare will bill for Duration charges based on the higher of your wall time or CPU time, with a multiple applied to the CPU time to account for the processing power allotted to your script. We will not bill for wall time Duration charges beyond the execution [limit](/platform/limits#worker-limits) given.
2. Unbound egress data transfer fees can be reduced when sending data to members of the [Bandwidth Alliance](https://www.cloudflare.com/bandwidth-alliance/).

### Worker billing examples

#### Example 1

If an Unbound Worker executed 1.5 million times, used a total of 200,000 GB-s, and sent a total egress data of approximately 6 GB, the estimated cost in a month would be:

Total = ~$0.12 USD + Minimum $5/mo usage = **$5.12**

- (1.5 million requests - included 1 million requests) x $0.15 / 1,000,000 = **$0.075**
- (200,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = **$0.00**
- (6 GB - included 5 GB) x 0.045 = **$0.045**

#### Example 2

If an Unbound Worker executed 5 million times, used a total of 800,000 GB-s, and sent a total egress data of approximately 20 GB, the estimated cost in a month would be:

Total = ~$6.27 + Minimum $5/mo usage = **$11.27**

- (5 million requests - included 1 million requests) x $0.15 / 1,000,000 requests = **$0.60**
- (800,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 GB-s = **$5.00**
- (20 GB - included 5 GB) x $0.045 = **$0.675**

### Default Usage Model

Each account will have a default Usage Model. The default Usage Model is used when new Workers are created, unless a Usage Model is provided via configuration during creation. We recommend setting the default Usage Model to the type of Worker you create the most. Existing Workers will not be impacted when changing the default Usage Model, and you are able to change the Usage Model for an individual Worker at any time after creation.

## KV

The Workers Free plan includes limited KV Usage. If you exceed one of these limits, further operations of that type will fail with an error. All limits reset daily at 00:00 UTC.

<TableWrap>

| Feature              | Free limit |
| -------------------- | ---------- |
| [Reads/day](#kv)     | 100,000    |
| [Writes/day](#kv)    | 1,000      |
| [Lists/day](#kv)     | 1,000      |
| [Deletes/day](#kv)   | 1,000      |
| [Storage limit](#kv) | 1 GB       |

</TableWrap>

To avoid these limits, you can subscribe to the [Workers Paid plan](#pricing). Usage is then billed as follows:

<TableWrap>

|          | Storage  | Reads/month   | Writes/month | Deletes/month | Lists/month |
| -------- | -------- | ------------- | ------------ | ------------- | ----------- |
| Included | 1 GB     | 10 million    | 1 million    | 1 million     | 1 million   |
| +        | $0.50/GB | $0.50/million | $5/million   | $5/million    | $5/million  |

</TableWrap>

Usage of all other features of Worker KV do not affect pricing.

## Same features

Script size, number of scripts, subrequests, and available memory are not affected by plan type.

## Fine Print

Workers Paid plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker script will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. See definitions and behavior after a limit is hit in the [limits article](/platform/limits).

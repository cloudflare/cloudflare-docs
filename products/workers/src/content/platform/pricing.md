---
order: 3
---

# Pricing

Workers and Workers KV are now free to enable for all, subject to some limits.

## Bundled

To avoid the limits, you can subscribe to the Workers Bundled plan for **$5 USD per month for an account**. This plan includes 10 million requests per month.

With the Workers Bundled plan, requests beyond the included quota will be charged at **$0.50/million requests**.

## KV

The Workers Free plan includes limited KV Usage. If you exceed one of these limits, further operations of that type will fail with an error. All limits reset daily at 00:00 UTC.

<TableWrap>

| Feature                               | Free limit  |
|---------------------------------------|-------------|
| [Reads/day](#kv)                      |   100,000   |
| [Writes/day](#kv)                     |     1,000   |
| [Lists/day](#kv)                      |     1,000   |
| [Deletes/day](#kv)                    |     1,000   |
| [Storage limit](#kv)                  |     1 GB    |

</TableWrap>

To avoid these limits, you can subscribe to the Workers Bundled plan.  Usage is then billed as follows:

<TableWrap>

| Plan     | Storage  | Reads/month   | Writes/month | Deletes/month | Lists/month |
|----------|----------|---------------|--------------|---------------|-------------|
| Included | 1 GB     | 10 million    | 1 million    | 1 million     | 1 million   |
| +        | $0.50/GB | $0.50/million | $5/million   | $5/million    | $5/million  |

</TableWrap>

Usage of all other features of Worker KV do not affect pricing.

## Same features

Script size, number of scripts, subrequests, and available memory are not affected by plan type.

## Fine Print

Workers Bundled plan is separate from any other Cloudflare plan (Free, Professional, Business) you may have. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

Only requests that hit a Worker script will count against your limits and your bill. Since Cloudflare Workers runs before the Cloudflare cache, the caching of a request still incurs costs. See definitions and behavior after a limit is hit in the [limits article](/platform/limits).

---
order: 3
---

# Pricing

Workers is now free to enable for all, and are subject to some limits.

## Bundled

To avoid the limits and enable KV, you can subscribe to the Workers Bundled plan for **$5 USD per month for an account**. This plan includes 10 million requests per month.

With the Workers Bundled plan, requests beyond the included quota will be charged at **$0.50/million requests**.

## KV

Enabling Workers KV requires the Bundled plan.

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

---
pcx_content_type: reference
title: Limits
weight: 2
---

# Limits

## Rate limit (Error 429)

The global rate limit for the Cloudflare API is 1200 requests per five minutes per user, and applies cumulatively regardless of whether the request is made via the dashboard, API key, or API token. 

If you exceed this limit, all API calls for the next five minutes will be blocked, receiving a HTTP `429` response.

Some specific API calls have their own limits and are documented separately, such as the following:

- [Cache Purge APIs](/api/operations/zone-purge)
- [GraphQL APIs](/analytics/graphql-api/limits/)
- [Rulesets APIs](/ruleset-engine/rulesets-api/#limits)

Enterprise customers can also [contact Cloudflare Support](/support/contacting-cloudflare-support/) to raise the limit to a higher value.

## Upload limits (Error 413)

The upload limit for the Cloudflare API depends on your plan. If you exceed this limit, your API call will receive a `413 Request Entity Too Large` error.

{{<feature-table id="network.max_upload_size">}}

If you require a larger upload, break up requests into smaller chunks or [upgrade your plan](/fundamentals/account-and-billing/account-billing/change-plan/).
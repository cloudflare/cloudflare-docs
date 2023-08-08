---
pcx_content_type: reference
title: Limits
weight: 13
---

# Rate Limits

The global rate limit for the Cloudflare API is 1200 requests per five minutes. If you exceed this, all API calls for the next five minutes will be blocked, receiving a HTTP 429 response.

Some specific API calls have their own limits and are documented separately, such as the following:

- [Cache Purge APIs](/api/operations/zone-purge)
- [GraphQL APIs](/analytics/graphql-api/limits/)
- [Rulesets APIs](/ruleset-engine/rulesets-api/#limits)

Enterprise customers can also [contact Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) to raise the limit to a higher value.

---
_build:
  publishResources: false
  render: never
  list: never
---

The global rate limit for the Cloudflare API is 1200 requests per five minutes per user, and applies cumulatively regardless of whether the request is made via the dashboard, API key, or API token. 

If you exceed this limit, all API calls for the next five minutes will be blocked, receiving a HTTP `429` response.

Some specific API calls have their own limits and are documented separately, such as the following:

- [Cache Purge APIs](/api/operations/zone-purge)
- [GraphQL APIs](/analytics/graphql-api/limits/)
- [Rulesets APIs](/ruleset-engine/rulesets-api/#limits)

Enterprise customers can also [contact Cloudflare Support](/support/contacting-cloudflare-support/) to raise the limit to a higher value.
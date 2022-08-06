---
pcx_content_type: reference
title: Limits
weight: 13
---

# Rate Limits

The global rate limit for our API is 1200 requests per 5 minutes. If you exceed this, all API calls for the next 5 minutes will be blocked, receiving a HTTP 429 response.

Some specific API calls do not count towards the global rate limit and instead have their own limits documented separately, such as the Cache Purge APIs:

* https://api.cloudflare.com/#zone-purge-files-by-url
* https://api.cloudflare.com/#zone-purge-files-by-cache-tags,-host-or-prefix


---
pcx_content_type: reference
title: Limits
weight: 13
---

# Rate Limits

The global rate limit for Cloudflare's API is 1200 requests per five minutes. If you exceed this, all API calls for the next five minutes will be blocked, receiving a HTTP 429 response.

Some specific API calls have their own limits and are documented separately, such as the Cache Purge APIs:

* https://api.cloudflare.com/#zone-purge-files-by-url
* https://api.cloudflare.com/#zone-purge-files-by-cache-tags,-host-or-prefix

Enterprise customers may [contact Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476) to raise the limit of a higher value if needed.

---
title: Cache performance
pcx_content_type: how-to
---

# Cache performance

## Optimize cache ratios

Depending on the cache status you receive, you can make modifications to improve your cache ratio. To review the list of cache statuses, refer to [Cloudflare cache responses](/cache/concepts/cache-responses/).

- **Dynamic**: Default response for many file types including HTML. To cache additional content, refer to [Cache Rules](/cache/how-to/cache-rules/).
- **Revalidated**: To address an atypical quantity of revalidated content, consider [increasing your Edge Cache TTLs](/cache/how-to/cache-rules/settings/#edge-ttl).
- **Expired**: Consider [extending Edge Cache TTLs](/cache/how-to/cache-rules/settings/#edge-ttl)) for these resources via a Page Rule or enable revalidation at your origin.
- **Miss**: Although tricky to optimize, there are a few potential remedies:
  - [Enable Argo Tiered Caching](/cache/how-to/tiered-cache/#enable-tiered-cache) to check cache in another Cloudflare data center before checking the origin web server.
  - [Create a custom cache key](/cache/how-to/cache-keys/) for multiple URLs to match the same cached resource, for example by ignoring query string.

## Example reports for troubleshooting cache performance

Several examples of helpful insights into your site performance via Cache Analytics include:

- Not caching HTML.

  - Identify the issue: Select **Add filter** and select **Cache status equals Dynamic**.
  - Resolution: Set a Cloudflare Page Rule to [cache dynamic content](/cache/concepts/customize-cache/).

- Short cache expiration TTL.

  - Identify the issue: Select **Add filter** and select **Cache status equals Revalidated**.
  - Resolution: [Increase Cloudflare's Edge Cache TTL via a Page Rule](/cache/how-to/edge-browser-cache-ttl/).

- Need to enable Tiered Cache or Custom Cache Key

  - Identify the issue: Select **Add filter** and select **Cache status equals Miss**.
  - Resolution: Enable Argo Tiered Caching or [create a custom cache key](/cache/how-to/cache-keys/).


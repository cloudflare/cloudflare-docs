---
title: Tiered Cache
pcx_content_type: concept
---

# Tiered Cache

Tiered Cache uses the size of Cloudflare's network to reduce requests to customer origins by dramatically increasing cache hit ratios. With data centers around the world, Cloudflare caches content very close to end users. However, if a piece of content is not in cache, the Cloudflare edge data centers must contact the origin server to receive the cacheable content.

Tiered Cache works by dividing Cloudflare’s data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier must ask an upper-tier to see if it has the content. If the upper-tier does not have the content, only the upper-tier can ask the origin for content. This practice improves bandwidth efficiency by limiting the number of data centers that can ask the origin for content, which reduces origin load and makes websites more cost-effective to operate.

Additionally, Tiered Cache concentrates connections to origin servers so they come from a small number of data centers rather than the full set of network locations. This results in fewer open connections using server resources.

To enable Tiered Cache, refer to [Enable Tiered Cache](/cache/how-to/tiered-cache/#enable-tiered-cache).

## Availability

{{<feature-table id="cache.tiered_cache">}}

## Bandwidth Alliance

Enterprise customers can override Bandwidth Alliance configuration with Tiered Cache. For all other users, the Bandwidth Alliance takes precedence. Tiered Cache is still a valuable option to enable because the Bandwidth Alliance may not always be an available option, and in those instances, the Tiered Cache configuration will be used.

## Enable Tiered Cache

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
2.  Select **Caching** > **Tiered Cache**.
3.  From **Argo Tiered Cache**, toggle the button to **enabled**.

After enabling Tiered Cache, you are automatically enrolled in Smart Tiered Cache.

### Smart Tiered Cache

Smart Tiered Cache dynamically selects the single best upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the best data center with the lowest latency to be the upper-tier for an origin.
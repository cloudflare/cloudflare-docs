---
title: Tiered Cache
pcx-content-type: concept
---

# Tiered Cache

Tiered Cache uses the size of Cloudflare's network to reduce requests to customer origins by dramatically increasing cache hit ratios. With data centers around the world, Cloudflare caches content very close to end users. However, if a piece of content is not in cache, the Cloudflare edge data centers must contact the origin server to receive the cacheable content. 

Tiered Cache works by dividing Cloudflare’s data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier must ask an upper-tier to see if it has the content. If the upper-tier does not have the content, only the upper-tier can ask the origin for content. This practice improves bandwidth efficiency by limiting the number of data centers that can ask the origin for content, which reduces origin load and makes websites more cost-effective to operate.

Additionally, Tiered Cache concentrates connections to origin servers so they come from a small number of data centers rather than the full set of network locations. This results in fewer open connections using server resources.

To enable Tiered Cache, refer to [Enable Tiered Cache](/how-to/enable-tiered-cache).

## Bandwidth Alliance

For Enterprise users, any Tiered Cache option you enable takes precedence over the Bandwidth Alliance. For all other users, the Bandwidth Alliance takes precedence. Tiered Cache is still a valuable option to enable because the Bandwidth Alliance may not always be an available option, and in those instances, the Tiered Cache configuration will be used.

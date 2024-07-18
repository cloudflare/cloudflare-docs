---
title: Interact with Cache in Workers
pcx_content_type: concept
---

# Interact with Cache in Workers

You can use [Workers](/workers/) to customize cache behavior on Cloudflare's CDN. Because Cloudflare’s Workers can run before and after the cache, you can utilize Workers to modify assets after they are returned from the cache, to sign or personalize responses while reducing load on an origin, or reduce latency to the end user by serving assets from a nearby location. 

{{<Aside type="note">}}When using Workers and [Orange-to-Orange (O2O)](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/), some caveats and limitations may apply.{{</Aside>}}

To determine how to cache a resource by setting TTLs, custom cache keys, and cache headers in a fetch request, refer to [Cache using fetch](/workers/examples/cache-using-fetch/).

To use the Cache API to store responses in Cloudflare's cache, refer to [Using the Cache API](/workers/examples/cache-api/).

To understand more about how Cache and Workers interact refer to [Cache in Workers](/workers/reference/how-the-cache-works/).

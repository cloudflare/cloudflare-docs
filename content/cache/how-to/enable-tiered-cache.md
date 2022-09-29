---
title: Enable Tiered Cache
pcx-content-type: how-to
---

# Enable Tiered Cache

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
2.  Click **Caching** > **Tiered Cache**.
3.  From **Argo Tiered Cache**, toggle the button to **enabled**.

After enabling Tiered Cache, you are automatically enrolled in Smart Tiered Cache.

## Smart Tiered Cache

Smart Tiered Cache dynamically selects the single best upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the best data center with the lowest latency to be the upper-tier for an origin.

## Bandwidth Alliance may interrupt Tiered Cache

Enterprise customers can override Bandwidth Alliance configuration with Tiered Cache, for all other customers Bandwidth Alliance will take precedence. For more information, please refer to [Bandwidth Alliance](/cache/about/tiered-cache/#bandwidth-alliance).

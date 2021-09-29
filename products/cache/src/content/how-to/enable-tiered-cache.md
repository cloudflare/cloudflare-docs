---
title: Enable Tiered Cache
pcx-content-type: how-to
---

# Enable Tiered Cache

1. Log into your [Cloudflare dashboard](https://dash.cloudflare.com).
1. Click **Caching** > **Tiered Cache**.
1. From **Argo Tiered Cache**, toggle the button to enabled. 

After enabling Tiered Cache, you are automatically enrolled in Smart Tiered Cache. 

## Smart Tiered Cache 

Smart Tiered Cache dynamically selects the single best upper tier for each of your website’s origins with no configuration required. Cloudflare dynamically finds the single best upper tier for an origin by using Cloudflare’s performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to Using determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the best data center with the lowest latency to be the upper-tier for an origin.
---
pcx_content_type: concept
title: Smart Placement (beta)
---

{{<beta>}}Smart Placement{{</beta>}}

By default, [Workers](/workers/) and [Pages Functions](/pages/platform/functions/) are invoked in a data center closest to where the request was received. If you are running back-end logic in a Pages Function, it may be more performant to run that Pages Function closer to your back-end infrastructure rather than the end user. Smart Placement (beta) automatically places your workloads in an optimal location that minimizes latency and speeds up your applications.

You may benefit from Smart Placement if you are making multiple round trips to a centralized database, API or origin server in a Pages Function.

## Background

Smart Placement applies to Pages Functions and middleware. Normally, assets are always served globally and closest to your users. 

Smart Placement on Pages currently has some caveats. While assets are always meant to be served from a location closest to the user, there are two exceptions to this behavior:

1. If using middleware for every request (`functions/_middleware.js`) when Smart Placement is enabled, all assets will be served from a location closest to your back-end infrastructure. This may result in an unexpected increase in latency as a result. 

2. When using [`env.ASSETS.fetch`](https://developers.cloudflare.com/pages/platform/functions/advanced-mode/), assets served via the `ASSETS` fetcher from your Pages Function are served from the same location as your Function. This could be the location closest to your back-end infrastructure and not the user. 


{{<Aside type= "note">}}

To understand how Smart Placement works, refer to [Smart Placement](/workers/platform/smart-placement/).

{{</Aside>}}

## Enable Smart Placement (beta)

Smart Placement is available on all plans. 

### Enable Smart Placement via the dashboard

To enable Smart Placement via the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Pages project.
4. Select **Settings** > **Functions**.
5. Under **Placement**, choose **Smart**.
6. Send some initial traffic (approximately 20-30 requests) to your Pages Functions. It takes a few minutes after you have sent traffic to your Pages Function for Smart Placement to take effect.
7. View your Pages Function's [request duration metrics](/workers/learning/metrics-and-analytics) under Functions Metrics.

## Give feedback on Smart Placement

Smart Placement is in beta. To share your thoughts and experience with Smart Placement, join the [Cloudflare Developer Discord](https://discord.gg/cloudflaredev).

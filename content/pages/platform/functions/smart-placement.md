---
pcx_content_type: concept
title: Smart Placement (beta)
---

{{<beta>}}Smart Placement{{</beta>}}

Smart Placement (beta) automatically places your workloads in an optimal location that minimizes latency and speeds up your applications. By default, [Workers](/workers/) and [Pages Functions](/pages/platform/functions/) are invoked in a data center closest to where the request was received. If you are running back-end logic in a Pages Function, it may be more performant to run that Worker closer to your back-end infrastructure rather than the end user. 

You may benefit from Smart Placement if you are making multiple round trips to a centralized database, API or origin server in a Pages Function.

## Background

Smart Placement applies to Pages Functions and middleware. Assets will be served globally. What else should pages users know?

{{<Aside type= "note">}}

For more background and to understand how Smart Placement works visit [Smart Placement](/workers/platform/smart-placement/)

{{</Aside>}}



## Enable Smart Placement (beta)

Smart Placement is avaiable users on all plans. 

### To enable Smart Placement using wrangler:

1. Make sure that you have `wrangler@2.12.0` or later [installed](/workers/wrangler/install-and-update/).
2. Add the following to your `wrangler.toml` file:

    ```toml
    [placement]
    mode = "smart"
    ```
3. Send some initial traffic (approximately 20-30 requests) to your function. It takes a few minutes after you have sent traffic to your Worker for Smart Placement to take effect. 

4. View [request duration metrics](/workers/learning/metrics-and-analytics) about your Function under Functions Metrics.


### To enable Smart Placement on the dashboard:
1. Log in to the Cloudflare dashboard.
2. In Account Home, select Pages.
3. Select a Pages project
4. Select Settings > Functions.
5. Under 'Placement' enable 'Smart' mode 
6. . Send some initial traffic (approximately 20-30 requests) to your Worker. It takes a few minutes after you have sent traffic to your Worker for Smart Placement to take effect. 
7. View [request duration metrics](/workers/learning/metrics-and-analytics) about your Function under Functions Metrics.





## Best practices


## Give feedback on Smart Placement

Smart Placement is in beta. To share your thoughts and experience with Smart Placement, join the [Cloudflare Developer Discord](https://discord.gg/cloudflaredev).

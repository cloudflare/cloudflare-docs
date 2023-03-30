---
pcx_content_type: concept
title: Smart Placement (beta)
---

{{<beta>}}Smart Placement{{</beta>}}

Smart Placement (beta) automatically places your workloads in an optimal location that minimizes latency and speeds up your applications. By default, [Workers](/workers/) are invoked in a data center closest to where the request was received. If you are running back-end logic in a Worker, it may be more performant to run that Worker closer to your back-end infrastructure rather than the end user. 

You may benefit from Smart Placement if you are:

* Building APIs.
* Serving assets. 
* Enriching and transforming data.
* Making multiple round trips to a database or origin server with a Worker. 

With Smart Placement, Cloudflare automatically places your workloads in an optimal location that minimizes latency and improves your Worker application's speed.

## Understand Smart Placement (beta)

Smart Placement is enabled on a per-Worker basis. Once enabled, a placement solver algorithm runs regularly to analyze subrequests from the Worker. This algorithm determines the optimal placement to minimize the round-trip time (RTT) between the Worker and the back-end service(s) the Worker is communicating with. 

Smart Placement is only active for Workers that make multiple roundtrips (more than or equal to two roundtrips) to back-end infrastructure. If your Worker only does a single subrequest to your back-end infrastructure, the Smart Placement algorithm will not move your Worker. If the Worker has multiple back-end services, the algorithm determines the best placement for the Worker that will minimize total overall RTT. 

Smart Placement is a best-effort attempt. If it is more performant to not move the Worker, (for example, if you are using a distributed back end) the algorithm will take no action.  

## Enable Smart Placement (beta)

Access to Smart Placement is enabled on a per-account basis. To sign up for Smart Placement access, complete the [Workers Smart Placement Beta Signup form](https://docs.google.com/forms/d/1A36Vn5o14UvTg4rPk6fklwkp_Jq4Bajvs3N55PJZpe4/viewform?edit_requested=true).

Smart Placement is enabled on a per-Worker level. To enable Smart Placement:

1. Make sure that you have `wrangler@2.12.0` or later [installed](/workers/wrangler/install-and-update/).
2. Add the following to your Worker project's `wrangler.toml` file:

    ```toml
    [unsafe.metadata.placement]
    mode = "smart"
    ```

3. Send some initial traffic (approximately 20-30 requests) to your Worker. It takes a few minutes after you have sent traffic to your Worker for Smart Placement to take effect. 

{{<Aside type="note" header="Database Connectors and Socket Workers">}}

If you are connecting to a database through Workers, complete the [Database Connectors and Socket Workers sign-up form](https://www.cloudflare.com/database-connectors-early-access/) and share what you are building. We are working on outbound support for TCP connections and, eventually, adding native ways to connect to databases using Workers. Your use cases will help guide the services that we add support for.

{{</Aside>}}

## Give feedback on Smart Placement

Smart Placement is in beta. To share your thoughts and experience with Smart Placement, join the [Cloudflare Developer Discord](https://discord.gg/cloudflaredev).

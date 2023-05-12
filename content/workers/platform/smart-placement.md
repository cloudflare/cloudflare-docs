---
pcx_content_type: concept
title: Smart Placement (beta)
---

{{<beta>}}Smart Placement{{</beta>}}

By default, [Workers](/workers/) and [Pages Functions](/pages/platform/functions/) are invoked in a data center closest to where the request was received. If you are running back-end logic in a Worker, it may be more performant to run that Worker closer to your back-end infrastructure rather than the end user. Smart Placement (beta) automatically places your workloads in an optimal location that minimizes latency and speeds up your applications. 

You may benefit from Smart Placement if you are making multiple round trips to a centralized database, API or origin server in a Worker. 


## Background
The following example walks through how moving your Worker close to your backend services could decrease application latency:

You have a user in Sydney, Australia who’s accessing an application running on Workers. This application makes multiple round trips to a database located in Frankfurt, Germany in order to serve the user’s request. 

![A user located in Sydney, AU connecting to a Worker in the same region which then makes multiple round trips to a database located in Frankfurt, DE. ](../media/workers-smart-placement-disabled.png)

The bottleneck is the time that it takes the Worker to perform multiple round trips to the database. Instead of request being processed close to the user, with Smart Placement enabled would process it in a data center closest to the database instead. 

![A user located in Sydney, AU connecting to a Worker in Frankfurt, DE which then makes multiple round trips to a database also located in Frankfurt, DE. ](../media/workers-smart-placement-enabled.png)


## Understand how Smart Placement (beta) works

Smart Placement is enabled on a per-Worker basis. Once enabled, fetch requests (also known as subrequests) from your Worker are analyzed regularly. The Smart Placement algorithm determines the optimal placement to minimize the round-trip time (RTT) between the Worker and the back-end service the Worker is communicating with. 

Smart Placement is only active for Workers that **make multiple roundtrips (two or more roundtrips)** to back-end infrastructure. If your Worker only does a single subrequest to your back-end infrastructure, Smart Placement will run the Worker at the data center closest to the user.  

Smart Placement is a best-effort attempt. Smart Placement will not take action unless it's more performant than the default (running the Worker at the data center closest to the user).

### Supported backends

There are some back-end services that are not considered by the Smart Placement algorithm:

- **Globally distributed services**: If the services that your Worker communicates with are geo-distributed in many regions (eg. CDNs, distributed databases, distributed APIs), Smart Placement isn’t a good fit. We automatically rule these out of the Smart Placement optimization. 
    - Examples: Google APIs, services using Fastly or Akamai's CDN


- **Analytics or logging services**: Requests to analytics or logging services shouldn't be in the critical path of your application. [`waitUntil()`](/workers/runtime-apis/fetch-event/?ref=blog.cloudflare.com#waituntil) should be used so that the response back to users isn’t blocked when instrumenting your code. Since `waitUntil()` doesn’t impact the request duration from a user’s perspective, we automatically rule analytics/logging services out of the Smart Placement optimization. 
    - Examples: New Relic, Datadog, Tinybird, Grafana, Amplitude, Honeycomb

## Enable Smart Placement (beta)

Smart Placement is available users on all Workers plans. 

### To enable Smart Placement using wrangler:

1. Make sure that you have `wrangler@2.20.0` or later [installed](/workers/wrangler/install-and-update/).
2. Add the following to your Worker project's `wrangler.toml` file:

    ```toml
    [placement]
    mode = "smart"
    ```

3. Send some initial traffic (approximately 20-30 requests) to your Worker. It takes a few minutes after you have sent traffic to your Worker for Smart Placement to take effect. 

4. View your Worker's [request duration analytics](/workers/learning/metrics-and-analytics).


### Enable Smart Placement via the dashboard

To enable Smart Placement via the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Worker.
4. Select **Settings** > **General**.
5. Under **Placement**, enable **Smart** mode.
6. Send some initial traffic (approximately 20-30 requests) to your Worker. It takes a few minutes after you have sent traffic to your Worker for Smart Placement to take effect.
7. View your Worker's [request duration analytics](/workers/learning/metrics-and-analytics)

## Best Practices

If you're building full-stack applications on Workers, we reccomend splitting up the front-end and back-end logic into different Workers and using [Service Bindings](/workers/platform/smart-placement) to connect the two. 

![Smart Placement and Service Bindings](../media/smart-placement-service-bindings.png)

Enabling Smart Placement on your back-end Worker will invoke it close to your back-end service, while the front-end Worker serves requests close to the user. This architecture maintatins fast, reactive front-ends while also improving latency when the back-end Worker is called.  

## Give feedback on Smart Placement

Smart Placement is in beta. To share your thoughts and experience with Smart Placement, join the [Cloudflare Developer Discord](https://discord.gg/cloudflaredev).

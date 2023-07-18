---
pcx_content_type: concept
title: Smart Placement (beta)
---

{{<beta>}}Smart Placement{{</beta>}}

By default, [Workers](/workers/) and [Pages Functions](/pages/platform/functions/) are invoked in a data center closest to where the request was received. If you are running back-end logic in a Worker, it may be more performant to run that Worker closer to your back-end infrastructure rather than the end user. Smart Placement automatically places your workloads in an optimal location that minimizes latency and speeds up your applications. 

You may benefit from Smart Placement if you are making multiple round trips to a centralized database, API or origin server in a Worker. 


## Background

The following example demonstrates how moving your Worker close to your back-end services could decrease application latency:

You have a user in Sydney, Australia who is accessing an application running on Workers. This application makes multiple round trips to a database located in Frankfurt, Germany in order to serve the user’s request. 

![A user located in Sydney, AU connecting to a Worker in the same region which then makes multiple round trips to a database located in Frankfurt, DE. ](/images/workers/platform/workers-smart-placement-disabled.png)

The issue is the time that it takes the Worker to perform multiple round trips to the database. Instead of the request being processed close to the user, the Cloudflare network, with Smart Placement enabled, would process the request in a data center closest to the database. 

![A user located in Sydney, AU connecting to a Worker in Frankfurt, DE which then makes multiple round trips to a database also located in Frankfurt, DE. ](/images/workers/platform/workers-smart-placement-enabled.png)

## Understand how Smart Placement (beta) works

Smart Placement is enabled on a per-Worker basis. Once enabled, fetch requests (also known as subrequests) from your Worker are analyzed regularly. The Smart Placement algorithm determines the optimal placement to minimize the round-trip time (RTT) between the Worker and the back-end service the Worker is communicating with. 

Smart Placement is only active for Workers that **make more than one roundtrip** to back-end infrastructure. If your Worker does less than one subrequest on average, Smart Placement will run the Worker at the data center closest to the user.  

Smart Placement is a best-effort attempt. Smart Placement will not take action unless it is more performant than the default (which is running the Worker at the data center closest to the user).

### Unsupported back-end services

There are some back-end services that are not considered by the Smart Placement algorithm:

- **Globally distributed services**: If the services that your Worker communicates with are geo-distributed in many regions (for example, CDNs, distributed databases, distributed APIs), Smart Placement is not a good fit. We automatically rule these out of the Smart Placement optimization. 
    - Examples: Google APIs, services using Fastly or Akamai's CDN.


- **Analytics or logging services**: Requests to analytics or logging services should not be in the critical path of your application. [`waitUntil()`](/workers/runtime-apis/fetch-event/?ref=blog.cloudflare.com#waituntil) should be used so that the response back to users is not blocked when instrumenting your code. Since `waitUntil()` does not impact the request duration from a user’s perspective, we automatically rule analytics and logging services out of the Smart Placement optimization. 
    - Examples: New Relic, Datadog, Tinybird, Grafana, Amplitude, Honeycomb.

## Enable Smart Placement (beta)

Smart Placement is available to users on all Workers plans.

Smart Placement is intended for latency-sensitive Workers and as such, does not currently work with [Cron Triggers](/workers/configuration/cron-triggers/).

### Enable Smart Placement via Wrangler

To enable Smart Placement via Wrangler:

1. Make sure that you have `wrangler@2.20.0` or later [installed](/workers/wrangler/install-and-update/).
2. Add the following to your Worker project's `wrangler.toml` file:

    ```toml
    [placement]
    mode = "smart"
    ```

3. Send some initial traffic (approximately 20-30 requests) to your Worker. It takes a few minutes after you have sent traffic to your Worker for Smart Placement to take effect. 

4. View your Worker's [request duration analytics](/workers/observability/metrics-and-analytics/).


### Enable Smart Placement via the dashboard

To enable Smart Placement via the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. In **Overview**,select your Worker.
4. Select **Settings** > **General**.
5. Under **Placement**, choose **Smart**.
6. Send some initial traffic (approximately 20-30 requests) to your Worker. It takes a few minutes after you have sent traffic to your Worker for Smart Placement to take effect.
7. View your Worker's [request duration analytics](/workers/observability/metrics-and-analytics/)

## Observability

### Placement Status

A Worker's metadata contains details about a Worker's placement status. Query your Worker's placement status through the following Workers API endpoint:

```bash
$ curl -X GET https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/workers/services/{WORKER_NAME} \
-H "Authorization: Bearer <TOKEN>" \ 
-H "Content-Type: application/json" | jq .
```

Possible placement states include:
- _(not present)_: The Worker has not been analyzed for Smart Placement yet.
- `INSUFFICIENT_INVOCATIONS`: Not enough requests for Smart Placement to make a placement decision.
- `NO_VALID_HOSTS`: The Worker does not send subrequests to [back-end services supported by Smart Placement](/workers/configuration/smart-placement/#supported-back-end-services).
- `INSUFFICIENT_SUBREQUESTS`: The Worker does not send enough subrequests to valid back-end services.
- `SUCCESS`: The Worker has been successfully analyzed and will be optimized by Smart Placement.

### Request Duration Analytics

Once Smart Placement is enabled, data about request duration gets collected. Request duration is measured at the data center closest to the end user. 

By default, one percent (1%) of requests are not routed with Smart Placement. These requests serve as a baseline to compare to. 

### `cf-placement` header

Once Smart Placement is enabled, Cloudflare adds a `cf-placement` header to all requests. This can be used to check whether a request has been routed with Smart Placement and where the Worker is processing the request (which is shown as the nearest airport code to the data center).

For example, the `cf-placement: remote-LHR` header's `remote` value indicates that the request was routed using Smart Placement to a Cloudflare data center near London. The `cf-placement: local-EWR` header's `local` value indicates that the request was not routed using Smart Placement and the Worker was invoked in a data center closest to where the request was received, close to Newark Liberty International Airport (EWR).

{{<Aside type="warning" header="Beta use only">}}

We may remove the `cf-placement` header before Smart Placement enters general availability.

{{</Aside>}}


## Best practices

If you are building full-stack applications on Workers, we recommend splitting up the front-end and back-end logic into different Workers and using [Service Bindings](/workers/runtime-apis/service-bindings/) to connect your front-end logic and back-end logic Workers. 

![Smart Placement and Service Bindings](/images/workers/platform/smart-placement-service-bindings.png)

Enabling Smart Placement on your back-end Worker will invoke it close to your back-end service, while the front-end Worker serves requests close to the user. This architecture maintains fast, reactive front-ends while also improving latency when the back-end Worker is called.  

## Give feedback on Smart Placement

Smart Placement is in beta. To share your thoughts and experience with Smart Placement, join the [Cloudflare Developer Discord](https://discord.gg/cloudflaredev).

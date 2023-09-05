---
pcx_content_type: concept
title: Metrics and analytics
---

# Metrics and analytics

There are two graphical sources of information about your Workers traffic at a given time: Workers Metrics and zone-based Workers analytics. Workers metrics can help you diagnose issues and understand your Workers workloads by showing performance and usage of your Workers. If your Worker runs on a route on a zone, or on a few zones, go to **Workers & Pages** and select your Worker in your zone's Cloudflare dashboard to understand on a per-zone basis how much traffic your Worker is handling, and how many requests your site is getting.

---

## Workers metrics

Workers metrics aggregate request data for an individual Worker script (if your Worker is running across multiple domains, and on `*.workers.dev`, metrics will aggregate requests across them). To view your Worker's metrics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker to view its metrics.

There are two metrics that can help you understand the health of your Worker in a given moment: requests success and error metrics, and invocation statuses.

### Requests

The first graph shows historical request counts from the Workers runtime broken down into successful requests, errored requests, and subrequests.

- **Total**: All incoming requests registered by a Worker script. Requests blocked by [WAF](https://www.cloudflare.com/waf/) or other security features will not count.
- **Success**: Requests that returned a Success or Client Disconnected invocation status.
- **Errors**: Requests that returned a Script Threw Exception, Exceeded Resources, or Internal Error invocation status — refer to Invocation Statuses below for a breakdown of where your errors are coming from.
- **Subrequests**: Requests triggered by calling `fetch` from within a Worker script. A subrequest that throws an uncaught error will not be counted.

Request traffic data may display a drop off near the last few minutes displayed in the graph for time ranges less than six hours. This does not reflect a drop in traffic, but a slight delay in aggregation and metrics delivery.

### Invocation statuses

Worker invocation statuses indicate whether a Worker script executed successfully or failed to generate a response in the Workers runtime. Invocation statuses differ from HTTP status codes. In some cases, a Worker script invocation succeeds but does not generate a successful HTTP status because of another error encountered outside of the Workers runtime. Some invocation statuses result in a [Workers error code](/workers/observability/log-from-workers/#error-pages-generated-by-workers) being returned to the client.

{{<table-wrap>}}

| Invocation status      | Definition                                                                   | Workers error code | GraphQL field          |
| ---------------------- | ---------------------------------------------------------------------------- | ------------------ | ---------------------- |
| Success                | Worker script executed successfully                                          |                    | `success`              |
| Client disconnected    | HTTP client (that is, the browser) disconnected before the request completed |                    | `clientDisconnected`   |
| Script threw exception | Worker script threw an unhandled JavaScript exception                        | 1101               | `scriptThrewException` |
| Exceeded resources¹    | Worker script exceeded runtime limits                                        | 1102, 1027         | `exceededResources`    |
| Internal error²        | Workers runtime encountered an error                                         |                    | `internalError`        |

{{</table-wrap>}}

¹ The Exceeded Resources status may appear when the Worker exceeds a [runtime limit](/workers/platform/limits/#request-limits). The most common cause is excessive CPU time, but is also caused by a script exceeding startup time or free tier limits.

² The Internal Error status may appear when the Workers runtime fails to process a request due to an internal failure in our system. These errors are not caused by any issue with the Worker code nor any resource limit. While requests with Internal Error status are rare, some may appear during normal operation. These requests are not counted towards usage for billing purposes. If you notice an elevated rate of requests with Internal Error status, review [www.cloudflarestatus.com](https://www.cloudflarestatus.com/).

To further investigate exceptions, use [`wrangler tail`](/workers/wrangler/commands/#tail).

### CPU Time per execution

The CPU Time per execution chart shows historical CPU time data broken down into relevant quantiles using [reservoir sampling](https://en.wikipedia.org/wiki/Reservoir_sampling). Learn more about [interpreting quantiles](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). In some cases, higher quantiles may appear to exceed [CPU time limits](/workers/platform/limits/#cpu-time) without generating invocation errors because of a mechanism in the Workers runtime that allows rollover CPU time for requests below the CPU limit.

### Execution duration

The Duration per execution chart shows historical [duration](/workers/platform/limits/#duration) per Worker execution. The data is broken down into relevant quantiles, similar to the CPU time chart. Learn more about [interpreting quantiles](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). Understanding duration on your Worker is especially useful when you are intending to do a significant amount of computation on the Worker itself.

Workers on the [Bundled Usage Model](/workers/platform/pricing/#usage-models) may have high durations, even with a 50 ms CPU time limit, if they are running many network-bound operations like `fetch` requests, and waiting on responses.

### Request duration

The request duration per execution chart is currently only available when your Worker has [Smart Placement](/workers/configuration/smart-placement) enabled. Request duration shows how long it took your Worker to respond to requests, including execution duration and network latency.

The data shows the duration for requests with Smart Placement enabled compared to those with Smart Placement disabled (by default 1% of requests are routed with Smart Placement disabled). The chart shows a histogram with duration across the x-axis and the percentage of requests that fall into the corresponding duration on the y-axis.


### Egress data

The egress data chart shows the total amount of data sent out of the Worker over the selected time period. The data is broken into subrequest and response body to help with understanding when and where the data is being sent out from.

### Metrics retention

Worker script metrics can be inspected for up to three months in the past in maximum increments of one week. The dashboard includes the charts and information described below.

---

## Zone analytics

Aggregates request data for all scripts assigned to any [routes](/workers/configuration/routing/routes/) defined for a zone. Find Zone Metrics in **Analytics** > **Workers** in your [Cloudflare dashboard](https://dash.cloudflare.com/?zone=analytics/workers).

Zone data can be scoped by time range within the last 30 days. The dashboard includes charts and information described below.

### Subrequests

This chart shows subrequests — requests triggered by calling `fetch` from within a Worker script — broken down by cache status.

- **Uncached**: requests answered directly by your origin server or other servers responding to subrequests.
- **Cached**: requests answered by Cloudflare’s [cache](https://www.cloudflare.com/learning/cdn/what-is-caching/). As Cloudflare caches more of your content, it accelerates content delivery and reduces load on your origin.

### Bandwidth

This chart shows historical bandwidth usage for all scripts on a zone broken down by cache status.

### Status codes

This chart shows historical requests for all scripts on a zone broken down by HTTP status code.

### Total requests

This chart shows historical data for all scripts on a zone broken down by successful requests, failed requests, and subrequests. These request types are categorized by HTTP status code where `200`-level requests are successful and `400` to `500`-level requests are failed.

---

## GraphQL

Worker script metrics are powered by GraphQL. Learn more about querying our data sets in the [Querying Workers Metrics with GraphQL tutorial](/analytics/graphql-api/tutorials/querying-workers-metrics/).

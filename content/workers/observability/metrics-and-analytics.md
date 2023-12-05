---
pcx_content_type: concept
title: Metrics and analytics
meta:
  description: Diagnose issues with Workers metrics, and review request data for a zone with Workers analytics.
---

# Metrics and analytics

There are two graphical sources of information about your Workers traffic at a given time: Workers metrics and zone-based Workers analytics.

Workers metrics can help you diagnose issues and understand your Workers' workloads by showing performance and usage of your Workers. If your Worker runs on a route on a zone, or on a few zones, Workers metrics will show how much traffic your Worker is handling on a per-zone basis, and how many requests your site is getting.

Zone analytics show how much traffic all Workers assigned to a zone are handling.

## Workers metrics

Workers metrics aggregate request data for an individual Worker (if your Worker is running across multiple domains, and on `*.workers.dev`, metrics will aggregate requests across them). To view your Worker's metrics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker to view its metrics.

There are two metrics that can help you understand the health of your Worker in a given moment: requests success and error metrics, and invocation statuses.

### Requests

The first graph shows historical request counts from the Workers runtime broken down into successful requests, errored requests, and subrequests.

- **Total**: All incoming requests registered by a Worker. Requests blocked by [WAF](https://www.cloudflare.com/waf/) or other security features will not count.
- **Success**: Requests that returned a Success or Client Disconnected invocation status.
- **Errors**: Requests that returned a Script Threw Exception, Exceeded Resources, or Internal Error invocation status — refer to [Invocation Statuses](/workers/observability/metrics-and-analytics/#invocation-statuses) for a breakdown of where your errors are coming from.

Request traffic data may display a drop off near the last few minutes displayed in the graph for time ranges less than six hours. This does not reflect a drop in traffic, but a slight delay in aggregation and metrics delivery.

### Subrequests

Subrequests are requests triggered by calling `fetch` from within a Worker. A subrequest that throws an uncaught error will not be counted.

- **Total**: All subrequests triggered by calling `fetch` from within a Worker.
- **Cached**: The number of cached responses returned.
- **Uncached**: The number of uncached responses returned.

### Execution duration

The Duration per request chart shows historical [duration](/workers/platform/limits/#duration) per Worker invocation. The data is broken down into relevant quantiles, similar to the CPU time chart. Learn more about [interpreting quantiles](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). Understanding duration on your Worker is especially useful when you are intending to do a significant amount of computation on the Worker itself.

### CPU Time per execution

The CPU Time per execution chart shows historical CPU time data broken down into relevant quantiles using [reservoir sampling](https://en.wikipedia.org/wiki/Reservoir_sampling). Learn more about [interpreting quantiles](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). In some cases, higher quantiles may appear to exceed [CPU time limits](/workers/platform/limits/#cpu-time) without generating invocation errors because of a mechanism in the Workers runtime that allows rollover CPU time for requests below the CPU limit.

### Invocation statuses

To review invocation statuses:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. Select your Worker.
4. Find the **Summary** graph in **Metrics**.
5. Select **Errors**.

Worker invocation statuses indicate whether a Worker executed successfully or failed to generate a response in the Workers runtime. Invocation statuses differ from HTTP status codes. In some cases, a Worker invocation succeeds but does not generate a successful HTTP status because of another error encountered outside of the Workers runtime. Some invocation statuses result in a [Workers error code](/workers/observability/errors/#error-pages-generated-by-workers) being returned to the client.

{{<table-wrap>}}

| Invocation status      | Definition                                                                   | Workers error code | GraphQL field          |
| ---------------------- | ---------------------------------------------------------------------------- | ------------------ | ---------------------- |
| Success                | Worker executed successfully                                                 |                    | `success`              |
| Client disconnected    | HTTP client (that is, the browser) disconnected before the request completed |                    | `clientDisconnected`   |
| Script threw exception | Worker threw an unhandled JavaScript exception                               | 1101               | `scriptThrewException` |
| Exceeded resources¹    | Worker exceeded runtime limits                                               | 1102, 1027         | `exceededResources`    |
| Internal error²        | Workers runtime encountered an error                                         |                    | `internalError`        |

{{</table-wrap>}}

¹ The Exceeded Resources status may appear when the Worker exceeds a [runtime limit](/workers/platform/limits/#request-limits). The most common cause is excessive CPU time, but is also caused by a Worker exceeding startup time or free tier limits.

² The Internal Error status may appear when the Workers runtime fails to process a request due to an internal failure in our system. These errors are not caused by any issue with the Worker code nor any resource limit. While requests with Internal Error status are rare, some may appear during normal operation. These requests are not counted towards usage for billing purposes. If you notice an elevated rate of requests with Internal Error status, review [www.cloudflarestatus.com](https://www.cloudflarestatus.com/).

To further investigate exceptions, use [`wrangler tail`](/workers/wrangler/commands/#tail).

### Request duration

The request duration chart shows how long it took your Worker to respond to requests, including execution duration and network latency. The request duration chart is currently only available when your Worker has [Smart Placement](/workers/configuration/smart-placement) enabled. 

In contrast to [execution duration](/workers/observability/metrics-and-analytics/#execution-duration), which measures only the time a Worker is active, request duration measures from the time a request comes into a data center until a request is delivered.

The data shows the duration for requests with Smart Placement enabled compared to those with Smart Placement disabled (by default, 1% of requests are routed with Smart Placement disabled). The chart shows a histogram with duration across the x-axis and the percentage of requests that fall into the corresponding duration on the y-axis.

### Metrics retention

Worker metrics can be inspected for up to three months in the past in maximum increments of one week.

## Zone analytics

Zone analytics aggregate request data for all Workers assigned to any [routes](/workers/configuration/routing/routes/) defined for a zone.

To review zone metrics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select your site.
3. In **Analytics & Logs**, select **Workers**.

Zone data can be scoped by time range within the last 30 days. The dashboard includes charts and information described below.

### Subrequests

This chart shows subrequests — requests triggered by calling `fetch` from within a Worker — broken down by cache status.

- **Uncached**: Requests answered directly by your origin server or other servers responding to subrequests.
- **Cached**: Requests answered by Cloudflare’s [cache](https://www.cloudflare.com/learning/cdn/what-is-caching/). As Cloudflare caches more of your content, it accelerates content delivery and reduces load on your origin.

### Bandwidth

This chart shows historical bandwidth usage for all Workers on a zone broken down by cache status.

### Status codes

This chart shows historical requests for all Workers on a zone broken down by HTTP status code.

### Total requests

This chart shows historical data for all Workers on a zone broken down by successful requests, failed requests, and subrequests. These request types are categorized by HTTP status code where `200`-level requests are successful and `400` to `500`-level requests are failed.

## GraphQL

Worker metrics are powered by GraphQL. Learn more about querying our data sets in the [Querying Workers Metrics with GraphQL tutorial](/analytics/graphql-api/tutorials/querying-workers-metrics/).
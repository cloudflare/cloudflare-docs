---
order: 10
---

# Metrics and analytics

There are two graphical sources of information about your Workers traffic at a given time: Workers Metrics and zone-based Workers analytics. Workers metrics can help you diagnose issues and understand your Workers workloads by showing performance and usage of your Workers. If your Worker runs on a route on a zone, or on a few zones, the Workers tab in the zone can help you understand on a per-zone basis how much traffic your Worker is handling, and how many requests your site is getting.

--------------------------------

## Workers metrics

Workers metrics aggregate request data for an individual Worker script (if your Worker is running across multiple domains, and on workers.dev, metrics will aggregate requests across them). You can click on any Worker to view its metrics in your [Workers dashboard](https://dash.cloudflare.com/?account=workers/overview).

There are two metrics that can help you understand the health of your Worker in a given moment: requests success and error metrics, and invocation statuses.

### Requests

The first graph shows historical request counts from the Workers runtime broken down into successful requests, errored requests, and subrequests.

- **Total**: All incoming requests registered by a Worker script. Requests blocked by [WAF](https://www.cloudflare.com/waf/) or other security features will not count.
- **Success**: Requests that returned a Success or Client Disconnected invocation status.
- **Errors**: Requests that returned a Script Threw Exception, Exceeded Resources, or Internal Error invocation status — see Invocation Statuses below for a breakdown of where your errors are coming from.
- **Subrequests**: Requests triggered by calling `fetch` from within a Worker script. A subrequest that throws an uncaught error will not be counted.

Note: request traffic data may display a "drop off" near the last few minutes displayed in the graph for time ranges less than six hours. This does not reflect a drop in traffic, but a slight delay in aggregation and metrics delivery.

### Invocation statuses

Worker invocation statuses indicate whether a Worker script executed successfully or failed to generate a response in the Workers runtime. Invocation statuses differ from HTTP status codes. In some cases, a Worker script invocation succeeds but does not generate a successful HTTP status because of another error encountered outside of the Workers runtime. Some invocation statuses result in a [Workers error code](/learning/debugging-workers#error-pages-generated-by-workers) being returned to the client.

<TableWrap>

| Invocation status      | Definition                                                               | Workers error code | GraphQL field          |
| ---------------------- | ------------------------------------------------------------------------ | ------------------ | ---------------------- |
| Success                | Worker script executed successfully                                      |                    | `success`              |
| Client disconnected    | HTTP client (i.e. the browser) disconnected before the request completed |                    | `clientDisconnected`   |
| Script threw exception | Worker script threw an unhandled JavaScript exception                    | 1101               | `scriptThrewException` |
| Exceeded resources¹    | Worker script exceeded runtime limits                                    | 1102, 1027         | `exceededResources`    |
| Internal error²        | Workers runtime encountered an error                                     |                    | `internalError`        |

</TableWrap>

_¹ The Exceeded Resources status may appear when the Worker exceeds a [runtime limit](/platform/limits#request-limits). The most common cause is excessive CPU time, but is also caused by a script exceeding startup time or free tier limits._

_² The Internal Error status may appear when the Workers runtime fails to process a request due to an internal failure in our system. These errors are not caused by any issue with the Worker code nor any resource limit. While requests with Internal Error status are rare, we expect that some may appear during normal operation. These requests are not counted towards usage for billing purposes. If you notice an elevated rate of requests with Internal Error status, please check www.cloudflarestatus.com._

To further investigate exceptions, you can use [wrangler tail](/cli-wrangler/commands#tail)

### CPU time

The CPU time chart shows historical CPU time data broken down into relevant quantiles using [reservoir sampling](https://en.wikipedia.org/wiki/Reservoir_sampling). You can [learn more about interpreting quantiles](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). In some cases, higher quantiles may appear to exceed [CPU time limits](/platform/limits#cpu-runtime) without generating invocation errors because of a mechanism in the Workers runtime that allows rollover CPU time for requests below the CPU limit.

### Metrics retention

Worker script metrics can be inspected for up to 3 months in the past in maximum increments of 1 week. The dashboard includes the charts and information described below.

--------------------------------

## Zone analytics

Aggregates request data for all scripts assigned to any [routes](/platform/routes) defined for a zone. You’ll find Zone Metrics on the [analytics tab](https://dash.cloudflare.com/?zone=analytics/workers) of your Cloudflare dashboard.

Zone data can be scoped by time range within the last 30 days. The dashboard includes charts and information described below.

### Subrequests

This chart shows subrequests — requests triggered by calling `fetch` from within a Worker script — broken down by cache status.

- **Uncached**: requests answered directly by your origin server or other servers responding to subrequests
- **Cached**: requests answered by Cloudflare’s [cache](https://www.cloudflare.com/learning/cdn/what-is-caching/). As Cloudflare caches more of your content, it accelerates content delivery and reduces load on your origin.

### Bandwidth

This chart shows historical bandwidth usage for all scripts on a zone broken down by cache status.

### Status codes

This chart shows historical requests for all scripts on a zone broken down by HTTP status code.

### Total requests

This chart shows historical data for all scripts on a zone broken down by successful requests, failed requests, and subrequests. These request types are categorized by HTTP status code where 200-level requests are successful and 400 to 500-level requests are failed.

--------------------------------

## GraphQL

Worker script metrics are powered by GraphQL. Learn more about querying our data sets in this [tutorial](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/).

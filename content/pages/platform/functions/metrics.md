---
pcx_content_type: reference
title: Metrics
weight: 11
---

# Metrics

Functions metrics can help you diagnose issues and understand your workloads by showing performance and usage data for your Functions.

## Functions metrics

Functions metrics aggregate request data for an individual Pages project. To view your Functions metrics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages**.
3. In your Pages project, select **Functions Metrics**.

There are three metrics that can help you understand the health of your Function: 

1. Requests success.
2. Requests errors.
3. Invocation Statuses.

### Requests

In **Functions metrics**, you can see historical request counts broken down into total requests, successful requests and errored requests. Information on subrequests is available by selecting **Subrequests**.

* **Total**: All incoming requests registered by a Function. Requests blocked by [Web Application Firewall (WAF)](https://www.cloudflare.com/waf/) or other security features will not count.
* **Success**: Requests that returned a `Success` or `Client Disconnected` [invocation status](#invocation-statuses). 
* **Errors**: Requests that returned a `Script Threw Exception`, `Exceeded Resources`, or `Internal Error` [invocation status](#invocation-statuses)
* **Subrequests**: Requests triggered by calling `fetch` from within a Function. When your Function fetches a static asset, it will count as a subrequest. A subrequest that throws an uncaught error will not be counted.

Request traffic data may display a drop off near the last few minutes displayed in the graph for time ranges less than six hours. This does not reflect a drop in traffic, but a slight delay in aggregation and metrics delivery.

### Invocation statuses

Function invocation statuses indicate whether a Function executed successfully or failed to generate a response in the Workers runtime. Invocation statuses differ from HTTP status codes. In some cases, a Function invocation succeeds but does not generate a successful HTTP status because of another error encountered outside of the Workers runtime. Some invocation statuses result in a Workers error code being returned to the client.

| Invocation status | Definition | Workers error code | Graph QL field | 
| --- | --- | --- | --- | 
| Success | Worker script executed successfully | | success | 
| Client disconnected | HTTP client disconnected before the request completed | | clientDisconnected |
| Script threw exception | Worker script threw an unhandled JavaScript exception | 1101 | scriptThrewException |
| Exceeded resources^1 | Worker script exceeded runtime limits | 1102, 1027 | exceededResources | 
| Internal error^2 | Workers runtime encountered an error | | internalError | 

1. The Exceeded Resources status may appear when the Worker exceeds a [runtime limit](/workers/platform/limits/#request-limits). The most common cause is excessive CPU time, but is also caused by a script exceeding startup time or free tier limits.
2. The Internal Error status may appear when the Workers runtime fails to process a request due to an internal failure in our system. These errors are not caused by any issue with the Function code nor any resource limit. While requests with Internal Error status are rare, some may appear during normal operation. These requests are not counted towards usage for billing purposes. If you notice an elevated rate of requests with Internal Error status, review www.cloudflarestatus.com.

To further investigate exceptions, refer to [Debugging and Logging](/pages/platform/functions/debugging-and-logging)

### CPU time per execution

The CPU Time per execution chart shows historical CPU time data broken down into relevant quantiles using [reservoir sampling](https://en.wikipedia.org/wiki/Reservoir_sampling).  Learn more about [interpreting quantiles](https://www.statisticshowto.com/quantile-definition-find-easy-steps/). 

In some cases, higher quantiles may appear to exceed [CPU time limits](/workers/platform/limits/#cpu-runtime) without generating invocation errors because of a mechanism in the Workers runtime that allows rollover CPU time for requests below the CPU limit.

### Duration per execution

The **Duration** chart underneath **Median CPU time** in the **Functions metrics** dashboard shows historical [duration](/workers/platform/limits/#duration) per Function execution. The data is broken down into relevant quantiles, similar to the CPU time chart. 

Understanding duration on your Function is useful when you are intending to do a significant amount of computation on the Function itself. This is because you may have to use the Unbound usage model which allows up to 30 seconds of CPU time. The Unbound model is charged on duration, refer to [Pricing](/workers/platform/pricing/#workers) for more information. 

Workers on the [Bundled Usage Model](/workers/platform/pricing/#usage-models) may have high durations, even with a 50 ms CPU time limit, if they are running many network-bound operations like fetch requests and waiting on responses.

### Metrics retention

Functions metrics can be inspected for up to three months in the past in maximum increments of one week. The **Functions metrics** dashboard in your Pages project includes the charts and information described above.
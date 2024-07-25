---
pcx_content_type: concept
title: Limits
weight: 2
meta:
  description: Cloudflare Workers plan and platform limits.
---

# Limits

## Account plan limits

| Feature                                                                         | Workers Free      | Workers Paid ([Bundled](/workers/platform/pricing/#example-pricing-bundled-usage-model),  [Unbound](/workers/platform/pricing/#example-pricing-unbound-usage-model)) and [Standard](/workers/platform/pricing/#example-pricing-standard-usage-model)      |
| ------------------------------------------------------------------------------- | --------- | --------- |
| [Subrequests](#subrequests)                                                     | 50/request| 50/request ([Bundled](/workers/platform/pricing/#example-pricing-bundled-usage-model)),<br> 1000/request ([Unbound](/workers/platform/pricing/#example-pricing-unbound-usage-model), [Standard](/workers/platform/pricing/#example-pricing-standard-usage-model))|
| [Simultaneous outgoing<br/>connections/request](#simultaneous-open-connections) | 6         | 6         |
| [Environment variables](#environment-variables)                                 | 64/Worker | 128/Worker |
| [Environment variable<br/>size](#environment-variables)                         | 5 KB      | 5 KB      |
| [Worker size](#worker-size)                                                     | 1 MB      | 10 MB      |
| [Worker startup time](#worker-startup-time)                                     | 400 ms    | 400 ms    |
| [Number of Workers](#number-of-workers)<sup>1</sup>                                         | 100       | 500       |
| Number of [Cron Triggers](/workers/configuration/cron-triggers/)<br/>per account| 5         | 250       |

<sup>1</sup> If you are running into Workers script limits, your project may be a good fit for [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/).

{{<render file="_limits_increase.md">}}

---

## Request limits

URLs have a limit of 16 KB.

Request headers observe a total limit of 32 KB, but each header is limited to 16 KB.

Cloudflare has network-wide limits on the request body size. This limit is tied to your Cloudflare account's plan, which is separate from your Workers plan. When the request body size of your `POST`/`PUT`/`PATCH` requests exceed your plan's limit, the request is rejected with a `(413) Request entity too large` error.

Cloudflare Enterprise customers may contact their account team or [Cloudflare Support](/support/contacting-cloudflare-support/) to have a request body limit beyond 500 MB.

| Cloudflare Plan | Maximum body size  |
| --------------- | -------------------|
| Free            | 100 MB             |
| Pro             | 100 MB             |
| Business        | 200 MB             |
| Enterprise      | 500 MB (by default)|

---

## Response limits

Cloudflare does not enforce response limits, but cache limits for [Cloudflare's CDN are observed](/cache/concepts/default-cache-behavior/). Maximum file size is 512 MB for Free, Pro, and Business customers and 5 GB for Enterprise customers.

---

## Worker limits

{{<table-wrap>}}

| Feature                     | Free                                       | [Bundled usage model](/workers/platform/pricing/#example-pricing-bundled-usage-model) | [Unbound](/workers/platform/pricing/#example-pricing-unbound-usage-model) and [Standard](/workers/platform/pricing/#example-pricing-standard-usage-model) usage model|
| --------------------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------------------- | --- |
| [Request](#request)         | 100,000 requests/day<br/>1000 requests/min | none                                        | none                                        |
| [Worker memory](#memory)    | 128 MB                                     | 128 MB                                      | 128 MB                                      |
| [CPU time](#cpu-time) | 10 ms                                      | 50 ms HTTP request <br/> 50 ms [Cron Trigger](/workers/configuration/cron-triggers/) | 30 s HTTP request <br/> 15 min [Cron Trigger](/workers/configuration/cron-triggers/) <br/> 15 min [Queue Consumer](/queues/configuration/javascript-apis/#consumer) |     |
| [Duration](#duration)       |   None                                         |  none                                           | none                                  |

{{</table-wrap>}}

### Duration

Duration is a measurement of wall-clock time — the total amount of time from the start to end of an invocation of a Worker. There is no hard limit on the duration of a Worker. As long as the client that sent the request remains connected, the Worker can continue processing, making subrequests, and setting timeouts on behalf of that request. When the client disconnects, all tasks associated with that client request are canceled. Use [`event.waitUntil()`](/workers/runtime-apis/handlers/fetch/) to delay cancellation for another 30 seconds or until the promise passed to `waitUntil()` completes.

{{<Aside type="note">}}
Cloudflare updates the Workers runtime a few times per week. When this happens, any in-flight requests are given a grace period of 30 seconds to finish. If a request does not finish within this time, it is terminated. While your application should follow the best practice of handling disconnects by retrying requests, this scenario is extremely improbable. To encounter it, you would need to have a request that takes longer than 30 seconds that also happens to intersect with the exact time an update to the runtime is happening.
{{</Aside>}}

### CPU time

CPU time is the amount of time the CPU actually spends doing work, during a given request. Most Workers requests consume less than a millisecond of CPU time. It is rare to find normally operating Workers that exceed the CPU time limit.

{{<render file="_isolate-cpu-flexibility">}}
<br/>

{{<Aside type="note">}}
On the Unbound billing model, scheduled Workers ([Cron Triggers](/workers/configuration/cron-triggers/)) have different limits on CPU time based on the schedule interval. When the schedule interval is less than 1 hour, a Scheduled Worker may run for up to 30 seconds. When the schedule interval is more than 1 hour, a scheduled Worker may run for up to 15 minutes.
{{</Aside>}}

---

## Cache API limits

{{<table-wrap>}}

| Feature                       | Workers Free  | [Bundled](/workers/platform/pricing/#example-pricing-bundled-usage-model) | [Unbound](/workers/platform/pricing/#example-pricing-unbound-usage-model) and [Standard](/workers/platform/pricing/#example-pricing-standard-usage-model) |
| ----------------------------- | ------------- | ------- | ------- |
| [Maximum object size](#cache-api-limits) | 512 MB | 512 MB  | 512 MB  |
| [Calls/request](#cache-api-limits)   | 50     | 50      | 1,000   |

{{</table-wrap>}}

- 50 total `put()`, `match()`, or `delete()` calls per-request, using the same quota as `fetch()`.

{{<Aside type="note">}}

The size of chunked response bodies (`Transfer-Encoding: chunked`) is not known in advance. Then, `.put()`ing such responses will block subsequent `.put()`s from starting until the current `.put()` completes.

{{</Aside>}}

---

## Request

Workers automatically scale onto thousands of Cloudflare global network servers around the world. There is no general limit to the number of requests per second Workers can handle.

Cloudflare’s abuse protection methods do not affect well-intentioned traffic. However, if you send many thousands of requests per second from a small number of client IP addresses, you can inadvertently trigger Cloudflare’s abuse protection. If you expect to receive `1015` errors in response to traffic or expect your application to incur these errors, [contact Cloudflare support](/support/contacting-cloudflare-support/) to increase your limit. Cloudflare's anti-abuse Workers Rate Limiting does not apply to Enterprise customers.

You can also confirm if you have been rate limited by anti-abuse Worker Rate Limiting by logging into the Cloudflare dashboard, selecting your account and zone, and going to **Security** > **Events**. Find the event and expand it. If the **Rule ID** is `worker`, this confirms that it is the anti-abuse Worker Rate Limiting.

The burst rate and daily request limits apply at the account level, meaning that requests on your `*.workers.dev` subdomain count toward the same limit as your zones. Upgrade to a [Workers Paid plan](https://dash.cloudflare.com/?account=workers/plans) to automatically lift these limits.

{{<Aside type="warning">}}

If you are currently being rate limited, upgrade to a [Workers Paid plan](https://dash.cloudflare.com/?account=workers/plans) to lift burst rate and daily request limits.

{{</Aside>}}

### Burst rate

Accounts using the Workers Free plan are subject to a burst rate limit of 1,000 requests per minute. Users visiting a rate limited site will receive a Cloudflare `1015` error page. However if you are calling your Worker programmatically, you can detect the rate limit page and handle it yourself by looking for HTTP status code `429`.

Workers being rate-limited by Anti-Abuse Protection are also visible from the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and your website.
2. Select **Security** > **Events** > scroll to **Activity log**.
3. Review the log for a Web Application Firewall block event with a `ruleID` of `worker`.

### Daily request

Accounts using the Workers Free plan are subject to a daily request limit of 100,000 requests. Free plan daily requests counts reset at midnight UTC. A Worker that fails as a result of daily request limit errors can be configured by toggling its corresponding [route](/workers/configuration/routing/routes/) in two modes: 1) Fail open and 2) Fail closed.

#### Fail open

Routes in fail open mode will bypass the failing Worker and prevent it from operating on incoming traffic. Incoming requests will behave as if there was no Worker.

#### Fail closed

Routes in fail closed mode will display a Cloudflare `1027` error page to visitors, signifying the Worker has been temporarily disabled. Cloudflare recommends this option if your Worker is performing security related tasks.

---

## Memory

Only one Workers instance runs on each of the many global Cloudflare global network servers. Each Workers instance can consume up to 128 MB of memory. Use [global variables](/workers/runtime-apis/web-standards/) to persist data between requests on individual nodes. Note however, that nodes are occasionally evicted from memory.

If a Worker processes a request that pushes the Worker over the 128 MB limit, the Cloudflare Workers runtime may cancel one or more requests. To view these errors, as well as CPU limit overages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages** and in **Overview**, select the Worker you would like to investigate.
3. Under **Metrics**, select **Errors** > **Invocation Statuses** and examine **Exceeded Memory**.

Use the [TransformStream API](/workers/runtime-apis/streams/transformstream/) to stream responses if you are concerned about memory usage. This avoids loading an entire response into memory.

---

## Subrequests

A subrequest is any request that a Worker makes to either Internet resources using the [Fetch API](/workers/runtime-apis/fetch/) or requests to other Cloudflare services like [R2](/r2/), [KV](/kv/), or [D1](/d1/).

### Worker-to-Worker subrequests

To make subrequests from your Worker to another Worker on your account, use [Service Bindings](/workers/runtime-apis/bindings/service-bindings/). Service bindings allow you to send HTTP requests to another Worker without those requests going over the Internet.

If you attempt to use global [`fetch()`](/workers/runtime-apis/fetch/) to make a subrequest to another Worker on your account that runs on the same [zone](/fundamentals/setup/accounts-and-zones/#zones), without service bindings, the request will fail.

If you make a subrequest from your Worker to a target Worker that runs on a [Custom Domain](/workers/configuration/routing/custom-domains/#worker-to-worker-communication) rather than a route, the request will be allowed.

### How many subrequests can I make?

The limit for subrequests a Worker can make is 50 per request on the Bundled usage model or 1,000 per request on the Unbound usage model. Each subrequest in a redirect chain counts against this limit. This means that the number of subrequests a Worker makes could be greater than the number of `fetch(request)` calls in the Worker.

For subrequests to internal services like Workers KV and Durable Objects, the subrequest limit is 1,000 per request, regardless of the [usage model](/workers/platform/pricing/#workers) configured for the Worker.

### How long can a subrequest take?

There is no set limit on the amount of real time a Worker may use. As long as the client which sent a request remains connected, the Worker may continue processing, making subrequests, and setting timeouts on behalf of that request.

When the client disconnects, all tasks associated with that client’s request are proactively canceled. If the Worker passed a promise to [`event.waitUntil()`](/workers/runtime-apis/handlers/fetch/), cancellation will be delayed until the promise has completed or until an additional 30 seconds have elapsed, whichever happens first.

---

## Simultaneous open connections

You can open up to six connections simultaneously, for each invocation of your Worker. The connections opened by the following API calls all count toward this limit:

- the `fetch()` method of the [Fetch API](/workers/runtime-apis/fetch/).
- `get()`, `put()`, `list()`, and `delete()` methods of [Workers KV namespace objects](/kv/api/).
- `put()`, `match()`, and `delete()` methods of [Cache objects](/workers/runtime-apis/cache/).
- `list()`, `get()`, `put()`, `delete()`, and `head()` methods of [R2](/r2/).
- `send()` and `sendBatch()`, methods of [Queues](/queues/).
- Opening a TCP socket using the [`connect()`](/workers/runtime-apis/tcp-sockets/) API.

Once an invocation has six connections open, it can still attempt to open additional connections.

* These attempts are put in a pending queue — the connections will not be initiated until one of the currently open connections has closed.
* Earlier connections can delay later ones, if a Worker tries to make many simultaneous subrequests, its later subrequests may appear to take longer to start.

If you have cases in your application that use `fetch()` but that do not require consuming the response body, you can avoid the unread response body from consuming a concurrent connection by using `response.body.cancel()`.

For example, if you want to check whether the HTTP response code is successful (2xx) before consuming the body, you should explicitly cancel the pending response body:

```ts
let resp = await fetch(url)

// Only read the response body for successful responses
if (resp.statusCode <= 299) {
  // Call resp.json(), resp.text() or otherwise process the body
} else {
  // Explicitly cancel it
  resp.body.cancel()
}
```

This will free up an open connection.

If the system detects that a Worker is deadlocked on open connections — for example, if the Worker has pending connection attempts but has no in-progress reads or writes on the connections that it already has open — then the least-recently-used open connection will be canceled to unblock the Worker.

If the Worker later attempts to use a canceled connection, an exception will be thrown. These exceptions should rarely occur in practice, though, since it is uncommon for a Worker to open a connection that it does not have an immediate use for.

{{<Aside type="note">}}

Simultaneous Open Connections are measured from the top-level request, meaning any connections open from Workers sharing resources (for example, Workers triggered via [Service bindings](/workers/runtime-apis/bindings/service-bindings/)) will share the simultaneous open connection limit.

{{</Aside>}}

---

## Environment variables

The maximum number of environment variables (secret and text combined) for a Worker is 128 variables on the Workers Paid plan, and 64 variables on the Workers Free plan.
There is no limit to the number of environment variables per account.

Each environment variable has a size limitation of 5 KB.

---

## Worker size

A Worker can be up to 10 MB in size _after compression_ on the Workers Paid plan, and up to 1 MB on the Workers Free plan.

You can assess the size of your Worker bundle after compression by performing a dry-run with `wrangler` and reviewing the final compressed (`gzip`) size output by `wrangler`:

```sh
$ wrangler deploy --outdir bundled/ --dry-run

# Output will resemble the below:
Total Upload: 259.61 KiB / gzip: 47.23 KiB
```

Note that larger Worker bundles can impact the start-up time of the Worker, as the Worker needs to be loaded into memory. You should consider removing unnecessary dependencies and/or using [Workers KV](/kv/), a [D1 database](/d1/) or [R2](/r2/) to store configuration files, static assets and binary data instead of attempting to bundle them within your Worker code.

{{<render file="_limits_increase.md">}}

---

## Worker startup time

A Worker must be able to be parsed and execute its global scope (top-level code outside of any handlers) within 400 ms. Worker size can impact startup because there is more code to parse and evaluate. Avoiding expensive code in the global scope can keep startup efficient as well.

{{<render file="_limits_increase.md">}}

---

## Number of Workers

You can have up to 500 Workers on your account on the Workers Paid plan, and up to 100 Workers on the Workers Free plan.

If you need more than 500 Workers, consider using [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/).

---

## Number of routes per zone

Each zone has a limit of 1,000 [routes](/workers/configuration/routing/routes/). If you require more than 1,000 routes on your zone, consider using [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/) or request an increase to this limit.

{{<render file="_limits_increase.md">}}

## Number of routed zones per Worker

When configuring [routing](/workers/configuration/routing/), the maximum number of zones that can be referenced by a Worker is 1,000. If you require more than 1,000 zones on your Worker, consider using [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/) or request an increase to this limit.

{{<render file="_limits_increase.md">}}

---

## Image Resizing with Workers

When using Image Resizing with Workers, refer to [Image Resizing documentation](/images/transform-images/) for more information on the applied limits.

---

## Log size

You can emit a maximum of 128 KB of data (across `console.log()` statements, exceptions, request metadata and headers) to the console for a single request. After you exceed this limit, further context associated with the request will not be recorded in logs, appear when tailing logs of your Worker, or within a [Tail Worker](/workers/observability/logging/tail-workers/).

Refer to the [Workers Trace Event Logpush documentation](/workers/observability/logging/logpush/#limits) for information on the maximum size of fields sent to logpush destinations.

## Related resources

Review other developer platform resource limits.

- [KV limits](/kv/platform/limits/)
- [Durable Object limits](/durable-objects/platform/limits/)
- [Queues limits](/queues/platform/limits/)

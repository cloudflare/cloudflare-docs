---
pcx_content_type: concept
title: Limits
---

# Limits

## Account plan limits

{{<table-wrap>}}

| Feature                                                                         | Free      | Paid (Bundled and Unbound)      |
| ------------------------------------------------------------------------------- | --------- | --------- |
| [Subrequests](#subrequests)                                                     | 50/request| 50/request (Bundled),<br> 1000/request (Unbound)|
| [Simultaneous outgoing<br/>connections/request](#simultaneous-open-connections) | 6         | 6         |
| [Environment variables](#environment-variables)                                 | 64/Worker | 128/Worker |
| [Environment variable<br/>size](#environment-variables)                         | 5 KB      | 5 KB      |
| [Worker size](#worker-size)                                                     | 1 MB      | 5 MB      |
| [Worker startup time](#worker-startup-time)                                     | 200 ms    | 200 ms    |
| [Number of Workers](#number-of-workers)                                         | 100       | 500       |
| [Number of Cron Triggers<br/>per Worker](#number-of-schedules)                  | 3         | 3         |
| [Number of Cron Triggers<br/>per account](#number-of-schedules-account)         | 5         | 250       |

{{</table-wrap>}}

{{<Aside type="note">}}

You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. To request an increase to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

{{</Aside>}}

## Request limits

URLs have a limit of 16 KB.

Request headers observe a total limit of 32 KB, but each header is limited to 16 KB.

Cloudflare has network-wide limits on the request body size. This limit is tied to your Cloudflare Account's plan, which is separate from your Workers plan. When the request body size of your POST/PUT/PATCH requests exceed your plan's limit, the request is rejected with a `(413) Request entity too large` error.

Cloudflare Enterprise customers may contact their account team or [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476) to have a request body limit beyond 500 MB.

{{<table-wrap>}}

| Cloudflare Plan | Maximum body size |
| --------------- | ----------------- |
| Free            | 100MB             |
| Pro             | 100MB             |
| Business        | 200MB             |
| Enterprise      | 500MB (by default)|

{{</table-wrap>}}

## Response limits

Cloudflare does not enforce response limits, but cache limits for [Cloudflare's CDN are observed](/cache/about/default-cache-behavior/). Maximum file size is 512 MB for Free, Pro, and Business customers and 5 GB for Enterprise customers.

## Worker limits

{{<table-wrap>}}

| Feature                     | Free                                       | Bundled Usage Model                         | Unbound Usage Model                         |
| --------------------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------------------- | --- |
| [Request](#request)         | 100,000 requests/day<br/>1000 requests/min | none                                        | none                                        |
| [Worker memory](#memory)    | 128 MB                                     | 128 MB                                      | 128 MB                                      |
| [CPU runtime](#cpu-runtime) | 10 ms                                      | 50 ms HTTP request <br/> 50 ms Cron trigger | 30 s HTTP request <br/> 15 min Cron Trigger |     |
| [Duration](#duration)       |                                            |                                             | No limit\*                                  |

{{</table-wrap>}}

### Bundled Usage Model

Workers on the Bundled Usage Model are intended for use cases below 50 ms. Bundled Workers limits are based on CPU time, rather than [duration](#duration). This means that the time limit does not include the time a Worker is waiting for responses from network calls. The billing model for Bundled Workers is based on requests that exceed the included number of requests on the Paid plan. Learn more about [Usage Model pricing](/workers/platform/pricing/#usage-models).

{{<Aside type="note" header="No limit* for duration">}}

There is no hard limit for duration. 

Cloudflare updates the Workers runtime a few times per week. When this happens, in-flight requests are given a grace period of 30 seconds to finish. If a request does not finish within this time, it is terminated.

While your application should follow the best practice of handling disconnects by retrying requests, the scenario described above is extremely improbable. To encounter it, you would need to have a request that takes longer than 30 seconds that also happens to intersect with the exact time an update to the runtime is happening.

{{</Aside>}}

### Unbound Usage Model

The Workers Unbound Usage Model has a significantly higher limit than the Bundled Usage Model and is intended for use cases up to 30 seconds of CPU time for HTTP requests and up to 15 minutes of CPU time for Cron Triggers. [Duration](#duration) is not capped but after 30 seconds there is a slightly higher chance of eviction. Learn more about [Usage Model pricing](/workers/platform/pricing/#usage-models).

## KV limits

{{<table-wrap>}}

| Feature                               | Free                  | Paid        |
| ------------------------------------- | --------------------- | ----------  |
| Reads                                 | 100,000 reads per day | unlimited   |
| Writes to different keys              | 1,000 writes per day  | unlimited   |
| Writes to same key                    | 1 per second          | 1 per second|
| Operations/worker invocation          | 1000                  | 1000        |
| Namespaces                            | 100                   | 100         |
| Storage/account                       | 1 GB                  | unlimited   |
| Storage/namespace                     | 1 GB                  | unlimited   |
| Keys/namespace                        | unlimited             | unlimited   |
| Key size                              | 512 bytes             | 512 bytes   |
| Key metadata                          | 1024 bytes            | 1024 bytes  |
| Value size                            | 25 MiB                | 25 MiB      |

{{</table-wrap>}}

{{<Aside type="note" header="Free versus Paid plan pricing">}}

Refer to [KV pricing](/workers/platform/pricing/#workers-kv) to review the specific KV operations you are allowed under each plan with their pricing.

{{</Aside>}}

## Cache API limits

{{<table-wrap>}}

| Feature                       | Free   | Bundled |
| ----------------------------- | ------ | ------- |
| [Max object size](#cache-api) | 512 MB | 512 MB  |
| [Calls/request](#cache-api)   | 50     | 50      |
| [Storage/request](#cache-api) | 5 GB   | 5 GB    |

{{</table-wrap>}}

## Durable Objects limits

Durable Objects are only available on the Workers Paid plan.

{{<table-wrap>}}

| Feature                                    | Limit                                          |
| ------------------------------------------ | ---------------------------------------------- |
| [Number of objects](#durable-objects)      | unlimited                                      |
| [Storage per account](#durable-objects)    | 50 GB (can be raised by contacting Cloudflare) |
| [Storage per class](#durable-objects)      | unlimited                                      |
| [Storage per object](#durable-objects)     | unlimited                                      |
| [Key size](#durable-objects)               | 2048 bytes                                     |
| [Value size](#durable-objects)             | 128 KiB                                        |
| [Websocket message size](#durable-objects) | 1 MiB                                          |
| [CPU per request](#durable-objects)        | 30s                                            |

{{</table-wrap>}}

---

## Request

Workers automatically scale onto thousands of Cloudflare global network servers around the world. There is no general limit to the number of requests per second Workers can handle.

Cloudflare’s abuse protection methods do not affect well-intentioned traffic. However, if you send many thousands of requests per second from a small number of client IP addresses, you can inadvertently trigger Cloudflare’s abuse protection. If you expect to receive `1015` errors in response to traffic or expect your application to incur these errors, contact your Cloudflare account team to increase your limit.

The burst rate and daily request limits apply at the account level, meaning that requests on your `*.workers.dev` subdomain count toward the same limit as your zones. Upgrade to a [Paid plan](https://dash.cloudflare.com/?account=workers/plans) to automatically lift these limits.

{{<Aside type="warning">}}

If you are currently being rate limited, upgrade to a [Paid plan](https://dash.cloudflare.com/?account=workers/plans) to lift burst rate and daily request limits.

{{</Aside>}}

### Burst rate

Accounts using the Workers Free plan are subject to a burst rate limit of 1,000 requests per minute. Users visiting a rate limited site will receive a Cloudflare `1015` error page. However if you are calling your Worker programmatically, you can detect the rate limit page and handle it yourself by looking for HTTP status code `429`.

Workers being rate-limited by Anti-Abuse Protection are also visible from the Cloudflare dashboard. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) > select your site > **Security** > **Events** > scroll to **Activity log**  and review the log for a Web Application Firewall Block event with a `ruleID` of `worker`.

### Daily request

Accounts using the Workers Free plan are subject to a daily request limit of 100,000 requests. Free plan daily requests counts reset at midnight UTC. A Worker that fails as a result of daily request limit errors can be configured by toggling its corresponding [route](/workers/platform/triggers/routes/) in two modes: 1) Fail open and 2) Fail closed.

#### Fail open

Routes in fail open mode will bypass the failing Worker and prevent it from operating on incoming traffic. Incoming requests will behave as if there was no Worker.

#### Fail closed

Routes in fail closed mode will display a Cloudflare `1027` error page to visitors, signifying the Worker has been temporarily disabled. Cloudflare recommends this option if your Worker is performing security related tasks.

---

## Memory

Only one Workers instance runs on each of the many global Cloudflare global network servers. Each Workers instance can consume up to 128 MB of memory. Use [global variables](/workers/runtime-apis/web-standards/) to persist data between requests on individual nodes; note however, that nodes are occasionally evicted from memory.

If a Worker processes a request that pushes the Worker over the 128MB limit, the Cloudflare Workers runtime may cancel one or more requests. To view these errors, as well as CPU limit overages, go to [**Workers**](https://dash.cloudflare.com/?to=/:account/workers) on the Cloudflare dashboard > **Manage Workers** > select the Worker you would like to investigate > scroll down to **Invocation Statuses** and examine _Exceeded Resources_.

Use the [TransformStream API](/workers/runtime-apis/streams/transformstream/) to stream responses if you are concerned about memory usage. This avoids loading an entire response into memory.

---

## CPU runtime

Most Workers requests consume less than a millisecond of CPU time. It is rare to find normally operating Workers that exceed the CPU time limit. CPU time is capped at various limits depending on your plan, usage model, and Worker type.

* A Worker may consume up to **10 milliseconds** on the Free plan.
* A Worker or [Scheduled Worker](/workers/platform/triggers/cron-triggers/) may consume up to **50 milliseconds** of CPU time with the Bundled usage model on the Paid Plan.
* A Worker may run for up to **30 seconds** with the Unbound usage model on the Paid Plan.
* A [Scheduled Worker](/workers/platform/triggers/cron-triggers/) may run for up to **30 seconds** with the Unbound usage model on the Paid Plan, when the schedule interval is less than 1 hour.
* A [Scheduled Worker](/workers/platform/triggers/cron-triggers/) may run for up to **15 minutes** with the Unbound usage model on the Paid Plan, when the schedule interval is greater than 1 hour.
* A [Queue consumer Worker](/queues/platform/javascript-apis/#consumer) may run for up to **15 minutes** with the Unbound usage model on the Paid Plan, per invocation.

There is no limit on the real runtime for a Worker. As long as the client that sent the request remains connected, the Worker can continue processing, making subrequests, and setting timeouts on behalf of that request. When the client disconnects, all tasks associated with that client request are canceled. You can use [`event.waitUntil()`](/workers/runtime-apis/fetch-event/) to delay cancellation for another 30 seconds or until the promise passed to `waitUntil()` completes.

---

## Duration

Duration is the measurement of wall-clock time. This is measured in Gigabyte-seconds (GB-s). When a Worker is executed, it is allocated 128 MB of [memory](/workers/platform/limits/#memory). As the Worker continues to execute that memory remains allocated, even during network IO requests.

For example, when a Worker executes via a [scheduled event](/workers/runtime-apis/scheduled-event/), it executes for four seconds, including network-bound IO time: `4s x 0.125GB (or 128Mb) = .5 GB-s`.

Duration is most applicable to Unbound Workers on the [Paid plan](/workers/platform/pricing/#paid-plan) and [Durable Objects](/workers/learning/using-durable-objects/).

---

## Subrequests

### Can a Worker make subrequests to load other sites on the Internet?

Yes. Use the [Fetch API](/workers/runtime-apis/fetch/) to make arbitrary requests to other Internet resources.

### How many subrequests can I make?

The limit for subrequests a Worker can make is 50 per request on the Bundled usage model or 1000 per request on the Unbound usage model. Each subrequest in a redirect chain counts against this limit. This means that the number of subrequests a Worker makes could be greater than the number of `fetch(request)` calls in the Worker.

For subrequests to internal services like Workers KV and Durable Objects, the subrequest limit is 1000 per request, regardless of usage model.

### How long can a subrequest take?

There is no set limit on the amount of real time a Worker may use. As long as the client which sent a request remains connected, the Worker may continue processing, making subrequests, and setting timeouts on behalf of that request.

When the client disconnects, all tasks associated with that client’s request are proactively canceled. If the Worker passed a promise to [`event.waitUntil()`](/workers/runtime-apis/fetch-event/), cancellation will be delayed until the promise has completed or until an additional 30 seconds have elapsed, whichever happens first.

---

## Simultaneous open connections

While handling a request, each Worker is allowed to have up to six connections open simultaneously. The connections opened by the following API calls all count toward this limit:

- the `fetch()` method of the [Fetch API](/workers/runtime-apis/fetch/).
- `get()`, `put()`, `list()`, and `delete()` methods of [Workers KV namespace objects](/workers/runtime-apis/kv/).
- `put()`, `match()`, and `delete()` methods of [Cache objects](/workers/runtime-apis/cache/).
- `list()`, `get()`, `put()`, `delete()`, and `head()` methods of [R2](/r2/).
- `send()` and `sendBatch()`, methods of [Queues](/queues/).

Once a Worker has six connections open, it can still attempt to open additional connections. However, these attempts are put in a pending queue — the connections will not be initiated until one of the currently open connections has closed. Since earlier connections can delay later ones, if a Worker tries to make many simultaneous subrequests, its later subrequests may appear to take longer to start.

If the system detects that a Worker is deadlocked on open connections — for example, if the Worker has pending connection attempts but has no in-progress reads or writes on the connections that it already has open — then the least-recently-used open connection will be canceled to unblock the Worker. If the Worker later attempts to use a canceled connection, an exception will be thrown. These exceptions should rarely occur in practice, though, since it is uncommon for a Worker to open a connection that it does not have an immediate use for.

{{<Aside type="note">}}

Simultaneous Open Connections are measured from the top-level request, meaning any connections open from Workers sharing resources (for example, Workers triggered via [Service bindings](/workers/runtime-apis/service-bindings/)) will share the simultaneous open connection limit.

{{</Aside>}}

---

## Environment variables

The maximum number of environment variables (secret and text combined) for a Worker is 128 variables on the Paid plan, and 64 variables on the Free plan.
There is no limit to the number of environment variables per account.

Each environment variable has a size limitation of 5 KB.

## Worker size

A Worker can be up to 5 MB in size after compression, and up to 1 MB for free accounts. You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. To request an increase to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

## Worker startup time

A Worker must be able to be parsed and execute its global scope (top-level code outside of any handlers) within 200 ms. Script size can impact startup because there's more code to parse and evaluate. Avoiding expensive code in the global scope can keep startup efficient as well. You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. To request an increase to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

## Number of Workers

Unless otherwise negotiated as a part of an enterprise level contract, all paid Workers accounts are limited to a maximum of 500 Workers at any given time. Free Workers accounts are limited to a maximum of 100 Workers at any given time.

{{<Aside type="note">}}

App Workers do not count towards this limit.

{{</Aside>}}

## Number of routes per zone

Each zone has a limit of 1,000 [routes](/workers/platform/triggers/routes/). If you require more than 1,000 routes on your zone, consider using [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/) or request an increase to this limit by completing the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7).

---

## Cache API

- 50 total `put()`, `match()`, or `delete()` calls per-request, using the same quota as `fetch()`

- 5 GBs total `put()` per-request

{{<Aside type="note">}}

The size of chunked response bodies (`Transfer-Encoding: chunked`) is not known in advance. Then, `.put()`ing such responses will block subsequent `.put()`s from starting until the current `.put()` completes.

{{</Aside>}}

---

## Durable Objects

- Unlimited Durable Objects within an account or of a given class

- 50 GB total storage per account (can be raised by contacting Cloudflare)

- No storage limit per Durable Object separate from the account limit

- No storage limit per Durable Object class separate from the account limit

- Storage keys of up to 2 KiB (2048 bytes)

- Storage values of up to 128 KiB (131072 bytes)

- Websocket messages of up to 1 MiB (1048576 bytes). This limit applies to messages received, not sent or proxied through.

- 30s of CPU time per request, including websocket messages

Durable Objects scale well across Objects, but each object is inherently single-threaded. A baseline of 100 req/sec is a good floor estimate of the request rate an individual Object can handle, though this will vary with workload.

Durable Objects have been built such that the number of Objects in the system do not need to be limited. You can create and run as many separate objects as you want. The main limit to your usage of Durable Objects is the total storage limit per account - if you need more storage, contact your account team.

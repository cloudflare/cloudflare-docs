---
order: 2
---

# Limits

## Worker limits

<TableWrap>

| Feature                                                                         | Free                                                 | Bundled   |
|---------------------------------------------------------------------------------|------------------------------------------------------|-----------|
| [Request](#request)                                                             | 100,000&nbsp;requests/day<br/>1000&nbsp;requests/min | none      |
| [Worker memory](#memory)                                                        | 128 MB                                               | 128 MB    |
| [CPU runtime](#cpu-runtime)                                                     | 10 ms                                                | 50 ms     |
| [Subrequests](#subrequests)                                                     | 50                                                   | 50        |
| [Simultaneous outgoing<br/>connections/request](#simultaneous-open-connections) | 6                                                    | 6         |
| [Environment variables](#environment-variables)                                 | 32/worker                                            | 32/worker |
| [Environment variable<br/>size](#environment-variables)                         | 1 KB                                                 | 1 KB      |
| [Script size](#script-size)                                                     | 1 MB                                                 | 1 MB      |
| [Number of scripts](#number-of-scripts)                                         | 30                                                   | 30        |
| [Number of Cron Triggers<br/>per script](#number-of-schedules)                  | 3                                                    | 3         |
| [Number of Cron Triggers<br/>per account](#number-of-schedules-account)         | 5                                                    | 90        |

</TableWrap>

## KV limits

The Workers Free plan includes limited KV Usage. If you exceed one of these limits, further operations of that type will fail with an error. All limits reset daily at 00:00 UTC.

<TableWrap>

| Feature                               | Free limit  |
|---------------------------------------|-------------|
| [Reads/day](#kv)                      |   100,000   |
| [Writes/day](#kv)                     |     1,000   |
| [Lists/day](#kv)                      |     1,000   |
| [Deletes/day](#kv)                    |     1,000   |
| [Storage limit](#kv)                  |     1 GB    |

</TableWrap>

The following limits apply regardless of the plan used.

<TableWrap>

| Feature                               | Limit      |
|---------------------------------------|------------|
| [Reads/second](#kv)                   | unlimited  |
| [Writes/second (different keys)](#kv) | unlimited  |
| [Writes/second (same key)](#kv)       | 1          |
| [Operations/worker invocation](#kv)   | 1000       |
| [Namespaces](#kv)                     | 100        |
| [Keys/namespace](#kv)                 | unlimited  |
| [Key size](#kv)                       | 512 bytes  |
| [Key metadata](#kv)                   | 1024 bytes |
| [Value size](#kv)                     | 25 MB      |

</TableWrap>

## Cache API limits

<TableWrap>

| Feature                       | Free   | Bundled |
|-------------------------------|--------|---------|
| [Max object size](#cache-api) | 512 MB | 512 MB  |
| [Calls/request](#cache-api)   | 50     | 50      |
| [Storage limit](#cache-api)   | 5 GB   | 5 GB    |

</TableWrap>

--------------------------------

## Request

Bundled (Paid) Workers scripts automatically scale onto thousands of Cloudflare edge servers around the world; there is no general limit to the number of requests per second Workers can handle.

Cloudflare’s abuse protection methods do not affect well-intentioned traffic. However, if you send many thousands of requests per second from a small number of client IP addresses, you can inadvertently trigger Cloudflare’s abuse protection. If you expect to receive `1015` errors in response to traffic or expect your application to incur these errors, contact Cloudflare to increase your limit.

The burst rate and daily request limits apply at the account level, meaning that requests on your workers.dev subdomain count toward the same limit as your zones. Upgrade to a [paid plan](https://dash.cloudflare.com/?account=workers/plans) to automatically lift these limits.

### Burst rate

Accounts using the Workers free plan are subject to a burst rate limit of 1000 requests per minute. Users visiting a rate limited site will receive a Cloudflare 1015 error page. However if you are calling your script programmatically, you can detect the rate limit page and handle it yourself by looking for HTTP status code 429.

### Daily request

Accounts using the Workers free plan are subject to a daily request limit of 100,000 requests. Free plan daily requests counts reset at midnight UTC. A Worker that fails as a result of daily request limit errors can be configured by toggling its corresponding [route](/platform/routes) in two modes: _Fail open_ and _Fail closed_.

#### Fail open

Routes in fail open mode will bypass the failing Worker and prevent it from operating on incoming traffic. Incoming requests will behave as if there was no Worker.

#### Fail closed

Routes in fail closed mode will display a Cloudflare 1027 error page to visitors, signifying the Worker has been temporarily disabled. We recommend this option if your Worker is performing security related tasks.

--------------------------------

## Memory

Only one Workers instance runs on each of the many global Cloudflare edge servers. Each Workers instance can consume up to 128MB of memory. Use [global variables](/runtime-apis/web-standards) to persist data between requests on individual nodes; note however, that nodes are occasionally evicted from memory.

Use the [TransformStream API](/runtime-apis/streams/transformstream) to stream responses if you are concerned about memory usage. This avoids loading an entire response into memory.

--------------------------------

## CPU runtime

Most Workers requests consume less than a millisecond. It’s rare to find a normally operating Workers script that exceeds the CPU time limit. A Worker may consume up to 10ms on the free plan and 50ms on the Bundled tier. The 10ms allowance on the free plan is enough execution time for most use cases including application hosting.

There is no limit on the real runtime for a Workers script. As long as the client that sent the request remains connected, the Workers script can continue processing, making subrequests, and setting timeouts on behalf of that request. When the client disconnects, all tasks associated with that client request are canceled. You can use [`event.waitUntil()`](/runtime-apis/fetch-event) to delay cancellation for another 30 seconds or until the promise passed to `waitUntil()` completes.

--------------------------------

## Subrequests

### Can a Workers script make subrequests to load other sites on the Internet?

Yes. Use the [Fetch API](/runtime-apis/fetch) to make arbitrary requests to other Internet resources.

### How many subrequests can I make?

The limit for subrequests a Workers script can make is 50 per request. Each subrequest in a redirect chain counts against this limit. This means that the number of subrequests a Workers script makes could be greater than the number of `fetch(request)` calls in the script.

### How long can a subrequest take?

There is no hard limit on the amount of real time a Worker may use. As long as the client which sent a request remains connected, the Worker may continue processing, making subrequests, and setting timeouts on behalf of that request.

When the client disconnects, all tasks associated with that client’s request are proactively canceled. If the Worker passed a promise to [`event.waitUntil()`](/runtime-apis/fetch-event), cancellation will be delayed until the promise has completed or until an additional 30 seconds have elapsed, whichever happens first.

--------------------------------

## Simultaneous open connections

While handling a request, each Worker script is allowed to have up to six connections open simultaneously. The connections opened by the following API calls all count toward this limit:

- the `fetch()` method of the [Fetch API](/runtime-apis/fetch)
- `get()`, `put()`, `list()`, and `delete()` methods of [Workers KV namespace objects](/runtime-apis/kv)
- `put()`, `match()`, and `delete()` methods of [Cache objects](/runtime-apis/cache)

Once a Worker has six connections open, it can still attempt to open additional connections. However, these attempts are put in a pending queue — the connections won’t actually be initiated until one of the currently open connections has closed. Since earlier connections can delay later ones, if a Worker tries to make many simultaneous subrequests, its later subrequests may appear to take longer to start.

If the system detects that a Worker is deadlocked on open connections — for instance, if the Worker has pending connection attempts but has no in-progress reads or writes on the connections that it already has open — then the least-recently-used open connection will be canceled to unblock the Worker. If the Worker later attempts to use a canceled connection, an exception will be thrown. These exceptions should rarely occur in practice, though, since it’s uncommon for a Worker to open a connection that it doesn’t have an immediate use for.

--------------------------------

## Environment variables

The maximum number of environment variables (secret and text combined) for a Worker is 32 variables.
There is no limit to the number of environment variables per account.

Each environment variable has a size limitation of 1 KB.

### Script size

<!-- TODO(soon): Broken link to Bindings API documentation. -->
A Workers script plus any [Asset Bindings](/platform/scripts#resource-bindings) can be up to 1MB in size after compression.

### Number of scripts

Unless otherwise negotiated as a part of an enterprise level contract, all Workers accounts are limited to a maximum of 30 scripts at any given time.

<Aside>

__Note:__ App Workers scripts do not count towards this limit.

</Aside>

--------------------------------

## KV

Workers KV supports:

- Up to 100 Namespaces per account
- Unlimited keys per namespace
- Keys of up to 512 bytes
- Values of up to 25 MB
- Metadata of up to 1024 bytes per key
- Unlimited reads per second
- Unlimited writes per second, if they are to different keys
- Up to one write per second to any particular key

Workers KV read performance is determined by the amount of read-volume a given key receives. Maximum performance for a key is not reached unless that key is being read at least a couple times per minute in any given data center.

Workers KV is an eventually consistent system, meaning that reads will sometimes reflect an older state of the system. While writes will often be visible globally immediately, it can take up to 60 seconds before reads in all edge locations are guaranteed to see the new value.

--------------------------------

## Cache API

- 50 total `put()`, `match()`, or `delete()` calls per-request, using the same quota as `fetch()`

- 5 GBs total `put()` per-request

<Aside>

__Note:__ The size of chunked response bodies (`Transfer-Encoding: chunked`) is not known in advance. Then, `.put()`ing such responses will block subsequent `.put()`s from starting until the current `.put()` completes.

</Aside>

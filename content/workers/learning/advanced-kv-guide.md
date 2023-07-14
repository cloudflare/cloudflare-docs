---
pcx_content_type: concept
title: Advanced Workers KV Topics
weight: 7
---

# Best Practices for Workers KV

This guide provides best practices for optimizing Workers KV latency as well as covering advanced tricks 
that our customers sometimes employ for their problem domain, including:

* Reducing TTFB latency through the [`cacheTtl`](/workers/runtime-apis/kv/#cache-ttl) parameter without sacrificing
consistency latency.
* Avoiding the use of redundant caching layers
* Using Workers KV's [bindings API]() instead of the administrative REST API for user-facing workloads.
* Ensuring correctness when you have concurrent writes to manage
* How to get early access to get sub 1 minute consistency latency.
* Guidance on subtleties that crop up that make it hard to synthetically test Workers KV performance as a proxy to
predict production performance.
* Improving your observability of KV performance.

As background, it's best to review [how KV works](/workers/learning/how-kv-works.md) before reading this document.

# Performance optimizations

## Optimizing .get long tail performance

### Embrace long cacheTtl

*TLDR*: Set a long cacheTtl (e.g. 86400 to represent 1 day).

When reading a value, KV let's you customize the [`cacheTtl`](https://developers.cloudflare.com/workers/runtime-apis/kv/#cache-ttl) parameter.
Since Cloudflare is a security-first company and KV is sometimes used to store things like authentication tokens, the default `cacheTtl` value
if not specified is 1 minute. That way if you use KV for cryptographic material, any changes / revocations are noticed globally in a timely fashion.
When KV encounters a key beyond it's `cacheTTL`, this is treated as a miss and requires traversal to the central data center containing the most
recently written value.

Most Workers KV requests however are not for security-sensitive keys. To optimize the long-tail performance of infrequently accessed keys, specify a longer
`cacheTtl` value (e.g. 86400 to request the entire day). Historically, a blocker for many customers was that this meant that your reads wouldn't see writes
for the duration of the cacheTtl. However, as described in our [architecture blog post](https://blog.cloudflare.com/faster-workers-kv-architecture/),
most customers today are using the new architecture - you will see updated values within ~1 minute of the write, regardless of the `cacheTtl` value. See also the
[section](#noticing-updated-values-within-seconds) below about how to explore getting sub minute global consistency.

{{<Aside type="note" header="Decoupled cacheTTL and visible writes availability">}}
A small fixed list of customers which are comprised of early closed betas and our largest ENT customers are currently excluded as we scale up the system. A longer
`cacheTtl` will result in it taking that duration for a `get` to report the least value that was written within the interim. If you want to use the
new architecture but think you may not be enabled, please contact support. This is a transparent optimization.
{{</Aside>}}

### Avoid hand-rolling Cache in front of Workers KV

Workers KV is optimized to transparently refresh values in the background on your behalf based on actual access patterns to keep the
values read lively when there's a write. As a cost-cutting measure, some customers choose to explore putting the Cache API in front
of the `.get` call so that most requests hit the cache and when the cache expires you double-check with KV.

At first glance this doesn't sound too bad and price conscious customers look to this option (we hear from customers that like to use [BetterKV](https://flareutils.pages.dev/betterkv/)
while others handroll). From a performance perspective though, it's surprising at first glance, but it will mean that your application
will regularly experience a stampeding herd of requests that experience cold KV reads. Why is this?

The first problem is if you've tuned the expiry within your fronting Cache instance to be the cacheTtl you use for KV (this is what BetterKV
does). The problem with this is that when you miss your local cache, you'll also miss KV and get a cold read. If you're doing 10k RPS to that
key, then you'll be missing 10k RPS for the duration it takes to refetch. As described, Workers KV very carefully and intentionally avoids
this problem by refreshing in the background proactively so that the expiry is always in the future.

Solving this can help a lot, but it's not the entire story. Even if your cache.match is set to expire before your cacheTtl, you'll still have
another problem. Since KV isn't seeing accesses to that key, Cache will treat KV's cache as cold & prioritize evicting it. In such a scenario,
even though we're within the cacheTtl, from KV's perspective it sees a sudden stampeding herd of requests that aren't satisfied by your cache.match
but for which it doesn't have a cache anymore because it was evicted. That being said, the most common cause is likely having a very similar
cacheTtl in your extra caching layer and KV.

The recommendations to solve this problem in the order Cloudflare recommends applying them:

* Don't put cache in front of KV.
  * Pros: the system behaves optimally from a performance perspective. You can also leverage [notice writes more quickly than 1 minute](#noticing-updated-values-within-seconds).
  * Cons: Today you get charged for cache reads. Larger customers should work with support and longer-term we hope to adjust our pricing to obviate the pricing differential.
* Set a longer `cacheTtl`
  * Pros: Improved latency across the board.
  * Cons: You may see prolonged stale reads by 1 extra KV cycle because the extra cache layer isn't letting KV know to refresh the asset (e.g if your extra cache layer caches
  for 1 minute, it will take you 2 minutes to see a write (a longer `cacheTtl` without an extra cache layer in front of KV doesn't have this problem).
* Probabilistically direct some subset of cache hits (e.g. 1%) to KV anyway in a `waitUntil`. **NOTE**: The `waitUntil` is important because KV will abort work if you return a response
  before KV does its work and no refresh will take place.
  * Pros: KV will see more representative usage patterns and thus ensure that the most recent value is always in the cache.
  * Cons: You need to manually fine tune the probability and you may not have sufficient observability to see problems. Consider following the steps in [improving observability](#improving-observability) to
  make sure you can see this problem.
* Shorten the TTL within your extra caching layer
  * Pros: All keys will mostly avoid the stampeding herd of cold KV accesses
  * Cons: Not as effective at improving performance as increasing the cacheTtl. If the key is evicted from KV's cache due to insufficient usage, you will still suffer a stampeding
  herd of slow requests.

{{<Aside type="note" header="What does cardinality and distribution mean?">}}
[Cardinality](https://en.wikipedia.org/wiki/Cardinality) is a mathemtical concept. Within the context of Workers KV, it means "how many distinct keys
is my application accessing". The distribution in this context means how does the RPS of each key relate to one another. A [uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution)
would be one where every Workers KV key being accessed by your application has similar RPS values. Most applications in practice experience some kind of [exponential distribution](https://en.wikipedia.org/wiki/Exponential_family).
{{</Aside>}}

{{<Aside type="note" header="Timing considerations">}}
`Date` comparisons can be used to get an [approximation](https://blog.cloudflare.com/mitigating-spectre-and-other-security-threats-the-cloudflare-workers-security-model/#step1disallowtimersandmultithreading)
of how long an I/O operation took, but it's very coarse and likely too inaccurate for measuring KV performance. As such, be very wary of metrics you collect within a Worker of how your code is performing.
{{</Aside>}}

**TLDR**: Adding an extra caching layer in front of KV that has good performance is surprisingly tricky and brittle. The best practice is to let KV manage this complex topic correctly
for you. Insisting

### Reducing cardinality by coalescing keys

If you have a set of related key-value pairs that have a mixed usage pattern (some hot keys and some cold keys), consider
coalescing so that you have fewer overall keys. Some approaches to accomplishing this are described below.

#### Merging into a "super" KV entry
One coalescing technique is to make all the keys and values part of a super key/value object. For example, something like this:
```
key1: value1
key2: value2
key3: value3
```
becomes
```
coalesced: {
  key1: value1,
  key2: value2,
  key3: value3,
}
```

By coalescing the values, the cold keys benefit from being kept alive in the cache because of access patterns of the warmer keys.

This works best if you don't think you'll need to update the values independently of each other which can pose race conditions unless you're
careful about how you synchronize.

**Pros**: Infrequently accessed keys are kept in the cache.
**Cons**: Size of the resultant value can easily push your worker out of it's memory limits. Safely updating the value requires a [locking mechanism](#concurrent-writers) of some kind.

#### Storing in metadata and shared prefix

If you don't want to merge into a single KV entry as described above and your associated values fit within the [metadata limit](/workers/platform/limits/#kv-limits),
then you can store the values within the metadata instead of the body. If you then name the keys with a shared unique prefix, your list operation will contain
the value letting you bulk read multiple keys at once through a single, cacheable list operation.

{{<Aside type="note" header="List performance note">}}
List operations are not "write aware". This means that while they are subject to tiering, they only stay cached for up to one minute past when it was last read, even
at upper tiers. By comparison, get operations are cached at the upper tiers for a service managed duration that is always longer than your cacheTtl. Additionally, the cacheTtl
lets you extend the duration of a single key lookup at the data center closest to the request.
{{</Aside>}}

## Batch reading multiple keys

If you have small values that fit within the [metadata limit](/workers/platform/limits/#kv-limits), you can store the value within the metadata instead.
This makes the value accessible during the list, avoiding the need to do a second I/O round-trip while iterating in case a lookup ends up missing the local cache.
This isn't necessarily suitable for all problem domains obviously as it requires that values fit within the limit and that the set of keys you are trying to read
are guaranteed to be lexicographically next to each other.

{{<Aside type="note" header="List performance note">}}
See above about the implications of cache duration and list operations.
{{</Aside>}}

## Avoid using the GET REST API at the Edge

Today, the REST API for Workers KV goes all the way to central Cloudflare data centers. This is fine for PUT/DELETE requests as
those are typically not latency sensitive and aren't cacheable so they need to transit to central locations anyway. However,
using the REST API to read a key or performance a list isn't going to perform as well because you always have to do a long
distance round trip before you hit a cache. Conversely, a `.get/.getWithMetadata` and `.list` operation within your Worker
will access the cache closest to where the request originated from.

# Concurrent writers to a single key

Today, we do not offer any native conditional put features. `.put` will always clobber the value and if you have multiple
writers, there's no guarantee about a winner. This is even more problematic if you have structured data and want to do a
partial update of a value. A lot of customers have success creating a [Durable Object](/workers/learning/using-durable-objects)
and making it responsible for all the writes to your KV namespace. This way, you can serialize access for writing the value.

**Caution**: Workers KV is an eventually consistent system. If you try to do a read/modify/write operation where the read is
coming from KV, you can cause modifications to be lost because there's no guarantee that you will always read the most recent
value written, even if the write is from the same data center. Additionally, where a Durable Object is running moves around
outside of your control.

If guaranteeing that you never lose a mutation is important, consider making a strongly consistent storage system your
ground truth that you read/modify/write and then write the updated value to KV to broadcast it out (Durable Object storage or
R2 with conditional upload). That way your value is updated in a strongly consistent fashion and once that happens, you publish
it to KV for reading.

# Noticing updated values within seconds

Currently, reads have a "refreshTtl" of 1 minute. This means that a write is noticed within 1 minute of a read being issued.
While we aren't yet ready to let customers customize the refreshTtl themselves within the Runtime API, if this is important
to your use-case, please contact support to change the default for your namespace and we can work with you.

# Benchmarking Workers KV

Benchmarking to predict what your Workers KV performance will look like in production is tricky and nuanced. It's best to try
to put production load onto the system and then measure real-world performance rather than trying to do a synthetic test.
Examples of issues that can trip up even internal engineers who know all the technical details:

* You don't have [permission](https://blog.cloudflare.com/mitigating-spectre-and-other-security-threats-the-cloudflare-workers-security-model/#step1disallowtimersandmultithreading)
within the Runtime to get accurate timing measurements. That means you have to know to time externally to the system. At the same time,
external timings are subject to sources of error that have nothing to do with Workers KV performance, particularly as described below.
* A low traffic Worker is more subject to cold starts even though in practice cold starts don't exist once production traffic is flowing.
* Within something we call "MCP"s, we have multiple virtual data centers within a single PoP. Which virtual data center you hit
is random and today such data centers have disjoint caches and require even more traffic to keep the cache warm regardless of which
virtual data center you randomly get routed to.
* [wrk](https://github.com/wg/wrk) can typically generate substantial enough load from a single machine (thousands of requests
per second) which should probably be enough to representative and overcome such issues, but it requires careful tuning of
parameters to achieve max throughput and you have little to no visibility into Cloudflare's internal network to know if you succeeded.
* Synthetic tests are typically hand-written and often fail to reproduce real-world access patterns for keys (if you have multiple keys).
If you have a recording you can play through of the access patterns, that might work well. A representative recording is difficult
to capture in practice because of the global nature of Cloudflare Workers.

In essence, Cloudflare's infrastructure gets faster the more traffic you put on them, and synthetic tests often cannot generate
enough load to simulate that properly.

# Improving observability

We are working on providing customers with deeper insights into how KV performs so that you don't have to write any code. Addiitionally,
you will gain insights into your performance that might otherwise be difficult or impossible for you to capture from outside KV. In the meantime,
we've added a `cacheStatus` field to the response object returned from `list` and `getWithMetadata`. The values defined are as follows:

* `MISS`: The current data center doesn't have this value. The value will be retrieved through upper tiers or from the central data store.
* `HIT`: The current data center serviced this value.
* `REVALIDATE`: A `HIT` and Workers KV took this as an opportunity to trigger a background refresh of the value.
* `STALE`: A `HIT` where Workers KV noticed it's deep within the default 1 minute refresh interval for the asset.

You can then leverage [Workers Analytics Engine](/analytics/analytics-engine/) to record this information and build basic visualizations
to measure your cache performance.

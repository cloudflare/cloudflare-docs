---
pcx_content_type: concept
title: KV performance optimizations
weight: 7
---

# KV performance optimizations

You can optimize Workers KV latency by adopting techniques to maximize Workers KV performance. 

## Optimize `get()` long tail performance

Workers KV allows you to customize the [`cacheTTL`](https://developers.cloudflare.com/workers/runtime-apis/kv/#cache-ttl) parameter when reading a value.

Workers KV is used to store information such as authentication tokens. If not specified, the default `cacheTTL` value is 1 minute. If you use Workers KV for cryptographic material, any changes or revocations are reflected globally without delay.

When Workers KV encounters a key beyond its `cacheTTL`, the key is treated as a miss and requires traversal to the central data center containing the most
recently written value.

Most Workers KV requests are not for security-sensitive keys. To optimize the long-tail performance of infrequently accessed keys, specify a longer
`cacheTTL` value (for example, 86400 to request the entire day). 

With the [new architecure](https://blog.cloudflare.com/faster-workers-kv-architecture/), you will see updated values within ~1 minute of the write, regardless of the `cacheTTL` value. See also the [section](#noticing-updated-values-within-seconds) below about how to explore getting sub minute global consistency.

{{<Aside type="note" header="Decoupled cacheTTL and visible writes availability">}}
A longer `cacheTTL` will result in the`cacheTTL` taking that duration for a `get()` to report the least value that was written within the interim. If you want to use the new architecture but think you may not be enabled, please contact support. This is a transparent optimization.
{{</Aside>}}

## Avoid hand-rolling cache in front of Workers KV

Workers KV is optimized to transparently refresh values in the background based on access patterns to keep the values read live when there is a write. You may choose to add the Cache API in front of the `get()` call so that most requests hit the cache. Once the cache expires you verify with Workers KV.

Adding the Cache API in front of the `get()` will mean that your application will experience a high amount of requests that experience cold KV reads. 

Setting the expiry within your fronting Cache instance to be the `cacheTTL` you use for Workers KV may cause you to miss KV and receive a cold read. 

For example, if you perform 10k RPS to that key, you will miss 10k RPS for the duration it takes to refetch. Workers KV solves this problem by refreshing in the background so that the expiry is set in the future. 

<!-- The first problem is if you have tuned the expiry within your fronting Cache instance to bethe cacheTTL you use for KV (this is what BetterKV
does). The problem with this is that when you miss your local cache, you will also miss KV and get a cold read. If you are doing 10k RPS to that
key, then you will be missing 10k RPS for the duration it takes to refetch. As described, Workers KV very carefully and intentionally avoids
this problem by refreshing in the background proactively so that the expiry is always in the future. -->

<!-- Solving this can help a lot, but it's not the entire story. Even if your cache.match is set to expire before yourcacheTTL, you'll still have
another problem. Since KV isn't seeing accesses to that key, Cache will treat KV's cache as cold & prioritize evicting it. In such a scenario,
even though we're withinthe cacheTTL, from KV's perspective it sees a sudden stampeding herd of requests that aren't satisfied by your cache.match
but for which it doesn't have a cache anymore because it was evicted. That being said, the most common cause is likely having a very similar
cacheTtl in your extra caching layer and KV. -->

There are many strategies to solve this problem.

#### Do not put cache in front of Workers KV

The system will optimize performance by not putting cache in front of Workers KV. You can also leverage [notice writes more quickly than 1 minute](#noticing-updated-values-within-seconds).

  * Cons: Today you get charged for cache reads. Larger customers should work with support and longer-term we hope to adjust our pricing to obviate the pricing differential.
#### Set a longer `cacheTTL`

  Setting a longer `cacheTTL` improves latency across the board.
  * Cons: You may see prolonged stale reads by 1 extra KV cycle because the extra cache layer isn't letting KV know to refresh the asset (e.g if your extra cache layer caches
  for 1 minute, it will take you 2 minutes to see a write (a longer `cacheTtl` without an extra cache layer in front of KV doesn't have this problem).

#### Probabilistically direct some subset of cache hits (for example 1%) to KV anyway in a `waitUntil`

You will need `waitUntil` because KV will abort work if you return a response before KV completes its work and no refresh will take place.

KV will see more representative usage patterns and thus ensure that the most recent value is always in the cache.
  * Cons: You need to manually fine tune the probability and you may not have sufficient observability to see problems. Consider following the steps in [improving observability](#improving-observability) to
  make sure you can see this problem.
#### Shorten the cacheTTL within your extra caching layer

Shortening the cacheTTL within your extra caching layer will ensure all keys will mostly avoid the stampeding herd of cold KV accesses.
  * Cons: Not as effective at improving performance as increasing the cacheTTL. If the key is evicted from KV's cache due to insufficient usage, you will still suffer a stampeding herd of slow requests.

{{<Aside type="note" header="What does cardinality and distribution mean?">}}
[Cardinality](https://en.wikipedia.org/wiki/Cardinality) is a mathemtical concept. Within the context of Workers KV, it means "how many distinct keys
is my application accessing". The distribution in this context means how does the RPS of each key relate to one another. A [uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution)
would be one where every Workers KV key being accessed by your application has similar RPS values. Most applications in practice experience some kind of [exponential distribution](https://en.wikipedia.org/wiki/Exponential_family).
{{</Aside>}}

{{<Aside type="note" header="Timing considerations">}}
`Date` comparisons can be used to get an [approximation](https://blog.cloudflare.com/mitigating-spectre-and-other-security-threats-the-cloudflare-workers-security-model/#step1disallowtimersandmultithreading)
of how long an I/O operation took. However, approximations are inaccurate for measuring Workers KV performance. Beware of metrics you collect within a Worker of how your code is performing.
{{</Aside>}}

It is best to allow Workers KV to manage the caching layer.

**TLDR**: Adding an extra caching layer in front of KV that has good performance is surprisingly tricky and brittle. The best practice is to let KV manage this complex topic correctly for you. Insisting

### Reduce cardinality by coalescing keys

If you have a set of related key-value pairs that have a mixed usage pattern (some hot keys and some cold keys), consider
coalescing the need to fetch key-value pairs so that a single cached fetch retrieves all the values, even if you only need one
of the values. 

Coalescing the need to fetch key-value pairs helps because the cooler keys share access patterns with the hotter keys and are thus more likely to be present in the cache. 

To reduce cardinality by coalescing keys, you can either:

- [Merge into a "super" KV entry](/kv/learning/kv-performance-optimizations/#merge-into-a-super-kv-entry). 
- [Store in metadata and shared prefix](/kv/learning/kv-performance-optimizations/#store-in-metadata-and-shared-prefix).

#### Merge into a "super" KV entry

One coalescing technique is to make all the keys and values part of a super key/value object. For example:

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

Use this approach if you do not need to update the values independently of each other which can pose race conditions unless you are
careful about synchronization.

By merging into a "super" KV entry, infrequently accessed keys are kept in the cache.

**Cons**: Size of the resultant value can easily push your worker out of it's memory limits. Safely updating the value requires a [locking mechanism](#concurrent-writers) of some kind.

#### Store in metadata and shared prefix

If you do not want to [merge into a single KV entry](/kv/learning/kv-performance-optimizations/#merge-into-a-super-kv-entry) and your associated values fit within the [metadata limit](/workers/platform/limits/#kv-limits), store the values within the metadata instead of the body. If you name the keys with a shared unique prefix, your list operation will contain the value letting you bulk read multiple keys at once through a single, cacheable list operation.

{{<Aside type="note" header="List performance note">}}
List operations are not "write aware". This means that while they are subject to tiering, they only stay cached for up to one minute past when it was last read, even at upper tiers. By comparison, get operations are cached at the upper tiers for a service managed duration that is always longer than your cacheTTL.Additionally, the cacheTTL lets you extend the duration of a single key lookup at the data center closest to the request.
{{</Aside>}}

List operations are only ever cached for 1 minute. They are still subject to [tiered caching](https://blog.cloudflare.com/faster-workers-kv-architecture#a-new-horizontally-scaled-tiered-cache). Therefore, requests within the region and globally are amortized to keep the asset closer to your request. However, you still need to be reading the value about once
every 30s to make sure it's always present within Cloudflare's caches.

## Batch reading multiple keys

Store the value within metadata if you have small values that fit within the [metadata limit](/workers/platform/limits/#kv-limits).

Storing the value within metadata makes the value accessible during the list, avoiding the need to do a second I/O operation while iterating in case a lookup misses the local cache. 

Storing the value within metadata is not suitable for all problem domains as it requires that values fit within the limit and that the set of keys you are trying to read are guaranteed to be lexicographically next to each other.

## Avoid using the GET REST API at the Edge

Using the REST API to read a key will reduce performance because you always have to do a long distance round trip before you hit a cache. 

A `get()` or `getWithMetadata()`, and a `list()` operation within your Worker will access the cache closest to where the request originated from.

## Concurrent writers to a single key

`put()` will always clobber the value. If you have multiple writers, there is no guarantee about a winner. 


This is even more problematic if you have structured data and want to do a partial update of a value. A lot of customers have success creating a [Durable Object](/workers/learning/using-durable-objects) and making it responsible for all the writes to your KV namespace. This way, you can serialize access for writing the value.

{{<Aside type="warning" header="Workers KV is eventually consistent">}}
Workers KV is an eventually consistent system. Doing a read-modify-write operation where the read is coming from KV can cause changes to be lost, because there is no guarantee that you will always read the most recent value written, even if the write is from the same data center. 
{{</Aside>}}

Use Durable Objects or R2 if you do not want to lose a mutation.

<!-- If guaranteeing that you never lose a mutation is important, consider making a strongly consistent storage system your
ground truth that you read/modify/write and then write the updated value to KV to broadcast it out (Durable Object storage or
R2 with conditional upload). That way your value is updated in a strongly consistent fashion and once that happens, you publish
it to KV for reading. -->

## Notice updated values within seconds

Reads have a "refreshTtl" of 1 minute. A write is noticed within 1 minute of a read being issued.

Contact customer support to change the default for your namespace.

## Benchmarking Workers KV

To predict what your Workers KV performance, put production load onto the system and then measure real-world performance.

You may encounter the following issues:

* You do not have [permission](https://blog.cloudflare.com/mitigating-spectre-and-other-security-threats-the-cloudflare-workers-security-model/#step1disallowtimersandmultithreading) within the Runtime to get accurate timing measurements. That means you have to know to time externally to the system. At the same time, external timings are subject to sources of error that are out of scope for Workers KV performance.
* A low traffic Worker is more subject to cold starts, even though cold starts do not exist once production traffic is flowing.
* Within "MCP"s, we have multiple virtual data centers within a single PoP. Which virtual data center you hit is random. Such data centers have disjoint caches and require even more traffic to keep the cache warm regardless of which virtual data center you randomly get routed to.
* [wrk](https://github.com/wg/wrk) can generate thousands of requests per second. which should probably be enough to representative and overcome such issues, but it requires careful tuning of parameters to achieve max throughput and you have little to no visibility into Cloudflare's internal network to know if you succeeded.
* Synthetic tests are hand-written and often fail to reproduce real-world access patterns for keys (if you have multiple keys). If you have a recording you can play through of the access patterns, that might work well. A representative recording is difficult to capture in practice because of the global nature of Cloudflare Workers.



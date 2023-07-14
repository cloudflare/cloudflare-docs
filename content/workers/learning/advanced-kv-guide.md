---
pcx_content_type: concept
title: Advanced Workers KV Topics
weight: 7
---

# Background

To get the best possible performance out of your usage of Workers KV, this document contains some tips.
As background, it's best to review [how KV works](/workers/runtime-apis/kv/#writing-data-in-bulk).

# Performance optimizations

## Optimizing .get long tail performance

### Embrace long cacheTtl

To optimize the long-tail performance of infrequently accessed keys, specify a longer cacheTtl value (e.g. 1 day).
Historically, a blocker for many customers was that this meant that your reads wouldn't see writes for the duration of the cacheTtl.
However, as described in our [architecture blog post](https://blog.cloudflare.com/faster-workers-kv-architecture/), most customers today
are using the new architecture where you will see updated values within a minute of the write, regardless of the cacheTtl value.

{{<Aside type="note" header="Security considerations">}}
Some customers of Workers KV store authorization tokens. Often time such applications rely on having a strict guarantee on revocation.
For example, if your service SLA is that a revoked token must be globally revoked within 5 minutes of revocation, your cacheTtl should
not be longer than 5 minutes. While the write will be noticed within a minute, writes are only noticed due to misses or reads triggering
a background refresh. If your key is accessed once every 4 minutes and you set a cacheTTL of 10 minutes, it's possible that you will
exceed your SLA by a few minutes.
{{</Aside>}}

{{<Aside type="note" header="Availability of long cache TTL noticing writes quickly">}}
Certain namespaces part of early closed betas and larger ENT customers are currently excluded. If you want to use the new architecture
but think you may not be enabled, please contact support.
{{</Aside>}}

### Reducing cardinality by coalescing keys

If you have a set of related key-value pairs that have a mixed usage pattern (some hot keys and some cold keys), consider
coalescing them.

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

{{ <Aside type="note" header="List performance note"> }}
List operations are not "write aware". This means that while they are subject to tiering, they only stay cached for up to one minute past when it was last read, even
at upper tiers. By comparison, get operations are cached at the upper tiers for a service managed duration that is always longer than your cacheTtl. Additionally, the cacheTtl
lets you extend the duration of a single key lookup at the data center closest to the request.
{{ </Aside> }}

## Read the values as part of the list

If you have small values that fit within the [metadata limit](/workers/platform/limits/#kv-limits), you can store the value within the metadata instead.
This makes the value accessible during the list, avoiding the need to do a second I/O round-trip while iterating in case a lookup ends up missing the local cache.

{{ <Aside type="note" header="List performance note"> }}
See above about the implications of cache duration and list operations.
{{ </Aside> }}

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

* A low traffic Worker is more subject to cold starts.
* Within something we call "MCP"s, we have multiple virtual data centers within a single PoP. Which virtual data center you hit
is random and currently such data centers have disjoint caches and require even more traffic to keep the isolate for your Worker
warm.
* [wrk](https://github.com/wg/wrk) can typically generate substantial enough load from a single machine (thousands of requests
per second) which should probably be enough to representative and overcome such issues, but it requires careful tuning of
parameters to achieve max throughput.
* Synthetic tests are typically hand-written and often fail to reproduce real-world access patterns for keys (if you have multiple keys).
If you have a recording you can play through of the access patterns, that might work well. A representative recording is difficult
to capture in practice because of the global nature of Cloudflare Workers.

In essence, Cloudflare's infrastructure gets faster the more traffic you put on them, and synthetic tests often cannot generate
enough load to simulate that properly.

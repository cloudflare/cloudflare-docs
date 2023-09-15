---
pcx_content_type: concept
title: How KV works
---

# How KV works

Workers KV is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare's data centers after access. KV supports exceptionally high read volumes with low latency, making it possible to build highly dynamic APIs and websites that respond as quickly as a cached static file would. While reads are periodically revalidated in the background, requests which are not in cache and need to hit the centralized back end can see high latencies.

## Write data to KV and read data from KV

When you write to KV, your data is written to central data stores. It is not sent automatically to every location’s cache.

![Your data is written to central data stores when you write to KV.](/images/workers/kv-write.svg)

Initial reads from a location do not have a cached value. The data must be read from the nearest central data store, resulting in a slower response.

![Initial reads will miss the cache and go to the nearest central data store first.](/images/workers/kv-slow-read.svg)

Frequent reads from the same location return the cached value without reading from a central data store, resulting in faster response times.

![As mentioned above, frequent reads will return a cached value.](/images/workers/kv-fast-read.svg)

Because Workers KV stores data centrally and uses pull-based replication to store data in cache, it is generally good for use cases where you need to write relatively infrequently, but read quickly and frequently. It is optimized for these high-read applications, only reaching its full performance when data is being frequently read. Infrequently read values are pulled from a central store, while more popular values are cached in the data centers they are requested from.

## Consistency

KV achieves this performance by being eventually-consistent. Changes are usually immediately visible in the Cloudflare global network location at which they are made but may take up to 60 seconds or more to be visible in other global network locations as their cached versions of the data time out. In particular, visibility of changes takes longer in locations which have recently read a previous version of a given key (including reads that indicated the key did not exist, which are also cached locally). Workers KV is not ideal for situations where you need support for atomic operations or where values must be read and written in a single transaction.

If you need stronger consistency guarantees, consider using [Durable Objects](/durable-objects/). One pattern is to send all of your writes for a given KV key through a corresponding instance of a Durable Object, and then read that value from KV in other Workers. This is useful if you need more control over writes, but are satisfied with KV's read characteristics described above.

KV does not perform like an in-memory datastore, such as [Redis](https://redis.io). Accessing KV values, even when locally cached, has significantly more latency than reading a value from memory within a Worker script.

All values are encrypted at rest with 256-bit AES-GCM, and only decrypted by the process executing your Worker scripts or responding to your API requests.

Workers KV is free to try, with additional usage available as part of the Workers Bundled plan.

Learn more at the [Workers KV API reference](/workers/runtime-apis/kv/).

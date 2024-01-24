---
pcx_content_type: concept
title: How KV works
weight: 7
---

# How KV works

KV is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare's data centers after access. 

KV supports exceptionally high read volumes with low latency, making it possible to build highly dynamic APIs. 

While reads are periodically revalidated in the background, requests which are not in cache and need to hit the centralized back end can experience high latencies.

## Write data to KV and read data from KV

When you write to KV, your data is written to central data stores. Your data is not sent automatically to every location’s cache, but regional tiers are notified within seconds to do a purge of that key.

![Your data is written to central data stores when you write to KV.](/images/kv/kv-write.svg)

Initial reads from a location do not have a cached value. Data must be read from the nearest regional tier, followed by a central tier, degrading finally to the central store for a truly cold global read. While the first access is slow globally, subsequent requests are faster, especially if requests are concentrated in a single region.

{{<Aside type="note" header="Hot and cold read">}} 
A hot read means that the data is cached on Cloudflare's edge network using the [CDN](https://developers.cloudflare.com/cache/). A cold read means that the data is not cached, therefore you have to fetch the data from the storage provider.
{{</Aside>}}

![Initial reads will miss the cache and go to the nearest central data store first.](/images/kv/kv-slow-read.svg)

Frequent reads from the same location return the cached value without reading from anywhere else, resulting in the fastest response times. KV operates diligently to keep the latest value in the cache by refreshing from upper tiers and the central data stores in the background. 

Refreshing from upper tiers and the central data stores in the background is done carefully so that assets that are being accessed continue to be kept served from the cache without any stalls.

![As mentioned above, frequent reads will return a cached value.](/images/kv/kv-fast-read.svg)

KV is optimized for high-read applications. It stores data centrally and uses a hybrid push/pull-based replication to store data in cache. KV is suitable for use cases where you need to write relatively infrequently, but read quickly and frequently. Infrequently read values are pulled from other data centers or the central store, while more popular values are cached in the data centers they are requested from.

## Performance

To improve KV performance, increase the [`cacheTtl` parameter](/kv/api/read-key-value-pairs/#cachettl-parameter) up from its default 60 seconds. 

KV achieves high performance by [caching](https://www.cloudflare.com/en-gb/learning/cdn/what-is-caching/) which makes reads eventually-consistent with writes. 

Changes are usually immediately visible in the Cloudflare global network location at which they are made. Changes may take up to 60 seconds or more to be visible in other global network locations as their cached versions of the data time out. Changes may take up to 60 seconds or more to see reads to trigger a refresh. 

Negative lookups indicating that the key does not exist are also cached, so the same delay exists noticing a value is created as when a value is changed.

KV does not perform like an in-memory datastore, such as [Redis](https://redis.io). Accessing KV values, even when locally cached, has significantly more latency than reading a value from memory within a Worker script.

## Consistency

KV achieves high performance by being eventually-consistent. Changes are usually immediately visible in the Cloudflare global network location at which they are made. Changes may take up to 60 seconds or more to be visible in other global network locations as their cached versions of the data time out. 

Visibility of changes takes longer in locations which have recently read a previous version of a given key (including reads that indicated the key did not exist, which are also cached locally). 

{{<Aside type="note">}}
KV is not ideal for applications where you need support for atomic operations or where values must be read and written in a single transaction.
If you need stronger consistency guarantees, consider using [Durable Objects](/durable-objects/). 
{{</Aside>}}

An approach to achieve write-after-write consistency is to send all of your writes for a given KV key through a corresponding instance of a Durable Object, and then read that value from KV in other Workers. This is useful if you need more control over writes, but are satisfied with KV's read characteristics described above.
## Security

Refer to [Data security documentation](/kv/reference/data-security/) to understand how Workers KV secures data.

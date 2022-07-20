---
pcx-content-type: concept
title: How KV works
weight: 0
---

# How KV works

Workers KV is a global, low-latency, key-value data store. It stores data in a small number of centralized data centers, then caches that data in Cloudflare's data centers after access. KV supports exceptionally high read volumes with low latency, making it possible to build highly dynamic APIs and websites that respond as quickly as a cached static file would. While reads are periodically revalidated in the background, requests which are not in cache and need to hit the centralized back end can see high latencies.

Because Workers KV stores data centrally and uses pull-based replication to store data in cache, it is generally good for use cases where you need to write relatively infrequently, but read quickly and frequently. It is optimized for these high-read applications, only reaching its full performance when data is being frequently read. Infrequently read values are stored centrally, while more popular values are maintained in all Cloudflare data centers globally.

KV achieves this performance by being eventually-consistent. Changes are immediately visible in the Cloudflare network edge location at which they are made but may take up to 60 seconds to propagate to all other network edge locations as their cached versions of the data time out and they check in with the central datastores. In particular, propagation of changes takes longer to locations which have recently read a previous version of a given key (including reads that indicated the key did not exist, which are also cached locally). Workers KV is not ideal for situations where you need support for atomic operations or where values must be read and written in a single transaction.

If you need stronger consistency guarantees, consider using [Durable Objects](/workers/learning/using-durable-objects/). One pattern is to send all of your writes for a given KV key through a corresponding instance of a Durable Object, and then read that value from KV in other Workers. This is useful if you need more control over writes, but are ok with KV's read tradeoffs. 

KV does not perform like an in-memory datastore, such as [Redis](https://redis.io). Accessing KV values, even when locally cached, has significantly more latency than reading a value from memory within a Worker script.

All values are encrypted at rest with 256-bit AES-GCM, and only decrypted by the process executing your Worker scripts or responding to your API requests.

Workers KV is free to try, with additional usage available as part of the Workers Bundled plan.

Learn more at the [Workers KV API reference](/workers/runtime-apis/kv/).

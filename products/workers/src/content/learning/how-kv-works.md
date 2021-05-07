---
order: 5
---

# How KV works

Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency, making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.

Workers KV is generally good for use-cases where you need to write relatively infrequently, but read quickly and frequently. It is optimized for these high-read applications, only reaching its full performance when data is being frequently read. Very infrequently read values are stored centrally, while more popular values are maintained in all of our data centers around the world.

KV achieves this performance by being eventually-consistent. Changes are immediately visible in the edge location at which they're made, but may take up to 60 seconds to propagate to all other edge locations. In particular, propagation of changes takes longer to locations which have recently read a previous version of a given key (including reads that indicated the key didn't exist). Workers KV isn’t ideal for situations where you need support for atomic operations or where values must be read and written in a single transaction.

All values are encrypted at rest with 256-bit AES-GCM, and only decrypted by the process executing your Worker scripts or responding to your API requests.

Workers KV is free to try, with additional usage available as part of the Workers Bundled plan.

Learn more at the [Workers KV API reference](/runtime-apis/kv).

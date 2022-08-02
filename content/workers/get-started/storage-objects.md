---
title: Storage options guide
pcx-content-type: concept
weight: 2
meta:
  title: Storage options guide
---

# Storage options guide

The Cloudflare Workers platform provides multiple storage options. This guide will inform you on which storage option is appropriate based on your project's use case.

## KV

Workers KV is an eventually consistent, global, low-latency, key-value data store. 

It is ideal for projects that require:

* High volumes of reads and/or repeated reads to the same keys.
* Per-object time-to-live (TTL).
* Asset storage for websites.

To get started with KV:

* Read how [KV works](/workers/learning/how-kv-works/).
* Create a [KV namespace](/workers/wrangler/workers-kv/).
* Review the [KV Runtime API](/workers/runtime-apis/kv/).
* Learn about KV [Limits](https://developers.cloudflare.com/workers/platform/limits/#kv-limits).

## R2 (beta)

R2 is S3-compatible blob storage that allows developers to store large amounts of unstructured data without egress fees associated with typical cloud storage services.

It is ideal for projects that require:

* Storage for files which are infrequently accessed.
* Large object storage.
* Strong consistency per object.

To get started with R2:

* Read the [Get started guide](https://developers.cloudflare.com/r2/get-started/).
* Learn about R2 [Limits](https://developers.cloudflare.com/r2/platform/limits/).
* Review the [R2 Runtime API](https://developers.cloudflare.com/r2/runtime-apis/).

## R2 and KV comparison

{{<table-wrap>}}

| Feature                                       | KV           | R2 (beta)    |
| --------------------------------------------- | ------------ | ------------ |
| Maximum size per value                        | 25 MiB       | 5 TB         |
| Consistency model                             | Eventual     | Strong       |
| Cached                                        | Always       | Can be by using [Cache API](/workers/runtime-apis/cache/) in a Worker |
| S3-compatible API                             | No           | Yes                     |
| TTL expiration                                | Object-level | Not currently available |
| Maximum operations per second                 | Unlimited    | <1,000/bucket           |

{{</table-wrap>}}

## Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through global uniqueness and a transactional storage API.

- Global Uniqueness guarantees that there will be a single instance of a Durable Object class with a given ID running at once, across the world. Requests for a Durable Object ID are routed by the Workers runtime to the Cloudflare data center that owns the Durable Object.

- The transactional storage API provides strongly consistent key-value storage to the Durable Object. Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request events may still be processed out-of-order from how they arrived at the Object.

It is ideal for projects that require:

* Real-time collaboration (such as a chat application or a game server).
* Consistent storage.
* Data locality.

To get started with Durable Objects:

* Read the [introductory blog post](https://blog.cloudflare.com/introducing-workers-durable-objects/).
* Get started with [Durable Objects](/workers/learning/using-durable-objects/).
* Review the [Durable Objects Runtime API](/workers/runtime-apis/durable-objects/).
* Learn about Durable Objects [Limits](/workers/platform/limits/#durable-objects-limits/).
---
title: Storage objects guide
pcx-content-type: concept
weight: 2
meta:
  title: Storage objects guide
---

# Storage objects guide

The Cloudflare Workers platform provides multiple storage. This guide will inform you on which storage object is appropriate based on your project's use case.

## KV

Workers KV is an eventually consistent, global, low-latency, key-value data store. 

It is ideal for projects that require:

* High volumes of reads and/or repeated reads to the same keys.
* High request rates and work with large amounts of data.
* Per-object time-to-live (TTL).
* Asset storage for websites.

To get started with KV:

* Read how [KV works](/workers/learning/how-kv-works/).
* Create a [KV namespace](/workers/wrangler/workers-kv/).
* Review the [KV Runtime API](/workers/runtime-apis/kv/).
* Learn about KV [Limits](https://developers.cloudflare.com/workers/platform/limits/#kv-limits).

## R2 (beta)

R2 is S3-compatible blob storage that allows developers to store large amounts of unstructured data without egress fees.

It is ideal for projects that require:

* Long-term storage and storage for files which are infrequently accessed.
* Affordable and economic storage and operations.
* Large object storage.
* Strong consistency per object.

To get started with R2:

* Read the [Get started guide](https://developers.cloudflare.com/r2/get-started/).
* Learn about R2 [Limits](https://developers.cloudflare.com/r2/platform/limits/).
* Review the [R2 Runtime API](https://developers.cloudflare.com/r2/runtime-apis/).

## R2 and KV comparison

{{<table-wrap>}}

| Feature                                   | KV           | R2 (beta)    |
| ----------------------------------------- | ------------ | ------------ |
| Maximum upload size                       | 25 MiB       | 5 GB         |
| Read your writes                          | No           | Yes          |
| Cached                                    | Always       | Can be       |
| S3-compatible API                         | No           | Yes          |
| TTL expiration                            | Object-level | Bucket-level |
| Maximum operations per second across a bucket | Unlimited    | <1000        |

{{</table-wrap>}}

## Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through global uniqueness and a transactional storage API. Durable Objects are persistent Workers with consistent memory accessible from other Workers. Each Durable Object has its own consistent KV storage. With Durable Objects, you can sync writes to other storage objects such as KV or third parties.

It is ideal for projects that require:

* Real-time collaboration (such as a chat application or a game server).
* Consistent storage.
* Relational storage.
* Data locality.

To get started with Durable Objects:

* Read the [introductory blog post](https://blog.cloudflare.com/introducing-workers-durable-objects/).
* Get started with [Durable Objects](/workers/learning/using-durable-objects/).
* Review the [Durable Objects Runtime API](/workers/runtime-apis/durable-objects/).
* Learn about Durable Objects [Limits](/workers/platform/limits/#durable-objects-limits/).
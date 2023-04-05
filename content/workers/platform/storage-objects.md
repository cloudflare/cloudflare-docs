---
title: Storage options guide
pcx_content_type: concept
weight: 2
meta:
  title: Storage options guide
---

# Storage options guide

The Cloudflare Workers platform provides multiple storage options. This guide will inform you on which storage option is appropriate based on your project's use case.

Available storage and persistency products include:

* [KV](#kv) for key-value storage.
* [R2](#r2) for S3-compatible object storage use cases.
* [Durable Objects](#durable-objects) for transactional, coordinated use cases
* [D1](#d1) for relational, SQL-based database use cases.
* [Queues](#queues) for job queueing, batching and inter-Service (Worker to Worker) communication.

Applications built on the Workers platform may combine one or more storage components as they grow, scale or as requirements demand.

## KV

Workers KV is an eventually consistent key-value data store that caches on the Cloudflare global network.

It is ideal for projects that require:

* High volumes of reads and/or repeated reads to the same keys.
* Per-object time-to-live (TTL).
* Distributed configuration.

To get started with KV:

* Read how [KV works](/workers/learning/how-kv-works/).
* Create a [KV namespace](/workers/wrangler/workers-kv/).
* Review the [KV Runtime API](/workers/runtime-apis/kv/).
* Learn about KV [Limits](/workers/platform/limits/#kv-limits).

## R2

R2 is S3-compatible blob storage that allows developers to store large amounts of unstructured data without egress fees associated with typical cloud storage services.

It is ideal for projects that require:

* Storage for files which are infrequently accessed.
* Large object storage (for example, gigabytes or more per object).
* Strong consistency per object.
* Asset storage for websites (refer to [caching guide](/r2/buckets/public-buckets//#caching))

To get started with R2:

* Read the [Get started guide](/r2/get-started/).
* Learn about R2 [Limits](/r2/reference/limits/).
* Review the [R2 Workers API](/r2/api/workers/workers-api-reference/).


## Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through global uniqueness and a transactional storage API.

- Global Uniqueness guarantees that there will be a single instance of a Durable Object class with a given ID running at once, across the world. Requests for a Durable Object ID are routed by the Workers runtime to the Cloudflare data center that owns the Durable Object.

- The transactional storage API provides strongly consistent key-value storage to the Durable Object. Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request events may still be processed out-of-order from how they arrived at the Object.

It is ideal for projects that require:

* Real-time collaboration (such as a chat application or a game server).
* Consistent storage.
* Data locality.

To get started with Durable Objects:

* Read the [introductory blog post](https://blog.cloudflare.com/introducing-workers-durable-objects//).
* Get started with [Durable Objects](/workers/learning/using-durable-objects/).
* Review the [Durable Objects Runtime API](/workers/runtime-apis/durable-objects/).
* Learn about Durable Objects [Limits](/workers/platform/limits/#durable-objects-limits/).

## D1

{{<Aside type="note">}}

D1 is currently in [public (open) alpha](/workers/platform/betas/).

{{</Aside>}}

Built on SQLite, D1 is Cloudflare’s first [serverless, queryable relational database](https://blog.cloudflare.com/introducing-d1/). With D1, you can create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

D1 is ideal for:

* Persistent, relational storage for user data, account data, and other structured datasets.
* Use-cases that require querying across your data ad-hoc (using SQL).
* Workloads with a high ratio of reads to writes (most web applications).

To get started with D1:

* Read [the documentation](/d1)
* Follow the [Get started guide](/d1/get-started/) to provision your first D1 database.
* Learn the [D1 client API](/d1/platform/client-api/).

## Queues

{{<Aside type="note">}}

Queues is currently in [public (open) beta](/workers/platform/betas/).

{{</Aside>}}

Cloudflare Queues allows developers to send and receive messages with guaranteed delivery. It integrates with [Cloudflare Workers](/workers) and offers at-least once delivery, message batching, and does not charge for egress bandwidth.

Queues is ideal for:

* Offloading work from a request to schedule later.
* Send data from Worker to Worker (inter-Service communication).
* Buffering or batching data before writing to upstream systems, including third-party APIs or [Cloudflare R2](/queues/examples/send-errors-to-r2/)

To get started with Queues:

* [Set up your first queue](/queues/get-started/)
* Learn more [about how Queues works](/queues/learning/how-queues-works/)


## Comparison

The following table highlights the primary differences and behaviours of KV, R2 and DO as primary storage mechanisms:

{{<table-wrap>}}

| Feature                                       | KV           | R2           | DO                   |
| --------------------------------------------- | ------------ | ------------ |--------------------- |
| Maximum storage per account                   | Unlimited<sup>1</sup>|Unlimited| 50 GiB            |
| Storage grouping name<sup>2</sup>             | Namespace    | Bucket       | Durable Object       |
| Groups per account                            | 100          | 1,000        | Unlimited            |
| Maximum keys per grouping                     | Unlimited    | Unlimited    | Unlimited            |
| Maximum key size                              | 512 bytes    | 1,024 bytes  | 2,048 bytes          |
| Maximum metadata per key                      | 1,024 bytes  | 2,048 bytes  | N/A                  |
| Maximum size per value                        | 25 MiB       | 5 TiB        | 128 KiB per value    |
| Consistency model                             | Eventual     | Strong       | Transactional for multiple keys in a single DO |
| Cached                                        | Always       | Programatically using the [Worker Cache API](/workers/runtime-apis/cache/) or configure a custom [public bucket](/r2/buckets/public-buckets/) domain. | Possible when using [Cache API](/workers/runtime-apis/cache/) |
| S3-compatible API                             | No           | Yes          | No                   |
| TTL expiration                                | Object-level | Not currently available | Not automatic, but possible using [alarms](/workers/learning/using-durable-objects/#alarms-in-durable-objects) |
| Maximum operations per second                 | Unlimited cached reads |  10,000+ reads/s per bucket, 1,000+ writes/s per bucket<sup>3</sup> | 150 requests/second per DO<sup>3</sup> |

{{</table-wrap>}}

<sup>1</sup>Free accounts are limited to 1GiB.
<sup>2</sup>A Durable Object namespace is a logical container for as many Durable Objects as you need and is backed by a class implementing the logic all those Durable Objects will share.
<sup>3</sup>Performance may depend on the specific data access patterns of your application and may be lower or higher depending on your specific application.

You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. To increase a limit, complete the [Limit Increase Request form](https://forms.gle/ukpeZVLWLnKeixDu7).

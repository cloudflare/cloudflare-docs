---
title: Choose a data or storage product
pcx_content_type: concept
weight: 3
meta:
  title: Choosing a data or storage product.
  description: Storage and database options available on Cloudflare's developer platform.
---

# Choose a data or storage product for your use-case

Cloudflare Workers support a range of storage and database options for persisting different types of data across different use-cases, from key-value stores (like [Workers KV](/kv/)) through to SQL databases (such as [D1](/d1/)). This guide describes the use-cases suited to each storage option, as well as their performance and consistency properties.

{{<Aside type="note" header="Pages Functions">}}

Storage options can also be used by your front-end application built with Cloudflare Pages. For more information on available storage options for Pages applications, refer to the [Pages Functions bindings documentation](/pages/functions/bindings/).

{{</Aside>}}

Available storage and persistency products include:

- [Workers KV](#workers-kv) for key-value storage.
- [R2](#r2) for object storage, including use-cases where S3 compatible storage is required.
- [Durable Objects](#durable-objects) for transactional, globally coordinated storage.
- [D1](#d1) as a relational, SQL-based database.
- [Queues](#queues) for job queueing, batching and inter-Service (Worker to Worker) communication.
- [Hyperdrive](/hyperdrive/) for connecting to and speeding up access to existing hosted and on-premises databases.
- [Analytics Engine](/analytics/analytics-engine/) for storing and querying (using SQL) time-series data and product metrics at scale.
- [Vectorize](/vectorize/) for vector search and storing embeddings from [Workers AI](/workers-ai/).

Applications built on the Workers platform may combine one or more storage components as they grow, scale or as requirements demand.

## Choose a storage product

{{<render file="/_storage-products-table.md" productFolder="/workers/">}}

## Performance and consistency

The following table highlights the performance and consistency characteristics of the primary storage offerings available to Cloudflare Workers:

{{<table-wrap>}}

| Feature                           | Workers KV                                       | R2                                    | Durable Objects                  | D1                                                  |
| --------------------------------- | ------------------------------------------------ | ------------------------------------- | -------------------------------- | --------------------------------------------------- |
| Maximum storage per account       | Unlimited<sup>1</sup>                            | Unlimited<sup>2</sup>                 | 50 GiB                           | 250GiB <sup>3</sup>                                 |
| Storage grouping name             | Namespace                                        | Bucket                                | Durable Object                   | Database                                            |
| Maximum size per value            | 25 MiB                                           | 5 TiB per object                      | 128 KiB per value                | 10 GiB per database <sup>4</sup>                    |
| Consistency model                 | Eventual: updates take up to 60s to be reflected | Strong (read-after-write)<sup>5</sup> | Serializable (with transactions) | Serializable (no replicas) / Causal (with replicas) |
| Supported APIs                    | Workers, HTTP/REST API                           | Workers, S3 compatible                | Workers                          | Workers, HTTP/REST API                              |

{{</table-wrap>}}

<sup>1</sup> Free accounts are limited to 1 GiB of KV storage.

<sup>2</sup> Free accounts are limited to 10 GB of R2 storage.

<sup>3</sup> Free accounts are limited to 5 GiB of database storage.

<sup>4</sup> Free accounts are limited to 500 MiB per database.

<sup>5</sup> Refer to the [R2 documentation](/r2/reference/consistency/) for more details on R2's consistency model.

{{<render file="_limits_increase.md">}}

## Workers KV

Workers KV is an eventually consistent key-value data store that caches on the Cloudflare global network.

It is ideal for projects that require:

- High volumes of reads and/or repeated reads to the same keys.
- Per-object time-to-live (TTL).
- Distributed configuration.

To get started with KV:

- Read how [KV works](/kv/reference/how-kv-works/).
- Create a [KV namespace](/kv/reference/kv-namespaces/).
- Review the [KV Runtime API](/kv/api/).
- Learn about KV [Limits](/kv/platform/limits/).

## R2

R2 is S3-compatible blob storage that allows developers to store large amounts of unstructured data without egress fees associated with typical cloud storage services.

It is ideal for projects that require:

- Storage for files which are infrequently accessed.
- Large object storage (for example, gigabytes or more per object).
- Strong consistency per object.
- Asset storage for websites (refer to [caching guide](/r2/buckets/public-buckets//#caching))

To get started with R2:

- Read the [Get started guide](/r2/get-started/).
- Learn about R2 [Limits](/r2/reference/limits/).
- Review the [R2 Workers API](/r2/api/workers/workers-api-reference/).

## Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through global uniqueness and a transactional storage API.

- Global Uniqueness guarantees that there will be a single instance of a Durable Object class with a given ID running at once, across the world. Requests for a Durable Object ID are routed by the Workers runtime to the Cloudflare data center that owns the Durable Object.

- The transactional storage API provides strongly consistent key-value storage to the Durable Object. Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request events may still be processed out-of-order from how they arrived at the Object.

It is ideal for projects that require:

- Real-time collaboration (such as a chat application or a game server).
- Consistent storage.
- Data locality.

To get started with Durable Objects:

- Read the [introductory blog post](https://blog.cloudflare.com/introducing-workers-durable-objects/).
- Review the [Durable Objects documentation](/durable-objects/).
- Get started with [Durable Objects](/durable-objects/get-started/).
- Learn about Durable Objects [Limits](/durable-objects/platform/limits/).

## D1

[D1](/d1/) is Cloudflare’s native serverless database. With D1, you can create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

D1 is ideal for:

- Persistent, relational storage for user data, account data, and other structured datasets.
- Use-cases that require querying across your data ad-hoc (using SQL).
- Workloads with a high ratio of reads to writes (most web applications).

To get started with D1:

* Read [the documentation](/d1)
* Follow the [Get started guide](/d1/get-started/) to provision your first D1 database.
* Review the [D1 client API](/d1/build-with-d1/d1-client-api/).


## Queues

Cloudflare Queues allows developers to send and receive messages with guaranteed delivery. It integrates with [Cloudflare Workers](/workers) and offers at-least once delivery, message batching, and does not charge for egress bandwidth.

Queues is ideal for:

- Offloading work from a request to schedule later.
- Send data from Worker to Worker (inter-Service communication).
- Buffering or batching data before writing to upstream systems, including third-party APIs or [Cloudflare R2](/queues/examples/send-errors-to-r2/).

To get started with Queues:

- [Set up your first queue](/queues/get-started/).
- Learn more [about how Queues works](/queues/reference/how-queues-works/).

## Hyperdrive

Hyperdrive is a service that accelerates queries you make to existing databases, making it faster to access your data from across the globe, irrespective of your users’ location.

Hyperdrive allows you to:

- Connect to an existing database from Workers without connection overhead.
- Cache frequent queries across Cloudflare's global network to reduce response times on highly trafficked content.
- Reduce load on your origin database with connection pooling.

To get started with Hyperdrive:

- [Connect Hyperdrive](/hyperdrive/get-started/) to your existing database.
- Learn more [about how Hyperdrive speeds up your database queries](/hyperdrive/configuration/how-hyperdrive-works/).

## Analytics Engine

Analytics Engine is Cloudflare's time-series and metrics database that allows you to write unlimited-cardinality analytics at scale using a built-in API to write data points from Workers and query that data using SQL directly.

Analytics Engine allows you to:

- Expose custom analytics to your own customers
- Build usage-based billing systems
- Understand the health of your service on a per-customer or per-user basis
- Add instrumentation to frequently called code paths, without impacting performance or overwhelming external analytics systems with events

Cloudflare uses Analytics Engine internally to store and product per-product metrics for products like D1 and R2 at scale.

To get started with Analytics Engine:

- Learn how to [get started with Analytics Engine](/analytics/analytics-engine/get-started/)
- See [an example of writing time-series data to Analytics Engine](/analytics/analytics-engine/recipes/usage-based-billing-for-your-saas-product/)
- Understand the [SQL API](/analytics/analytics-engine/sql-api/) for reading data from your Analytics Engine datasets


## Vectorize

Vectorize is a globally distributed vector database that enables you to build full-stack, AI-powered applications with Cloudflare Workers and [Workers AI](/workers-ai/).

Vectorize allows you to:

- Store embeddings from any vector embeddings model (Bring Your Own embeddings) for semantic search and classification tasks.
- Add context to Large Language Model (LLM) queries by using vector search as part of a [Retrieval Augmented Generation](/workers-ai/tutorials/build-a-retrieval-augmented-generation-ai/) (RAG) workflow.
- [Filter on vector metadata](/vectorize/reference/metadata-filtering/) to reduce the search space and return more relevant results.

To get started with Vectorize:

- [Create your first vector database](/vectorize/get-started/intro/).
- Combine [Workers AI and Vectorize](/vectorize/get-started/embeddings/) to generate, store and query text embeddings.
- Learn more about [how vector databases work](/vectorize/reference/what-is-a-vector-database/).

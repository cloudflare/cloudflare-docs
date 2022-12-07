---
pcx_content_type: concept
title: Bindings
---

# Bindings

Bindings allow your Workers to interact with resources on the Workers platform. 

There are multiple types of bindings available today.

## Configuration

Bindings can be configured one of two ways:

* Updating your project's [`wrangler.toml` file](/workers/wrangler/configuration/#bindings).
* Logging in to the [Cloudflare dashboard](https://dash.cloudflare.com) > Account Home > [**Workers**](https://dash.cloudflare.com/?zone=workers) > your **Worker** > **Settings**> **Variables**.

### Service bindings

Service bindings allow for communication with another Worker.

To configure Service bindings via your `wrangler.toml` file, refer to [About Service bindings](/workers/platform/bindings/about-service-bindings/).

### KV namespace bindings

[KV namespace bindings](/workers/runtime-apis/kv/#kv-bindings) allow for communication between a Worker and a KV namespace.

To set up KV namespace bindings via your `wrangler.toml` file, refer to [Configuration: KV namespaces](/workers/wrangler/configuration/#kv-namespaces).

### Durable Object bindings

[Durable Object bindings](/workers/runtime-apis/durable-objects/#accessing-a-durable-object-from-a-worker) for communication between a Worker and a Durable Object.

To set up Durable Object bindings via your `wrangler.toml` file, refer to [Configuration: Durable Objects](/workers/wrangler/configuration/#durable-objects).

### R2 bucket bindings

[R2 bucket bindings](/r2/data-access/workers-api/workers-api-reference/#create-a-binding) for communication between a Worker and an R2 bucket.

To set up R2 bucket bindings via your `wrangler.toml` file, refer to [Configuration: R2 buckets](/workers/wrangler/configuration/#r2-buckets).

### Queue bindings

[Queue](/queues) bindings allow for communication between a Worker and a Queue.

To set up Queue bindings via your `wrangler.toml` file, refer to Queues [Configuration](/queues/configuration/).
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
* Logging in to the [Cloudflare dashboard](https://dash.cloudflare.com) > Account Home > **Workers** > your **Worker** > **Settings**> **Variables**.

### Service bindings

Service bindings allow for communication with another Worker.

* Configure and learn more about [Service bindings](/workers/platform/bindings/about-service-bindings/).

### KV namespace bindings

KV namespace bindings allow for communication between a Worker and a KV namespace.

* Learn more about [KV namespace bindings](/workers/runtime-apis/kv/#kv-bindings).
* Configure KV namespace bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#kv-namespaces).

### Durable Object bindings

Durable Object bindings for communication between a Worker and a Durable Object.

* Learn more about [Durable Object bindings](/workers/runtime-apis/durable-objects/#accessing-a-durable-object-from-a-worker).
* Configure Durable Object bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#durable-objects).

### R2 bucket bindings

R2 bucket bindings for communication between a Worker and an R2 bucket.

* Learn more about [R2 bucket bindings](/r2/data-access/workers-api/workers-api-reference/#create-a-binding).
* Configure R2 bucket bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#r2-buckets).

### Queue bindings

[Queue](/queues) bindings allow for communication between a Worker and a Queue.

* Configure Queue bindings via your [`wrangler.toml` file](/queues/configuration/).
---
pcx_content_type: concept
title: Bindings
---

# Bindings

Bindings allow your Workers to interact with resources on the Workers platform. 

There are multiple types of bindings available today:

1. [Service bindings](/workers/platform/bindings/about-service-bindings/) for communication with another Worker.
2. [KV namespace bindings](/workers/runtime-apis/kv/#kv-bindings) for communication between a Worker and a KV namespace.
3. [R2 bucket bindings](/r2/data-access/workers-api/workers-api-reference/#create-a-binding) for communication between a Worker and an R2 bucket.
4. [Durable Object bindings](/workers/runtime-apis/durable-objects/#accessing-a-durable-object-from-a-worker) for communication between a Worker and a Durable Object.
5. [Queue bindings](/queues/configuration/) for communication between a Worker and a Queue.

## Configuration

Bindings can be configured [via Wrangler](/workers/wrangler/configuration/#bindings) using `wrangler.toml` or by logging in to the Cloudflare Dashboard > Account Home > [**Workers**](https://dash.cloudflare.com/?zone=workers) > your **Worker** > **Settings**> **Variables**.
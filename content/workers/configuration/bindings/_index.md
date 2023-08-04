---
pcx_content_type: concept
title: Bindings
layout: single
---

# Bindings

Bindings allow your Workers to interact with resources on the Cloudflare developer platform.

There are multiple types of bindings available today.

## Configuration

Bindings can be configured by one of two ways:

* Updating your project's [`wrangler.toml` file](/workers/wrangler/configuration/#bindings).
* Logging in to the [Cloudflare dashboard](https://dash.cloudflare.com) > Account Home > **Workers & Pages** > your Worker > **Settings**> **Variables**.

### Service bindings

Service bindings allow for communication with another Worker.

* Configure and learn more about [Service bindings](/workers/configuration/bindings/about-service-bindings/).

### KV namespace bindings

KV namespace bindings allow for communication between a Worker and a KV namespace.

* Learn more about [KV namespace bindings](/workers/runtime-apis/kv/#kv-bindings).
* Configure KV namespace bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#kv-namespaces).

### Durable Object bindings

Durable Object bindings for communication between a Worker and a Durable Object.

* Learn more about [Durable Object bindings](/durable-objects/how-to/access-durable-object-from-a-worker/).
* Configure Durable Object bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#durable-objects).

### R2 bucket bindings

R2 bucket bindings for communication between a Worker and an R2 bucket.

* Learn more about [R2 bucket bindings](/r2/api/workers/workers-api-reference/#create-a-binding).
* Configure R2 bucket bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#r2-buckets).

### Queue bindings

[Queue](/queues) bindings allow for communication between a Worker and a Queue.

* Configure Queue bindings via your [`wrangler.toml` file](/queues/platform/configuration/).

### D1 database bindings

[D1](/d1) bindings allow you to query a D1 database from your Worker.

* [Configure a D1 binding](/d1/get-started/#3-bind-your-worker-to-your-d1-database).
* Learn more about how to query a D1 database using the [client API](/d1/platform/client-api/).

### Dispatch namespace bindings (Workers for Platforms)

Dispatch namespace bindings allow for communication between a dynamic dispatch Worker and a dispatch namespace. Dispatch namespace bindings are used in [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/). Workers for Platforms helps you deploy serverless functions programmatically on behalf of your customers.

* Configure dispatch namespace bindings via your [`wrangler.toml` file](/cloudflare-for-platforms/workers-for-platforms/get-started/dynamic-dispatch/).

### mTLS certificate bindings

mTLS certificate bindings enable Worker subrequests to present a client certificate when communicating with a service that requires client authentication.

* Learn more about [mTLS certificate bindings](/workers/runtime-apis/mtls/).
* Configure mTLS certificate bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#mtls-certificates).

### Email bindings

Email bindings allow you to send emails from your Worker. This is useful for when you want to know about certain types of events being triggered, for example.

- Learn more about [email bindings](/email-routing/email-workers/send-email-workers/).
- Configure email bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#email-bindings).

### Constellation bindings

[Constellation](/constellation/) bindings allow for communication between a Worker and a Constellation project.

* Learn more about [Constellation bindings](/constellation/platform/wrangler/#bindings).
* Configure Constellation bindings via your [`wrangler.toml` file](/constellation/platform/wrangler/#bindings).
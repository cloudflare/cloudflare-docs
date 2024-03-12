---
pcx_content_type: concept
title: Bindings
meta:
  description: Interact with storage and other resources on the Cloudflare Developer Platform.
---

# Bindings

Bindings allow your Workers to interact with resources on the Cloudflare Developer Platform.

There are multiple types of bindings available today, including [environment variables (text and JSON values)](/workers/configuration/environment-variables/) as well as [secrets](/workers/configuration/secrets/).

To learn how to access bindings in your code, refer to [Bindings](/workers/reference/migrate-to-module-workers/#bindings) in the Migrate to ES Modules guide.

## Configuration

Bindings can be configured in one of two ways:

* Updating your project's [`wrangler.toml` file](/workers/wrangler/configuration/#bindings).
* Logging in to the [Cloudflare dashboard](https://dash.cloudflare.com) > Account Home > **Workers & Pages** > your Worker > **Settings**> **Variables**.

### Service bindings

Service bindings allow for communication with another Worker.

* Learn more about [Service bindings](/workers/configuration/bindings/about-service-bindings/).
* Configure Service bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#service-bindings).

### KV namespace bindings

KV namespace bindings allow for communication between a Worker and a KV namespace.

* Learn more about [KV namespace bindings](/kv/reference/kv-bindings/).
* Configure KV namespace bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#kv-namespaces).

### Durable Object bindings

Durable Object bindings for communication between a Worker and a Durable Object.

* Learn more about [Durable Object bindings](/durable-objects/configuration/access-durable-object-from-a-worker/).
* Configure Durable Object bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#durable-objects).

### R2 bucket bindings

R2 bucket bindings for communication between a Worker and an R2 bucket.

* Learn more about [R2 bucket bindings](/r2/api/workers/workers-api-reference/#create-a-binding).
* Configure R2 bucket bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#r2-buckets).

### Queue bindings

[Queue](/queues/) bindings allow for communication between a Worker and a Queue.

- Configure Queue bindings via your [`wrangler.toml` file](/queues/reference/configuration/).

### D1 database bindings

[D1](/d1/) bindings allow you to query a D1 database from your Worker.

- Create your first [D1 binding](/d1/get-started/#4-bind-your-worker-to-your-d1-database).
- Configure a D1 bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#d1-databases).
- Learn more about how to query a D1 database using the [client API](/d1/build-databases/query-databases/).

### Vectorize database bindings

[Vectorize](/vectorize/) bindings allow you to interact with and query a Vectorize index from your Worker.

- Create your first [Vectorize binding](/vectorize/get-started/).
- Configure a Vectorize binding via your [`wrangler.toml` file](/workers/wrangler/configuration/#vectorize-indexes).
- Learn more about how to query a Vectorize index using the [client API](/vectorize/reference/client-api/).

### Hyperdrive bindings

[Hyperdrive](/hyperdrive/) bindings allow you to interact with and query any Postgres database from within a Worker.

- Create your first [Hyperdrive binding](/hyperdrive/get-started/#4-bind-your-worker-to-hyperdrive).
- Configure a Hyperdrive binding via your [`wrangler.toml` file](/workers/wrangler/configuration/#hyperdrive).

### Dispatch namespace bindings (Workers for Platforms)

Dispatch namespace bindings allow for communication between a dynamic dispatch Worker and a dispatch namespace. Dispatch namespace bindings are used in [Workers for Platforms](/cloudflare-for-platforms/workers-for-platforms/). Workers for Platforms helps you deploy serverless functions programmatically on behalf of your customers.

- Create your first [dispatch namespace binding](/cloudflare-for-platforms/workers-for-platforms/get-started/configuration/#3-create-a-dynamic-dispatch-worker).

### mTLS certificate bindings

mTLS certificate bindings enable Worker subrequests to present a client certificate when communicating with a service that requires client authentication.

- Learn more about [mTLS certificate bindings](/workers/runtime-apis/bindings/mtls/).
- Configure mTLS certificate bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#mtls-certificates).

### Email bindings

Email bindings allow you to send emails from your Worker. This is useful for when you want to know about certain types of events being triggered, for example.

- Learn more about [email bindings](/email-routing/email-workers/send-email-workers/).
- Configure email bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#email-bindings).

### Workers AI bindings

[Workers AI](/workers-ai/) bindings allow for communication between a Worker and an AI/ML model.

- Learn more about [Workers AI bindings](/workers-ai/).
- Create your first [AI binding](/workers-ai/get-started/workers-wrangler/#2-connect-your-worker-to-workers-ai).
- Configure Workers AI bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#ai).

### Browser bindings

The [Workers Browser Rendering API](/browser-rendering/) allows developers to programmatically control and interact with a headless browser instance and create automation flows for their applications and products.

A browser binding will provide your Worker with an authenticated endpoint to interact with a dedicated Chromium browser instance.

- Create your first [browser binding](/browser-rendering/get-started/screenshots/#4-configure-wranglertoml).
- Configure browser bindings via your [`wrangler.toml` file](/workers/wrangler/configuration/#browser-rendering).
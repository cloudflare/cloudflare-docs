---
pcx_content_type: how-to
title: Bindings
weight: 7
---

# Bindings

A [binding](/workers/platform/bindings/) enables your Pages Functions to interact with resources on the Cloudflare developer platform. Use bindings to integrate your Pages Functions with Cloudflare resources like [KV](/workers/learning/how-kv-works/), [Durable Objects](/workers/learning/using-durable-objects/), [R2](/r2/), and [D1](/d1/). You can set bindings for both production and preview environments.

This guide will instruct you on configuring a binding for your Pages Function. You must already have a resource set up to continue.

{{<Aside type="note">}}
Local development uses local storage. It cannot access data stored on Cloudflare’s servers.
{{</Aside>}}

## KV namespaces

[Workers KV](/workers/wrangler/workers-kv/) is Cloudflare's key-value storage solution. To bind your KV namespace to your Pages Function:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **KV namespace bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
6. Under **KV namespace**, select your desired namespace. You must repeat steps 5 and 6 for both the **Production** and **Preview** environments.
7. Redeploy your project for the binding to take effect.

Below is an example of how to use KV in your Function. Your KV binding is `TODO_LIST`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export async function onRequest(context) {
  const task = await context.env.TODO_LIST.get("Task:123");
  return new Response(task);
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {
  TODO_LIST: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const task = await context.env.TODO_LIST.get("Task:123");
  return new Response(task);
};
```

{{</tab>}}
{{</tabs>}}

### Interact with your KV namespaces locally

While developing locally, interact with your KV namespace by adding `-k <BINDING_NAME>` or `--kv=<BINDING_NAME>` to your run command. For example, if your namespace is bound to `TODO_LIST`, access the KV namespace in your local dev by running `npx wrangler pages dev <OUTPUT_DIR> --kv=TODO_LIST`. The data from this namespace can be accessed using `context.env.TODO_LIST`.

## Durable Object namespaces

[Durable Objects](/workers/learning/using-durable-objects/) (DO) are Cloudflare's strongly consistent data store that power capabilities such as connecting WebSockets and handling state. To bind your DO namespace to your Pages Function:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **Durable Object bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
6. Under **Durable Object namespace**, select your desired namespace. You must repeat steps 5 and 6 for both the **Production** and **Preview** environments.
7. Redeploy your project for the binding to take effect.

Below is an example of how to use Durable Objects in your Function. Your DO binding is `DURABLE_OBJECT`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export async function onRequestGet(context) {
  const id = context.env.DURABLE_OBJECT.newUniqueId();
  const stub = context.env.DURABLE_OBJECT.get(id);

  // Pass the request down to the durable object
  return stub.fetch(context.request);
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {
  DURABLE_OBJECT: DurableObjectNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = context.env.DURABLE_OBJECT.newUniqueId();
  const stub = context.env.DURABLE_OBJECT.get(id);

  // Pass the request down to the durable object
  return stub.fetch(context.request);
};
```

{{</tab>}}
{{</tabs>}}

## R2 buckets

[R2](/r2/) is Cloudflare's blob storage solution that allows developers to store large amounts of unstructured data without the egress fees. To bind your R2 bucket to your Pages Function:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **R2 bucket bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
6. Under **R2 bucket**, select your desired R2 bucket. You must repeat steps 5 and 6 for both the **Production** and **Preview** environments.
7. Redeploy your project for the binding to take effect.

Below is an example of how to use R2 buckets in your Function. Your R2 binding is `BUCKET`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export async function onRequest(context) {
  const obj = await context.env.BUCKET.get("some-key");
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(obj.body);
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {
  BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const obj = await context.env.BUCKET.get("some-key");
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(obj.body);
};
```

{{</tab>}}
{{</tabs>}}

### Interact with your R2 buckets locally

While developing locally, interact with an R2 bucket by adding `--r2=<BINDING_NAME>` to your run command. For example, if your bucket is bound to `BUCKET`, access this bucket in local dev by running `npx wrangler pages dev <OUTPUT_DIR> --r2=BUCKET`. Interact with this binding by using `context.env` (for example, `context.env.BUCKET`).

## D1 databases

Cloudflare [D1](/d1/) is Cloudflare's first SQL database built on SQLite. To bind your D1 database to your Pages Function:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **D1 database bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
6. Under **D1 database**, select your desired D1 database. You must repeat steps 5 and 6 for both the **Production** and **Preview** environments.
7. Redeploy your project for the binding to take effect.

Below is an example of how to use D1 databases in your Function. Your D1 binding is `NORTHWIND_DB`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export async function onRequest(context) {
  // Create a prepared statement with our query
  const ps = context.env.NORTHWIND_DB.prepare("SELECT * from users");
  const data = await ps.first();

  return Response.json(data);
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {
  NORTHWIND_DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // Create a prepared statement with our query
  const ps = context.env.NORTHWIND_DB.prepare("SELECT * from users");
  const data = await ps.first();

  return Response.json(data);
};
```

{{</tab>}}
{{</tabs>}}

### Interact with your D1 databases locally

While developing locally, interact with a D1 database by adding `--d1=<BINDING_NAME>` to your run command.

{{<Aside type="note">}}
By default, data in local development is not persisted. This means if you create a schema and/or insert data into a D1 table, the next time you start local development, it will no longer exist.

You can enable persistence with the `--persist` flag.
{{</Aside>}}

Specifically:

- If your database is bound to `NORTHWIND_DB`, access this database in local development by running `npx wrangler pages dev <OUTPUT_DIR> --d1=NORTHWIND_DB`.
- Interact with this binding by using `context.env` - for example, `context.env.NORTHWIND_DB`

Refer to the [D1 client API documentation](/d1/platform/client-api/) for the API methods available on your D1 binding.

## Service bindings

[Service bindings](/workers/runtime-apis/service-bindings/) enable you to call a Worker from within your Pages Function. To add a service binding to your Pages Function:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **Service bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
6. Under **Service**, select your desired Worker. You must repeat steps 5 and 6 for both the **Production** and **Preview** environments.
7. Redeploy your project for the binding to take effect.

Below is an example of how to use service bindings in your Function. Your service binding is named `SERVICE`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export async function onRequestGet(context) {
  return context.env.SERVICE.fetch(context.request);
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {
  SERVICE: Fetcher;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  return context.env.SERVICE.fetch(context.request);
};
```

{{</tab>}}
{{</tabs>}}

### Interact with your Service binding locally

While developing locally, interact with a service by adding `--service=<BINDING_NAME>=<WORKER_NAME>` to your run command. For example, if your service is bound to `SERVICE`, access this service in local dev by running `npx wrangler pages dev <OUTPUT_DIR> --service=SERVICE=my-worker`. You will need to also have the `my-worker` Worker running in `wrangler pages dev`. Interact with this binding by using `context.env` (for example, `context.env.SERVICE`).

## Queue Producers

[Queue Producers](/queues/platform/javascript-apis/#producer) enable you to send messages into a Queue within your Pages Function. To add a Queue producer binding to your Pages Function:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **Queue Producers bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
6. Under **Dataset**, input your desired dataset. You must repeat steps 5 and 6 for both the **Production** and **Preview** environments.
7. Redeploy your project for the binding to take effect.

Below is an example of how to use Queue Producers in your Function. In this example, the binding is named `MY_QUEUE`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export async function onRequest(context) {
  await env.MY_QUEUE.send({
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers),
  });

  return new Response("Sent!");
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {
  MY_QUEUE: Queue;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  await env.MY_QUEUE.send({
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers),
  });

  return new Response("Sent!");
};
```

{{</tab>}}
{{</tabs>}}

### Interact with your Queue Producer binding locally

At this time, Wrangler does not support interacting with Queue Producers during local development. We recommend testing on a preview branch instead.

## Analytics Engine

The [Analytics Engine](/analytics/analytics-engine/) binding enables you to write analytics within your Pages Function. To add a Analytics Engine binding to your Pages Function:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **Analytics Engine bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
6. Under **Dataset**, input your desired dataset. You must repeat steps 5 and 6 for both the **Production** and **Preview** environments.
7. Redeploy your project for the binding to take effect.

Below is an example of how to use Analytics Engine in your Function. In this example, the binding is named `ANALYTICS_ENGINE`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export async function onRequest(context) {
  const url = new URL(context.request.url);

  context.env.ANALYTICS_ENGINE.writeDataPoint({
    indexes: [],
    blobs: [url.hostname, url.pathname],
    doubles: [],
  });

  return new Response("Logged analytic");
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {
  ANALYTICS_ENGINE: AnalyticsEngineDataset;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  context.env.ANALYTICS_ENGINE.writeDataPoint({
    indexes: [],
    blobs: [url.hostname, url.pathname],
    doubles: [],
  });

  return new Response("Logged analytic");
};
```

{{</tab>}}
{{</tabs>}}

### Interact with your Analytics Engine binding locally

At this time, Wrangler does not support interacting with Analytics Engine during local development. We recommend testing on a preview branch instead.

## Environment variables

An [environment variable](/workers/platform/environment-variables/) is an injected value that can be accessed by your Functions. It is stored as plain text. Set your environment variables directly within the Cloudflare Pages dashboard for both your production and preview environments at runtime and build-time.

To add Pages project environment variables:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Environment variables**.
4. Selecting **Add variables** under **Production** and/or **Preview**.
5. After setting a variable name and value, select **Save**.

Below is an example of how to use environment variables in your Function. The environment variable in this example is `ENVIRONMENT`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export function onRequest(context) {
  if (context.env.ENVIRONMENT === "development") {
    return new Response("This is a local environment!");
  } else {
    return new Response("This is a live environment");
  }
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {
  ENVIRONMENT: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.env.ENVIRONMENT === "development") {
    return new Response("This is a local environment!");
  } else {
    return new Response("This is a live environment");
  }
};
```

{{</tab>}}
{{</tabs>}}

### Interact with your environment variables locally

When developing locally, add environment variables by creating a `.dev.vars` file in the root directory of your project. Then add the following code snippet to `.dev.vars`:

```
---
filename:  `.dev.vars`
---
ENVIRONMENT=development
```

## Secrets

Secrets are environment variables that are encrypted and not visible once set. They are used for storing sensitive information like API keys, and auth tokens.

To add secrets to your Pages project:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > select **Settings** > **Environment variables**.
4. Selecting **Add variables** under **Production** and/or **Preview**.
5. Select **Encrypt** to create your secret.
6. Select **Save**.

You use secrets the same way as environment variables, [see here](#environment-variables) for how to use them.

### Interact with your secrets locally

When developing locally, add environment variables by creating a `.dev.vars` file in the root directory of your project. Then add the following code snippet to `.dev.vars`:

```
---
filename:  `.dev.vars`
---
API_KEY=1x0000000000000000000000000000000AA
```

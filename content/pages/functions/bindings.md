---
pcx_content_type: how-to
title: Bindings
weight: 7
---

# Bindings

A [binding](/workers/runtime-apis/bindings/) enables your Pages Functions to interact with resources on the Cloudflare developer platform. Use bindings to integrate your Pages Functions with Cloudflare resources like [KV](/kv/reference/how-kv-works/), [Durable Objects](/durable-objects/), [R2](/r2/), and [D1](/d1/). You can set bindings for both production and preview environments.

This guide will instruct you on configuring a binding for your Pages Function. You must already have a resource set up to continue.

{{<Aside type="note">}}
Local development uses local storage. It cannot access data stored on Cloudflare’s servers.
{{</Aside>}}

## KV namespaces

[Workers KV](/kv/reference/kv-namespaces/) is Cloudflare's key-value storage solution. To bind your KV namespace to your Pages Function:

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
}
```
{{</tab>}}
{{</tabs>}}

### Interact with your KV namespaces locally

While developing locally, interact with your KV namespace by adding `-k <BINDING_NAME>` or `--kv=<BINDING_NAME>` to your run command. For example, if your namespace is bound to `TODO_LIST`, access the KV namespace in your local dev by running `npx wrangler pages dev <OUTPUT_DIR> --kv=TODO_LIST`. The data from this namespace can be accessed using `context.env.TODO_LIST`.

Alternatively, you can interact with a KV namespace locally via a `wrangler.toml` file. Refer to [Wrangler configuration](/workers/wrangler/configuration/#kv-namespaces) for more information.

{{<render file="_pages_local_bindings_warning.md">}}

## Durable Object namespaces

[Durable Objects](/durable-objects/) (DO) are Cloudflare's strongly consistent data store that power capabilities such as connecting WebSockets and handling state. To bind your DO namespace to your Pages Function:

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
}
```
{{</tab>}}
{{</tabs>}}

### Interact with your Durable Object namespaces locally

While developing locally, to interact with a Durable Object namespace, run the Worker exporting the Durable object via `wrangler dev` and in parallel, run `wrangler pages dev` with `--do <BINDING_NAME>=<CLASS_NAME>@<SCRIPT_NAME>` where `CLASS_NAME` indicates the Durable Object class name and `SCRIPT_NAME` the name of your Worker. For example, if your Worker is called `do-worker` and it declares a Durable Object class called `DurableObjectExample`, access this Durable Object by running your `do-worker` via `npx wrangler dev` (in the Worker's directory) alongside `npx wrangler pages dev <OUTPUT_DIR> --do MY_DO=DurableObjectExample@do-worker` (in the Pages' directory). Interact with this binding by using `context.env` (for example, `context.env.MY_DO`).

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
  const obj = await context.env.BUCKET.get('some-key');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
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
  const obj = await context.env.BUCKET.get('some-key');
  if (obj === null) {
    return new Response('Not found', { status: 404 });
  }
  return new Response(obj.body);
}
```
{{</tab>}}
{{</tabs>}}

### Interact with your R2 buckets locally

While developing locally, interact with an R2 bucket by adding `--r2=<BINDING_NAME>` to your run command.

{{<Aside type="note">}}
By default, `wrangler dev` automatically persists data.
{{</Aside>}}

If your bucket is bound to `BUCKET`, access this bucket in local dev by running `npx wrangler pages dev <OUTPUT_DIR> --r2=BUCKET`. Interact with this binding by using `context.env` (for example, `context.env.BUCKET`).

Alternatively, you can interact with an R2 bucket locally via a `wrangler.toml` file. Refer to [Wrangler configuration](/workers/wrangler/configuration/#r2-buckets) for more information.

{{<render file="_pages_local_bindings_warning.md">}}

## D1 databases

[D1](/d1/) is Cloudflare’s native serverless database. To bind your D1 database to your Pages Function:

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
  const ps = context.env.NORTHWIND_DB.prepare('SELECT * from users');
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
  const ps = context.env.NORTHWIND_DB.prepare('SELECT * from users');
  const data = await ps.first();

  return Response.json(data);
}
```
{{</tab>}}
{{</tabs>}}

### Interact with your D1 databases locally

While [developing locally](/d1/configuration/local-development/#develop-locally-with-pages), interact with a D1 database by adding `--d1 <BINDING_NAME>=<DATABASE_ID>` to your run command.

{{<Aside type="note">}}
By default, [`wrangler dev`](/workers/wrangler/commands/#dev-1) automatically persists data.
{{</Aside>}}

Specifically:

* If your database is bound to `NORTHWIND_DB` and the `database_id` in your `wrangler.toml` file is `xxxx-xxxx-xxxx-xxxx-xxxx`, access this database in local development by running `npx wrangler pages dev <OUTPUT_DIR> --d1 NORTHWIND_DB=xxxx-xxxx-xxxx-xxxx-xxxx`.
* Interact with this binding by using `context.env` - for example, `context.env.NORTHWIND_DB`

Refer to the [D1 client API documentation](/d1/build-databases/query-databases/) for the API methods available on your D1 binding.

Alternatively, you can interact with a D1 database locally via a `wrangler.toml` file. Refer to [Wrangler configuration](/workers/wrangler/configuration/#d1-databases) for more information.

{{<render file="_pages_local_bindings_warning.md">}}

## Workers AI

[Workers AI](/workers-ai/) allows you to run  AI models. To bind Workers AI to your Pages Function:

{{<Aside type="warning">}}
While Pages currently supports Workers AI bindings, they do not work in local dev mode. Cloudflare aims to provide local dev support soon, but recommends you use the [REST API](/workers-ai/get-started/rest-api/) with Pages in the meantime.
{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **Workers AI bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
7. Redeploy your project for the binding to take effect.

### Install the Workers AI client library

Below is an example of how to use Workers AI in your Function. Your Workers AI binding is `AI`:

```sh
$ npm install @cloudflare/ai
```

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
import { Ai } from '@cloudflare/ai'

export async function onRequest(context) {
  const ai = new Ai(context.env.AI);

  const input = { prompt: "What is the origin of the phrase Hello, World" }

  const answer = await ai.run('@cf/meta/llama-2-7b-chat-int8', input);

  return Response.json(answer);
}
```
{{</tab>}}
{{<tab label="ts">}}
```ts
import { Ai } from '@cloudflare/ai'

interface Env {
  AI: any;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const ai = new Ai(context.env.AI);

  const input = { prompt: "What is the origin of the phrase Hello, World" }

  const answer = await ai.run('@cf/meta/llama-2-7b-chat-int8', input)

  return Response.json(answer);
}
```
{{</tab>}}
{{</tabs>}}

## Service bindings

[Service bindings](/workers/runtime-apis/bindings/service-bindings/) enable you to call a Worker from within your Pages Function. To add a service binding to your Pages Function:

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
}
```
{{</tab>}}
{{</tabs>}}

### Interact with your service bindings locally

To interact with a [service binding](/workers/runtime-apis/bindings/service-bindings/) while developing locally, run the Worker you want to bind to via `wrangler dev` and in parallel, run `wrangler pages dev` with `--service <BINDING_NAME>=<SCRIPT_NAME>` where `SCRIPT_NAME` indicates the name of the Worker. For example, if your Worker is called `my-worker`, connect with this Worker by running it via `npx wrangler dev` (in the Worker's directory) alongside `npx wrangler pages dev <OUTPUT_DIR> --service MY_SERVICE=my-worker` (in the Pages' directory). Interact with this binding by using `context.env` (for example, `context.env.MY_SERVICE`).

Alternatively, you can interact with a service binding locally via a `wrangler.toml` file. Refer to [Wrangler configuration](/workers/wrangler/configuration/#service-bindings) for more information.

{{<render file="_pages_local_bindings_warning.md">}}

## Queue Producers

[Queue Producers](/queues/reference/javascript-apis/#producer) enable you to send messages into a Queue within your Pages Function. To add a Queue producer binding to your Pages Function:

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
  await context.env.MY_QUEUE.send({
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers),
  });

  return new Response('Sent!');
}
```
{{</tab>}}
{{<tab label="ts">}}
```ts
interface Env {
  MY_QUEUE: Queue<any>;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  await context.env.MY_QUEUE.send({
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers),
  });

  return new Response('Sent!');
}
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

  return new Response('Logged analytic');
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

  return new Response('Logged analytic');
}
```
{{</tab>}}
{{</tabs>}}

### Interact with your Analytics Engine binding locally

At this time, Wrangler does not support interacting with Analytics Engine during local development. We recommend testing on a preview branch instead.

## Environment variables

An [environment variable](/workers/configuration/environment-variables/) is an injected value that can be accessed by your Functions. It is stored as plain text. Set your environment variables directly within the Cloudflare Pages dashboard for both your production and preview environments at runtime and build-time.

To add Pages project environment variables:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Environment variables**.
4. Selecting **Add variables** under **Production** and/or **Preview**.
6. After setting a variable name and value, select **Save**.

Below is an example of how to use environment variables in your Function. The environment variable in this example is `ENVIRONMENT`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
export function onRequest(context) {
	if (context.env.ENVIRONMENT === 'development') {
		return new Response('This is a local environment!');
	} else {
		return new Response('This is a live environment');
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
	if (context.env.ENVIRONMENT === 'development') {
		return new Response('This is a local environment!');
	} else {
		return new Response('This is a live environment');
	}
}
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

You use secrets the same way as environment variables. For more guidance, refer to [Environment variables](#environment-variables).

### Interact with your secrets locally

When developing locally, add environment variables by creating a `.dev.vars` file in the root directory of your project. Then add the following code snippet to `.dev.vars`:

```
---
filename:  `.dev.vars`
---
API_KEY=1x0000000000000000000000000000000AA
```

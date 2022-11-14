---
pcx-content-type: how-to
title: Bindings
weight: 7
---

# Bindings

You can add a binding to your Pages project which defines how your Function interacts with external resources. A binding is a variable that the Workers runtime provides to your code. 

Using bindings, you can integrate with Cloudflare resources such as KV, Durable Objects, R2, and D1. By first creating a resource in its respective dashboard and then configuring your binding in Pages by going to:
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages** > **your Pages project** > **Settings** > **Functions**.

You can set bindings for both Production and Preview environments. 

## KV namespaces

[Workers KV](https://www.cloudflare.com/products/workers-kv/) is Cloudflare's key-value storage solution. To bind to your Pages project, go to:
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages** > **your Pages project** > **Settings** > **Functions** > **KV namespaces**.
3. Select a service from the list of your existing Workers and then select the environment. You must repeat this step for both the **Production** and **Preview** environments.

Here is an example of how to use KV in your Function, our KV binding is named "TODO_LIST":

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

While developing locally, you can interact with your KV namespace by adding `-k <binding-name>` or `--kv <binding name>` to your run command. For example, if your namespace is bound to `TODO_LIST`, you can access the KV namespace in your local dev by running `npx wrangler pages dev <output-dir> --kv TODO_LIST`. The data from this namespace can be accessed using `context.env.TODO_LIST`.

## Durable Object namespaces

[Durable Objects](https://developers.cloudflare.com/workers/learning/using-durable-objects/) (DO) are Cloudflare's strongly consistent data store that power capabilities such as connecting WebSockets and handling state. First create the Durable Object and then configure it as a binding to your Pages project. To bind to your Pages project, go to:
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages** > **your Pages project** > **Settings** > **Functions** > **Durable Objects**.
3. Select a service from the list of your existing Workers and then select the environment. You must repeat this step for both the **Production** and **Preview** environments.

Here is an example of how to use Durable Objects in your Function, our DO binding is named "DURABLE_OBJECT":

// TODO

### Interact with your Durable Objects locally

// TODO

## R2 buckets

[Cloudflare R2](https://www.cloudflare.com/products/r2/) is Cloudflare's blob storage solution that allows developers to store large amounts of unstructured data without the egress fees. 
After creating an R2 bucket, you can configure your binding in the Pages dash. To bind to your Pages project, go to:
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages** > **your Pages project** > **Settings** > **Functions** > **R2 buckets**.

Here is an example of how to use R2 buckets in your Function, our R2 binding is named "BUCKET":

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

While developing locally, you can interact with an R2 bucket by adding `--r2 <Binding name>` to your run command. For example, if your bucket is bound to `BUCKET`, you can access this bucket in local dev by running `npx wrangler pages dev <output-dir> --r2=BUCKET`. You can interact with this binding by using context.env (e.g. `context.env.BUCKET`).

## D1 databases

Cloudflare D1 is Cloudflare's first SQL database built on SQLite. After creating your D1 database, you can add it as a binding to your Pages project by:
1. Logging into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Navigating to **Account Home**, select **Pages** > **your Pages project** > **Settings** > **Functions** > **D1 databases**.
3. Select a service from the list of your existing Workers and then select the environment. You must repeat this step for both the **Production** and **Preview** environments.

Here is an example of how to use D1 databases in your Function, our D1 binding is named "NORTHWIND_DB":

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

While developing locally, you can interact with a D1 database by adding `--d1 <Binding name>` to your run command. For example, if your database is bound to `NORTHWIND_DB`, you can access this database in local dev by running `npx wrangler pages dev <output-dir> --d1=NORTHWIND_DB`. You can interact with this binding by `using context.env` (e.g. `context.env.NORTHWIND_DB`).

## Service bindings

Service bindings allow for you to call a Worker from within your Function with zero latency. To add a service binding to your project: 
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages** > **your Pages project** > **Settings** > **Functions** > **Service bindings**. 
3. Select a service from the list of your existing Workers and then select the environment. You must repeat this step for both the **Production** and **Preview** environments.

Here is an example of how to use service bindings in your Function, our service binding is named "SERVICE":

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

### Interact with your Service binding locally

While developing locally, you can interact with a Service by adding `--service <Binding name>=<Worker>` to your run command. For example, if your service is bound to `SERVICE`, you can access this service in local dev by running `npx wrangler pages dev <output-dir> --service=SERVICE=my-worker`. You will need to also have the `my-worker` Worker running in `wrangler pages dev --local`.
You can interact with this binding by using context.env (e.g. `context.env.SERVICE`).

### Environment variables

An [environment variable](/workers/platform/environment-variables/) is an injected value that can be accessed by your Functions. It is stored as plain text. You can set your environment variables directly within the Pages dashboard for both your production and preview environments at runtime and build-time.

You can add Pages project environment variables by going to:
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages** > **your Pages project** > **Settings** > **Environment variables**.
3. Select a service from the list of your existing Workers and then select the environment. You must repeat this step for both the **Production** and **Preview** environments.

Here is an example of how to use environment variables in your Function, we have an environment variable called "ENVIRONMENT":

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

When developing locally, you can add environment variables by creating a `.dev.vars` file in the root directory of your project. Then simply add to this file like so:
```
ENVIRONMENT=development
```

## Secrets

Secrets are environment variables that are encrypted and not visible once set. They are great for storing API keys, auth tokens, etc. 
You can add these to your project by going to:
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages** > **your Pages project** > **Settings** > **Environment variables**.
3. Select a service from the list of your existing Workers and then select the environment. You must repeat this step for both the **Production** and **Preview** environments.

You use secrets the same way as environment variables, [see here](#environment-variables) for how to use them.

### Interact with your secrets locally

When developing locally, you can add environment variables by creating a `.dev.vars` file in the root directory of your project. Then simply add to this file like so:
```
API_KEY=1x0000000000000000000000000000000AA
```
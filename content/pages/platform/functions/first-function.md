---
pcx-content-type: tutorial
title: Writing your first Function
weight: 2
---

# Writing your first Function

When writing request handlers within your Pages application, each `/functions` file must `export` a function to handle the incoming request. Each function will receive a singular `context` object, which contains all the information for the request:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
export async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  return new Response("Hello, world!");
}
```
{{</tab>}}
{{<tab label="ts">}}
```ts
interface Env {}

export const onRequest: PagesFunction<Env> = async (context) => {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  return new Response("Hello, world!");
}
```
{{</tab>}}

When migrating from a [Module Worker](/workers/runtime-apis/fetch-event/#syntax-module-worker), this signature combines the traditional `fetch` handler's arguments into a single object along with additional, Pages-specific keys.

In the previous example, an `onRequest` function was exported. This is a generic name because it generically handles all HTTP requests. However, to react to specific HTTP request methods, you may use the method name as a suffix to the exported function. For example, a handler that should only receive `GET` requests should be named `onRequestGet`. The following other handlers are supported:

- `onRequestPost`
- `onRequestPut`
- `onRequestPatch`
- `onRequestDelete`
- `onRequestHead`
- `onRequestOptions`

These are the requests you export to write your first function. For example, you can write a function to output `"Hello World"` when it hits a `/functions/hello-world.js` file:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: functions/hello-world.js
---
// Reacts to POST /hello-world
export async function onRequestPost(context) {
  // ...
  return new Response(`Hello world`);
}
```
{{</tab>}}
{{<tab label="ts">}}
```ts
---
filename: functions/hello-world.ts
---
interface Env {}

// Reacts to POST /hello-world
export const onRequest: PagesFunction<Env> = async (context) => {
  // ...
  return new Response(`Hello world`);
}
```
{{</tab>}}

Another helpful example for handling single path segments can be querying an API for data, for example, [Rick and Morty API](https://rickandmortyapi.com/documentation/#rest) for information on the show characters. You can write a function to show each character on request using the ID to identify them:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: functions/character/[id].js
---
export async function onRequestGet({ params }) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
  const data = await res.json();
  const info = JSON.stringify(data, null, 2);
  return new Response(info);
}
```
{{</tab>}}
{{<tab label="ts">}}
```ts
---
filename: functions/character/[id].ts
---
interface Env {}

export const onRequestGet: PagesFunction<Env> = async ({ params }) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
  const data = await res.json();
  const info = JSON.stringify(data, null, 2);
  return new Response(info);
}
```
{{</tab>}}

The above will return each character at `/character/{id}` ID being associated with the character.

### Handling multiple requests in a single function

You can define multiple HTTP handlers in a single file by defining multiple exports within the same file. For example, this file will handle `POST` and `PUT` requests with the same handler code:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
export async function onRequestPost(context) {
  // ...
}

export const onRequestPut = onRequestPost;
```
{{</tab>}}
{{<tab label="ts">}}
```ts
interface Env {}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  // ...
}

export const onRequestPut = onRequestPost;
```
{{</tab>}}

Additionally, an exported handler may be an array of function handlers. This allows you to easily compose Functions as a group, which may include a mix of shared and/or one-off behaviors:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
import { extraLogging } from "middlewares.js";

export const onRequest = [
  extraLogging,

  async ({ request }) => {
    // ...
  },
];
```
{{</tab>}}
{{<tab label="ts">}}
```ts
// TODO(walshy): Figure out how to even do this in TS
import { extraLogging } from "middlewares.ts";

export const onRequest = [
  extraLogging,

  async ({ request }) => {
    // ...
  },
];
```
{{</tab>}}
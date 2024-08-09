---
pcx_content_type: reference
title: Bindings
weight: 2
meta:
  title: Using bindings in your Next.js app
---

# Using bindings in your Next.js app

Once you have [set up next-on-pages](/pages/framework-guides/nextjs/ssr/get-started/), you can access [bindings](/workers/runtime-apis/bindings/) from any route of your Next.js app via `getRequestContext`:

```js
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request) {
  let responseText = "Hello World";

  const myKv = getRequestContext().env.MY_KV_NAMESPACE;
  await myKv.put("foo", "bar");
  const foo = await myKv.get("foo");

  return new Response(foo);
}
```

Add bindings to your Pages project by [adding them to your `wrangler.toml` configuration file](/pages/functions/wrangler-configuration/).

## TypeScript type declarations for bindings

To ensure that the `env` object from `getRequestContext().env` above has accurate TypeScript types, install [`@cloudflare/workers-types`](https://www.npmjs.com/package/@cloudflare/workers-types) and create a [TypeScript declaration file](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html).

Install Workers Types:

```sh
$ npm install --save-dev @cloudflare/workers-types
```

Add Workers Types to your `tsconfig.json` file, replacing the date below with your project's [compatibility date](/workers/configuration/compatibility-dates/):

```diff
---
header: tsconfig.json
---
    "types": [
+        "@cloudflare/workers-types/2024-07-29"
    ]
```

Create an `env.d.ts` file in the root directory of your Next.js app, and explicitly declare the type of each binding:

```ts
---
header: env.d.ts
---
interface CloudflareEnv {
	MY_KV_1: KVNamespace;
	MY_KV_2: KVNamespace;
	MY_R2: R2Bucket;
	MY_DO: DurableObjectNamespace;
}
```

## Other Cloudflare APIs (`cf`, `ctx`)

Access context about the incoming request from the [`cf` object](/workers/runtime-apis/request/#incomingrequestcfproperties), as well as [lifecycle methods from the `ctx` object](/workers/runtime-apis/handlers/fetch/#lifecycle-methods) from the return value of [`getRequestContext()`](https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/src/api/getRequestContext.ts):

```js
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = "edge";

export async function GET(request) {
  const { env, cf, ctx } = getRequestContext();

  // ...
}
```
---
pcx_content_type: reference
title: Bindings
meta:
  title: Using bindings in your Next.js app
---


# Using bindings in your Next.js app

Once you have [set up next-on-pages](/pages/framework-guides/nextjs/get-started/), you can access [bindings](/workers/runtime-apis/bindings/) from any route of your Next.js app via `getRequestContext`:

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

You can add bindings to your Pages project by [adding them to your `wrangler.toml` configuration file](/pages/functions/wrangler-configuration/).
---
type: example
summary: Query your D1 database from a Remix application.
tags:
  - Remix
  - D1
pcx_content_type: configuration
title: Query D1 from Remix
weight: 2
layout: example
---

Remix is a full-stack web framework that operates on both client and server. You can query your D1 database(s) from Remix using Remix's [data loading](https://remix.run/docs/en/main/guides/data-loading) API with the [`useLoaderData`](https://remix.run/docs/en/main/hooks/use-loader-data) hook.

To set up a new Remix site on Cloudflare Pages that can query D1:

1. Refer to [the Remix guide](/pages/framework-guides/deploy-a-remix-site/).
2. Bind a D1 database to your [Pages Function](/pages/functions/bindings/#d1-databases).
3. Pass the `--d1 BINDING_NAME=DATABASE_ID` flag when developing locally. `BINDING_NAME` should match what call in your code, and `DATABASE_ID` should match the `database_id` defined in your `wrangler.toml`: for example, `--d1 DB=xxxx-xxxx-xxxx-xxxx-xxxx`.

The following example shows you how to define a Remix [`loader`](https://remix.run/docs/en/main/route/loader) that has a binding to a D1 database.

* Bindings are passed through on the `context.env` parameter passed to a `LoaderFunction`.
* If you configured a [binding](/pages/functions/bindings/#d1-databases) named `DB`, then you would access D1's [client API](/d1/platform/client-api/#query-statement-methods) methods via `context.env.DB`.

{{<tabs labels="ts">}}
{{<tab label="ts" default="true">}}

```ts
---
filename: app/routes/_index.tsx
---
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface Env {
  DB: D1Database;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.env as Env;

  let { results } = await env.DB.prepare("SELECT * FROM users LIMIT 5").all();
  return json(results);
};

export default function Index() {
  const results = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <div>
        A value from D1:
        <pre>{JSON.stringify(results)}</pre>
      </div>
    </div>
  );
}
```
{{</tab>}}
{{</tabs>}}

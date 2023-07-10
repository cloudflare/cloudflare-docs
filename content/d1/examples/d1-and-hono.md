---
type: example
summary: Query D1 from the Hono web framework
tags:
  - Hono
  - D1
pcx_content_type: configuration
title: Query D1 from Hono
weight: 3
layout: example
---

Hono is a fast web framework for building API-first applications, and it includes first-class support for both [Workers](/workers/) and [Pages](/pages/).

When using Workers:

- Ensure you have configured [`wrangler.toml`](/d1/get-started/#3-bind-your-worker-to-your-d1-database) to bind your D1 database to your Worker.
- You can access your D1 databases via Hono's [`Context`](https://hono.dev/api/context) parameter: [bindings](https://hono.dev/getting-started/cloudflare-workers#bindings) are exposed on `context.env`. If you configured a [binding](/pages/platform/functions/bindings/#d1-databases) named `DB`, then you would access D1's [client API](/d1/platform/client-api/#query-statement-methods) methods via `c.env.DB`.
- Refer to the Hono documentation for [Cloudflare Workers](https://hono.dev/getting-started/cloudflare-workers).

If you are using [Pages Functions](/pages/platform/functions/):

- Bind a D1 database to your [Pages Function](/pages/platform/functions/bindings/#d1-databases).
- Pass the `--d1=BINDING_NAME` flag when developing locally. `BINDING_NAME` should match what call in your code: for example, `--d1=DB`.
- Refer to the Hono guide for [Cloudflare Pages](https://hono.dev/getting-started/cloudflare-pages).

The following examples show how to access a D1 database bound to `DB` from both a Workers script and a Pages Function:

{{<tabs labels="Workers | Pages">}}
{{<tab label="Workers" default="true">}}

```ts
---
filename: src/worker.ts
---
import { Hono } from 'hono'

// This ensures c.env.DB is correctly typed
type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Accessing D1 is via the c.env.YOUR_BINDING property
app.get("/query/users/:id", async (c) => {
  const userId= c.req.param("id")
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM users WHERE user_id = ?").bind(userId).all()
    return c.json(results)
  } catch (e) {
    return c.json({err: e}, 500)
  }
})

// Export our Hono app: Hono automatically exports a
// Workers 'fetch' handler for you
export default app
```

{{</tab>}}
{{<tab label="Pages">}}

```ts
---
filename: functions/api/[[route]].ts
---
import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono().basePath('/api')

// Accessing D1 is via the c.env.YOUR_BINDING property
app.get("/query/users/:id", async (c) => {
  const userId= c.req.param("id")
  try {
    let { results } = await c.env.DB.prepare("SELECT * FROM users WHERE user_id = ?").bind(userId).all()
    return c.json(results)
  } catch (e) {
    return c.json({err: e}, 500)
  }
})

// Export the Hono instance as a Pages onRequest function
export const onRequest = handle(app)
```

{{</tab>}}
{{</tabs>}}

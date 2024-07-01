---
_build:
  publishResources: false
  render: never
  list: never
---

```ts
import { Client } from "pg";

export interface Env {
  HYPERDRIVE: Hyperdrive;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const client = new Client(env.HYPERDRIVE.connectionString);
    try {
      await client.connect();
      const result = await client.query("SELECT * FROM products");
      ctx.waitUntil(client.end());
      const items = result.rows.map((row: any) => {
        return { id: row.id, name: row.name };
      });
      return new Response(JSON.stringify({ items }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.log(e);
      return Response.json({ error: JSON.stringify(e) }, { status: 500 });
    }
  },
};
```
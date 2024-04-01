---
pcx_content_type: configuration
title: TypeScript
meta:
  title: Workers RPC — TypeScript
  description: How TypeScript types for your Worker or Durable Object's RPC methods are generated and exposed to clients
---

# TypeScript

The [`@cloudflare/workers-types`](https://www.npmjs.com/package/@cloudflare/workers-types) package provides the the `Service` and `DurableObjectNamespace` types, each of which accepts a single type parameter for the server-side [`WorkerEntrypoint`](/workers/bindings/service-bindings/rpc) or `DurableObject` types.

Using higher-order types, we automatically generate client-side stub types (e.g., forcing all methods to be async).

For example:

```ts
interface Env {
  SUM_SERVICE: Service<SumService>;
  COUNTER_OBJECT: DurableObjectNamespace<Counter>
}

export default <ExportedHandler<Env>>{
  async fetch(req, env, ctx) {
    const result = await env.SUM_SERVICE.sum(1, 2);
    return new Response(result.toString());
  }
}
```
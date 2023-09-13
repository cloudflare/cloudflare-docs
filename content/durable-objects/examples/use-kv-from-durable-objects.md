---
title: Use KV from Durable Objects
summary: Read & write to/from KV within a Durable Object
pcx_content_type: configuration
weight: 20
layout: example
meta:
  title: Durable Objects - Use KV within Durable Objects
---

The following Worker script shows how to configure a [Durable Object](/durable-objects/) to read from and/or write to a [Workers KV namespace](/workers/learning/how-kv-works/). This is useful when using a Durable Object to coordinate between multiple clients, and allows you to both serialize writes to KV and/or broadcast a single read from KV to potentially hundreds or thousands of clients connected to a single Durable Object [using WebSockets](/durable-objects/api/hibernatable-websockets-api/).

The example requires:

* That you have [created a KV namespace](/workers/runtime-apis/kv/) via the Cloudflare dashboard or the [wrangler CLI](/workers/wrangler/install-and-update/)
* You have [configured a binding](/workers/runtime-apis/kv/#kv-bindings) for the `kv_namespace` in the Cloudflare dashboard or `wrangler.toml`
* A [Durable Object namespace binding](/workers/wrangler/configuration/#durable-objects) is also configured.

The Worker script creates (or retrieves an existing) Durable Object stub based on a user ID, reads a key from KV, writes a key to KV, and return sa 

```ts
---
filename: src/worker.ts
---
interface Env {
  YOUR_KV_NAMESPACE: KVNamespace;
  YOUR_DO_CLASS: DurableObject;
}

export default {
  async fetch(req: Request, env: Environment): Promise<Response> {
    // We assume each Durable Object is mapped to a roomId in a query parameter
    // In a production application, this will likely be a roomId defined by your application
    // that you validate (and/or authenticate) first.
    let url = new URL(req.url)
    let roomIdParam = url.searchParams.get("roomId")

    if (roomIdParam) {
      // Create (or get) a Durable Object based on that roomId.
      let durableObjectId = env.YOUR_DO_CLASS.idFromName(roomIdParam);
      // Get a "stub" that allows us to call that Durable Object
      let durableObjectStub = env.YOUR_DO_CLASS.get(durableObjectId);

      // Pass the request to that Durable Object and await the response
      // This invokes the constructor once on your Durable Object class (defined further down)
      // on the first initialization, and the fetch method on each request.
      //
      // We could pass the original Request to the Durable Object's fetch method
      // or a simpler URL with just the roomId.
      let response = await durableObjectStub.fetch(`http://do/${roomId}`);

      // This would return the value we read from KV *within* the Durable Object.
      return response;
    }
  }
}

export class YourDurableObject implements Durable Object {
  constructor(public state: DurableObjectState, env: Env) {
      this.state = state;
      // Ensure we pass our bindings and environmental variables into
      // each Durable Object when it is initialized
      this.env = env;
    }
  }

  async fetch(request: Request) {
    // Error handling elided for brevity.
    // Write to KV
    await this.env.YOUR_KV_NAMESPACE.put("some-key");

    // Fetch from KV
    let val = await this.env.YOUR_KV_NAMESPACE.get("some-other-key");

    return Response.json(val)
  }
}
```

The example Worker script above assumes a `wrangler.toml` as follows:

```toml
---
filename: wrangler.toml
---
name = "my-worker"

kv_namespaces = [
  { binding = "YOUR_KV_NAMESPACE", id = "<id_of_your_namespace>" }
]

[durable_objects]
bindings = [
  { name = "YOUR_DO_CLASS", class_name = "YourDurableObject" }
]
```

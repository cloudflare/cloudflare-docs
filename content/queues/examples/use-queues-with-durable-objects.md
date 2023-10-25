---
title: Use Queues from Durable Objects
summary: Publish to a queue from within a Durable Object.
pcx_content_type: configuration
weight: 20
layout: example
meta:
  title: Queues - Use Queues and Durable Objects
---

The following example shows you how to write a Worker script to publish to [Cloudflare Queues](/queues/) from within a [Durable Object](/durable-objects/).

Prerequisites:

* A [queue created](/queues/get-started/#3-create-a-queue) via the Cloudflare dashboard or the [wrangler CLI](/workers/wrangler/install-and-update/).
* A [configured **producer** binding](/queues/platform/configuration/#producer) in the Cloudflare dashboard or `wrangler.toml` file.
* A [Durable Object namespace binding](/workers/wrangler/configuration/#durable-objects).

Configure your `wrangler.toml` file as follows:

```toml
---
filename: wrangler.toml
---
name = "my-worker"

[[queues.producers]]
  queue = "my-queue"
  binding = "YOUR_QUEUE"

[durable_objects]
bindings = [
  { name = "YOUR_DO_CLASS", class_name = "YourDurableObject" }
]
```

The following Worker script:

1. Creates a Durable Object stub, or retrieves an existing one based on a userId.
2. Passes request data to the Durable Object.
3. Publishes to a queue from within the Durable Object.

The `constructor()` in the Durable Object makes your `Environment` available (in scope) on `this.env` to the [`fetch()` handler](/durable-objects/how-to/access-durable-object-from-a-worker/#3-use-fetch-handler-method) in the Durable Object.

```ts
---
filename: src/index.ts
---
interface Env {
  YOUR_QUEUE: Queue;
  YOUR_DO_CLASS: DurableObject;
}

export default {
  async fetch(req: Request, env: Environment): Promise<Response> {
    // Assume each Durable Object is mapped to a userId in a query parameter
    // In a production application, this will be a userId defined by your application
    // that you validate (and/or authenticate) first.
    let url = new URL(req.url)
    let userIdParam = url.searchParams.get("userId")

    if (userIdParam) {
      // Create (or get) a Durable Object based on that userId.
      let durableObjectId = env.YOUR_DO_CLASS.idFromName(userIdParam);
      // Get a "stub" that allows you to call that Durable Object
      let durableObjectStub = env.YOUR_DO_CLASS.get(durableObjectId);

      // Pass the request to that Durable Object and await the response
      // This invokes the constructor once on your Durable Object class (defined further down)
      // on the first initialization, and the fetch method on each request.
      // We pass the original Request to the Durable Object's fetch method
      let response = await durableObjectStub.fetch(req);

      // This would return "wrote to queue", but you could return any response.
      return response;
    }
  }
}

export class YourDurableObject implements Durable Object {
  constructor(public state: DurableObjectState, env: Env) {
      this.state = state;
      // Ensure you pass your bindings and environment variables into
      // each Durable Object when it is initialized
      this.env = env;
    }
  }

  async fetch(request: Request) {
    // Error handling elided for brevity.
    // Publish to your queue
    await this.env.YOUR_QUEUE.send({
      id: this.state.id // Write the ID of the Durable Object to your queue
      // Write any other properties to your queue
    });

    return new Response("wrote to queue")
  }
```

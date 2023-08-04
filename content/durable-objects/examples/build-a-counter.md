---
type: example
summary: Build a counter using Durable Objects.
tags:
  - Durable Objects
pcx_content_type: configuration
title: Build a counter 
weight: 3
layout: example
---

The complete example code is included for both the Worker and the Durable Object for a basic counter below. Refer to [Durable Objects template](https://github.com/cloudflare/durable-objects-template) for the full code template.

```js
// Worker

export default {
  async fetch(request, env) {
    return await handleRequest(request, env);
  },
};

async function handleRequest(request, env) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  if (!name) {
    return new Response(
      "Select a Durable Object to contact by using" +
        " the `name` URL query string parameter. e.g. ?name=A"
    );
  }

  // Every unique ID refers to an individual instance of the Counter class that
  // has its own state. `idFromName()` always returns the same ID when given the
  // same string as input (and called on the same class), but never the same
  // ID for two different strings (or for different classes).
  let id = env.COUNTER.idFromName(name);

  // Construct the stub for the Durable Object using the ID. 
  //A stub is a client Object used to send messages to the Durable Object.
  let obj = env.COUNTER.get(id);

  // Send a request to the Durable Object, then await its response.
  let resp = await obj.fetch(request.url);
  let count = await resp.text();

  return new Response(`Durable Object '${name}' count: ${count}`);
}

// Durable Object

export class Counter {
  constructor(state, env) {
    this.state = state;
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url);

    // Durable Object storage is automatically cached in-memory, so reading the
    // same key every request is fast. 
    // You could also store the value in a class member if you prefer.
    let value = (await this.state.storage.get("value")) || 0;

    switch (url.pathname) {
      case "/increment":
        ++value;
        break;
      case "/decrement":
        --value;
        break;
      case "/":
        // Serves the current value.
        break;
      default:
        return new Response("Not found", { status: 404 });
    }

    // You do not have to worry about a concurrent request having modified the value in storage. 
    // "input gates" will automatically protect against unwanted concurrency. 
    // Read-modify-write is safe. 
    await this.state.storage.put("value", value);

    return new Response(value);
  }
}
```
### Related resources

- [Durable Objects: Easy, Fast, Correct — Choose three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/)
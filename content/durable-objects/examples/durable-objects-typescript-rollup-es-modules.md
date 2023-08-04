---
type: example
summary: Create Durable Objects TypeScript Rollup using ES modules template.
tags:
  - Durable Objects
pcx_content_type: configuration
title: Durable Objects TypeScript Rollup ES modules template
weight: 3
layout: example
---

```js
export class CounterTs {
  state: DurableObjectState

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request) {
    // Apply requested action.
    let url = new URL(request.url);

    // Durable Object storage is automatically cached in-memory.
    // Reading the same key for every request is fast. 
    // You can also store the value in a class member.
    let value: number = await this.state.storage?.get("value") || 0;
    switch (url.pathname) {
    case "/increment":
      ++value;
      break;
    case "/decrement":
      --value;
      break;
    case "/":
      // Serves the current value. No storage calls needed.
      break;
    default:
      return new Response("Not found", {status: 404});
    }

    // You do not have to worry about a concurrent request having modified the value in storage. 
    // "input gates" will automatically protect against unwanted concurrency. 
    // Read-modify-write is safe. 
    await this.state.storage?.put("value", value);
      
    return new Response(value.toString());
  }
}

interface Env {}
```

Find the [full code for this example on GitHub](https://github.com/cloudflare/durable-objects-typescript-rollup-esm). 
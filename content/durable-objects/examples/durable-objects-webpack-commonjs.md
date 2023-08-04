---
type: example
summary: Bundle external dependencies with your code using Rollup or Webpack. 
tags:
  - Durable Objects
pcx_content_type: configuration
title: Durable Objects Webpack CommonJS template
weight: 3
layout: example
---

```js
module.exports = class Counter {
  constructor(state, env) {
    this.state = state;
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url);

    // Durable Object storage is automatically cached in-memory.
    // Reading the same key for every request is fast. 
    // You could also store the value in a class member.
    let value = await this.state.storage.get("value") || 0;
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
      return new Response("Not found", {status: 404});
    }

    // You do not have to worry about a concurrent request having modified the value in storage.
    // "input gates" will automatically protect against unwanted concurrency. 
    await this.state.storage.put("value", value);

    return new Response(value);
  }
}
```
Find the [full code for this example on GitHub](https://github.com/cloudflare/durable-objects-webpack-commonjs).
---
type: example
summary: Use the Durable Objects Alarms API to batch requests to a Durable Object.
tags:
  - Durable Objects
  - Alarms
  - API
pcx_content_type: configuration
title: Use the Alarms API
weight: 3
layout: example
---

This example implements an `alarm()` handler that wakes the Durable Object once every 10 seconds to batch requests to a single Durable Object. The `alarm()` handler will delay processing until there is enough work in the queue.

```js
// Worker
export default {
  async fetch(request, env) {
    let id = env.BATCHER.idFromName("foo");
    return await env.BATCHER.get(id).fetch(request);
  },
};

const SECONDS = 1000;

// Durable Object
export class Batcher {
  constructor(state, env) {
    this.state = state;
    this.storage = state.storage;
    this.state.blockConcurrencyWhile(async () => {
      let vals = await this.storage.list({ reverse: true, limit: 1 });
      this.count = vals.size == 0 ? 0 : parseInt(vals.keys().next().value);
    });
  }

  async fetch(request) {
    this.count++;

    // If there is no alarm currently set, set one for 10 seconds from now
    // Any further POSTs in the next 10 seconds will be part of this batch.
    let currentAlarm = await this.storage.getAlarm();
    if (currentAlarm == null) {
      this.storage.setAlarm(Date.now() + 10 * SECONDS);
    }

    // Add the request to the batch.
    await this.storage.put(this.count, await request.text());
    return new Response(JSON.stringify({ queued: this.count }), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }

  // Docs: https://developers.cloudflare.com/durable-objects/examples/alarms-api/
  async alarm() {
    let vals = await this.storage.list();
    await fetch("http://example.com/some-upstream-service", {
      method: "POST",
      body: Array.from(vals.values()),
    });
    await this.storage.deleteAll();
    this.count = 0;
  }
}
```

Specifically:

* The `alarm()` handler will be called once every 10 seconds.
* The alarm is only set when a new request is made to the Durable Object. If the `alarm()` handler runs and no more requests are made to the Durable Object, the alarm will remain unset. Alarms must be explicitly set to run at a future interval with [`setAlarm()`](/durable-objects/examples/alarms-api/).
* If an unexpected error terminates the Durable Object, the `alarm()` handler will be re-instantiated on another machine. Following a short delay, the `alarm()` handler will run from the beginning on the other machine.

Refer to the [Alarms API documentation](/durable-objects/examples/alarms-api/) to learn more about how to set and manage alarms within a Durable Object.


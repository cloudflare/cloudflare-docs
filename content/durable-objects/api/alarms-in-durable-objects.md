---
title: Alarms
pcx_content_type: concept
weight: 16
---

# Alarms 

Durable Objects alarms allow you to schedule the Durable Object to be woken up at a time in the future.

When the alarm's scheduled time comes, the `alarm()` handler will be called.

Alarms are modified using the [Transactional Storage API](/durable-objects/api/transactional-storage-api/). Alarm operations follow the same rules as other storage operations. Each Durable Object instance is able to schedule a single alarm at a time by calling `setAlarm()`. 

Alarms have guaranteed at-least-once execution and are retried automatically when the `alarm()` handler throws. Retries are performed using exponential backoff starting at a two second delay from the first failure with up to six retries allowed.

{{<Aside type="note" header="How are alarms different from Cron Triggers?">}}

Alarms are more fine grained than [Cron Triggers](/workers/configuration/cron-triggers/#cron-triggers). A Worker can have up to three Cron Triggers configured at once, but it can have an unlimited amount of Durable Objects, each of which can have an alarm set.

Alarms are directly scheduled from within your Durable Object. Cron Triggers, on the other hand, are not programmatic. [Cron Triggers](/workers/configuration/cron-triggers/#cron-triggers) execute based on their schedules, which have to be configured through the Cloudflare dashboard or API.

{{</Aside>}}

Alarms can be used to build distributed primitives, like queues or batching of work atop Durable Objects. Alarms also provide a mechanism to guarantee that operations within a Durable Object will complete without relying on incoming requests to keep the Durable Object alive. Refer to the [Durable Objects alarms announcement blog post](https://blog.cloudflare.com/durable-objects-alarms/) to learn more about alarms.

## `alarm()` handler method

The system calls the `alarm()` handler method when a scheduled alarm time is reached. 

The `alarm()` handler has guaranteed at-least-once execution and will be retried upon failure using exponential backoff, starting at two second delays for up to six retries. Retries will be performed if the method fails with an uncaught exception. Calling `deleteAlarm()` inside the `alarm()` handler may prevent retries on a best-effort basis, but is not guaranteed. 

The `alarm()` handler takes no parameters, does not return a result, and can be `async`.

## Use the `alarm()` handler method

In your Durable Object, the `alarm()` handler will be called when the alarm executes. Call `state.storage.setAlarm()` from anywhere in your Durable Object, and pass in a time for the alarm to run at. Use `state.storage.getAlarm()` to retrieve the currently set alarm time.

### Example `alarm()` handler method

This example implements an `alarm()` handler that wakes the Durable Object once every 10 seconds to batch requests to a single Durable Object. The `alarm()` handler will delay processing until there is enough work in the queue.

```js
export default {
  async fetch(request, env) {
    let id = env.BATCHER.idFromName("foo");
    return await env.BATCHER.get(id).fetch(request);
  },
};

const SECONDS = 1000;

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
The `alarm()` handler will be called once every 10 seconds. If an unexpected error terminates the Durable Object, the `alarm()` handler will be re-instantiated on another machine. Following a short delay, the `alarm()` handler will run from the beginning on the other machine.
---
_build:
  publishResources: false
  render: never
  list: never

name: "Queue consumers don't wait for `ctx.waitUntil()` to resolve"
sort_date: "2025-03-19"
experimental: true
enable_flag: "queue_consumer_no_wait_for_wait_until"
---

By default, [Queues](/queues/) Consumer Workers acknowledge messages only after promises passed to [`ctx.waitUntil()`](/workers/runtime-apis/context) have resolved. This behavior can cause queue consumers which utilize `ctx.waitUntil()` to process messages slowly. The default behavior is documented in the [Queues Consumer Configuration Guide](/queues/configuration/javascript-apis#consumer).

This Consumer Worker is an example of a Worker which utilizes `ctx.waitUntil()`. Under the default behavior, this consumer Worker will only acknowledge a batch of messages after the sleep function has resolved.
```js
export default {
  async fetch(request, env, ctx) {
    // omitted
  },

  async queue(batch, env, ctx) {
    console.log(`received batch of ${batch.messages.length} messages to queue ${batch.queue}`);
    for (let i = 0; i < batch.messages.length; ++i) {
      console.log(`message #${i}: ${JSON.stringify(batch.messages[i])}`);
    }
    ctx.waitUntil(sleep(30 * 1000));
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

If the `queue_consumer_no_wait_for_wait_until` flag is enabled, Queues consumers will no longer wait for promises passed to `ctx.waitUntil()` to resolve before acknowledging messages. This can improve the performance of queue consumers which utilize `ctx.waitUntil()`. With the flag enabled, in the above example, the consumer Worker will acknowledge the batch without waiting for the sleep function to resolve.

Using this flag will not affect the behavior of `ctx.waitUntil()`. `ctx.waitUntil()` will continue to extend the lifetime of your consumer Worker to continue to work even after the batch of messages has been acknowledged.
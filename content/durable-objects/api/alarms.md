---
title: Alarms
pcx_content_type: concept
weight: 1
---

# Alarms 

## Background

Durable Objects alarms allow you to schedule the Durable Object to be woken up at a time in the future. When the alarm's scheduled time comes, the `alarm()` handler method will be called. Alarms are modified using the [Transactional Storage API](/durable-objects/api/transactional-storage-api/), and alarm operations follow the same rules as other storage operations.

Notably: 

* Each Durable Object instance is able to schedule a single alarm at a time by calling `setAlarm()`.
* Alarms have guaranteed at-least-once execution and are retried automatically when the `alarm()` handler throws.
* Retries are performed using exponential backoff starting at a two second delay from the first failure with up to six retries allowed.

{{<Aside type="note" header="How are alarms different from Cron Triggers?">}}

Alarms are more fine grained than [Cron Triggers](/workers/configuration/cron-triggers/#cron-triggers). A Worker can have up to three Cron Triggers configured at once, but it can have an unlimited amount of Durable Objects, each of which can have an alarm set.

Alarms are directly scheduled from within your Durable Object. Cron Triggers, on the other hand, are not programmatic. [Cron Triggers](/workers/configuration/cron-triggers/#cron-triggers) execute based on their schedules, which have to be configured through the Cloudflare dashboard or API.

{{</Aside>}}

Alarms can be used to build distributed primitives, like queues or batching of work atop Durable Objects. Alarms also provide a mechanism to guarantee that operations within a Durable Object will complete without relying on incoming requests to keep the Durable Object alive. For a complete example, refer to [Use the Alarms API](/durable-objects/examples/alarms-api/).

## Transactional Storage methods

### getAlarm

{{<definitions>}}

- {{<code>}}getAlarm(){{</code>}} : {{<type>}}number{{</type>}} | {{<type>}}null{{</type>}}

  - If there is an alarm set, then return the currently set alarm time in number of milliseconds elapsed since the UNIX epoch. Otherwise, return `null`.

{{</definitions>}}

### setAlarm

{{<definitions>}}

- {{<code>}}setAlarm(scheduledTimeMs{{<param-type>}}number{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Set the time for the alarm to run at in number of milliseconds elapsed since the UNIX epoch.

{{</definitions>}}

### deleteAlarm

{{<definitions>}}

- {{<code>}}deleteAlarm(){{</code>}} : {{<type>}}void{{</type>}}

  - Unset the alarm if there is a currently set alarm.

  - Calling `deleteAlarm()` inside the `alarm()` handler may prevent retries on a best-effort basis, but is not guaranteed.

{{</definitions>}}

## Handler methods

### alarm

{{<definitions>}}

- {{<code>}}alarm(){{</code>}} : {{<type>}}void{{</type>}}

  - Called by the system when when a scheduled alarm time is reached.

  - The `alarm()` handler has guaranteed at-least-once execution and will be retried upon failure using exponential backoff, starting at two second delays for up to six retries. Retries will be performed if the method fails with an uncaught exception.

  - This method can be `async`.
 
{{</definitions>}}

## Example

This example shows how to both set alarms with the `setAlarm(timestamp)` method and handle alarms with the `alarm()` handler within your Durable Object.

* The `alarm()` handler will be called once every time an alarm fires.
* If an unexpected error terminates the Durable Object, the `alarm()` handler will be re-instantiated on another machine.
* Following a short delay, the `alarm()` handler will run from the beginning on the other machine.

```js
export default {
  async fetch(request, env) {
    let id = env.ALARM_EXAMPLE.idFromName("foo");
    return await env.ALARM_EXAMPLE.get(id).fetch(request);
  },
};

const SECONDS = 1000;

export class AlarmExample {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.storage = ctx.storage;
  }
  async fetch(request) {
    // If there is no alarm currently set, set one for 10 seconds from now
    let currentAlarm = await this.storage.getAlarm();
    if (currentAlarm == null) {
      this.storage.setAlarm(Date.now() + 10 * SECONDS);
    }
  }
  async alarm() {
    // The alarm handler will be invoked whenever an alarm fires.
    // You can use this to do work, read from the Transactional Storage API, make HTTP calls
    // and set future alarms to run using this.storage.setAlarm() from within this handler.
  }
}
```

## Related resources

* Understand how to [use the Alarms API](/durable-objects/examples/alarms-api/) in an end-to-end example. 
* Read the [Durable Objects alarms announcement blog post](https://blog.cloudflare.com/durable-objects-alarms/).
* Review the [Transactional Storage API](/durable-objects/api/transactional-storage-api/) documentation for Durable Objects.

---
pcx_content_type: configuration
title: ScheduledEvent
---

# ScheduledEvent

## Background

A `ScheduledEvent` is the event type for scheduled requests to a Worker. It is the `Object` passed through as the `event` when a Worker is invoked by a Worker's [Cron Trigger](/workers/platform/cron-triggers/). `ScheduledEvent` is supported in Workers written with [Service Worker syntax](#syntax-service-worker) and [Module Worker syntax](#syntax-module-worker).

{{<Aside type="note" header="Testing Scheduled Events">}}

The recommended way of testing Scheduled events is using `Wrangler`.

Cron Triggers can be tested using `Wrangler` by passing in the `--test-scheduled` flag to `wrangler dev`. This will expose a `/__scheduled` route which can be used to test using a http request. To simulate different cron patterns, a `cron` query parameter can be passed in.

```sh
$ wrangler dev --test-scheduled

$ curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```

{{</Aside>}}

## Syntax: Module Worker

A `ScheduledEvent` can be handled in Workers functions written using the Module Worker syntax by adding a `scheduled` function to your module's exported handlers:

```js
export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(doSomeTaskOnASchedule());
  },
};
```

### Properties

{{<definitions>}}

- `event.cron` {{<type>}}string{{</type>}}

  - The value of the [Cron Trigger](/workers/platform/cron-triggers/) that started the `ScheduledEvent`.

- `event.type` {{<type>}}string{{</type>}}

  - The type of event. This will always return `"scheduled"`.

- `event.scheduledTime` {{<type>}}number{{</type>}}

  - The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as {{<code>}}new Date(event.scheduledTime){{</code>}}.

- `env` {{<type>}}object{{</type>}}

  - An object containing the bindings associated with your Module Worker, such as KV namespaces and Durable Objects.

- `ctx` {{<type>}}object{{</type>}}
  - An object containing the context associated with your Module Worker. Currently, this object just contains the `waitUntil` function.

{{</definitions>}}

### Methods

When a Workers script is invoked by a [Cron Trigger](/workers/platform/cron-triggers/), the Workers runtime starts a `ScheduledEvent` which will be handled by the `scheduled` function in your Workers Module class. The `ctx` argument represents the context your function runs in, and contains the following methods to control what happens next:

{{<definitions>}}

- {{<code>}}ctx.waitUntil(promise{{<param-type>}}Promise{{</param-type>}}){{</code>}} {{<type>}}void{{</type>}}

  - Use this method to notify the runtime to wait for asynchronous tasks (for example, logging, analytics to third-party services, streaming and caching). The first `ctx.waitUntil` to fail will be observed and recorded as the status in the [Cron Trigger](/workers/platform/cron-triggers/) Past Events table. Otherwise, it will be reported as a success.

{{</definitions>}}

## Syntax: Service Worker

A `ScheduledEvent` can be handled in Workers functions written using the Service Worker syntax by attaching to the `scheduled` event with `addEventListener`:

```js
addEventListener("scheduled", (event) => {
  event.waitUntil(handleScheduled(event));
});
```

### Properties

{{<definitions>}}

- `event.cron` {{<type>}}string{{</type>}}

  - The value of the [Cron Trigger](/workers/platform/cron-triggers/) that started the `ScheduledEvent`.

- `event.type` {{<type>}}string{{</type>}}

  - The type of event. This will always return `"scheduled"`.

- `event.scheduledTime` {{<type>}}number{{</type>}}
  - The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as {{<code>}}new Date(event.scheduledTime){{</code>}}

{{</definitions>}}

### Methods

When a Workers script is invoked by a [Cron Trigger](/workers/platform/cron-triggers/), the Workers runtime starts a `ScheduledEvent` which will be handled by the event listener registered for the type `"scheduled"`. The event handler can invoke the following methods of the `event` object to control what happens next:

{{<definitions>}}

- {{<code>}}event.waitUntil(promise{{<param-type>}}Promise{{</param-type>}}){{</code>}} {{<type>}}void{{</type>}}

  - Use this method to notify the runtime to wait for asynchronous tasks (for example, logging, analytics to third-party services, streaming and caching). The first `event.waitUntil` to fail will be observed and recorded as the status in the [Cron Trigger](/workers/platform/cron-triggers/) Past Events table. Otherwise, it will be reported as a Success.

{{</definitions>}}

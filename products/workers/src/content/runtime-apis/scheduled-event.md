---
pcx-content-type: configuration
---

# ScheduledEvent

## Background

A `ScheduledEvent` is the event type for scheduled requests to a Worker. It is the `Object` passed through as the `event` when a Worker is invoked by a Worker's [Cron Trigger](/platform/cron-triggers). `ScheduledEvent` is supported in Workers written with [Service Worker syntax](#syntax-service-worker) and [Module Worker syntax](#syntax-module-worker).


## Syntax: Service Worker

A `ScheduledEvent` can be handled in Workers functions written using the Service Worker syntax by attaching to the `scheduled` event with `addEventListener`:

```js
addEventListener("scheduled", event => {
  event.waitUntil(handleScheduled(event))
})
```

### Properties

<Definitions>

- `event.cron` <Type>string</Type>
    - The value of the [Cron Trigger](/platform/cron-triggers) that started the `ScheduledEvent`.

- `event.type` <Type>string</Type>
    - The type of event. This will always return `"scheduled"`.

- `event.scheduledTime` <Type>number</Type>
    - The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as <Code>new Date(event.scheduledTime)</Code>

</Definitions>

### Methods

When a Workers script is invoked by a [Cron Trigger](/platform/cron-triggers), the Workers runtime starts a `ScheduledEvent` which will be handled by the event listener registered for the type `"scheduled"`. The event handler can invoke the following methods of the `event` object to control what happens next:

<Definitions>

- <Code>event.waitUntil(promise<ParamType>Promise</ParamType>)</Code> <Type>void</Type>

    - Use this method to notify the runtime to wait for asynchronous tasks (e.g. logging, analytics to third-party services, streaming and caching). The first `event.waitUntil` to fail will be observed and recorded as the status in the [Cron Trigger](/platform/cron-triggers) Past Events table. Otherwise, it will be reported as a Success.

</Definitions>

## Syntax: Module Worker

A `ScheduledEvent` can be handled in Workers functions written using the Module Worker syntax by adding a `scheduled` function to your module's exported handlers:

```js
export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(doSomeTaskOnASchedule())
  }
}
```

### Properties

<Definitions>

- `event.cron` <Type>string</Type>
    - The value of the [Cron Trigger](/platform/cron-triggers) that started the `ScheduledEvent`.

- `event.type` <Type>string</Type>
    - The type of event. This will always return `"scheduled"`.

- `event.scheduledTime` <Type>number</Type>
    - The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as <Code>new Date(event.scheduledTime)</Code>.

- `env` <Type>object</Type>
    - An object containing the bindings associated with your Module Worker, such as KV namespaces and Durable Objects.

- `ctx` <Type>object</Type>
    - An object containing the context associated with your Module Worker. Currently, this object just contains the `waitUntil` function.

</Definitions>

### Methods

When a Workers script is invoked by a [Cron Trigger](/platform/cron-triggers), the Workers runtime starts a `ScheduledEvent` which will be handled by the `scheduled` function in your Workers Module class. The `ctx` argument represents the context your function runs in, and contains the following methods to control what happens next:

<Definitions>

- <Code>ctx.waitUntil(promise<ParamType>Promise</ParamType>)</Code> <Type>void</Type>

    - Use this method to notify the runtime to wait for asynchronous tasks (e.g., logging, analytics to third-party services, streaming and caching). The first `ctx.waitUntil` to fail will be observed and recorded as the status in the [Cron Trigger](/platform/cron-triggers) Past Events table. Otherwise, it will be reported as a Success.

</Definitions>

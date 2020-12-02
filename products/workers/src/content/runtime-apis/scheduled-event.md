# ScheduledEvent

## Background

A ScheduledEvent is the event type for scheduled requests to a Worker. It is the `Object` passed through as the `event` when a Worker's `scheduled` [`addEventListener()`](/runtime-apis/add-event-listener) is invoked by a Worker's [Cron Trigger](/platform/cron-triggers).


## Context

```js
addEventListener("scheduled", event => {
  event.waitUntil(handleScheduled(event))
})
```

### Properties

<Definitions>

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

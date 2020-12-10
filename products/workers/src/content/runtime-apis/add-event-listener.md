---
order: 2
---

# addEventListener

## Background

This function defines triggers for a Worker script to execute. There are currently two types of event listeners - `"fetch"` listeners which are sent a [`FetchEvent`](/runtime-apis/fetch-event) and `"scheduled"` listeners which are sent a [`ScheduledEvent`](/runtime-apis/scheduled-event).

## Syntax

<Definitions>

- <Code>addEventListener(type, listener)</Code> <Type>void</Type>

  - If multiple `"fetch"` listeners are registered, when one doesn’t call [`event.respondWith()`](/runtime-apis/fetch-event#methods), the runtime delivers the event to the next registered listener.
  - A `"fetch"` listener and a `"scheduled"` listener can be registered in the same script.
  - A script can have only one `"scheduled"` listener.

</Definitions>

### Properties

<Definitions>

- `type` <Type>string</Type>
  - Currently the only types supported are `"fetch"` and `"scheduled"`.

- `listener` <Type>function</Type>
  - The function to handle incoming events to the Worker script. The listener is passed a single argument:

    <Definitions>

    - `event` <Type>FetchEvent</Type> or <Type>ScheduledEvent</Type>

      - The events dispatched to a Worker. See [`FetchEvent`](/runtime-apis/fetch-event) or [`ScheduledEvent`](/runtime-apis/scheduled-event).

    </Definitions>

</Definitions>

## Examples

### Fetch Listener

```js
addEventListener("fetch", event => {
  return event.respondWith(
    new Response("Hello world")
  )
})
```

### Scheduled Listener

```js
addEventListener("scheduled", event => {
  event.waitUntil(handleScheduled(event))
})
```
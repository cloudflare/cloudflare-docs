---
pcx_content_type: configuration
title: addEventListener
weight: 3
---

# addEventListener

## Background

The `addEventListener` function defines triggers for a Worker script to execute. There are currently two types of event listeners - `"fetch"` listeners which are sent a [`FetchEvent`](/workers/runtime-apis/fetch-event/) and `"scheduled"` listeners which are sent a [`ScheduledEvent`](/workers/runtime-apis/scheduled-event/).

## Syntax

{{<definitions>}}

- {{<code>}}addEventListener(type, listener){{</code>}} {{<type>}}void{{</type>}}

  - If multiple `"fetch"` listeners are registered, when one does not call [`event.respondWith()`](/workers/runtime-apis/fetch-event/#methods), the runtime delivers the event to the next registered listener.
  - A `"fetch"` listener and a `"scheduled"` listener can be registered in the same script.
  - A script can have only one `"scheduled"` listener.

{{</definitions>}}

### Properties

{{<definitions>}}

- `type` {{<type>}}string{{</type>}}

  - The only types supported are `"fetch"` and `"scheduled"`.

- `listener` {{<type>}}function{{</type>}}

  - The function to handle incoming events to the Worker script. The listener is passed a single argument:

  - `event` {{<type>}}FetchEvent{{</type>}} or {{<type>}}ScheduledEvent{{</type>}}

    - The events dispatched to a Worker. Refer to [`FetchEvent`](/workers/runtime-apis/fetch-event/) or [`ScheduledEvent`](/workers/runtime-apis/scheduled-event/).

{{</definitions>}}

## Examples

### Fetch Listener

```js
addEventListener('fetch', event => {
  event.respondWith(new Response('Hello world'));
});
```

### Scheduled Listener

```js
addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled(event));
});
```

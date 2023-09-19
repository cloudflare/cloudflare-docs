---
pcx_content_type: configuration
title: addEventListener
weight: 3
---

# addEventListener

## Background

The `addEventListener` function defines triggers for a Worker script to execute. There are currently three types of event listeners - `"fetch"` listeners which are sent a [`FetchEvent`](/workers/runtime-apis/fetch-event/), `"scheduled"` listeners which are sent a [`ScheduledEvent`](/workers/runtime-apis/scheduled-event/) and `"queue"` listeners which are sent [`QueueEvent`](/queues/platform/javascript-apis/).

---

## Syntax

{{<definitions>}}

- {{<code>}}addEventListener(type, listener){{</code>}} : {{<type>}}void{{</type>}}

  - If multiple `"fetch"` listeners are registered, when one does not call [`event.respondWith()`](/workers/runtime-apis/fetch-event/#respondwith), the runtime delivers the event to the next registered listener.
  - A `"fetch"` listener, `"scheduled"` listener, and `"queue"` listener can be registered in the same script.
  - A script can have only one `"scheduled"` listener.

{{</definitions>}}

### Parameters

{{<definitions>}}

- `type` {{<type>}}string{{</type>}}

  - The only types supported are `"fetch"`, `"scheduled"` and `"queue"`.

- `listener` {{<type>}}function{{</type>}}

  - The function to handle incoming events to the Worker script. The listener is passed a single argument:

  - `event` {{<type>}}FetchEvent{{</type>}} or {{<type>}}ScheduledEvent{{</type>}} or {{<type>}}QueueEvent{{</type>}}

  - The events dispatched to a Worker. Refer to [`FetchEvent`](/workers/runtime-apis/fetch-event/) or [`ScheduledEvent`](/workers/runtime-apis/scheduled-event/).

{{</definitions>}}

---

## Examples

### Fetch listener

{{<tabs labels="ES Modules | Service Worker">}}
{{<tab label="ES Modules" default="true">}}

```js
export default {
  fetch(request, env, ctx) {
    return new Response('Hello world');
  }
}
```

{{</tab>}}
{{<tab label="Service Worker">}}

```js
addEventListener('fetch', event => {
  event.respondWith(new Response('Hello world'));
});
```

{{</tab>}}
{{</tabs>}}

### Scheduled listener

{{<tabs labels="ES Modules | Service Worker">}}
{{<tab label="ES Modules" default="true">}}

```js
export default {
  scheduled(event, env, ctx) {
    ctx.waitUntil(handleScheduled(event));
  }
}
```

{{</tab>}}
{{<tab label="Service Worker">}}

```js
addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled(event));
});
```

{{</tab>}}
{{</tabs>}}

### Queue listener

A Queue listener acts as [a consumer for one or more queues](/queues/platform/javascript-apis/#consumer).

{{<tabs labels="ES Modules | Service Worker">}}
{{<tab label="ES Modules" default="true">}}

```js
export default {
  queue(batch, env, ctx) {
    ctx.waitUntil(handleMessages(batch));
  }
}
```

{{</tab>}}
{{<tab label="Service Worker">}}

```js
addEventListener("queue", (event) => {
  event.waitUntil(handleMessages(event));
});
```

{{</tab>}}
{{</tabs>}}




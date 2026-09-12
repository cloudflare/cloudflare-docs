---
_build:
  publishResources: false
  render: never
  list: never

name: "Spec compliant `on<type>` event handlers"
sort_date: "2026-08-14"
enable_flag: "spec_compliant_event_handler_attributes"
disable_flag: "no_spec_compliant_event_handler_attributes"
---

`on<type>` event handler properties, such as `WebSocket.onmessage` and `AbortSignal.onabort`, behave the way the [DOM](https://dom.spec.whatwg.org/#interface-eventtarget) and [HTML](https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes) standards describe them.

Previously, `EventTarget` looked for an `on<type>` property on the object every time an event was dispatched and called it before any listener added with `addEventListener()`. That had two consequences: an `on<type>` handler always ran first rather than in the order it was assigned, and a class that extends `EventTarget` and implements an `on<type>` accessor using `addEventListener()` had its handler called twice per event.

With this flag enabled, `EventTarget` no longer looks for `on<type>` properties. The interfaces that the standards give event handler attributes to (`AbortSignal`, `EventSource`, `MessagePort` and `WebSocket`) implement them as accessors that register an ordinary listener, so:

- The handler runs in the order it was assigned, in sequence with listeners added using `addEventListener()`.
- Assigning a different handler replaces the value without changing its position in the listener list.
- Assigning `null` removes it. Assigning any other non-object is treated as `null`. A non-callable object is stored and returned by the property, but never called.
- `this` inside the handler is the object the handler was assigned to.
- Returning `false` from the handler cancels the event, per the [event handler processing algorithm](https://html.spec.whatwg.org/multipage/webappapis.html#the-event-handler-processing-algorithm). Any other return value is ignored. Without this flag, returning `true` cancels the event and `false` is ignored. That is not standard behavior. The DOM standard ignores the return value of a listener added with `addEventListener()` entirely, and the Workers runtime applies its own `true` cancels rule to those listeners as well. This flag changes only `on<type>` handlers, so listeners added with `addEventListener()` keep the existing behavior.

```js
const controller = new AbortController();
controller.signal.addEventListener("abort", () => console.log("a"));
controller.signal.onabort = () => console.log("b");
controller.signal.addEventListener("abort", () => console.log("c"));
controller.abort();
// Logs "a", "b", "c". Without this flag, it logs "b", "a", "c".
```

Assigning an `on<type>` property for an event type that the interface does not define a handler for has no effect. `EventSource`, for example, defines only `onopen`, `onmessage` and `onerror`, so a named server-sent event has to be observed with `addEventListener()`:

```js
// Has no effect.
eventSource.ontest = (event) => console.log(event.data);

// Use this instead.
eventSource.addEventListener("test", (event) => console.log(event.data));
```

Handlers on the global scope are not affected, so `onfetch`, `onscheduled` and the other global handlers in Service Worker syntax continue to work as before.

Once this flag becomes the default for a compatibility date, add the `no_spec_compliant_event_handler_attributes` compatibility flag to keep the previous behavior.

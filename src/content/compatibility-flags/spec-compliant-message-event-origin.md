---
_build:
  publishResources: false
  render: never
  list: never

name: "Spec compliant `MessageEvent.origin`"
sort_date: "2026-08-14"
enable_flag: "spec_compliant_message_event_origin"
disable_flag: "no_spec_compliant_message_event_origin"
---

`MessageEvent.origin` reports what the standards say it should. Two things change.

**An absent origin reports an empty string instead of `null`.** A message event's origin is internally nullable, and [the standard's getter](https://html.spec.whatwg.org/multipage/comms.html#dom-messageevent-origin) reports the empty string for the null case. The Workers runtime reported `null` instead. This is what a message delivered through a `MessagePort`, or from a `WebSocketPair` endpoint, now reports, since neither has a URL to take an origin from.

```js
const { port1, port2 } = new MessageChannel();
port2.onmessage = (event) => console.log(event.origin === "");
port1.postMessage("hello");
// Logs true. Without this flag, event.origin is null.
```

**A `WebSocket` opened from a URL reports the origin of that URL.** The [WebSocket standard](https://websockets.spec.whatwg.org/#feedback-from-the-protocol) requires the message event's origin to be the serialized origin of the WebSocket's URL, which the Workers runtime did not do. `EventSource` already reported the origin of its event stream.

```js
const ws = new WebSocket("wss://example.com/chat");
ws.addEventListener("message", (event) => console.log(event.origin));
// Logs "wss://example.com". Without this flag, event.origin is null.
```

Code that compares `origin` against `null` needs updating either way. For the absent case, note that `""` and `null` are both falsy, so a check like `if (!event.origin)` works before and after.

Once this flag becomes the default for a compatibility date, add the `no_spec_compliant_message_event_origin` compatibility flag to keep the previous behavior.

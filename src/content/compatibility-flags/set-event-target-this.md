---
_build:
  publishResources: false
  render: never
  list: never

name: "Set the `this` value of EventTarget event handlers"
sort_date: "2025-08-01"
enable_date: "2025-08-01"
enable_flag: "set_event_target_this"
disable_flag: "no_set_event_target_this"
---

When the `set_event_target_this` flag is se, Workers will set the `this` value
of event handlers to the `EventTarget` instance that the event is being
dispatched on. This is compliant with the specification.

When then `no_set_event_target_this` flag is set, Workers will not set the
`this` value of event handlers, and it will be `undefined` instead.

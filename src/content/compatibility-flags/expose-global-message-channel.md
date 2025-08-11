---
_build:
  publishResources: false
  render: never
  list: never

name: "Expose global MessageChannel and MessagePort"
sort_date: "2025-08-15"
enable_date: "2025-08-15"
enable_flag: "expose_global_message_channel"
disable_flag: "no_expose_global_message_channel"
---

When the `expose_global_message_channel` flag is set, Workers will expose
the `MessageChannel` and `MessagePort` constructors globally.

When the `no_expose_global_message_channel` flag is set, Workers will not
expose these.

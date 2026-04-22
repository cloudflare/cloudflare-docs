---
_build:
  publishResources: false
  render: never
  list: never

name: "Node.js diagnostics_channel hasSubscribers getter"
sort_date: "2026-05-19"
enable_date: "2026-05-19"
enable_flag: "diagnostics_channel_has_subscribers_getter"
disable_flag: "no_diagnostics_channel_has_subscribers_getter"
---

When `diagnostics_channel_has_subscribers_getter` is enabled, `Channel.hasSubscribers` and `TracingChannel.hasSubscribers` from `node:diagnostics_channel` become read-only getter properties that evaluate directly to a boolean, matching Node.js behavior.

Previously, `hasSubscribers` was registered as a method, requiring users to call `ch.hasSubscribers()` with parentheses. With this flag enabled, `ch.hasSubscribers` returns a boolean without a function call, consistent with the [Node.js documentation](https://nodejs.org/docs/latest/api/diagnostics_channel.html#channelhassubscribers).

This flag requires [`nodejs_compat`](/workers/runtime-apis/nodejs/) to be enabled.

---
_build:
  publishResources: false
  render: never
  list: never

name: "`hasSubscribers` is a getter on `diagnostics_channel.Channel`"
sort_date: "2026-05-01"
enable_date: "2026-05-01"
enable_flag: "diagnostics_channel_has_subscribers_getter"
disable_flag: "no_diagnostics_channel_has_subscribers_getter"
---

Aligns the [`node:diagnostics_channel`](https://nodejs.org/docs/latest/api/diagnostics_channel.html) module with Node.js by making `hasSubscribers` a boolean getter property on `Channel` and `TracingChannel` instances, instead of a method.

Originally, `Channel.prototype.hasSubscribers` and `TracingChannel.prototype.hasSubscribers` were registered as methods, so the value had to be read by invoking the method:

```js
import { channel } from "node:diagnostics_channel";
const ch = channel("my-channel");
if (ch.hasSubscribers()) {
	ch.publish({ hello: "world" });
}
```

In Node.js, `hasSubscribers` is a read-only getter that evaluates directly to a boolean. When the `diagnostics_channel_has_subscribers_getter` flag is enabled, workerd matches that behavior:

```js
import { channel } from "node:diagnostics_channel";
const ch = channel("my-channel");
if (ch.hasSubscribers) {
	ch.publish({ hello: "world" });
}
```

Workers that have this flag enabled must access `hasSubscribers` without parentheses. Workers that rely on the legacy method form can continue using it by setting the `no_diagnostics_channel_has_subscribers_getter` flag.

The top-level `diagnostics_channel.hasSubscribers(name)` function is unaffected — it remains a function in both Node.js and workerd.

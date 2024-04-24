---
_build:
  publishResources: false
  render: never
  list: never

name: "Handling custom thenables"
sort_date: "2024-04-01"
enable_date: "2024-04-01"
enable_flag: "unwrap_custom_thenables"
disable_flag: "no_unwrap_custom_thenables"
---

With the `unwrap_custom_thenables` flag set, various Workers APIs that accept promises will also
correctly handle custom thenables (objects with a `then` method) that are not native promises, but
are intended to be treated as such). For example, the `waitUntil` method of the `ExecutionContext`
object will correctly handle custom thenables, allowing them to be used in place of native promises.

```js
async fetch(req, env, ctx) {
  ctx.waitUntil({ then(res) {
    // Resolve the thenable after 1 second
    setTimeout(res, 1000);
  } });
  // ...
}
```

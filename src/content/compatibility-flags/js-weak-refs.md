---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `FinalizationRegistry` and `WeakRef`"
sort_date: "2025-05-05"
enable_date: "2025-05-05"
enable_flag: "enable_weak_ref"
disable_flag: "disable_weak_ref"
---

Enables the use of [`FinalizationRegistry`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry) and [`WeakRef`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef) built-ins.
- `FinalizationRegistry` allows you to register a cleanup callback that runs after an object has been garbage-collected.
- `WeakRef` creates a weak reference to an object, allowing it to be garbage-collected if no other strong references exist.

:::note[Behaviour]
`FinalizationRegistry` cleanup callbacks may execute at any point during your request lifecycle, even after your invoked handler has completed (similar to `ctx.waitUntil()`). These callbacks do not have an associated async context. You cannot perform any I/O within them, including emitting events to a tail Worker.
:::

:::caution
These APIs are fundamentally non-deterministic. The timing and execution of garbage collection are unpredictable, and you **should not rely on them for essential program logic**. Additionally, cleanup callbacks registered with `FinalizationRegistry` may **never be executed**, including but not limited to cases where garbage collection is not triggered, or your Worker gets evicted.
:::
---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `node:perf_hooks` module"
sort_date: "2026-03-17"
enable_date: "2026-03-17"
enable_flag: "enable_nodejs_perf_hooks_module"
disable_flag: "disable_nodejs_perf_hooks_module"
---

The `enable_nodejs_perf_hooks_module` flag enables the `node:perf_hooks` module in Workers. This flag also implicitly enables global Performance classes (`PerformanceEntry`, `PerformanceMark`, `PerformanceMeasure`, `PerformanceResourceTiming`, `PerformanceObserver`, and `PerformanceObserverEntryList`).

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

See the [Node.js documentation](https://nodejs.org/docs/latest/api/perf_hooks.html) for more details about the `node:perf_hooks` API.

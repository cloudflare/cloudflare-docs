---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable global Performance classes"
sort_date: "2026-03-17"
enable_date: "2026-03-17"
enable_flag: "enable_global_performance_classes"
disable_flag: "disable_global_performance_classes"
---

When `enable_global_performance_classes` is enabled, the following classes are available on the global scope: `PerformanceEntry`, `PerformanceMark`, `PerformanceMeasure`, `PerformanceResourceTiming`, `PerformanceObserver`, and `PerformanceObserverEntryList`.

These classes are also implicitly enabled by the `enable_nodejs_perf_hooks_module` flag.

This flag is automatically enabled for Workers using a compatibility date of 2026-03-17 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.

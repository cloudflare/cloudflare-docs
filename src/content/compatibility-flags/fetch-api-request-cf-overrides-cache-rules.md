---
_build:
  publishResources: false
  render: never
  list: never

name: "Override cache rules cache settings in `request.cf` object for Fetch API"
sort_date: "2023-08-01"
enable_date: "2025-04-02"
enable_flag: "request_cf_overrides_cache_rules"
disable_flag: "no_request_cf_overrides_cache_rules"
---

This flag changes the behavior of cache when requesting assets via the [Fetch API](/workers/runtime-apis/fetch). Cache settings specified in the `request.cf` object, such as `cacheEverything` and `cacheTtl`, are now given precedence over any [Cache Rules](/cache/how-to/cache-rules/) set.

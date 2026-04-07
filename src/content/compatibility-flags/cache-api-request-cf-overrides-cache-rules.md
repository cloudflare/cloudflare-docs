---
_build:
  publishResources: false
  render: never
  list: never

name: "Cache API request `cf` overrides cache rules"
sort_date: "2025-05-19"
enable_date: "2025-05-19"
enable_flag: "cache_api_request_cf_overrides_cache_rules"
disable_flag: "no_cache_api_request_cf_overrides_cache_rules"
---

When `cache_api_request_cf_overrides_cache_rules` is enabled, cache settings specified in the `cf` object of a request passed to the [Cache API](/workers/runtime-apis/cache/) will override cache rules. This applies only to user-owned or grey-clouded sites.

This is the Cache API counterpart to the [`request_cf_overrides_cache_rules`](/workers/configuration/compatibility-flags/#fetch-api-request-cf-overrides-cache-rules) flag, which applies to the `fetch()` API.

---
_build:
  publishResources: false
  render: never
  list: never

name: "Navigation requests prefer asset serving"
sort_date: "2025-04-01"
enable_date: "2025-04-01"
enable_flag: "assets_navigation_prefers_asset_serving"
disable_flag: "assets_navigation_has_no_effect"
---

For Workers with [static assets](/workers/static-assets/) and the compatibility flag enabled, navigation requests (requests which have a `Sec-Fetch-Mode: navigate` header) will prefer to be served by our asset-serving logic, even when an exact asset match cannot be found.

Without this flag, the runtime will continue to apply the old behavior of invoking a Worker script (if present) for any requests which do not exactly match a static asset.

When `assets.run_worker_first = true` is set, this compatibility flag has no effect. The `assets.run_worker_first = true` setting ensures the Worker script executes before any asset-serving logic.

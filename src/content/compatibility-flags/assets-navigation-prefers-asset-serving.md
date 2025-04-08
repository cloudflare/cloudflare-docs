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

For Workers with [static assets](/workers/static-assets/) and this compatibility flag enabled, navigation requests (requests which have a `Sec-Fetch-Mode: navigate` header) will prefer to be served by our asset-serving logic, even when an exact asset match cannot be found. This is particularly useful for applications which operate in either [Single Page Application (SPA) mode](/workers/static-assets/routing/#not_found_handling--404-page--single-page-application--none) or [404 page mode](/workers/static-assets/routing/#not_found_handling--404-page--single-page-application--none), as this now means the fallback pages of `200 /index.html` and `404 /404.html` will be served ahead of invoking a Worker script and will therefore avoid incurring a charge.

Without this flag, the runtime will continue to apply the old behavior of invoking a Worker script (if present) for any requests which don't exactly match a static asset.

This compatibility flag has no effect when `assets.run_worker_first = true` is set. `assets.run_worker_first = true` will continue to force the Worker script to execute ahead of all other asset-serving logic.

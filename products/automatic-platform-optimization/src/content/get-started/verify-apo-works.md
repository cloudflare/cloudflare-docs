---
title: Verify APO works
order: 8
---

# Verify APO works

You can check whether or not APO is working by verifying APO headers are present. When APO is working, three headers are present: `CF-Cache-Status`, `cf-apo-via`, `cf-edge-cache`.

1. Visit [Uptrends.com](https://www.uptrends.com/tools/http-response-header-check).
1. In the text field, enter the URL for your WordPress homepage including the `https://www.`.
1. Select **Start test**. The **Response Headers** table displays.
1. Locate the three header responses and their description. APO is working correctly when the headers exactly match the headers below.

- `CF-Cache-Status` | `HIT`
  - The `cf-cache-status` header displays if the asset is served from the cache or was considered dynamic and served from the origin.
- `cf-apo-via` | `tcache`
  - The `cf-apo-via` header returns the APO status for the given request.
- `cf-edge-cache` | `cache, platform=wordpress`
  - The `cf-edge-cache` headers confirms the WordPress plugin is installed and enabled.

## Verify the APO integration and WordPress integration work

Open your WordPress site and publish a change. When the integration is working, the page is cached with `cf-cache-status: HIT` and `cf-apo-via: tcache`

---
title: Troubleshooting
order: 11
---

# Troubleshooting

## Verify APO works

You can check whether or not APO is working by verifying APO headers are present. When APO is working, three headers are present: `CF-Cache-Status`, `cf-apo-via`, `cf-edge-cache`.

1. Visit [Uptrends.com](https://www.uptrends.com/tools/http-response-header-check).
1. In the text field, enter the URL for your WordPress homepage including the `https://www.`.
1. Select **Start test**. The **Response Headers** table displays.
1. Locate the three header responses and their description. APO is working correctly when the headers exactly match the headers below.

- `CF-Cache-Status` | `HIT`
  - The `cf-cache-status` header displays if the asset the cache or was considered dynamic and served from the origin.
- `cf-apo-via` | `cache`
  - The `cf-apo-via` header returns the APO status for the given request.
- `cf-edge-cache` | `cache, platform=wordpress`
  - The `cf-edge-cache` headers confirms the WordPress plugin is installed and enabled.

## WordPress plugin is undetected on Cloudflare dashboard

The WordPress plugin may go undetected on your Cloudflare dashboard for a few reasons.

- Versions older than 3.8.2 of the WordPress plugin are installed. 
  - **Solution:** Install version 3.8.2 of the WordPress plugin.
- Version 3.8.2 of the plugin is installed but existing cache plugins return stale responses, for example, without `cf-edge-cache` header. 
  - **Solution:** Enable APO from the WordPress plugin and purge the cache in the existing cache plugins.
- WordPress only runs on a subdomain, but WordPress and the WordPress plugin check against the zone's root domain.
  - **Solution:** Liberate the subdomain zone and run APO.

If your Cloudflare dashboard can't detect the WordPress plugin after trying the solutions above, complete the task below.

1. Disable APO in the card.
1. Enable APO in the card and set the correct settings for APO.
1. Clear any server caches used with other plugins, for example, WP Rocket.
1. Verify your origin serves the `cf-edge-cache: cache, platform=wordpress` response header.

## WordPress returns stale content
If WordPress is returning stale content, purge the cache when APO is enabled.
---
title: Troubleshooting
order: 14
---

# Troubleshooting

## WordPress plugin is undetected on Cloudflare dashboard

The WordPress plugin may go undetected on your Cloudflare dashboard for a few reasons.

- Versions older than 3.8.2 of the WordPress plugin are installed. 
  - **Solution:** Install version 3.8.2 of the WordPress plugin.
- Version 3.8.2 of the plugin is installed but existing cache plugins return stale responses, for example, without `cf-edge-cache` header. 
  - **Solution:** Enable APO from the WordPress plugin and purge the cache in the existing cache plugins.
- WordPress only runs on a subdomain, but WordPress and the WordPress plugin check against the zone's root domain.
  - **Solution:** Liberate the subdomain zone and run APO.

If your Cloudflare dashboard can't detect the WordPress plugin after trying the solutions above, do the following.

1. Disable APO in the card.
1. Enable APO in the card and set the correct settings for APO.
1. Clear any server caches used with other plugins, for example, WP Rocket.
1. Verify your origin serves the `cf-edge-cache: cache, platform=wordpress` response header.

## WordPress returns stale content

If WordPress is returning stale content, purge the cache when APO is enabled.
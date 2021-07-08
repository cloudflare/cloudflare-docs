---
title: Troubleshooting
order: 14
pcx-content-type: interim
---

# Troubleshooting

## WordPress plugin is undetected on Cloudflare dashboard

The WordPress plugin may go undetected on your Cloudflare dashboard for a few reasons.

- Versions older than 3.8.2 of the WordPress plugin are installed.
  - **Solution:** Install version 4.4.0 of the WordPress plugin.
- Version 3.8.2 of the plugin is installed but existing cache plugins return stale responses, for example, without `cf-edge-cache` header.
  - **Solution:** Enable APO from the WordPress plugin and purge the cache in the existing cache plugins.
- WordPress only runs on a subdomain, but WordPress and the WordPress plugin check against the zone's root domain.
  - **Solution:** For additional information, see [Subdomains and subdirectories](/reference/subdomain-subdirectories)

If your Cloudflare dashboard can't detect the WordPress plugin after trying the solutions above, ensure you completed all of the steps listed in [Activate the Cloudflare WordPress plugin](/get-started/activate-cf-wp-plugin).

## WordPress returns stale content

If WordPress is returning stale content, purge the cache when APO is enabled.
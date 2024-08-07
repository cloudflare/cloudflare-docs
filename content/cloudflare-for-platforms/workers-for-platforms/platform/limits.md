---
pcx_content_type: concept
title: Limits
weight: 1
---

# Limits

## Script limits

Cloudflare provides an unlimited number of scripts for Workers for Platforms customers.

## `cf` object

The [`cf` object](/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties) contains Cloudflare-specific properties of a request. This field is not accessible in [user Workers](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers) because some fields in this object are sensitive and can be used to manipulate Cloudflare features (eg.`cacheKey`, `resolveOverride`, `scrapeShield`.)

## Cache API

For isolation, `caches.default()` is disabled for namespaced scripts. To learn more about the cache, refer to [How the cache Works](/workers/reference/how-the-cache-works/).

## ​Tags

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

{{<render file="_limits_increase.md" productFolder="workers">}}

## Gradual Deployments

[Gradual Deployments](/workers/configuration/versions-and-deployments/gradual-deployments/) is not supported yet for user Workers. Changes made to user Workers create a new version that deployed all-at-once to 100% of traffic.

## API Rate Limits

{{<render file="_api-rate-limits.md" productFolder="fundamentals">}}

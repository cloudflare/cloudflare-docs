---
pcx_content_type: reference
title: Observability
weight: 2
---

# Observability

`cacheStatus` field has been added to the response object returned from `list()` and `getWithMetadata()`. The values defined are as follows:

* `MISS`: The current data center does not have this value. The value will be retrieved through upper tiers or from the central data store.
* `HIT`: The current data center serviced this value.
* `REVALIDATE`: A `HIT` and Workers KV took this as an opportunity to trigger a background refresh of the value.
* `STALE`: A `HIT` where Workers KV noticed it is deep within the default 1 minute refresh interval for the asset.

Use [Workers Analytics Engine](/analytics/analytics-engine/) to record this information and build basic visualizations to measure your cache performance.
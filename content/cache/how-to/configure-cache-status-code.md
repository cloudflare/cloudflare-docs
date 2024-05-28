---
title: Cache by status code
pcx_content_type: how-to
---

# Cache by status code

Enterprise customers can set cache time-to-live (TTL) based on the response status from the origin web server. Cache TTL refers to the duration of a resource in the Cloudflare network before being marked as stale or discarded from cache. Status codes are returned by a resource’s origin.

Setting cache TTL based on response status overrides the [default cache behavior (standard caching)](/cache/concepts/default-cache-behavior/) for static files and overrides cache instructions sent by the origin web server. To cache non-static assets, set a [Cache Level of Cache Everything using a Cache Rule](/rules/reference/page-rules-migration/#migrate-cache-level). Setting `no-store` **Cache-Control** or a low TTL (using `max-age`/`s-maxage`) increases requests to origin web servers and decreases performance.

## Caching limits

The maximum caching limit for Free, Pro, and Business customers is 512 MB per file, and the maximum caching limit for Enterprise customers is 5 GB per file. If you need to raise the limits, contact your Customer Success Manager.

## Edge TTL

By default, Cloudflare caches certain HTTP response codes with the following Edge Cache TTL when a `cache-control` directive or `expires` response header are not present.

| HTTP status code   | Default TTL  |
| ------------------ | ------------ |
| 200, 206, 301      |  120m        |
| 302, 303           |  20m         |
| 404, 410           |  3m          |

All other status codes are not cached by default.

## Set cache TTL by response status via the Cloudflare dashboard

To set cache TTL by response status, [create a Cache Rule](/cache/how-to/cache-rules/) for [**Cache TTL by status code**](/cache/how-to/cache-rules/settings/#edge-ttl).

## Set cache TTL by response status via the Cloudflare API

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "expression": "(http.host eq "www.example.com")",
      "description": "set cache TTL by response status",
      "action": "set_cache_settings",
      "action_parameters": {
    "cache": true,
    "edge_ttl": {
        "status_code_ttl": [
            {
                "status_code_range": {
                    "to": 299
                },
                "value": 86400
            },
            {
                "status_code_range": {
                    "from": 300,
                    "to": 499
                },
                "value": 0  // no-cache
            },
            {
                "status_code_range": {
                    "from": 500
                },
                "value": -1  // no-store
            }
        ],
        "mode": "respect_origin"
    }
}
```

### Syntax

Provide a JSON object containing status codes and their corresponding TTLs. Each key-value pair in the cache TTL by status cache rule has the following syntax:

*   `status_code`: An integer value such as 200 or 500. `status_code` matches the exact status code from the origin web server. Valid status codes are between 100-999.
*   `status_code_range`: Integer values for `from` and `to`. `status_code_range` matches any status code from the origin web server within the specified range.
*   `value`: An integer value that defines the duration an asset is valid in seconds or one of the following strings: `no-store` (equivalent to `-1`), `no-cache` (equivalent to `0`).

## Set cache TTL by response status via a Cloudflare Worker

The **cacheTtlByStatus** option is a version of the **cacheTtl** feature that designates a cache TTL for a request’s response status code (for example, `{ "200-299": 86400, 404: 1, "500-599": 0 }`).

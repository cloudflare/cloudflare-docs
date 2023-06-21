---
title: Cache by status code
pcx_content_type: how-to
---

# Cache by status code

Enterprise customers can set cache time-to-live (TTL) based on the response status from the origin web server. Cache TTL refers to the duration of a resource in the Cloudflare network before being marked as stale or discarded from cache. Status codes are returned by a resource’s origin.

Setting cache TTL based on response status overrides the [default cache behavior (standard caching)](/cache/concepts/default-cache-behavior/) for static files and overrides cache instructions sent by the origin web server. To cache non-static assets, set a [Cache Level of Cache Everything using a Page Rule](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-everything). Setting `no-store` **Cache-Control** or a low TTL (using `max-age`/`s-maxage`) increases requests to origin web servers and decreases performance.

## Caching limits

The maximum caching limit for Free, Pro, and Business customers is 512 MB per file, and the maximum caching limit for Enterprise customers is 5 GB per file. If you need to raise the limits, contact your Customer Success Manager.

## Edge TTL

By default, Cloudflare caches certain HTTP response codes with the following Edge Cache TTL when a `cache-control` directive or `expires` response header are not present.

| HTTP status code   | Default TTL  |
| ------------------ | ------------ |
| 200, 206, 301      |  120m        |
| 302, 303           |  20m         |
| 404, 410           |  3m          |
| 403                |  0s          |
| 500, 502, 503, 504 |  0s          |

## Set cache TTL by response status via the Cloudflare dashboard

To set cache TTL by response status, [create a Page Rule](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#create-a-page-rule) for **Cache TTL by status code**.

## Set cache TTL by response status via the Cloudflare API

```json
curl -X POST "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/pagerules" \     
-H "X-Auth-Email: user@example.com" \
-H "X-Auth-Key: ${CF_AUTH_KEY}" \
-H "Content-Type: application/json" \
--data '{
  "targets": [
    {
      "target": "url",
      "constraint": {
        "operator": "matches",
        "value": "www.example.com/*"
      }
    }
  ],
  "actions": [
    {
      "id": "cache_ttl_by_status",
      "value": {
        "200": "no-cache",
        "100": 5,
        "300-302": 20
      }
    }
  ],
  "priority": 1,
  "status": "active"
}'
```

### Syntax

Provide a JSON object containing status codes and their corresponding TTLs. Each key-value pair in the cache TTL by status page rule has the following syntax:

*   `status_code`: A string such as 200 or 500. `status_code` matches the exact status code from the origin web server. Valid status codes are between 100-999.
*   `status_code_range`: A "from-to" string, such as 200-299 or 400-599. `status_code_range` matches any status code from the origin web server within the specified range.
*   `TTL`: An integer that defines the duration an asset is valid in seconds or one of the following strings: `no-store`, `no-cache`. Only positive integers, including 0, are accepted.

## Set cache TTL by response status via a Cloudflare Worker

The **cacheTtlByStatus** option is a version of the **cacheTtl** feature that designates a cache TTL for a request’s response status code (for example, `{ "200-299": 86400, 404: 1, "500-599": 0 }`).

---
title: Purge cache key resources
pcx_content_type: how-to
weight: 6
---

# Purge cache key resources

Purge resources that use Cache Keys via the [Cloudflare API](/api/operations/zone-purge). If you use [Cloudflare’s Purge by URL](/api/operations/zone-purge#purge-cached-content-by-url), include the headers and query strings that are in your custom Cache Key.

Currently, it is not possible to purge a URL stored through Cache API that uses a custom cache key set by a Worker. Instead, use a [custom key created by Cache Rules](/cache/how-to/cache-rules/settings/#cache-key). Alternatively, purge your assets using purge everything, purge by tag, purge by host or purge by prefix.

To purge `device_type`, `geo`, or `lang` use `CF-Device-Type`, `CF-IPCountry` or `accept-language`, respectively. [Purge by Tag / Host](/api/operations/zone-purge#purge-cached-content-by-tag-host-or-prefix) and [Purge Everything](/api/operations/zone-purge#purge-all-cached-content) are not impacted by the use of custom Cache Keys.

## Purge by device type

For a Cache Key based on device type, purge the asset by passing the `CF-Device-Type` header with the API purge request (valid headers include mobile, desktop, and tablet).

Refer to the example API request below to purge all mobile assets on the root webpage.

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"files":[{"url":"http://my.website.com/","headers":{"CF-Device-Type":"mobile"}}]}'
```

## Purge by geo

Purge resources for a location-based Cache Key by specifying the two-letter country code. Spain is used in the example below.

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"files":[{"url":"http://my.website.com/", "headers":{"CF-IPCountry":"ES"}}]}'
```

## Purge by language

For a Cache Key based on language, purge the asset by passing the `accept-language` header. Refer to the example API request below to purge all assets in Chinese (PRC).

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"files":[{"url":"http://my.website.com/", "headers":{"accept-language":"zh-CN"}}]}'
```
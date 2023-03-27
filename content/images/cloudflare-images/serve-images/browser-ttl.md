---
pcx_content_type: concept
layout: single
title: Browser TTL
---

# Browser TTL

Browser TTL controls how long an image stays in a browser's cache and specifically configures the `cache-control` response header.

### Default TTL

By default, an image's TTL is set to two days to meet user needs, such as re-uploading an image under the same [Custom ID](/images/cloudflare-images/upload-images/custom-id/).

## Custom setting

You can use two custom settings to control the Browser TTL, an account or a named variant. To adjust how long a browser should keep an image in the cache, set the TTL in seconds, similar to how the `max-age` header is set. The value should be an interval between one hour to one year.

### Browser TTL for an account

Setting the Browser TTL per account overrides the default TTL.

```bash
---
header: Example
---
curl --request PATCH 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_TAG>/images/v1/config' \
--header 'Authorization: Bearer <BEARER_TOKEN>' \
--header 'Content-Type: application/json' \
-d @config.json
config.json:
{
    "browser_ttl": 31536000
}
```

When the Browser TTL is set to one year for all images, the response for the `cache-control` header is essentially `public`, `max-age=31536000`, `stale-while-revalidate=7200`.

### Browser TTL for a named variant

Setting the Browser TTL for a named variant is a more granular option that overrides all of the above when creating or updating an image variant, specifically the `browser_ttl` option in seconds.

```bash
---
header: Example
---
curl --request POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_TAG>/images/v1/variants' \
--header 'Authorization: Bearer <BEARER_TOKEN>' \
--header 'Content-Type: application/json' \
-d @config.json
variant.json:
{
    "id":"avatar",
    "options": {
       "width":100,
       "browser_ttl": 86400
    },
}
```

When the Browser TTL is set to one day for images requested with this variant, the response for the `cache-control` header is essentially `public`, `max-age=86400`, `stale-while-revalidate=7200`.

{{<Aside type="note">}}

[Private images](/images/cloudflare-images/make-an-image-private/) do not respect default or custom TTL settings. The private images cache time is set according to the expiration time and can be as short as one hour.

{{</Aside>}}

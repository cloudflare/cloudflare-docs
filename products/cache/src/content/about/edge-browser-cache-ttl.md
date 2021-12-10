---
title: Edge and Browser Cache TTL
pcx-content-type: concept
---

# Edge and Browser Cache TTL

## Edge Cache TTL

Edge Cache TTL (Time to Live) specifies how long to cache a resource in the Cloudflare edge network.  Edge Cache TTL is not visible in response headers and the minimum Edge Cache TTL depends on plan type.

- Free - 2 hours
- Pro - 1 hour
- Business - 1 second
- Enterprise - 1 second

For more information on creating page rules, see [Create page rules](/how-to/create-page-rules).

## Browser Cache TTL

The Browser Cache TTL sets the expiration for resources cached in a visitor’s browser. By default, Cloudflare honors the cache expiration set in your `Expires` and `Cache-Control` headers but overrides those headers if:

- The value of the `Cache-Control` header from the origin web server is less than the Browser Cache TTL Cloudflare setting.
- The origin web server does not send a `Cache-Control` or an `Expires` header.

Unless specifically set in a page rule, Cloudflare does not override or insert `Cache-Control` headers if you set **Browser Cache TTL** to **Respect Existing Headers**.

For more information on setting the Browser Cache TTL, see [Set Browser Cache TTL](/how-to/set-browser-ttl).

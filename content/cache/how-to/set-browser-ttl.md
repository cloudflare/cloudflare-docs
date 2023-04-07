---
title: Set Browser Cache TTL
pcx_content_type: concept
meta:
  title: Browser Cache TTL
---

# Browser Cache TTL

Specify a time for a visitor’s Browser Cache TTL to accelerate the page load for repeat visitors to your website. To configure cache duration within Cloudflare’s data centers, see [Edge Cache TTL](/cache/how-to/create-page-rules/).

By default, Cloudflare honors the cache expiration set in your `Expires` and `Cache-Control` headers. Cloudflare overrides any `Cache-Control` or `Expires` headers with values set via the **Browser Cache TTL** option under **Caching** on your dashboard if:

- The value of the `Cache-Control` header from the origin web server is less than the **Browser Cache TTL** setting. This means that **Browser cache TTL** value needs to be higher than origin `max-age`.
- The origin web server does not send a `Cache-Control` or an `Expires` header.

Unless specifically set in a [Page Rule](/cache/how-to/create-page-rules/), Cloudflare does not override or insert `Cache-Control` headers if you set **Browser Cache TTL** to **Respect Existing Headers**. 

Nevertheless, the value you set via Page Rule will be ignored if `Cache-Control: max-age` is higher. In other words, you can override to make browsers cache longer than Cloudflare's edge but not less.

## Set Browser Cache TTL

The Cloudflare UI and API both prohibit setting Browser Cache TTL to 0 for non-Enterprise domains.

{{<Aside type="note" header="Note">}}

If you modify cached assets, the new asset is not displayed to repeat visitors before the Browser Cache TTL duration. [Purging Cloudflare’s cache](/cache/how-to/purge-cache/) does not affect assets cached in a visitor’s browser.

{{</Aside>}}

1.  Log in to your Cloudflare dashboard.
2.  Select **Caching**.
3.  Under **Browser Cache TTL**, select the drop-down menu to select the desired cache expiration time.

The **Respect Existing Headers** option tells Cloudflare to honor the settings in the `Cache-Control` headers from your origin web server.

{{<Aside type="note" header="Respect Existing Headers Availability">}}

For all plan types, you can set Browser Cache TTL to Respect Existing Headers at a zone level (zone setting) or you can use a Cache Rule. Setting Browser Cache TTL to Respect Existing Headers via Page Rule is currently an Enterprise-only zone feature. 
  
{{</Aside>}}

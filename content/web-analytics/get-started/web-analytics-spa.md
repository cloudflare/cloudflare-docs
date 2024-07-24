---
title: Web Analytics for SPAs
pcx_content_type: reference
weight: 1
meta:
  title: Web Analytics for Single Page Applications (SPAs)
---

# Web Analytics for Single Page Applications (SPAs)

Cloudflare Web Analytics can automatically track user interactions on Single Page Applications (SPAs) by overriding the History API's `pushState` function and listening to the `onpopstate` event. Note that hash-based routers are not supported.

## Disable SPA measurement

If you want to disable the automatic tracking for SPAs, you can do so by adding the `spa` option with a value of `false` in the data attribute of the script tag, as shown below:

```html
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon=' {"token": "42e216b9090ru59384ygu891dce9eecde", "spa": false} '
></script>
```

### Google Tag Manager (GTM)

If you are using Google Tag Manager (GTM), you can disable SPA tracking by passing the spa option via the query string in the script URL:

```html
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js?token=42e216b9090ru59384ygu891dce9eecde&spa=false"
></script>
```
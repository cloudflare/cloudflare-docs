---
title: Web Analytics for SPAs
pcx-content-type: reference
weight: 1
meta:
  title: Web Analytics for Single Page Applications (SPAs)
---

# Web Analytics for Single Page Applications (SPAs)

Cloudflare Web Analytics enables measuring SPAs automatically by overriding the History API's `pushState` function and listening to the `onpopstate`. Hash-based router is not supported.

To disable measuring SPAs, add the `spa` option with a value of `false` in the data attribute, as shown below.

```html
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon=' {"token": "42e216b9090ru59384ygu891dce9eecde", "spa": false} '
></script>
```

If you are using Google Tag Manager (GTM), use the query string to pass the spa option instead.

```html
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js?token=42e216b9090ru59384ygu891dce9eecde&spa=false"
></script>
```
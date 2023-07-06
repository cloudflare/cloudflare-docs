---
pcx_content_type: overview
title: Ignore JavaScripts
weight: 2
meta: 
    title: Ignore JavaScripts in Rocket Loader
---

# Ignore JavaScripts in Rocket Loader

You can have Rocket Loader ignore individual scripts by adding the `data-cfasync="false"` attribute to the relevant script tag:

```html
<script data-cfasync="false" src="/javascript.js"></script>      
```

Rocket Loader will still optimize the loading of all other scripts on the page.

{{<Aside type="note">}}

If Rocket Loader is only impacting a specific page, use a [Configuration Rule](/rules/configuration-rules/) to exclude that page by URL.

{{</Aside>}}

## Limitations

- Adding this attribute within JavaScript will not work if you wish to exclude the script from Rocket Loader.
- If the script you want Rocket Loader to ignore has dependency on other JavaScript(s) on the page, those dependencies must also have the `data-cfasync="false"` attribute.
- The `data-cfasync` attribute must be added before the `src` attribute.
- Rocket Loader will recognize the tag when either single or double quotes are placed around the attribute value.
---
pcx_content_type: how-to
title: Prefetch URLs
weight: 7
---

# Prefetch URLs

URL prefetching means that Cloudflare pre-populates the cache with content a visitor is likely to request next. This setting — when combined with [additional setup](#setup) — leads to a higher cache hit rate and thus a faster experience for the user.

---

## Availability

{{<feature-table id="speed.prefetch_urls">}}

---

## Setup

For Cloudflare to start prefetching URLs, you will need to [enable the feature](#enable-prefetch-urls) and [include a list of URLs to prefetch](#choose-urls-to-prefetch).

### Enable Prefetch URLs

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To enable **Prefetch URLs** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **Speed** > **Optimization** > **Content Optimization**.
3.  For **Prefetch URLs**, switch the toggle to **On**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable **Prefetch URLs** with the API, send a [`PATCH`](/api/operations/zone-settings-change-prefetch-preload-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).
 
{{</tab>}}
{{</tabs>}}

### Choose URLs to prefetch

After you [enable the feature](#enable-prefetch-urls), you also need to indicate which URLs Cloudflare should prefetch.

To do this, include a Link HTTP response header pointing to a manifest file with the `rel="prefetch"` attribute and then serve the manifest file with `text/plain` as the Content-type response header.

{{<example>}}
Example HTTP response header:<br/>
`Link: <http://www.example.com/manifest.txt>; rel="prefetch"`

Example manifest.txt:<br/>
`/static/fetch1 //other.example.com/fetch2 http://another.example.com/fetch3`
{{</example>}}

The manifest file should contain URIs, protocol-relative URLs or full URLs, separated by new lines. These files must be on your websites that are on Cloudflare. If you reference HTML pages, only the HTML page itself will be pre-fetched - any sub-requests from that HTML will not be fetched unless they are also defined explicitly in your manifest.

## Limitations

- Cloudflare will only prefetch files listed in the manifest file if the resources are those [cached by default](/cache/concepts/default-cache-behavior/#default-cached-file-extensions).

- Prefetch is not compatible with the custom cache key configuration. For more information, refer to [Cache Key limitations](/cache/how-to/cache-keys/#limitations).
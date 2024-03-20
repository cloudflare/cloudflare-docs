---
title: ​Purge by single-file
pcx_content_type: how-to
weight: 1
---

# Purge by single-file (by URL)

With purge by single-file, cached resources are immediately removed from the stored assets in your Content Delivery Network (CDN) across all data centers. New requests for the purged asset receive the latest version from your origin web server and add it back to your CDN cache within the specific Cloudflare data center that served the request.

The single-file purge rate limit for the Free subscription is 1,000 URLs/minute. The rate limit is subject to change.

A single-file purge performed through your Cloudflare dashboard does not clear objects that contain any of the following:

- [Custom cache keys](/cache/how-to/cache-keys/)
- [Origin header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin)
- Any of these request headers:
  - `X-Forwarded-Host`
  - `X-Host`
  - `X-Forwarded-Scheme`
  - `X-Original-URL`
  - `X-Rewrite-URL`
  - `Forwarded`

You can purge objects with these characteristics using an API call to ([purge files by URL](/api/operations/zone-purge#purge-cached-content-by-url)). In the data/header section of the API call, you must include all headers and cache keys contained in the cached resource, along with their matching values.

{{<Aside type="warning" header="Warning">}}

Always use UTF-8 encoded URLs for single-file cache purges. Wildcards are not supported on single file purge, and you must use purge by hostname, prefix, or implement cache tags as an alternative solution. All of the listed options are Enterprise features.

{{</Aside>}}

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2.  Select **Caching** > **Configuration**.
3.  Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
4.  Under **Purge by**, select **URL**.
5.  Enter the appropriate value(s) in the text field using the format shown in the example. Be aware that the host part of the URL is not case-sensitive, meaning it will always be converted to lowercase according to RFC standards. However, the path portion is case-sensitive. For example, `https://EXAMPLE.com/helloHI` would be treated as `https://example.com/helloHI`.
6.  Perform any additional instructions to complete the form.
7.  Review your entries.
8.  Select **Purge**.

{{<Aside type="note" header="Note">}}

For information on how to use single-file purge to purge assets cached by a Workers fetch, refer to [​​Using Workers to purge](/workers/reference/how-the-cache-works/#single-file-purge--assets-cached-by-a-worker).

{{</Aside>}}

{{<Aside type="warning" header="Warning">}}

If you have a [Transform Rule](/rules/transform/) in place that is modifying part of a URL path, you must use the non-transform (end user) URL when performing single file purge so that purge can take effect.

{{</Aside>}}

## Resulting cache status

Purging by single-file deletes the resource, resulting in the `CF-Cache-Status` header being set to [`MISS`](/cache/concepts/cache-responses/#miss) for subsequent requests.

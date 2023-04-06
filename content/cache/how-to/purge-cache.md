---
title: Purge cache
pcx_content_type: concept
---

# Purge cache

You can purge cached resources by single-file (recommended), all cached content, or other options. 

{{<feature-table id="cache.purge_cache">}}

{{<Aside type="note" header="Note">}}

Purge requests appear in Cloudflare Logs and are identified by the PURGE method and the Cloudflare-branded User Agent.

{{</Aside>}}

For information on how to use single-file purge to purge assets cached by a Workers fetch, refer to [​​Using Workers to purge](/workers/learning/how-the-cache-works/#single-file-purge--assets-cached-by-a-worker).

## Purge by single-file (by URL)

With purge by single-file, cached resources are immediately removed from the stored assets in your Content Delivery Network (CDN) across all data centers. New requests for the purged asset receive the latest version from your origin web server and add it back to your CDN cache within the specific Cloudflare data center that served the request.

The single-file purge rate limit for the Free subscription is 1000 urls/min. The rate limit is subject to change.

A single-file purge performed through your Cloudflare dashboard does not clear objects that contain any of the following:

- [Custom cache keys](/cache/about/cache-keys/)
- [Origin header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin)
- Any of these request headers:
  - `X-Forwarded-Host`
  - `X-Host`
  - `X-Forwarded-Scheme`
  - `X-Original-URL`
  - `X-Rewrite-URL`
  - `Forwarded`

You can purge objects with these characteristics using an API call ([Purge files by URL](/api/operations/zone-purge#purge-cached-content-by-url)). In the data/header section of the API call, you must include all headers and cache keys contained in the cached resource, along with their matching values.

{{<Aside type="warning" header="Warning">}}

Always use UTF-8 encoded URLs for single-file cache purges. Wildcards are not supported on single file purge, and you must use purge by hostname, prefix, or implement cache tags as an alternative solution. All of the listed options are Enterprise features.

{{</Aside>}}

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2.  Select **Caching** > **Configuration**.
3.  Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
4.  Under **Purge by**, select **URL**.
5.  Enter the appropriate value(s) in the text field using the format shown in the example.
6.  Perform any additional instructions to complete the form.
7.  Review your entries.
8.  Select **Purge**.

## Purge everything

To maintain optimal site performance, Cloudflare strongly recommends using single-file (by URL) purging instead of a complete cache purge.

Purging everything immediately clears all resources from your CDN cache in all Cloudflare data centers. Each new request for a purged resource returns to your origin server to validate the resource. If Cloudflare cannot validate the resource, Cloudflare fetches the latest version from the origin server and replaces the cached version. When a site with heavy traffic contains a lot of assets, requests to your origin server can increase substantially and result in slow site performance.

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2.  Select **Caching** > **Configuration**.
3.  Under **Purge Cache**, select **Purge Everything**. A warning window appears.
4.  If you agree, select **Purge Everything**.

## Cache-Tags (Enterprise only)

Cache-tag purging makes multi-file purging easier because you can bulk purge by adding cache-tags to your assets, such as web pages, image files, and more. Note that Tag, Hostname and Prefix purges are only available for Cloudflare Enterprise.

### General workflow for cache-tags

1.  Add tags to the `Cache-Tag HTTP` response header from your origin web server for your web content, such as pages, static assets, etc.
2.  [Ensure your web traffic is proxied](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare.
3.  Cloudflare associates the tags in the `Cache-Tag HTTP` header with the content being cached.
4.  Use specific cache-tags to purge your Cloudflare CDN cache of all content containing that cache-tag from your dashboard or [using our API](/api/operations/zone-purge).
5.  Cloudflare forces a [cache miss](/cache/about/default-cache-behavior/#cloudflare-cache-responses) on content with the purged cache-tag.

{{<Aside type="warning" header="Warning">}}

Be careful when purging. A cache miss can cause execution delays by requiring a fetch from your origin server.

{{</Aside>}}

## Add Cache-Tag HTTP response headers

You add cache-tags to your web content in Cache-Tag HTTP response headers to allow the client and server to pass additional information in requests or responses. HTTP headers consist of a specific case-insensitive name followed by a colon `:` and the valid value, for example, `Cache-Tag:tag1,tag2,tag3`. Use commas to separate the tags when you want to use multiple cache-tags.

When your content reaches our edge network, Cloudflare:

- Removes the `Cache-Tag HTTP` header before sending the response to your website visitor. Your end users never see Cache-Tag HTTP headers on your Cloudflare-enabled website.
- Removes whitespaces from the header and any before and after cache-tag names: `tag1`, `tag2` and `tag1,tag2` are considered the same.
- Removes all repeated and trailing commas before applying cache-tags: `tag1,,,tag2` and `tag1,tag2` are considered the same.

### A few things to remember:

- A single HTTP response can have more than one `Cache-Tag HTTP` header field.
- The minimum length of a cache-tag is 1 byte.
- Individual tags don’t have a maximum length, but the aggregate `Cache-Tag HTTP` header cannot exceed 16 KB after the header field name, which is approximately 1000 unique tags. Length includes whitespace and commas but does not include the header field name.
- For cache purges, the maximum length of a cache-tag in an API call is 1024 characters.
- The `Cache-Tag HTTP` header must only contain UTF-8 encoded characters.
- Spaces are not allowed in cache-tags.
- Case does not matter. For example, `Tag1` and `tag1` are considered the same.

## Purge using cache-tags

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2.  Select **Caching** > **Configuration**.
3.  Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
4.  Under **Purge by**, select **Tag**.
5.  In the text box, enter your tags to use to purge the cached resources. To purge multiple cache-tagged resources, separate each tag with a comma or have one tag per line.
6.  Select **Purge**.

{{<Aside type="note" header="API">}}

You can purge using cache-tags via the Cloudflare API. For more information, refer to the [API documentation](/api/operations/zone-purge). You can purge up to 30 cache-tags per API call and up to 250,000 cache-tags per a 24-hour period.

{{</Aside>}}

## ​Purge cache by Hostname (Enterprise only)

Purging by hostname means that all assets at URLs with a host that matches one of the provided values will be purged from the cache.

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2.  Select **Caching** > **Configuration**.
3.  Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
4.  Under **Purge by**, select **Hostname**.
5.  Follow the syntax instructions.
    - One hostname per line.
    - Separated by commas.
    - You can purge up to 30 hostnames at a time.
6.  Enter the appropriate value(s) in the text field using the format shown in the example.
7.  Select **Purge**.

{{<Aside type="note" header="API">}}

You can purge hostnames via the Cloudflare API. For more information, refer to the [API documentation](/api/operations/zone-purge). You can use up to 30 hostnames per API call and make up to 30,000 purge API calls in a 24-hour period.

{{</Aside>}}

## Purge cache by prefix (Enterprise only)

Enterprise customers can purge their cache by URL prefix or path separators in their URL. For an example URL like `https://www.example.com/foo/bar/baz/qux.jpg`, valid purge requests include:

- `www.example.com/`
- `www.example.com/foo/`
- `www.example.com/foo/bar/`
- `www.example.com/foo/bar/baz/`
- `www.example.com/foo/bar/baz/qux.jpg`

Purging by prefix is useful in different scenarios, such as:

- Purging everything within a directory
- Increasing control over cached objects in a path
- Simplifying the number of purge calls sent

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2.  Select the appropriate domain.
3.  Select **Caching** > **Configuration**.
4.  Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
5.  Under **Purge by**, select **Prefix**.
6.  Follow the syntax instructions.
    - One prefix per line.
    - Maximum 30 prefixes per API call.
7.  Enter the appropriate value(s) in the text field using the format shown in the example.
8.  Select **Purge**.

{{<Aside type="note" header="API">}}

You can purge prefixes via the Cloudflare API. For more information, refer to the [API documentation](/api/operations/zone-purge). You can use up to 30 prefixes per API call and make up to 30,000 purge API calls in a 24-hour period.

{{</Aside>}}

### Limitations

There are several limitations regarding purge by prefix:

- Path separators are limited to 31 for a prefix `(example.com/a/b/c/d/e/f/g/h/i/j/k/l/m…)`.
- Purge requests are limited to 30 prefixes per request.
- [Purge rate-limits apply](/api/operations/zone-purge)
- URI query strings & fragments cannot purge by prefix:
  - `www.example.com/foo?a=b` (query string)
  - `www.example.com/foo#bar` (fragment)

{{<Aside type="warning" header="Warning">}}

Because purge by prefix purges a directory, any URI for a resource within the purged directory is purged regardless of query string or fragment (though fragments are not generally sent by browsers). Purge by prefix rules do not accept fragments and query strings.

Example: If you purge `foo.com/bar`, any asset that starts with `foo.com/bar` will be purged, for example, `foo.com/bar/baz`, `foo.com/bar?good=bad`, etc. and purging `foo.com/bar?good=bad` itself will not work.

{{</Aside>}}

### Purge by prefix normalization

Using purge by prefix normalization, when a purge by prefix request comes into Cloudflare for a normalized URL path, the purge service respects the [URL normalization](/rules/normalization/) and purges the normalized URL.

#### How does URL Normalization work

Take the following website as an example: `https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg`. The table below shows you how Cloudflare’s cache views these paths with [normalization on/off](/rules/normalization/).

<table>
  <tbody>
    <th colspan="5" rowspan="1">
      Request from visitor to EDGE
    </th>
    <th colspan="5" rowspan="1">
      What Cloudflare cache sees with Normalize Incoming URLs ON
    </th>
    <th colspan="5" rowspan="1">
      What Cloudflare cache sees with Normalize Incoming URLs OFF
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg</code> 
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/hello/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/hello/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/hello/img_1.jpg</code>
      </td>
    </tr>
  </tbody>
</table>

As shown above, with URL normalization **ON**, visitors to the two URLs, `https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg` and `https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg`, will be served the same cached asset. Purging `https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg` will purge that asset for both visitors.

## Purge cache key resources

Purge resources that use Cache Keys via the [Cloudflare API](https://api.cloudflare.com/#zone-purge-files-by-url). If you use [Cloudflare’s Purge by URL](https://api.cloudflare.com/#zone-purge-files-by-url), include the headers and query strings that are in your custom Cache Key. 

Currently, it is not possible to purge a URL stored through Cache API that uses a custom cache key set by a Worker. Instead, use a [custom key created by Page Rules](/cache/how-to/create-cache-keys/). Alternatively, purge your assets using purge everything, purge by tag, purge by host or purge by prefix.

To purge `device_type` or `geo,` use `CF-Device-Type` or `CF-IPCountry`. `lang` cannot currently be purged. [Purge by Tag / Host](/api/operations/zone-purge) & [Purge Everything](https://api.cloudflare.com/#zone-purge-all-files) are not impacted by the use of custom Cache Keys.

### Purge by device type

For a Cache Key based on device type, purge the asset by passing the `CF-Device-Type` header with the API purge request (valid headers include mobile, desktop, and tablet).

See the example API request below to purge all mobile assets on the root web page.

```bash
    curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache"
    -H "X-Auth-Email: user@example.com" -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
    -H "Content-Type: application/json" --data '{"files":[{"url":"http://my.website.com/","headers":{"CF-Device-Type":"mobile"}}]}'
```

### Purge by geo

Purge resources for a location-based Cache Key by specifying the two-letter country code. Spain is used in the example below.

```bash
    curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache"
    -H "X-Auth-Email: user@example.com"
    -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" -H "Content-Type: application/json" --data '{"files":[{"url":"http://my.website.com/", "headers":{"Cf-Ipcountry":"ES"}}]}'
```

## Purge varied images

Purging varied images purges all content variants for that URL. This behavior occurs so that if an image changes, you can easily update the cache with a single purge request instead of trying to determine the potential number of out-of-date variants. The behavior is true regardless of purge type used, such as single file, tag, or hostname.

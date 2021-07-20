---
title: Default cache behavior
order: 3
pcx-content-type: concept
---

# Default Cache Behavior

Cloudflare respects the origin web server’s cache headers in the following order unless an Edge Cache TTL page rule overrides the headers. 

- Cloudflare does not cache the resource if the `Cache-Control` header is set to `private`, `no-store`, `no-cache`, or `max-age=0` or if there is a cookie in the response.
- Cloudflare caches the resource in the following scenarios:
    - The `Cache-Control` header is set to `public` and the `max-age` is greater than 0.
    - The `Expires` header is set to a future date.
- If both the `max-age` and an `Expires` header are set, `max-age` is used.

For a list of directives and behaviors when Origin Cache-Control is enabled or disabled, see [Cache-Control directives](/about/cache-control#cache-control-directives).

## Default cached file extensions

Cloudflare only caches based on file extension and not by MIME type. The Cloudflare CDN does not cache HTML by default. Additionally, Cloudflare caches a website’s robot.txt.

<table>
  <tbody>
    <tr>
      <td colspan="5" rowspan="1">
        avif
      </td>
      <td colspan="5" rowspan="1">
        bmp
      </td>
      <td colspan="5" rowspan="1">
        ejs
      </td>
      <td colspan="5" rowspan="1">
        jpeg
      </td>
      <td colspan="5" rowspan="1">
        pdf
      </td>
      <td colspan="5" rowspan="1">
        ps
      </td>
      <td colspan="5" rowspan="1">
        ttf
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        class
      </td>
      <td colspan="5" rowspan="1">
        eot
      </td>
      <td colspan="5" rowspan="1">
        jpg
      </td>
      <td colspan="5" rowspan="1">
        pict
      </td>
      <td colspan="5" rowspan="1">
        svg
      </td>
      <td colspan="5" rowspan="1">
        webp
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        css
      </td>
      <td colspan="5" rowspan="1">
        eps
      </td>
      <td colspan="5" rowspan="1">
        js
      </td>
      <td colspan="5" rowspan="1">
        pls
      </td>
      <td colspan="5" rowspan="1">
        svgz
      </td>
      <td colspan="5" rowspan="1">
        woff
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        csv
      </td>
      <td colspan="5" rowspan="1">
        gif
      </td>
      <td colspan="5" rowspan="1">
        mid
      </td>
      <td colspan="5" rowspan="1">
        png
      </td>
      <td colspan="5" rowspan="1">
        swf
      </td>
      <td colspan="5" rowspan="1">
        woff2
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        doc
      </td>
      <td colspan="5" rowspan="1">
        ico
      </td>
      <td colspan="5" rowspan="1">
        midi
      </td>
      <td colspan="5" rowspan="1">
        ppt
      </td>
      <td colspan="5" rowspan="1">
        tif
      </td>
      <td colspan="5" rowspan="1">
        xls
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        docx
      </td>
      <td colspan="5" rowspan="1">
        jar
      </td>
      <td colspan="5" rowspan="1">
        otf
      </td>
      <td colspan="5" rowspan="1">
        pptx
      </td>
      <td colspan="5" rowspan="1">
        tiff
      </td>
      <td colspan="5" rowspan="1">
        xlsx
      </td>
    </tr>
  </tbody>
</table>

To cache additional content, see [Page Rules](/how-to/create-page-rules) to create a rule to cache everything.

## Customization options and limitations

Cloudflare’s CDN provides several cache customization options:
- Caching behavior for individual URLs via [Cloudflare Page Rules](/how-to/create-page-rules)
- Customize caching with [Cloudflare Workers](https://developers.cloudflare.com/workers/learning/how-the-cache-works)
- Adjust caching level, cache TTL, and more via the Cloudflare Caching app

Cloudflare limits the upload size (HTTP POST request size) per plan type:

- 100MB Free and Pro
- 200MB Business
- 500MB Enterprise by default. Contact [Customer Support](https://support.cloudflare.com/hc/articles/200172476) to request a limit increase.

If you require a larger upload, group requests smaller than the upload thresholds or upload the full resource through an [unproxied (grey-clouded) DNS record](https://support.cloudflare.com/hc/en-us/articles/200169626).

## Cloudflare cache responses

The output of the `CF-Cache-Status header` shows whether or not a resource is cached. To investigate cache responses returned by the `CF-Cache-Status` header, use services like [Redbot](https://redbot.org/), [webpagetest.org](http://www.webpagetest.org/), or a visual tool like [Chrome’s Dr. Flare plugin](https://community.cloudflare.com/t/community-tip-dr-flare-debug-tool-for-cloudflare-chrome-extension/110166).

<table>
  <tbody>
    <th colspan="4" rowspan="1">
      Status
    </th>
    <th colspan="4" rowspan="1">
      Description
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        HIT
      </td>
      <td colspan="5" rowspan="1">
        The resource was found in Cloudflare’s cache.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        MISS
      </td>
      <td colspan="5" rowspan="1">
        The resource was not found in Cloudflare’s cache and was served from the origin web server.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        NONE
      </td>
      <td colspan="5" rowspan="1">
        Cloudflare generated response. The resource is not eligible for caching.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        EXPIRED
      </td>
      <td colspan="5" rowspan="1">
        The resource was found in Cloudflare’s cache but was expired and served from the origin web server.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        STALE
      </td>
      <td colspan="5" rowspan="1">
        The resource was served from Cloudflare’s cache but was expired. Cloudflare could not contact the origin to retrieve an updated resource.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        BYPASS
      </td>
      <td colspan="5" rowspan="1">
        The origin server instructed Cloudflare to bypass cache via a Cache-Control header set to <code>no-cache</code>, <code>private</code>, or <code>max-age=0</code> even though Cloudflare originally preferred to cache the asset. BYPASS is returned when enabling <a href="/about/cache-control">Origin Cache-Control</a>. Cloudflare also sets BYPASS when your origin web server sends cookies in the response header.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        REVALIDATED
      </td>
      <td colspan="5" rowspan="1">
        The resource is served from Cloudflare’s cache but is stale. The resource was revalidated by either an <code>If-Modified-Since</code> header or an <code>If-None-Match header</code>.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        UPDATING
      </td>
      <td colspan="5" rowspan="1">
        The resource was served from Cloudflare’s cache and was expired, but the origin web server is updating the resource. UPDATING is typically only seen for very popular cached resources.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        DYNAMIC
      </td>
      <td colspan="5" rowspan="1">
        Cloudflare does not consider the asset eligible to cache and your Cloudflare settings do not explicitly instruct Cloudflare to cache the asset.  Instead, the asset was requested from the origin web server. Use <a href="/how-to/create-page-rules">Page Rules</a> to implement custom caching options.
      </td>
    </tr>
  </tbody>
</table>

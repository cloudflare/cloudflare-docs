---
title: Default cache behavior
order: 5
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
        AVIF
      </td>
      <td colspan="5" rowspan="1">
        BMP
      </td>
      <td colspan="5" rowspan="1">
        EJS
      </td>
      <td colspan="5" rowspan="1">
        JPEG
      </td>
      <td colspan="5" rowspan="1">
        PDF
      </td>
      <td colspan="5" rowspan="1">
        PS
      </td>
      <td colspan="5" rowspan="1">
        TTF
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        CLASS
      </td>
      <td colspan="5" rowspan="1">
        EOT
      </td>
      <td colspan="5" rowspan="1">
        JPG
      </td>
      <td colspan="5" rowspan="1">
        PICT
      </td>
      <td colspan="5" rowspan="1">
        SVG
      </td>
      <td colspan="5" rowspan="1">
        WEBP
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        CSS
      </td>
      <td colspan="5" rowspan="1">
        EPS
      </td>
      <td colspan="5" rowspan="1">
        JS
      </td>
      <td colspan="5" rowspan="1">
        PLS
      </td>
      <td colspan="5" rowspan="1">
        SVGZ
      </td>
      <td colspan="5" rowspan="1">
        WOFF
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        CSV
      </td>
      <td colspan="5" rowspan="1">
        GIF
      </td>
      <td colspan="5" rowspan="1">
        MID
      </td>
      <td colspan="5" rowspan="1">
        PNG
      </td>
      <td colspan="5" rowspan="1">
        SWF
      </td>
      <td colspan="5" rowspan="1">
        WOFF2
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        DOC
      </td>
      <td colspan="5" rowspan="1">
        ICO
      </td>
      <td colspan="5" rowspan="1">
        MIDI
      </td>
      <td colspan="5" rowspan="1">
        PPT
      </td>
      <td colspan="5" rowspan="1">
        TIF
      </td>
      <td colspan="5" rowspan="1">
        XLS
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        DOCX
      </td>
      <td colspan="5" rowspan="1">
        JAR
      </td>
      <td colspan="5" rowspan="1">
        OTF
      </td>
      <td colspan="5" rowspan="1">
        PPTX
      </td>
      <td colspan="5" rowspan="1">
        TIFF
      </td>
      <td colspan="5" rowspan="1">
        XLSX
      </td>
    </tr>
  </tbody>
</table>

<Aside type="note" header="Note">

The Free plan additionally supports APK, EXE, DMG, BIN, ISO, ZIP, RAR, ZST, TAR, BZ2, 7z, GZ, MP4, MKV, AVI, WEBM, MP3, OGG, and FLAC file extensions. 

</Aside>

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

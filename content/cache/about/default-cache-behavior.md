---
title: Default cache behavior
pcx_content_type: concept
meta:
  title: Default Cache Behavior
---

# Default Cache Behavior

Cloudflare respects the origin web server’s cache headers in the following order unless an Edge Cache TTL page rule overrides the headers.

- Cloudflare **does not** cache the resource when:
  - The `Cache-Control` header is set to `private`, `no-store`, `no-cache`, or `max-age=0`.
  - The `Set-Cookie` header exists, or there is a cookie in the response.
- Cloudflare **does** cache the resource when:
  - The `Cache-Control` header is set to `public` and `max-age` is greater than 0.
  - The `Expires` header is set to a future date.

Note: If both `max-age` and an `Expires` header are set, `max-age` will be used by Cloudflare.

For a list of directives and behaviors when Origin Cache-Control is enabled or disabled, see [Cache-Control directives](/cache/about/cache-control/#cache-control-directives).

## Default cached file extensions

Cloudflare only caches based on file extension and not by MIME type. The Cloudflare CDN does not cache HTML by default. Additionally, Cloudflare caches a website’s robots.txt.

|       |      |      |      |      |       |     |
| ----- | ---- | ---- | ---- | ---- | ----- | --- |
| 7Z    | CSV  | GIF  | MIDI | PNG  | TIF   | ZIP |
| AVI   | DOC  | GZ   | MKV  | PPT  | TIFF  | ZST |
| AVIF  | DOCX | ICO  | MP3  | PPTX | TTF   |
| APK   | DMG  | ISO  | MP4  | PS   | WEBM  |
| BIN   | EJS  | JAR  | OGG  | RAR  | WEBP  |
| BMP   | EOT  | JPG  | OTF  | SVG  | WOFF  |
| BZ2   | EPS  | JPEG | PDF  | SVGZ | WOFF2 |
| CLASS | EXE  | JS   | PICT | SWF  | XLS   |
| CSS   | FLAC | MID  | PLS  | TAR  | XLSX  |

To cache additional content, see [Page Rules](/cache/how-to/create-page-rules/) to create a rule to cache everything.

## Customization options and limitations

Cloudflare’s CDN provides several cache customization options:

- Caching behavior for individual URLs via [Cloudflare Page Rules](/cache/how-to/create-page-rules/)
- Customize caching with [Cloudflare Workers](/workers/learning/how-the-cache-works/)
- Adjust caching level, cache TTL, and more via the Cloudflare Caching app

Cloudflare limits the upload size (HTTP POST request size) per plan type:

- 100MB Free and Pro
- 200MB Business
- 500MB Enterprise by default. Contact [Customer Support](https://support.cloudflare.com/hc/articles/200172476) to request a limit increase.

If you require a larger upload, group requests smaller than the upload thresholds or upload the full resource through an [unproxied (grey-clouded) DNS record](/dns/manage-dns-records/reference/proxied-dns-records/).

Cloudflare cacheable file limits:

- Free, Pro and Business customers have a limit of 512 MB.
- For Enterprise customers the default maximum cacheable file size is 5 GB. Contact your account team to request a limit increase.

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
        The resource was found in Cloudflare’s cache but was expired and served from the origin web
        server.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        STALE
      </td>
      <td colspan="5" rowspan="1">
        The resource was served from Cloudflare’s cache but was expired. Cloudflare could not
        contact the origin to retrieve an updated resource.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        BYPASS
      </td>
      <td colspan="5" rowspan="1">
        The origin server instructed Cloudflare to bypass cache via a Cache-Control header set to <code>no-cache</code>,<code>private</code>, or <code>max-age=0</code> even though
        Cloudflare originally preferred to cache the asset. BYPASS is returned when enabling <a href="/cache/about/cache-control/">Origin Cache-Control</a>. Cloudflare also sets BYPASS when
        your origin web server sends cookies in the response header.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        REVALIDATED
      </td>
      <td colspan="5" rowspan="1">
        The resource is served from Cloudflare’s cache but is stale. The resource was revalidated by
        either an <code>If-Modified-Since</code> header or an <code>If-None-Match header</code>.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        UPDATING
      </td>
      <td colspan="5" rowspan="1">
        The resource was served from Cloudflare’s cache and was expired, but the origin web server
        is updating the resource. UPDATING is typically only seen for very popular cached resources.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        DYNAMIC
      </td>
      <td colspan="5" rowspan="1">
        Cloudflare does not consider the asset eligible to cache and your Cloudflare settings do not
        explicitly instruct Cloudflare to cache the asset. Instead, the asset was requested from the
        origin web server. Use <a href="/cache/how-to/create-page-rules/">Page Rules</a> to implement
        custom caching options.
      </td>
    </tr>
  </tbody>
</table>

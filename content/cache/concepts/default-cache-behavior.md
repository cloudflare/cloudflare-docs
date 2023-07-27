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
  - The [`Set-Cookie` header](/cache/concepts/cache-behavior/#interaction-of-set-cookie-response-header-with-cache) exists.
- Cloudflare **does** cache the resource when:
  - The `Cache-Control` header is set to `public` and `max-age` is greater than 0. Note that Cloudflare does cache the resource even if there is no `Cache-Control` header based on [status codes](/cache/how-to/configure-cache-status-code/#edge-ttl). 
  - The `Expires` header is set to a future date.

Note: If both `max-age` and an `Expires` header are set, `max-age` will be used by Cloudflare.

For a list of directives and behaviors when Origin Cache-Control is enabled or disabled, refer to [Cache-Control directives](/cache/concepts/cache-control/#cache-control-directives).

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

To cache additional content, refer to [Page Rules](/cache/how-to/edge-browser-cache-ttl/create-page-rules/) to create a rule to cache everything.

## Customization options and limitations

Cloudflare’s CDN provides several cache customization options:

- Caching behavior for individual URLs via [Cloudflare Page Rules](/cache/how-to/edge-browser-cache-ttl/create-page-rules/)
- Customize caching with [Cloudflare Workers](/workers/learning/how-the-cache-works/)
- Adjust caching level, cache TTL, and more via the Cloudflare Caching app

Cloudflare limits the upload size (HTTP POST request size) per plan type:

- 100MB Free and Pro
- 200MB Business
- 500MB Enterprise by default. Contact [Customer Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) to request a limit increase.

If you require a larger upload, group requests smaller than the upload thresholds or upload the full resource through an [unproxied (grey-clouded) DNS record](/dns/manage-dns-records/reference/proxied-dns-records/).

Cloudflare cacheable file limits:

- Free, Pro and Business customers have a limit of 512 MB.
- For Enterprise customers the default maximum cacheable file size is 5 GB. Contact your account team to request a limit increase.

## Cloudflare cache responses

The output of the `CF-Cache-Status` header shows whether or not a resource is cached. To investigate cache responses returned by the `CF-Cache-Status` header, use services like [Redbot](https://redbot.org/), [webpagetest.org](http://www.webpagetest.org/), or a visual tool like [Chrome’s Dr. Flare plugin](https://community.cloudflare.com/t/community-tip-dr-flare-debug-tool-for-cloudflare-chrome-extension/110166).

{{<table-wrap>}}
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
        NONE/UNKNOWN
      </td>
      <td colspan="5" rowspan="1">
        Cloudflare generated a response that denotes the asset is not eligible for caching. This may have happened because:
          <li>A Worker generated a response without sending any subrequests. In this case, the response did not come from cache, so the cache status will be <code>none/unknown</code>.
          <li>A Worker request made a subrequest (<code>fetch</code>). In this case, the subrequest will be logged with a cache status, while the main request will be logged with <code>none/unknown</code> status (the main request did not hit cache, since Workers sits in front of cache).</li>
          <li>A Firewall rule was triggered to block a request. The response will come from the edge network before it hits cache. Since there is no cache status, Cloudflare will log as <code>none/unknown</code>.</li>
          <li>A redirect page rule caused the edge network to respond with a redirect to another asset/URL. This redirect response happens before the request reaches cache, so the cache status is <code>none/unknown</code>.</li>
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
        Cloudflare originally preferred to cache the asset. BYPASS is returned when enabling <a href="/cache/concepts/cache-control/">Origin Cache-Control</a>. Cloudflare also sets BYPASS when
        your origin web server sends cookies in the response header. If the Request to your origin includes an `Authorization` header, its response will be also BYPASS.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        REVALIDATED
      </td>
      <td colspan="5" rowspan="1">
        The resource is served from Cloudflare’s cache but is stale. The resource was revalidated by
        either an <code>If-Modified-Since</code> header or an <code>If-None-Match</code> header.
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
        origin web server. Use <a href="/cache/how-to/edge-browser-cache-ttl/create-page-rules/">Page Rules</a> or <a href="/cache/how-to/cache-rules/">Cache Rules</a> to implement
        custom caching options.
      </td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}

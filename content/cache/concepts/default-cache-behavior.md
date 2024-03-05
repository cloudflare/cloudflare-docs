---
title: Default cache behavior
pcx_content_type: concept
meta:
  title: Default Cache Behavior
---

# Default Cache Behavior

Cloudflare respects the origin web server’s cache headers in the following order unless an Edge Cache TTL cache rule overrides the headers.

{{<Aside type="warning">}}Page Rules will be deprecated, and you should instead use [Cache Rules](/cache/how-to/cache-rules/).{{</Aside>}}

- Cloudflare **does not** cache the resource when:
  - The `Cache-Control` header is set to `private`, `no-store`, `no-cache`, or `max-age=0`.
  - The [`Set-Cookie` header](/cache/concepts/cache-behavior/#interaction-of-set-cookie-response-header-with-cache) exists.
- Cloudflare **does** cache the resource when:
  - The `Cache-Control` header is set to `public` and `max-age` is greater than 0.
  - The `Expires` header is set to a future date.

{{<Aside type="note">}}Cloudflare does cache the resource even if there is no `Cache-Control` header based on [status codes](/cache/how-to/configure-cache-status-code/#edge-ttl).{{</Aside>}}

{{<Aside type="note">}}If both `max-age` and an `Expires` header are set, `max-age` will be used by Cloudflare.{{</Aside>}}

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

To cache additional content, refer to [Cache Rules](/cache/how-to/cache-rules/) to create a rule to cache everything.

## Customization options and limits

Cloudflare’s CDN provides several cache customization options:

- Caching behavior for individual URLs via [Cache Rules](/cache/how-to/cache-rules/)
- Customize caching with [Cloudflare Workers](/workers/reference/how-the-cache-works/)
- Adjust caching level, cache TTL, and more via the Cloudflare Caching app

### Upload limits

{{<feature-table id="network.max_upload_size">}}

If you require a larger upload, group requests smaller than the upload thresholds or upload the full resource through an [unproxied (grey-clouded) DNS record](/dns/manage-dns-records/reference/proxied-dns-records/).

### Cacheable size limits

Cloudflare cacheable file limits:

- Free, Pro and Business customers have a limit of 512 MB.
- For Enterprise customers the default maximum cacheable file size is 5 GB. Contact your account team to request a limit increase.
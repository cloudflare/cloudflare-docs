---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4412024022029-Troubleshoot-Image-Resizing-problems
title: Troubleshoot Image Resizing problems
---

# Troubleshoot Image Resizing problems



## Requests without resizing enabled

Does the response have a `Cf-Resized` header? **If not**, then resizing has not been attempted. Possible causes:

-   Image Resizing feature is not enabled in the Cloudflare Dashboard.
-   There is another Worker running on the same request. Resizing is "forgotten" as soon as one Worker calls another. Do not use Workers scoped to the entire domain `/*`.
-   Preview in the Editor in Cloudflare Dashboard does not simulate image resizing. You must deploy the Worker and test from another browser tab instead.

___

## Error responses from resizing

When resizing fails, the response body contains an error message explaining the reason, as well as the `Cf-Resize`d header containing `err=code`:

-   9401 — Missing or invalid required arguments in `{cf:image{…}}` options, for example `width` is not a number.
-   9402 — Download of the original image failed, for example because the image was too large or the connection was interrupted.
-   9403 — [Request loop](/images/image-resizing/resize-with-workers#prevent-request-loops). The service was asked to resize an already-resized image, or the Worker has fetched its own URL.
-   9406 & 9419 — Invalid image URL specified (for example, contains spaces, unescaped Unicode, or non-HTTP/S URL).
-   9407 — Origin domain name lookup error.
-   9404 — Origin returned 404 HTTP status code. The image does not exist on the origin server, or a wrong URL was given to resize.
-   9408 — Origin returned 4xx HTTP status code. The origin server may be denying access to the image.
-   9509 — Origin returned 5xx HTTP status code. This is most likely a problem with the origin server-side software, not image resizing.
-   9412 — Origin returned a non-image, for example an HTML page. This usually happens when an invalid URL is specified, or server-side software has printed an error, or presented a login page.
-   9413 — The image is too large (exceeds 10,000 pixels width or height).
-   9420 — Origin server redirected to an invalid URL.
-   9421 — Origin redirected too many times.
-   9504, 9505 & 9510 — Unable to contact origin. The origin server may be down or overloaded.
-   9524 — `/cdn-cgi/image/` resizing service could not perform resizing, probably because the image URL was intercepted by a Worker.
-   9511 — Image format not supported.
-   9522 — Exceeded processing limit. This may happen briefly after purging an entire zone or when requesting files with huge dimensions. If the problem persists, please contact support.
-   9424, 9516, 9517, 9518 & 9523 — Internal errors. Please contact support if you encounter these errors.

___

## Limits

Maximum image size is 100 megapixels (e.g. 10.000×10.000 pixels large). Maximum file size is 70 MB. GIF animations are limited to 100 megapixels total (sum of sizes of all frames).

___

## Authorization and cookies are not supported

Image requests to the origin will be anonymized (no cookies, no auth, no custom headers). This is because we have to have one public cache for resized images, and it would be unsafe to share images that are personalized for individual visitors.

However, in cases where customers agree to store such images in public cache, Cloudflare supports resizing images through Workers [on authenticated origins](/images/image-resizing/control-origin-access#authenticated-origin).

___

## Caching and purging

Changes to image dimensions or other resizing options always take effect immediately — no purging necessary.

Image requests consists of two parts: running Worker code, and image processing. The Worker code is always executed and uncached. Results of image processing are cached for one hour or longer if origin server's `Cache-Control` header allows. Source image is cached using regular caching rules. Resizing follows redirects internally, so the redirects are cached too.

Because responses from Workers themselves are not cached at the edge, purging of _Worker URLs_ does nothing. Resized image variants are cached together under their source’s URL. When purging, use the (full-size) source image’s URL, rather than URLs of the Worker that requested resizing.

If the origin server sends an `Etag` HTTP header, the resized images will have an `Etag` HTTP header that has a format `cf-<gibberish>:<etag of the original image>`. You can compare the second part with the `Etag` header of the source image URL to check if the resized image is up to date.

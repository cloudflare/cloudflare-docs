---
order: 6
---

# Troubleshooting

## Requests without resizing enabled

Does the response have a `Cf-Resized` header? If **not**, then resizing has not been attempted. Possible causes:

  * There’s another Worker running on the same request. Resizing is "forgotten" as soon as one Worker calls another. Don’t use Workers scoped to the entire domain `/*`.
  * Preview in the Editor in the Dashboard is does not simulate image resizing. You must deploy the Worker and test from another browser tab instead.

## Error responses from resizing

When resizing fails, the response body contains an error message explaining the reason, as well as the `Cf-Resized` header containing `err=code`:

* 9401 — Missing or invalid required arguments in `{cf:image{…}}` options, e.g. `width` is not a number.
* 9402 — Download of the original image failed, e.g. because the image was too large or the connection was interrupted.
* 9403 — [Request loop](/resizing-with-workers#preventing-request-loops). The service was asked to resize an already-resized image, or the Worker has fetched its own URL.
* 9406 & 9419 — Invalid image URL specified (e.g. contains spaces, unescaped Unicode, or non-HTTP/S URL).
* 9407 — Origin domain name lookup error.
* 9404 — Origin returned 404 HTTP status code. The image doesn’t exist on the origin server, or a wrong URL was given to resize.
* 9408 — Origin returned 4xx HTTP status code. The origin server may be denying access to the image.
* 9509 — Origin returned 5xx HTTP status code. This is most likely a problem with the origin server-side software, not image resizing.
* 9412 — Origin returned a non-image, e.g. a HTML page. This usually happens when an invalid URL is specified, or server-side software has printed an error, or presented a login page.
* 9413 — The image is too large (exceeds 10000 pixels width or height)
* 9420 — Origin server redirected to an invalid URL.
* 9421 — Origin redirected too many times.
* 9504, 9505 & 9510 — Unable to contact origin. The origin server may be down or overloaded.
* 9524 — `/cdn-cgi/image/` resizing service could not perform resizing, probably because the image URL was intercepted by a Worker.
* 9511 — Image format not supported.
* 9424, 9516, 9517, 9518, 9522 & 9523 — Internal errors. Please contact support if you encounter these errors.

## Authorization and cookies are not supported

Image requests to the origin will be anonymized (no cookies, no auth, no custom headers). This is because we have to have one public cache for resized images, and it would be unsafe to share images that are personalized for individual visitors.

You can use unguessable URLs for images (e.g. with long random IDs) and/or handle cookie-based authentication in a Worker that manages image resizing.

## Purging

Changes to image dimensions or other resizing options should always take effect immediately — no purging necessary.

Responses from Workers are not cached, so purging of *Worker URLs* doesn’t do anything. Resized image variants are cached together under their source’s URL. When purging, use the (full-size) source image’s URL, rather than URLs of the Worker that did resizing.

If the origin server sends an `Etag` HTTP header, the resized images will have an `Etag` HTTP header that has a format `cf-<gibberish>:<etag of original image>`. You can compare the second part with the `Etag` header of the source image URL to check if the resized image is up to date.

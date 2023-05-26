---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4412024022029-Troubleshoot-Image-Resizing-problems
title: Troubleshooting
meta:
    title: Troubleshooting | Image Resizing
weight: 10
---

# Troubleshooting Image Resizing


## Requests without resizing enabled

Does the response have a `Cf-Resized` header? If not, then resizing has not been attempted. Possible causes:

-   Image Resizing feature is not enabled in the Cloudflare Dashboard.
-   There is another Worker running on the same request. Resizing is "forgotten" as soon as one Worker calls another. Do not use Workers scoped to the entire domain `/*`.
-   Preview in the Editor in Cloudflare Dashboard does not simulate image resizing. You must deploy the Worker and test from another browser tab instead.

___

## Error responses from resizing

When resizing fails, the response body contains an error message explaining the reason, as well as the `Cf-Resized` header containing `err=code`:

-  9401 — The required arguments in `{cf:image{…}}` options are missing or are invalid. Try again. Refer to [Fetch options](/images/image-resizing/resize-with-workers/#fetch-options) for supported arguments.
-  9402 — The image was too large or the connection was interrupted. Refer to [Supported formats and limitations](/images/image-resizing/format-limitations/) for more information.
-  9403 — A [request loop](/images/image-resizing/resize-with-workers/#prevent-request-loops) occurred because the image was already resized or the Worker fetched its own URL. Verify your Worker path and image path on the server do not overlap.
-  9406 & 9419 — The image URL is a non-HTTPS URL or the URL has spaces or unescaped Unicode. Check your URL and try again.
-  9407 — A lookup error occured with the origin server's domain name. Check your DNS settings and try again.
-  9404 — The image does not exist on the origin server or the URL used to resize the image is wrong. Verify the image exists and check the URL.
-  9408 — The origin server returned an HTTP 4xx status code and may be denying access to the image. Confirm your image settings and try again.
-  9509 — The origin server returned an HTTP 5xx status code. This is most likely a problem with the origin server-side software, not Image Resizing.
-  9412 — The origin server returned a non-image, for example, an HTML page. This usually happens when an invalid URL is specified or server-side software has printed an error or presented a login page.
-  9413 — The image exceeds the maximum image area of 100 megapixels. Use a smaller image and try again.
-  9420 — The origin server redirected to an invalid URL. Confirm settings at your origin and try again.
-  9421 — The origin server redirected too many times. Confirm settings at your origin and try again.
-  9504, 9505, & 9510 — The origin server could not be contacted because the origin server may be down or overloaded. Try again later.
-  9524 — The `/cdn-cgi/image/` resizing service could not perform resizing. This may happen when an image URL is intercepted by a Worker. Check your Workers and try again.
-  9511 — The image format is not supported. Refer to [Supported formats and limitations](/images/image-resizing/format-limitations/) to learn about supported input and output formats.
-  9522 — The image exceeded the processing limit. This may happen briefly after purging an entire zone or when files with very large dimensions are requested. If the problem persists, contact support.
-  9424, 9516, 9517, 9518, 9522 & 9523 — Internal errors. Please contact support if you encounter these errors.

___

## Limits

Maximum image size is 100 megapixels (meaning 10.000×10.000 pixels large). Maximum file size is 70 MB. GIF animations are limited to 100 megapixels total (sum of sizes of all frames).

___

## Authorization and cookies are not supported

Image requests to the origin will be anonymized (no cookies, no auth, no custom headers). This is because we have to have one public cache for resized images, and it would be unsafe to share images that are personalized for individual visitors.

However, in cases where customers agree to store such images in public cache, Cloudflare supports resizing images through Workers [on authenticated origins](/images/image-resizing/control-origin-access/#authenticated-origin).

___

## Caching and purging

Changes to image dimensions or other resizing options always take effect immediately — no purging necessary.

Image requests consists of two parts: running Worker code, and image processing. The Worker code is always executed and uncached. Results of image processing are cached for one hour or longer if origin server's `Cache-Control` header allows. Source image is cached using regular caching rules. Resizing follows redirects internally, so the redirects are cached too.

Because responses from Workers themselves are not cached at the edge, purging of _Worker URLs_ does nothing. Resized image variants are cached together under their source’s URL. When purging, use the (full-size) source image’s URL, rather than URLs of the Worker that requested resizing.

If the origin server sends an `Etag` HTTP header, the resized images will have an `Etag` HTTP header that has a format `cf-<gibberish>:<etag of the original image>`. You can compare the second part with the `Etag` header of the source image URL to check if the resized image is up to date.

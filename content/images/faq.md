---
order: 4
pcx-content-type: faq
---

# FAQ

Below you will find answers to our most commonly asked questions regarding Cloudflare Image Optimization, namely the differences between Cloudflare Images. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) for possible solutions to your query.

*   [Cloudflare Images](#cloudflare-images-faq)
*   [Cloudflare Image Resizing](#cloudflare-image-resizing-faq)
*   [Polish](#polish-faq)

## Cloudflare Images FAQ

### What is the difference between Cloudflare Images and Image Resizing products?

Cloudflare Images (CI) is an end-to-end solution that offers storage, resizing, optimization, and delivery; Image Resizing (IR) only offers resizing and optimization:

<details>
<summary>Storage</summary>
<div>

**CI** - Images are stored at Cloudflare.

**IR** - Images can be stored anywhere on the Internet as long as they have public access.

</div>
</details>

<details>
<summary>Billing</summary>
<div>

**CI** - Cloudflare charges by images served (regardless of them being cached or not), and images stored.

**IR** - Cloudflare charges when there are cache misses.

</div>
</details>

<details>
<summary>Delivery</summary>
<div>

**CI** - Images are served from `imagedelivery.net`.

**IR** - Images are served from one of your domains on Cloudflare.

</div>
</details>

<details>
<summary>Available optimizations</summary>
<div>

**CI** - For more information on Cloudflare Images optimizations refer to [Resize images](/cloudflare-images/resize-images).

**IR** - For more information on Image Resizing optimizations refer to [URL format options](/image-resizing/url-format#options).

</div>
</details>

<details>
<summary>Plan availability</summary>
<div>

**CI** - Available to any plan.

**IR** - Available with Pro, Business, and Enterprise plans.

</div>
</details>

### How much does Cloudflare Images cost?

Refer to [Cloudflare Images](https://www.cloudflare.com/products/cloudflare-images/) for up-to-date information on pricing.

### Do I get charged for creating and storing variants?

No, you only get billed for the number of original images. There is no extra cost for generating variants. You can configure up to 20 variants.

### Is there a limit on the file size for uploaded images?

Yes, the uploaded image file must be less than or equal to 10 MB.

### Which file formats does Cloudflare Images support?

Cloudflare Images supports common web-compatible file formats as input files: JPEG, PNG, GIF (including animations), and WebP.

### Can Cloudflare Images convert my images to AVIF or WebP?

Yes. Based on the `Accept` HTTP request header Cloudflare Images will be served in AVIF or WebP format. The transformation of an image to AVIF is compute-intensive but leads to a significant benefit in file-size. We are always weighing cost and benefit when deciding on which format to serve.

***

## Cloudflare Image Resizing FAQ

### How much does Cloudflare Image Resizing cost?

Refer to our [Plans](https://www.cloudflare.com/plans/) page for up-to-date information on pricing.

### Is there a limit on image size or file size for Image Resizing?

Yes. Maximum image size is 100 megapixels (for example, 10,000×10,000 pixels large). Maximum file size is 70 MB. GIF animations are limited to 100 megapixels total (sum of sizes of all frames).

### Resizing failed and I received an error response with a code. What does it mean?

Refer to [Troubleshoot Image Resizing problems](https://support.cloudflare.com/hc/articles/4412024022029) for more information on how to troubleshoot some of the more common issues, including error responses.

### Why does upscaling a PNG with Workers increase its file size?

This is expected behaviour when upscaling a PNG file with transparency, due to the limitations of this file format. To make sure you do not end up with a file size much bigger than the original one:

*   **Avoid adding transparent areas to images**. Image Resizing supports a background option that makes images opaque, which allows Image Resizing to convert images to JPEG. In turn, this creates images with much smaller files.
*   **Do not use upscaling**. Keep the default `fit=scale-down` mode which never resizes images to bigger dimensions. This will prevent increases in file sizes. In most cases, this does not affect the presentation of images on the website, as they can be upscaled using CSS/HTML. As a rule, scaling down should be a server-side operation, and scaling up should a client-side operation.
*   **Implement support for format negotiation**. AVIF and WebP formats support transparency, which makes them better suited for images with transparency. To choose the best format automatically, our `/cdn-cgi/` image Worker supports `format=auto`, but custom Workers need to ask for formats themselves. Refer to our [example worker](https://developers.cloudflare.com/images/image-resizing/resize-with-workers#an-example-worker) to learn how to check the `Accept` header.

***

## Polish FAQ

### How can I troubleshoot common `Cf-Polished` statuses?

Refer to the [Troubleshoot common Cf-Polished statuses](https://support.cloudflare.com/hc/articles/4412244347917) page were you can find a list of common `Cf-Polished` statuses and how to troubleshoot them.

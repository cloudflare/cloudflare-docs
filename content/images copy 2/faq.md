---
pcx_content_type: faq
title: FAQ
weight: 5
---

# FAQ

Below you will find answers to our most commonly asked questions regarding Cloudflare Image Optimization, namely the differences between Cloudflare Images and Image Resizing. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) to explore more resources.

- [Cloudflare Images](#cloudflare-images-faq)
- [Cloudflare Image Resizing](#cloudflare-image-resizing-faq)
- [Polish](#polish-faq)

## Cloudflare Images FAQ

### What is the difference between Cloudflare Images and Image Resizing products?

Cloudflare Images is an end-to-end solution that offers storage, resizing, optimization, and delivery; Image Resizing only offers resizing and optimization:

<details>
<summary>Storage</summary>
<div>

**Cloudflare Images** - Images are stored at Cloudflare.

**Image Resizing** - Images can be stored anywhere on the Internet as long as they have public access.

</div>
</details>

<details>
<summary>Billing</summary>
<div>

**Cloudflare Images** - Cloudflare charges by images served (regardless of them being cached or not), and images stored.

**Image Resizing** - Cloudflare charges when there are cache misses, and for some [request errors](#are-image-resizing-errors-billed).

</div>
</details>

<details>
<summary>Delivery</summary>
<div>

**Cloudflare Images** - Images are served from `imagedelivery.net`.

**Image Resizing** - Images are served from one of your domains on Cloudflare.

</div>
</details>

<details>
<summary>Available optimizations</summary>
<div>

**Cloudflare Images** - For more information on Cloudflare Images optimizations refer to [Edit images](/images/cloudflare-images/transform/).

**Image Resizing** - For more information on Image Resizing optimizations refer to [URL format options](/images/image-resizing/url-format/#options).

</div>
</details>

<details>
<summary>Plan availability</summary>
<div>

**Cloudflare Images** - Available to any plan.

**Image Resizing** - Available with Pro, Business, and Enterprise plans.

</div>
</details>

### How much does Cloudflare Images cost?

Refer to [Cloudflare Images](https://www.cloudflare.com/products/cloudflare-images/) for up-to-date information on pricing.

### Do I get charged for creating and storing variants?

No, you only get billed for the number of original images. There is no extra cost for generating variants. You can configure up to 100 variants.

### Is there a limit on the file size for uploaded images?

Refer to [Supported image formats](/images/cloudflare-images/upload-images/formats-limitations/) for more information.

### Which file formats does Cloudflare Images support?

Refer to [Supported image formats](/images/cloudflare-images/upload-images/formats-limitations/) for more information.

### Can Cloudflare Images convert my images to AVIF or WebP?

Yes. Based on the `Accept` HTTP request header Cloudflare Images will be served in AVIF or WebP format. The transformation of an image to AVIF is compute-intensive but leads to a significant benefit in file-size. We are always weighing cost and benefit when deciding on which format to serve.

### Can Cloudflare Images use the HEIC (HEIF) format?

No. Cloudflare has no plans to support HEIC. This format is based on a patent-encumbered codec, and it is not supported in any browser. Cloudflare can serve images in the AVIF format, which is a version of HEIF with a newer, royalty-free AV1 codec.

---

## Cloudflare Image Resizing FAQ

### How much does Cloudflare Image Resizing cost?

Refer to our [Plans](https://www.cloudflare.com/plans/) page for up-to-date information on pricing.

### Is there a limit on image size or file size for Image Resizing?

Refer to [Supported formats and limitations](/images/image-resizing/format-limitations/) for more information.

### Resizing failed and I received an error response with a code. What does it mean?

Refer to [Troubleshoot Image Resizing problems](/images/image-resizing/troubleshooting/) for more information on how to troubleshoot some of the more common issues, including error responses.

### Are Image Resizing errors billed?

Cloudflare considers some Image Resizing request errors for billing. Below is a list of `cf-resized` headers that are billed:

* `9401`: Invalid resize options.
* `9412`: Origin file type invalid.
* `9413`: Image too big.
* `9511`: Unsupported image format.

Refer to [Troubleshoot Image Resizing problems](/images/image-resizing/troubleshooting/) for more information about these error codes.

### Why does upscaling a PNG with Workers increase its file size?

This is expected behaviour when upscaling a PNG file with transparency, due to the limitations of this file format. To make sure you do not end up with a file size much bigger than the original one:

- **Avoid adding transparent areas to images**. Image Resizing supports a background option that makes images opaque, which allows Image Resizing to convert images to JPEG. In turn, this creates images with much smaller files.
- **Do not use upscaling**. Keep the default `fit=scale-down` mode which never resizes images to bigger dimensions. This will prevent increases in file sizes. In most cases, this does not affect the presentation of images on the website, as they can be upscaled using CSS/HTML. As a rule, scaling down should be a server-side operation, and scaling up should a client-side operation.
- **Implement support for format negotiation**. AVIF and WebP formats support transparency, which makes them better suited for images with transparency. To choose the best format automatically, our `/cdn-cgi/` image Worker supports `format=auto`, but custom Workers need to ask for formats themselves. Refer to our [example worker](/images/image-resizing/resize-with-workers/#an-example-worker) to learn how to check the `Accept` header.

---

## Polish FAQ

### How can I troubleshoot common `Cf-Polished` statuses?

Refer to the [Troubleshoot common Cf-Polished statuses](/images/polish/cf-polished-statuses/) page were you can find a list of common `Cf-Polished` statuses and how to troubleshoot them.

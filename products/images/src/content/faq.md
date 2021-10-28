---
order: 4
pcx-content-type: faq
---

# FAQ

Below you will find answers to our most commonly asked questions regarding Cloudflare Image Optimization, namely the differences between Cloudflare Images. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) for possible solutions to your query.

* [Cloudflare Images](#cloudflare-images-faq)
* [Cloudflare Image Resizing](#cloudflare-image-resizing-faq)
* [Polish](#polish-faq)

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

### Can Cloudflare Images convert my images to AVIF?

Soon! We will be introducing AVIF support in the near future.

### Can Cloudflare Images be served from custom domain?

Soon! We will be introducing custom domain support in the near future.

---

## Cloudflare Image Resizing FAQ

### How much does Cloudflare Image Resizing cost?

Refer to our [Plans](https://www.cloudflare.com/plans/) page for up-to-date information on pricing.

### Resizing failed and I received an error response with a code. What does it mean?

Visit our [Troubleshoot Image Resizing problems](https://support.cloudflare.com/hc/articles/4412024022029) page were we have a troubleshoot guide for some of the more common situations, including error responses.

---

## Polish FAQ

### How can I troubleshoot common `Cf-Polished` statuses?

Visit our [Troubleshoot common Cf-Polished statuses](https://support.cloudflare.com/hc/articles/4412219637389) page were you can find a list of common `Cf-Polished` statuses and how to troubleshoot them.
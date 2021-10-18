---
order: 3
pcx-content-type: navigation
---

# FAQs

## Cloudflare Images FAQ

## What is the difference between Cloudflare Images and Image Resizing products?

Cloudflare Images (CI) is an end-to-end solution that offers storage, resizing, optimization, and delivery. Image Resizing (IR) only offers resizing and optimization:

<details>
<summary>Storage</summary>
<div>

**CI** - images are stored at Cloudflare.

**IR** - images can be stored anywhere on the Internet as long as it has public access.

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

**CI** - images are served from `imagedelivdery.net`.

**IR** - images are served from a customers' domain on Cloudflare.

</div>
</details>

<details>
<summary>Available optimizations</summary>
<div>

**CI** - More info on Cloudflare Images optimizations can be found in [Resizing Images](../../cloudflare-images/resize-images).

**IR** - More info on Image Resizing optimizations can be found in [URL format options](../../image-resizing/url-format#options).

</div>
</details>

<details>
<summary>Plan availability</summary>
<div>

**CI** - available to any plan.

**IR** - available with Pro, Biz, and Ent plans.

</div>
</details>

### How much does Cloudflare Images cost?

Refer to our [Cloudflare Images](https://www.cloudflare.com/en-gb/products/cloudflare-images/) page for up-to-date information on pricing.

### Do I get charged for creating and storing variants?

No, you only get billed for the number of original images. There is no extra cost for generating variants. You can configure upto 20 variants.

### Is there a limit on the file size for uploaded images?

Yes, the uploaded image file must be less than or equal to 10 MB.

### Which file formats does Cloudflare Images support?

Cloudflare Images supports most common file formats as input files. These include JPGs, GIFs, PNGs and WebP.

### Can Cloudflare Images convert my images to AVIF?

Soon! We will be introducing AVIF support in the near future.

### Can Cloudflare Images be served from custom domain?

Soon! We will be introducing custom domain support in the near future.

---

## Image Resizing

### How much does Cloudflare Image Resizing cost?

Refer to our [Plans page](https://www.cloudflare.com/plans/) page for up-to-date information on pricing.
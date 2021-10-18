---
pcx-content-type: faq
---

# Cloudflare Image Resizing FAQ

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

**CI** - Mote info on Cloudflare Images optimizations can be found in [Resizing Images](../../cloudflare-images/resize-images).

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

## How much does Cloudflare Images cost?

Refer to our [Plans page](https://www.cloudflare.com/plans/) page for up-to-date information on pricing.
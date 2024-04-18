---
pcx_content_type: reference
title: Pricing
weight: 6
---

# Pricing


## Cloudflare Images

Cloudflare Images lets you store, optimize, and deliver images from one unified API. The Images product consists of three line items: 

* Images Stored
* Images Delivered
* Images Transformed

If you are not storing your images within the Images product, you will only pay for Images Transformed.

## Images Stored

Images Stored is a pre-paid pricing dimension. You purchase storage in increments of $5 per 100,000 original images. 

Each original image can have up to 20 predefined variants _at no additional cost_. A predefined variant supports following properties:

* Width
* Height
* Fit
* Metadata
* Blurring

Predefined variants can be configured from the Cloudflare dashboard by visiting **Images** > **Variants**. 

Predefined variants do not count against your storage limit. For example, if you upload demo.jpg and have 10 predefined variants, it will count as one original image, not 11.

## Images Delivered

Images Delivered is a post-paid pricing dimension and *only* applies to images stored within the Images product. You will not be billed for Images Delivered if you are optimizing images that are stored elsewhere (in S3 or R2, for example).

Images Delivered costs $1 per 100,000 images delivered. Every image requested by the browser counts as one delivered image. For example, if you have a product page displaying 10 images stored on the Images product, and the page is visited 10,000 times over the course of the month, it will result in 100,000 delivered images or $1.00 in billable usage.

## Images Transformed

Images Transformed is a post-paid pricing dimension. If your images are not stored on Cloudflare Images, you will *not* be billed for Images Delivered pricing dimension and do not need to purchase Images Stored. Transformations cost $0.50 per 1,000 unique transformations per month.

A unique transformation is defined as a request to transform an original image with a combination of [supported flags](https://developers.cloudflare.com/images/transform-images/transform-via-url/#options), with the exception of the `format` flag. 

The `format` flag being exempted from counting as a unique transformation means that if demo.jpg is resized to 100x100 and is delivered to some of your users as webp and others as avif or png, it will still count as one billable transformation for that month instead of three.

Images Transformed count is not impacted by the cache hit rate. This makes estimating pricing more predictable. For example, 1,000 product images that are resized 5 different ways will result in 5,000 unique transformations per month and cost $2.50.

{{<Aside type="note" header="Note">}}

Images is an account-level product. You do not need a Pro/Biz subscription to use the Images product. It can be purchased and used with any of your zones, including free zones. 
{{</Aside>}}

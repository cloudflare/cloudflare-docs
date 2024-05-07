---
title: Optimizing Image Delivery with Cloudflare Image Resizing and R2
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Reference Architecture Diagram: Optimizing Image Delivery with Cloudflare Image Resizing and R2"
---

# Optimizing Image Delivery with Cloudflare Image Resizing and R2

## Introduction

Optimizing image delivery for websites is essential for a good user experience. Images are typically one of the largest components of a website, in terms of bytes delivered and HTTP requests, it has a huge impact on page load times, search engine ranking, reducing cost of delivery, and overall performance. In this reference architecture diagram, we’ll cover how you can adopt a simple, scalable and highly performant solution that is configured only by manipulating the URL string to define the image specifics such as size and quality with the resultant image cached and delivered to any user that requests that specific format. The Cloudflare components that make up this solution are as follows:

- [Cloudflare CDN](https://www.cloudflare.com/en-gb/application-services/products/cdn/) - Leverage [Cloudflare’s Global Network](https://www.cloudflare.com/en-gb/network/) to cache your transformed images for fast and reliable delivery to your end users.
- [Cloudflare Images](https://www.cloudflare.com/en-gb/developer-platform/cloudflare-images/) - Leverage Cloudflare Images to resize, optimize and transform your images that are stored in an object storage solution such as Cloudflare R2. Transformations are performed based on a specifically-formatted URL which requires minimal refactoring to your application to support.
- [Cloudflare R2 Object Storage](https://www.cloudflare.com/en-gb/developer-platform/r2/) - R2 allows users to store a large amount of unstructured data, and in this use case will be used for storing our original images (best quality) for transformation.
- [Cloudflare Transform Rules](https://developers.cloudflare.com/rules/transform/) - If you’re migrating from another solution to Cloudflare, Transform Rules allows you to Rewrite the URL from the anothers solutions syntax to a Cloudflare specific syntax, which reduces the complexity of migration.

## Image Delivery with Cloudflare Image Resizing and R2

![Figure 1: Cloudflare Image Resizing and R2](/images/reference-architecture/optimizing-image-delivery-with-cloudflare-image-resizing-and-r2-diagrams/optimizing-image-delivery-with-cloudflare-image-resizing-and-r2-diagram.svg "Figure 1: Cloudflare Image Resizing and R2")

1. **User Request**: The user sends a HTTP request for an image (image.jpg) with a specific transformation, such as width and quality. The transformation specifics are encoded into the URL, as a comma-separated list of options.
2. **Cache Hit**: The request is processed by the closest Cloudflare point of presence to the originating user's request. Before passing onto the subsequent processes, the image transformation requested is evaluated if it’s already in Cloudflare’s Cache. If it’s a cache hit then the image is returned to the eyeball and no further processing is necessary by Cloudflare’s infrastructure. If there is a cache miss, the process continues onto the next step.
3. [Transform Rules](https://developers.cloudflare.com/rules/transform/) (optional): If you’re migrating from another images solution it may be necessary to rewrite the URL path and query string with a rewrite so that you can avoid any complex refactoring at the application level to assist with the migration. Both Dynamic and Static rewrites are supported, with dynamic rewrites supporting complex expressions to support a multitude of URL rewrites.
4. **Cache Miss - R2**: If the requested image is not available in Cloudflare’s Cache, then the request is sent to the origin, which in this scenario is [Cloudflare’s R2 Object Storage](https://developers.cloudflare.com/r2/) platform. Only the original images are stored in R2, no resized variants are stored in the R2 bucket, which makes operating R2 without object lifecycle rules less onerous.
5. **Transform Image**: Based on the URL syntax sent in step 1 or transformed in step 3, [Cloudflare Images](https://developers.cloudflare.com/images/) transforms the image and sends it to the Cache before serving back to the end user with the requested image.

## Image Resizing URL Syntax Reference

You can convert and resize the images requested by URLs by requesting them via a specifically-formatted URL, which makes adoption far simpler. The following section refers back to the diagram, and breaks down each part in the URL for transforming your images:

- **Part 1** - Your specific domain name on Cloudflare, this is the Zone you onboarded to Cloudflare and where your website or images are served from. e.g. https://www.mywebsite.com/
- **Part 2** - A fixed prefix that identifies this is a special path handled by Cloudflare’s built-in Worker.
- **Part 3** - A comma-separated list of options for the image, such as width=80,quality=75
- **Part 4** - Absolute path on the origin server. For example: /uploads/image.jpg

The final URL used in the request would look like this:

```plain
http://www.mywebsite.com/cdn-cgi/image/width=80,quality=75/uploads/image.jpg
```

## Related Resources

- [Image Resizing Documentation](https://developers.cloudflare.com/images/transform-images/)
- [Cloudflare R2 Developer Docs](https://developers.cloudflare.com/r2/)
- [Rewrite URL rules](https://developers.cloudflare.com/rules/transform/url-rewrite/)

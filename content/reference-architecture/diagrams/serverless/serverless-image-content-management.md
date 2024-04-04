---
title: Serverless Image content management
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Reference Architecture Diagram: Serverless Image content management"
---

# Serveless image content management platform
## Introduction

In this reference architecture diagram, we reveal how to leverage various components of Cloudflare’s ecosystem to construct a scalable image management solution. This solution integrates moderation principles via Cloudflare AI platform and performs image classification through inference at the Edge. The storage of images is handled by Cloudflare R2, an S3 API-like object storage system, while metadata is stored in a key/value store to enable content augmentation. 

The servicing of images to requesting clients is secured by link signature, resizing based on device type or requested transformations, and leveraging Cloudflare’s native security and performance features.

![Figure 1: Serverless image content management](/images/reference-architecture/serverless_image_content_management/diagram.svg "Figure 1: Serverless image content management reference architecture diagram")

### Products included in the recipe
{{<table-wrap>}}
| Product | Function |
| -------  | --------- |
| [DDoS](https://www.cloudflare.com/application-services/products/bot-management/) | Volumetric attack protection |
| [Bot Management](https://www.cloudflare.com/ddos/) | Protection against scraping and general sophisticated automated abuse |
| [Web Application Firewall](https://www.cloudflare.com/application-services/products/waf/) | Protection against web threats |
| [CDN](https://www.cloudflare.com/application-services/products/cdn/) | Cache spreading of the images | 
| [Optimization](https://www.cloudflare.com/application-services/products/website-optimization/) | Compression and acceleration of the image delivery |
| [Workers](https://workers.cloudflare.com/) | Computing of the several serverless micro services |
| [AI](https://ai.cloudflare.com/) | Image classification | 
| [R2](https://www.cloudflare.com/developer-platform/r2/) | S3-Type object-storage platform |
| [KV](/kv/) | Image metadata storage |


{{</table-wrap>}}

## Getting started

This reference architecture diagram reveals how to harness the power of the Cloudflare platform to construct a fully serverless image and content management system. This implementation leverages various components of the Cloudflare stack, including Edge Compute with Cloudflare Workers, KV and R2 object storage, application performance optimization and caching, application security features such as rate limiting and DDoS mitigation, and Artificial Intelligence with Cloudflare AI.

The ultimate goal is to create a scalable and accessible platform for storing and serving images globally. This guide will walk you through the key features and mechanisms that can be utilized with Cloudflare’s native capabilities as well as those that can be developed using Cloudflare’s robust computing capabilities.


### 1. Image servicing

Clients request images with [HMAC signatures](/workers/examples/signing-requests/) and any necessary transformations. Transformation parameters can be included in the [src-set](/images/transform-images/make-responsive-images/#srcset-for-high-dpi-displays) for HTML content or directly sent alongside [HTTP requests](/images/transform-images/transform-via-url/).

### 2. Volumetric protection

Cloudflare's Application Security stack takes a comprehensive approach to shielding the image servicing from malicious activities. By implementing volumetric protection [rate limiting controls](/waf/rate-limiting-rules/), we effectively mitigate the risk of abuse and [DDoS](/ddos-protection/) attacks, ensuring uninterrupted service delivery.

### 3. Signature validation

A [Cloudflare worker](/workers/) function validates [incoming signatures](/workers/examples/signing-requests/) to ensure the authenticity and integrity of requests. This security measure helps prevent content evasion and abuse of the service by verifying that the signature accompanying the request is legitimate. The application responsible for generating content and associated signatures can also set expiration dates for links, further guarding against tampering or man-in-the-middle attacks. HMAC (Hash-based Message Authentication Code) is commonly used as the signature mechanism of choice for this purpose.

### 4. Image optimization and caching

Images are retrieved from [cache](/cache/) when available, or stored on the server for the first time and delivered to clients upon request. We optimize image delivery by serving the most suitable format for each device, such as [WebP or AVIF](/images/polish/), while also applying compression to reduce file size. This ensures a smooth and seamless visual experience for users.

### 4. Image transformations

Cloudflare's[ image resizing](/images/) feature will resize the original images requested for transformation, completing the process entirely at the edge from any of our global locations. This fast and efficient process offers a wide range of transformation options.

### 5. Content moderation and storage

[Cloudflare Worker](/workers/) script meticulously analyzes incoming images, leveraging their [classification metadata](/workers-ai/models/) to ensure compliance with established policy of use. [Cloudflare R2](/r2/) serves as an S3-like object storage solution, storing images and their associated metadata (such as image classification) in a globally accessible and scalable manner. With lightning-fast delivery capabilities and the ability to scale from 0, Cloudflare R2 is an ideal solution for storing and managing large collections of images.

### 6. Image classification
With [Cloudflare AI](https://ai.cloudflare.com/) at its core, our[ image classification](/workers-ai/models/#image-classification) inference model will rapidly inspect each incoming image, classifying them in real-time. This cutting-edge technology allows us to streamline the process of moderating content, significantly reducing the need for a dedicated team to sift through and review every submission.
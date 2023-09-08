---
pcx_content_type: how-to
title: Enable Image Resizing
weight: 2
---

# Enable Image Resizing

To use Image Resizing you first need to enable it via the **Speed** app on your Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Speed** > **Optimization**.
3. Under **Image Optimization**, enable **Image Resizing**.
4. If you do not want to resize images from any origin, uncheck **Resize images from any origin**. When unchecked, Image Resizing only resizes images in the enabled zone and prevents third-parties from resizing any image at any origin.

{{<Aside type="note">}}

If you are using Image Resizing in a Worker, you need to include the appropriate logic in your Worker code to prevent resizing images from any origin. Unchecking this option in the dash does not apply to image resizing requests coming from Cloudflare Workers.

{{</Aside>}}

## Usage-based notifications

{{<render file="_ubb-recommendation.md" productFolder="fundamentals">}}

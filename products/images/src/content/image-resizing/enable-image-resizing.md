---
order: 1
title: Get started
pcx-content-type: how-to
---

# Enable Image Resizing

To use Image Resizing you first need to enable it via the Speed app on your Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Go to **Speed**.

  <div class="full-img">

  ![Image Resizing options in Cloudflare's dashboard](../static/image-resizing.png)

  </div>

1. Click the **Optimization** tab.
1. Under **File Size Optimization**, enable **Image Resizing**.
1. If you do not want to resize images from any origin, uncheck **Resize images from any origin**.

<Aside type="note" header="Note">

Image Resizing defaults to resizing images from **any domain**. To prevent third parties from resizing any image at any origin, uncheck **Resize images from any origin**. When unchecked, Image Resizing will only resize images that are in the enabled zone. 

This restriction does not apply to image resizing requests coming from Cloudflare Workers. If you are using Image Resizing in a Worker, you need to include the appropriate logic in your Worker code.

</Aside>
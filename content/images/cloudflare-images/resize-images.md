---
order: 3
pcx-content-type: reference
---

# Resize images

Cloudflare Images supports Variants that specify how images should be resized for different use cases. You can configure up to 20 variants.

Each variant has properties including the width and height of resized images.

![Configure variants in Cloudflare Images](../static/variants.png)

The **Fit** property describes how the width and height dimensions should be interpreted. The chart below describes each of the options:

<TableWrap>

| Fit Options | Behavior|
| --- | --- |
| Scale down  | Image will be shrunk in size to fully fit within the given width or height, but will not be enlarged. |
| Contain     | Image will be resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio. |
| Cover       | Image will be resized to exactly fill the entire area specified by width and height, and will be cropped if necessary. |
| Crop        | Image will be shrunk and cropped to fit within the area specified by width and height. The image will not be enlarged. For images smaller than the given dimensions it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`. |
| Pad         | Image will be resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio, and the extra area will be filled with a background color (white by default). |

</TableWrap>
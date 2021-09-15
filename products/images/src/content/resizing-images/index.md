---
title: Resizing Images
order: 2
---

# Resizing Images

Cloudflare Images supports Variants that specify how you would like to resize images for different use cases. You can configure up to 20 variants.

Each variant has properties including the width and height of resized images.

![Configure variants in Cloudflare Images](./variants.png)

The fit property describes how the width and height dimensions should be interpreted. The chart below describes each of the options:

| Fit Options | Behavior                                                                                                                                                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Scale Down  | Image will be shrunk in size to fully fit within the given width or height, but won’t be enlarged.                                                                                                                                                                 |
| Contain     | Image will be resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio.                                                                                                                          |
| Cover       | Image will be resized to exactly fill the entire area specified by width and height, and will be cropped if necessary.                                                                                                                                             |
| Crop        | Image will be shrunk and cropped to fit within the area specified by width and height. The image won’t be enlarged. For images smaller than the given dimensions it’s the same as scale-down. For images larger than the given dimensions, it’s the same as cover. |
| Pad         | Image will be resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio, and the extra area will be filled with a background color (white by default).                                            |

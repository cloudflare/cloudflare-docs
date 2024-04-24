---
pcx_content_type: troubleshooting
title: WebP may be skipped
---

# WebP is not always desirable

Polish avoids converting images to the WebP format when such conversion would increase the file size, or significantly degrade image quality.
Polish also optimizes JPEG images, and the WebP format is not always better than a well-optimized JPEG.

To enhance the use of WebP in Polish, enable the [Lossy option](/images/polish/compression/#lossy). When you create new JPEG images, save them with a slightly higher quality than usually necessary.
We recommend JPEG quality settings between 85 and 95, but not higher. This gives Polish enough headroom for lossy conversion to WebP and optimized JPEG.

## In the **lossless** mode, it is not feasible to convert JPEG to WebP

WebP is actually a name for two quite different image formats: WebP-lossless (similar to PNG) and WebP-VP8 (similar to JPEG).

When the [Lossless option](/images/polish/compression/#lossless) is enabled, Polish will not perform any optimizations that change image pixels. This allows Polish to convert only between lossless image formats, such as PNG, GIF, and WebP-lossless. JPEG images will not be converted though, because the WebP-VP8 format does not support the conversion from JPEG without quality loss, and the WebP-lossless format does not compress images as heavily as JPEG.

In the lossless mode, Polish can still apply lossless optimizations to JPEG images. This is a unique feature of the JPEG format that does not have an equivalent in WebP.

## Low-quality JPEG images do not convert well to WebP

When JPEG files are already heavily compressed (for example, saved with a low quality setting like `q=50`, or re-saved many times), the conversion to WebP may not be beneficial, and may actually increase the file size. This is because lossy formats add distortions to images (for example, JPEG makes images blocky and adds noise around sharp edges), and the WebP format can not tell the difference between details of the image it needs to preserve and unwanted distortions caused by a previous compression. This forces WebP to wastefully use bytes on keeping the added noise and blockyness, which increases the file size, and makes compression less beneficial overall.

Polish never makes files larger. When we see that the conversion to WebP increases the file size, we skip it, and keep the smaller original file format.

## For some images conversion to WebP can degrade quality too much

The WebP format, in its more efficient VP8 mode, always loses some quality when compressing images. This means that the conversion from JPEG always makes WebP images look slightly worse. Polish ensures that file size savings from the conversion outweigh the quality loss.

Lossy WebP has a significant limitation: it can only keep one shade of color per 4 pixels. The color information is always stored at half of the image resolution. In high-resolution photos this degradation is rarely noticeable. However, in images with highly saturated colors and sharp edges, this limitation can result in the WebP format having noticeably pixelated or smudged edges.

Additionally, the WebP format applies smoothing to images. This feature hides blocky distortions that are a characteristic of low-quality JPEG images, but on the other hand it can cause loss of fine textures and details in high-quality images, making them look airbrushed.

Polish tries to avoid degrading images for too little gain. Polish keeps the JPEG format when it has about the same size as WebP, but better quality.

## Sometimes older formats are better than WebP

The WebP format has an advantage over JPEG when saving images with soft or blurry content, and when using low quality settings. WebP has fewer advantages when storing high-quality images with fine textures or noise. Polish applies optimizations to JPEG images too, and sometimes well-optimized JPEG is simply better than WebP, and gives a better quality and smaller file size at the same time. We try to detect these cases, and keep the JPEG format when it works better.
Sometimes animations with little motion are more efficient as GIF than animated WebP.

The WebP format does not support progressive rendering. With [HTTP/2 prioritization](/speed/optimization/protocol/enhanced-http2-prioritization/) enabled, progressive JPEG images may appear to load quicker, even if their file sizes are larger.

## Beware of compression that is not better, only more of the same

With a lossy format like JPEG or WebP, it is always possible to take an existing image, save it with a slightly lower quality, and get an image that looks _almost_ the same, but has a smaller file size.
It is the [heap paradox](https://en.wikipedia.org/wiki/Sorites_paradox): you can remove a grain of sand from a heap, and still have a heap of sand. There is no point when you can not make the heap smaller, except when there is no sand left. It is always possible to make an image with a slightly lower quality, all the way until all the accumulated losses degrade the image beyond recognition.

Avoid applying multiple lossy optimization tools to images, before or after Polish. Multiple lossy operations degrade quality disproportionally more than what they save in file sizes.

For this reason Polish will not create the smallest possible file sizes. Instead, Polish aims to maximize the quality to file size ratio, to create the smallest possible files while preserving good quality. The quality level we stop at is carefully chosen to minimize visual distortion, while still having a high compression ratio.

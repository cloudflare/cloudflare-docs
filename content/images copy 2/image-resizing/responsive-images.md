---
pcx_content_type: reference
title: Responsive images
weight: 5
---

# Responsive images

The `srcset` [feature of HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) allows browsers to automatically choose an image that is best suited for user’s screen resolution.

`srcset` requires providing multiple resized versions of every image, and with Cloudflare’s Image Resizing this is an easy task to accomplish.

There are two different scenarios where it is useful to use `srcset`:

* Images with a fixed size in terms of CSS pixels, but adapting to high-DPI screens (also known as Retina displays). These images take the same amount of space on the page regardless of screen size, but are sharper on high-resolution displays. This is appropriate for icons, thumbnails, and most images on pages with fixed-width layouts.
* Responsive images that stretch to fill a certain percentage of the screen (usually full width). This is best for hero images and pages with fluid layouts, including pages using media queries to adapt to various screen sizes.

## `srcset` for high-DPI displays

For high-DPI display you need two versions of every image. One for `1x` density, suitable for typical desktop displays (such as HD/1080p monitors or low-end laptops), and one for `2x` high-density displays used by almost all mobile phones, high-end laptops, and 4K desktop displays. Some mobile phones have very high-DPI displays and could use even a `3x` resolution. However, while the jump from `1x` to `2x` is a clear improvement, there are diminishing returns from increasing the resolution further. The difference between `2x` and `3x` is visually insignificant, but `3x` files are two times larger than `2x` files.

Assuming you have an image `product.jpg` in the `assets` folder and you want to display it at a size of `960px`, the code is as follows:

```html
<img
  src="/cdn-cgi/image/fit=contain,width=960/assets/product.jpg"
  srcset="/cdn-cgi/image/fit=contain,width=1920/assets/product.jpg 2x"
/>
```

In the URL path used in this example, the `src` attribute is for images with the usual "1x" density. `/cdn-cgi/image/` is a special path for resizing images. This is followed by `width=960` which resizes the image to have a width of 960 pixels. `/assets/product.jpg` is a URL to the source image on the server.

The `srcset` attribute adds another, high-DPI image. The browser will automatically select between the images in the `src` and `srcset`. In this case, specifying `width=1920` (two times 960 pixels) and adding `2x` at the end, informs the browser that this is a double-density image. It will be displayed at the same size as a 960 pixel image, but with double the number of pixels which will make it look twice as sharp on high-DPI displays.

Note that it does not make sense to scale images up for use in `srcset`. That would only increase file sizes without improving visual quality. The source images you should use with `srcset` must be high resolution, so that they are only scaled down for `1x` displays, and displayed as-is or also scaled down for `2x` displays.

## `srcset` for responsive images

When you want to display an image that takes a certain percentage of the window or screen width, the image should have dimensions that are appropriate for a visitor’s screen size. Screen sizes vary a lot, typically from 320 pixels to 3840 pixels, so there is not a single image size that fits all cases. With `<img srcset>` you can offer the browser several possible sizes and let it choose the most appropriate size automatically.

By default, the browser assumes the image will be stretched to the full width of the screen, and will pick a size that is closest to a visitor’s screen size. In the `src` attribute the browser will pick any size that is a good fallback for older browsers that do not understand `srcset`.

```html
<img
  width="100%"
  srcset="
    /cdn-cgi/image/fit=contain,width=320/assets/hero.jpg   320w,
    /cdn-cgi/image/fit=contain,width=640/assets/hero.jpg   640w,
    /cdn-cgi/image/fit=contain,width=960/assets/hero.jpg   960w,
    /cdn-cgi/image/fit=contain,width=1280/assets/hero.jpg 1280w,
    /cdn-cgi/image/fit=contain,width=2560/assets/hero.jpg 2560w
  "
  src="/cdn-cgi/image/width=960/assets/hero.jpg"
/>
```

In the previous case, the number followed by `x` described _screen_ density. In this case the number followed by `w` describes the _image_ size. There is no need to specify screen density here (`2x`, etc.), because the browser automatically takes it into account and picks a higher-resolution image when necessary.

If the image is not displayed at full width of the screen (or browser window), you have two options:

* If the image is displayed at full width of a fixed-width column, use the first technique that uses one specific image size.
* If it takes a specific percentage of the screen, or stretches to full width only sometimes (using CSS media queries), then add the `sizes` attribute as described below.

### The `sizes` attribute

If the image takes 50% of the screen (or window) width:

```html
<img style="width: 50vw" srcset="<SAME_AS_BEFORE>" sizes="50vw" />
```

The `vw` unit is a percentage of the viewport (screen or window) width. If the image can have a different size depending on media queries or other CSS properties, such as `max-width`, then specify all the conditions in the `sizes` attribute:

```html
<img
  style="max-width: 640px"
  srcset="
    /cdn-cgi/image/fit=contain,width=320/assets/hero.jpg   320w,
    /cdn-cgi/image/fit=contain,width=480/assets/hero.jpg   480w,
    /cdn-cgi/image/fit=contain,width=640/assets/hero.jpg   640w,
    /cdn-cgi/image/fit=contain,width=1280/assets/hero.jpg 1280w
  "
  sizes="(max-width: 640px) 100vw, 640px"
/>
```

In this example, `sizes` says that for screens smaller than 640 pixels the image is displayed at full viewport width; on all larger screens the image stays at 640px. Note that one of the options in `srcset` is 1280 pixels, because an image displayed at 640 CSS pixels may need twice as many image pixels on a high-dpi (`2x`) display.

## What about other formats?

`srcset` is useful for pixel-based formats such as PNG, JPEG, and WebP. It is unnecessary for vector-based SVG images.

HTML also [supports the `<picture>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) that can optionally request an image in the WebP format, but you do not need it. Cloudflare can serve WebP images automatically whenever you use `/cdn-cgi/image/format=auto` URLs in `src` or `srcset`.

If you want to use WebP images, but do not need resizing, you have two options:

* You can enable the automatic [WebP conversion in Polish](/images/polish/activate-polish/). This will convert all images on the site.
* Alternatively, you can change specific image paths on the site to start with `/cdn-cgi/image/format=auto/`. For example, change `https://example.com/assets/hero.jpg` to `https://example.com/cdn-cgi/image/format=auto/assets/hero.jpg`.
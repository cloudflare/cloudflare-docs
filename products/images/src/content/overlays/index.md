# Drawing overlays/watermarks

You can draw additional images on top of a resized image, with transparency and blending effects. This enables adding of watermarks, logos, signatures, vignettes, and other effects to resized images.

This feature is available only in [Workers](/images/worker/). To draw overlay images, add an array of drawing commands to options of `fetch()` requests. The drawing options are nested in `options.cf.image.draw`, like this:

```js
fetch(imageURL, {
  cf: {
    image: {
      width: 800,
      height: 600,
      draw: [{
        url: "https://example.com/branding/logo.png", // draw this image
        bottom: 5, // 5 pixels from the bottom edge
        right: 5, // 5 pixels from the right edge
        fit: "contain", // make it fit within 100x50 area
        width: 100,
        height: 50,
        opacity: 0.8, // 20% transparent
      }]
    }
  }
})
```

## Drawing options

The `draw` property is an array. Overlays are drawn in the order they appear in the array (last array entry is the topmost layer). Each item in the `draw` array is an object, which can have the following properties:

<dl>
<dt><code>url</code></dt>
<dd>Absolute URL of the image file to use for the drawing. It can be any of the supported file formats. For drawing of watermarks or non-rectangular overlays we recommend using PNG or WebP images.</dd>

<dt><code>width</code>, <code>height</code></dt>
<dd>Maximum size of the overlay image, in pixels. It must be an integer.</dd>

<dt><code>fit</code>, <code>gravity</code></dt>
<dd>Affects interpretation of <code>width</code> and <code>height</code>. Same as <a href="../worker/#fetch-options">for the main image</a>.</dd>

<dt><code>opacity</code></dt>
<dd>Floating-point number between <code>0</code> (transparent) and <code>1</code> (opaque). For example, <code>opacity: 0.5</code> makes overlay semitransparent.</dd>

<dt><code>repeat</code></dt>
<dd>If set to <code>true</code>, the overlay image will be tiled to cover the entire area. This is useful for stock-photo-like watermarks.</dd>
<dd>if set to <code>"x"</code>, the overlay image will be tiled horizontally only (form a line).</dd>
<dd>if set to <code>"y"</code>, the overlay image will be tiled vertically only (form a line).</dd>

<dt><code>top</code>, <code>left</code>, <code>bottom</code>, <code>right</code></dt>
<dd>Position of the overlay image relative to a given edge. Each property is an offset in pixels. <code>0</code> aligns exactly to the edge. For example, <code>left: 10</code> positions left side of the overlay 10 pixels from the left edge of the image it's drawn over. <code>bottom: 0</code> aligns bottom of the overlay with bottom of the background image.</dd>
<dd>Setting both <code>left</code> & <code>right</code>, or both <code>top</code> & <code>bottom</code> is an error.</dd>
<dd>If no position is specified, the image will be centered.</dd>

<dt><code>background</code></dt>
<dd>Background color to add underneath the overlay image. Same as <a href="../worker/#fetch-options">for the main image</a>.</dd>

<dt><code>rotate</code></dt>
<dd>Number of degrees to rotate the overlay image by. Same as <a href="../worker/#fetch-options">for the main image</a>.</dd>

</dl>

## Examples

### Stock Photo Watermark

```js
image: {
    draw: [{
      url: "https://example.com/watermark.png",
      repeat: true, // tiled over entire image
      opacity: 0.2, // and subtly blended
    }]
  }
```

### Signature

```js
image: {
    draw: [{
      url: "https://example.com/by-me.png", // predefined logo/signature
      bottom: 5, // positioned near bottom right corner
      right: 5,
    }]
  }
```

### Centered icon

```js
image: {
    draw: [{
      url: "https://example.com/play-button.png",
      // center position is the default
    }]
  }
```

### Combined

Multiple operations can be combined in one image:

```js
image: {
    draw: [
      {url: "https://example.com/watermark.png", repeat: true, opacity: 0.2},
      {url: "https://example.com/play-button.png"},
      {url: "https://example.com/by-me.png", bottom: 5, right: 5},
    ]
  }
```

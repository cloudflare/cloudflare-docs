---
_build:
  publishResources: false
  render: never
  list: never
---

## SVG files

Cloudflare Images and Image Resizing can deliver SVG files. However, as this is an [inherently scalable format](https://www.w3.org/TR/SVG2/), Cloudflare does not resize SVGs. 

As such, Cloudflare Images variants cannot be used to resize SVG files. Variants, named or flexible, are intended to transform bitmap (raster) images into whatever size you want to serve them. 

You can, nevertheless, use variants to serve SVGs, using any named variant as a placeholder to allow your image to be delivered. For example:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<SVG_ID>/public
```

Cloudflare recommends you use named variants with SVG files. If you use flexible variants, all your parameters will be ignored. In either case, Cloudflare applies SVG sanitizing to your files.

You can also use Image Resizing to sanitize SVG files stored in your origin. However, as stated above, Image Resizing will ignore all transform parameters, as Cloudflare does not resize SVGs.

### Sanitized SVGs

Cloudflare sanitizes SVG files with `svg-hush` before serving them. This open-source tool developed by Cloudflare is intended to make SVGs as safe as possible. Because SVG files are XML documents, they can have links or JavaScript features that may pose a security concern. As such, `svg-hush` filters SVGs and removes any potential risky features, such as:

* **Scripting**: Prevents SVG files from being used for cross-site scripting attacks. Although browsers do not allow scripts in the `<img>` tag, they do allow scripting when SVG files are opened directly as a top-level document.
* **Hyperlinks to other documents**: Makes SVG files less attractive for SEO spam and phishing.
* **References to cross-origin resources**: Stops third parties from tracking who is viewing the image.

SVG files can also contain embedded images in other formats, like JPEG and PNG, in the form of [Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs). Cloudflare treats these embedded images just like other images that we process, and optimizes them too. Cloudflare does not support SVG files embedded in SVG recursively, though.

Cloudflare still uses Content Security Policy (CSP) headers to disable unwanted features, but filtering acts as a defense-in-depth in case these headers are lost (for instance, if the image was saved as a file and served elsewhere).

`svg-hush` is open-source. It is written in Rust and can filter SVG files in a streaming fashion without buffering, so it is fast enough for filtering on the fly.

For more information about `svg-hush`, refer to [Cloudflare GitHub repository](https://github.com/cloudflare/svg-hush).
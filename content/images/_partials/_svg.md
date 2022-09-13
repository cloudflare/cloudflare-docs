---
_build:
  publishResources: false
  render: never
  list: never
---

## SVG files

Cloudflare Images can deliver SVG files. However, as this is an [inherently scalable format](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics), Cloudflare does not resize SVGs. As such, variants cannot be used to resize SVG files. Variants, named or flexible, are intended to transform bitmap (raster) images into whatever size you want to serve them.

You can, howerver, use variants to serve SVGs, using any named variant as a placeholder to allow your image to be delivered. For example:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<SVG_ID>/public
```

If you intend to use flexible variants to serve your SVG files, you should pass `format=auto` as the parameter. Parameters are ignored when used with SVGs as Cloudflare does not resize images. However, you still need one parameter to make flexible variant calls valid. For example:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<SVG_ID/format=auto
```

### Sanitized SVGs

Cloudflare filters SVG files before serving them, with `svg-hush`. This open-source tool developed by Cloudflare is intended to make SVGs as safe as possible. Because SVG files are HTML documents, they may have links or JavaScript features thay may pose a security concern. As such, `svg-hush` filters SVGs and removes any potential risky features, such as:

* **Scripting**: Prevents SVG files from being used for cross-site scripting attacks. Although browsers do not allow scripts in the `<img>` tag, they do allow scripting when SVG files are opened directly as a top-level document.
* **Hyperlinks to other documents**: Makes SVG files less attractive for SEO spam and phishing.
* **References to cross-origin resources**: Stops third parties from tracking who is viewing the image.

For more information about `svg-hush`, refer to [Cloudflare GitHub repository](https://github.com/cloudflare/svg-hush).
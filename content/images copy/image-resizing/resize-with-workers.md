---
pcx_content_type: reference
title: Resize with Cloudflare Workers
weight: 6
---

# Resize with Cloudflare Workers

Using Image Resizing with Workers gives you powerful programmatic control over every image request.

Here are a few examples of the flexibility Workers give you:

* **Use a custom URL scheme**. Instead of specifying pixel dimensions in image URLs, use preset names such as `thumbnail` and `large`.
* **Hide the actual location of the original image**. You can store images in an external S3 bucket or a hidden folder on your server without exposing that information in URLs.
* **Implement content negotiation**. This is useful to adapt image sizes, formats and quality dynamically based on the device and condition of the network.

The resizing feature is accessed via the [options](/workers/runtime-apis/request/#requestinitcfproperties) of a `fetch()` [subrequest inside a Worker](/workers/runtime-apis/fetch/).

{{<render file="_ir-svg-aside.md">}}

## Fetch options

The `fetch()` function accepts parameters in the second argument inside the `{cf: {image: {…}}}` object.

{{<render file="_supported-properties.md">}}

In your worker, where you would fetch the image using `fetch(request)`, add options like in the following example:

```js
fetch(imageURL, {
  cf: {
    image: {
      fit: "scale-down",
      width: 800,
      height: 600
    }
  }
})
```

These typings are also available in [our Workers TypeScript definitions library](https://github.com/cloudflare/workers-types).

## Configure a Worker

Create a new script in the Workers section of the Cloudflare dashboard. Scope your Worker script to a path dedicated to serving assets, such as `/images/*` or `/assets/*`. Only supported image formats can be resized. Attempting to resize any other type of resource (CSS, HTML) will result in an error.

{{<Aside type="warning" header="Warning">}}

Do not set up the Image Resizing worker for the entire zone (`/*`). This will block all non-image requests and make your website inaccessible.

{{</Aside>}}

It is best to keep the path handled by the Worker separate from the path to original (unresized) images, to avoid request loops caused by the image resizing worker calling itself. For example, store your images in `example.com/originals/` directory, and handle resizing via `example.com/thumbnails/*` path that fetches images from the `/originals/` directory. If source images are stored in a location that is handled by a Worker, you must prevent the Worker from creating an infinite loop.

### Prevent request loops

To perform resizing and optimizations, the Worker must be able to fetch the original, unresized image from your origin server. If the path handled by your Worker overlaps with the path where images are stored on your server, it could cause an infinite loop by the Worker trying to request images from itself.

You must detect which requests must go directly to the origin server. When the `image-resizing` string is present in the `Via` header, it means that it is a request coming from another Worker and should be directed to the origin server:

```js
addEventListener("fetch", event => {
  // If this request is coming from image resizing worker,
  // avoid causing an infinite loop by resizing it again:
  if (/image-resizing/.test(event.request.headers.get("via"))) {
    return fetch(event.request)
  }

  // Now you can safely use image resizing here
}
```

## Lack of preview in the dashboard

{{<Aside type="note" header="Note">}}

Image Resizing is not simulated in the preview of in the Workers dashboard editor.

{{</Aside>}}

The script preview of the Worker editor ignores `fetch()` options, and will always fetch unresized images. To see the effect of Image Resizing you must deploy the Worker script and use it outside of the editor.

## Error handling

When an image cannot be resized — for example, because the image does not exist or the resizing parameters were invalid — the response will have an HTTP status indicating an error (for example, `400`, `404`, or `502`).

By default, the error will be forwarded to the browser, but you can decide how to handle errors. For example, you can redirect the browser to the original, unresized image instead:

```js
const response = await fetch(imageURL, options)

if (response.ok || response.redirected) { // fetch() may respond with status 304
  return response
} else {
  return response.redirect(imageURL, 307)
}
```

Keep in mind that if the original images on your server are very large, it may be better not to display failing images at all, than to fall back to overly large images that could use too much bandwidth, memory, or break page layout.

You can also replace failed images with a placeholder image:

```js
const response = await fetch(imageURL, options)
if (response.ok || response.redirected) {
  return response
} else {
  // Change to a URL on your server
  return fetch("https://img.example.com/blank-placeholder.png")
}
```

## An example worker

Assuming you [set up a Worker](/workers/get-started/guide/) on `https://example.com/image-resizing` to handle URLs like `https://example.com/image-resizing?width=80&image=https://example.com/uploads/avatar1.jpg`:

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  // Parse request URL to get access to query string
  let url = new URL(request.url)

  // Cloudflare-specific options are in the cf object.
  let options = { cf: { image: {} } }

  // Copy parameters from query string to request options.
  // You can implement various different parameters here.
  if (url.searchParams.has("fit")) options.cf.image.fit = url.searchParams.get("fit")
  if (url.searchParams.has("width")) options.cf.image.width = url.searchParams.get("width")
  if (url.searchParams.has("height")) options.cf.image.height = url.searchParams.get("height")
  if (url.searchParams.has("quality")) options.cf.image.quality = url.searchParams.get("quality")

  // Your Worker is responsible for automatic format negotiation. Check the Accept header.
  const accept = request.headers.get("Accept");
  if (/image\/avif/.test(accept)) {
    options.cf.image.format = 'avif';
  } else if (/image\/webp/.test(accept)) {
    options.cf.image.format = 'webp';
  }

  // Get URL of the original (full size) image to resize.
  // You could adjust the URL here, e.g., prefix it with a fixed address of your server,
  // so that user-visible URLs are shorter and cleaner.
  const imageURL = url.searchParams.get("image")
  if (!imageURL) return new Response('Missing "image" value', { status: 400 })

  try {
    // TODO: Customize validation logic
    const { hostname, pathname } = new URL(imageURL)

    // Optionally, only allow URLs with JPEG, PNG, GIF, or WebP file extensions
    // @see https://developers.cloudflare.com/images/url-format#supported-formats-and-limitations
    if (!/\.(jpe?g|png|gif|webp)$/i.test(pathname)) {
      return new Response('Disallowed file extension', { status: 400 })
    }

    // Demo: Only accept "example.com" images
    if (hostname !== 'example.com') {
      return new Response('Must use "example.com" source images', { status: 403 })
    }
  } catch (err) {
    return new Response('Invalid "image" value', { status: 400 })
  }

  // Build a request that passes through request headers
  const imageRequest = new Request(imageURL, {
    headers: request.headers
  })

  // Returning fetch() with resizing options will pass through response with the resized image.
  return fetch(imageRequest, options)
}
```

When testing image resizing, please deploy the script first. Resizing will not be active in the online editor in the dashboard.

## Warning about `cacheKey`

Resized images are always cached. They are cached as additional variants under a cache entry for the URL of the full-size source image in the `fetch` subrequest. Do not worry about using many different Workers or many external URLs — they do not influence caching of resized images, and you do not need to do anything for resized images to be cached correctly.

If you use the `cacheKey` fetch option to unify caches of multiple different source URLs, you must not add any resizing options to the `cacheKey`, as this will fragment the cache and hurt caching performance. The `cacheKey` option is meant for the full-size source image URL only, not for its resized variants.

---
order: 5
---

# Controlling origin access

You can serve resized images without giving access to the original image. Images can be hosted on another server outside of your zone, and the true source of the image can be entirely hidden. The origin server may require authentication to disclose the original image, without needing visitors to be aware of it. Access to the full-size image may be prevented by making it impossible to manipulate resizing parameters.

All these behaviors are completely customizable, because they are handled by custom code of a script running [on the edge in a Cloudflare Worker](/resizing-with-workers).

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Here you can compute arbitrary imageURL and
  // resizingOptions from any request data ...
  return fetch(imageURL, {cf:{image:resizingOptions}})
}
```

This code will be run for every request, but the source code won’t be accessible to website visitors. This allows the the code to perform security checks and contain secrets required to access the images in a controlled manner.

The examples below are only suggestions, and don’t have to be followed exactly. You can compute image URLs and resizing options any way you like.

<Aside type="warning">

__Warning:__ When testing image resizing, please deploy the script, and test it from a regular web browser window. The preview in the Dashboard doesn’t simulate image resizing.

</Aside>

## Hiding the image sever

```js
async function handleRequest(request) {
  const resizingOptions = {/* resizing options will be demonstrated in the next example */}

  const hiddenImageOrigin = "https://secret.example.com/hidden-directory"
  const requestURL = new URL(request.url)
  // Append the request path such as "/assets/image1.jpg" to the hiddenImageOrigin.
  // You could also process the path to add or remove directories, modify filenames, etc.
  const imageURL = hiddenImageOrigin + requestURL.path
  // This will fetch image from the given URL, but to the website visitors this
  // will appear as a response to the original request. Visitor’s browser will
  // not see this URL.
  return fetch(imageURL, {cf:{image:resizingOptions}})
}
```

## Preventing access to full-size images

On top of protecting the original image URL, you can also validate that only certain image sizes are allowed:

```js
async function handleRequest(request) {
  const imageURL = … // detail omitted in this example, see the previous example

  const requestURL = new URL(request.url)
  const resizingOptions = {
    width: requestURL.searchParams.get("width"),
  }
  // If someone tried to manipulate your image URLs to reveal higher-resolution images,
  // you can catch that and refuse to serve the request (or enforce a smaller size, etc.)
  if (resizingOptions.width > 1000) {
    throw Error("We don’t allow viewing images larger than 1000 pixels wide")
  }
  return fetch(imageURL, {cf:{image:resizingOptions}})
}
```

## Avoiding image dimensions in URLs

And you don’t have to include actual pixel dimensions in the URL. You can embed sizes in the Worker script, and select the size in some other way, e.g. by naming a preset in the URL:

```js
async function handleRequest(request) {
  const requestURL = new URL(request.url)
  const resizingOptions = {}

  // The regex selects the first path component after "images"
  // prefix, and the rest of the path (e.g. "/images/first/rest")
  const match = requestURL.path.match(/images\/([^/]+)\/(.+)/)

  // You can require the first path component to be one of the
  // predefined sizes only, and set actual dimensions accordingly.
  switch (match && match[1]) {
    case "small": resizingOptions.width = 300; break;
    case "medium": resizingOptions.width = 600; break;
    case "large": resizingOptions.width = 900; break;
    default:
      throw Error("invalid size");
  }

  // The remainder of the path may be used to locate the original
  // image, e.g. here "/images/small/image1.jpg" would map to
  // "https://storage.example.com/bucket/image1.jpg" resized to 300px.
  const imageURL = "https://storage.example.com/bucket/" + match[2]
  return fetch(imageURL, {cf:{image:resizingOptions}})
}
```

## Origin cache is shared

We do not support cookies or HTTP authorization in requests to the origin server (cookies and unsupported headers will be stripped). This is because private/personalized requests can’t be cached, but we have to cache resized images to ensure good performance.

You can perform per-request access control in the Worker. If the images are personalized at the origin server, put the personalization options in the image URL.

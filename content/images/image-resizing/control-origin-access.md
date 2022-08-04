---
pcx_content_type: reference
title: Control origin access
weight: 8
---

# Control origin access

You can serve resized images without giving access to the original image. Images can be hosted on another server outside of your zone, and the true source of the image can be entirely hidden. The origin server may require authentication to disclose the original image, without needing visitors to be aware of it. Access to the full-size image may be prevented by making it impossible to manipulate resizing parameters.

All these behaviors are completely customizable, because they are handled by custom code of a script running [on the edge in a Cloudflare Worker](/images/image-resizing/resize-with-workers/).

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

This code will be run for every request, but the source code will not be accessible to website visitors. This allows the code to perform security checks and contain secrets required to access the images in a controlled manner.

The examples below are only suggestions, and do not have to be followed exactly. You can compute image URLs and resizing options in many other ways.

{{<Aside type="warning" header="Warning">}}

When testing Image Resizing, make sure you deploy the script and test it from a regular web browser window. The preview in the dashboard does not simulate Image Resizing.

{{</Aside>}}

## Hiding the image server

```js
async function handleRequest(request) {
  const resizingOptions = {/* resizing options will be demonstrated in the next example */}

  const hiddenImageOrigin = "https://secret.example.com/hidden-directory"
  const requestURL = new URL(request.url)
  // Append the request path such as "/assets/image1.jpg" to the hiddenImageOrigin.
  // You could also process the path to add or remove directories, modify filenames, etc.
  const imageURL = hiddenImageOrigin + requestURL.path
  // This will fetch image from the given URL, but to the website's visitors this
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
  // If someone tries to manipulate your image URLs to reveal higher-resolution images,
  // you can catch that and refuse to serve the request (or enforce a smaller size, etc.)
  if (resizingOptions.width > 1000) {
    throw Error("We don’t allow viewing images larger than 1000 pixels wide")
  }
  return fetch(imageURL, {cf:{image:resizingOptions}})
}
```

## Avoid image dimensions in URLs

You do not have to include actual pixel dimensions in the URL. You can embed sizes in the Worker script, and select the size in some other way — for example, by naming a preset in the URL:

```js
async function handleRequest(request) {
  const requestURL = new URL(request.url)
  const resizingOptions = {}

  // The regex selects the first path component after the "images"
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

## Authenticated origin

To ensure good performance, Cloudflare Image Resizing caches resized images. Since it would not be safe to share images customized for individual visitors, it is generally not recommended to resize images stored with restricted access. However, in cases where the customer agrees to store such images in public cache, Cloudflare supports resizing images through Workers. At the moment, this is supported on authenticated AWS, Azure, SecureAuth origins and origins behind Cloudflare Access:

```js
---
highlight: [9]
---
// generate signed headers (application specific)
const signedHeaders = generatedSignedHeaders();
 
fetch(private_url, {
  headers: signedHeaders
  cf: {
    image: {
      format: "auto",
      "origin-auth": "share-publicly"
     }
  }
})
```

When using this code, the following headers are passed through to the origin, and allow your request to be successful:

- `Authorization`
- `Cookie`
- `x-amz-content-sha256`
- `x-amz-date`
- `x-ms-date`
- `x-ms-version`
- `x-sa-date`
- `cf-access-client-id`
- `cf-access-client-secret`

For more information, refer to:

- [AWS docs](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html)
- [Azure docs](https://docs.microsoft.com/en-us/rest/api/storageservices/List-Containers2#request-headers)
- [Cloudflare Zero Trust docs](/cloudflare-one/identity/service-tokens/)
- [SecureAuth docs](https://docs.secureauth.com/2104/en/authentication-api-guide.html)

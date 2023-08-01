---
pcx_content_type: reference
title: Custom paths
layout: single
meta:
    title: Serve images from custom paths
---

# Serve images from custom paths

You can use Transform Rules to rewrite URLs for every image that you transform through Image Resizing.

This page covers examples for the following scenarios:

- Serve images from custom paths
- Modify existing URLs to be compatible with Image Resizing
- Add parameters to every image that passes through Image Resizing

To create a rule, log in to the Cloudflare dashboard and select your account and website. Then, select **Rules** > **Transform Rules**.

## Before you start

Every rule runs before and after the Image Resizing request.

If the path for the request matches the path where the original images are stored on your server, this may cause the request to fetch the original image to loop. 

To direct the request to the origin server, you can check for the string `image-resizing` in the `Via` header:

`...and (not (any(http.request.headers["via"][*] contains "image-resizing")))`

## Serve images from custom paths 

By default, requests to transform images through Image Resizing are served from the `/cdn-cgi/image/` path.

This example lets you rewrite a request to `example.com/cdn-cgi/image/` to `example.com/images`:

```txt
---
header: Text in Expression Editor
---
(http.request.uri.path matches "^/images/.*$") and (not (any(http.request.headers["via"][*] contains "image-resizing")))
```

```txt
---
header: Text in Path > Rewrite to... > Dynamic
---
regex_replace(   http.request.uri.path,   "^/images/",   "/cdn-cgi/image/" )
```

## Modify existing URLS to be compatible with Image Resizing

This example lets you rewrite your URL parameters to be compatible with Image Resizing:

```
---
header: Text in Expression Editor
---
(http.request.uri matches "^/(.*)\\?width=([0-9]+)&height=([0-9]+)$")
```

```txt
---
header: Text in Path > Rewrite to... > Dynamic
---
regex_replace(
  http.request.uri.path, 
  "^/(.*)\\?width=([0-9]+)&height=([0-9]+)$",
  "/cdn-cgi/image/width=${2},height=${3}/${1}"
)
```

Leave the **Query** > **Rewrite to...** > *Static* field empty.

## Add parameters to every image that passes through Image Resizing

This example lets you add `format=auto` to every image that passes through Image Resizing on your zone:

```
---
header: Text in Expression Editor
---
(http.request.uri.path.extension matches "(jpg)|(jpeg)|(png)|(gif)") and (not (any(http.request.headers["via"][*] contains "image-resizing")))
```

```txt
---
header: Text in Path > Rewrite to... > Dynamic
---
regex_replace(http.request.uri.path, "/(.*)", "/cdn-cgi/image/format=auto/${1}")
```
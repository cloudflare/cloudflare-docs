---
title: Images (beta)
order: 7
pcx-content-type: how-to
---

# Cloudflare Images API (beta)

Cloudflare Images API provides an end-to-end solution to build your image pipeline.  It aims to answer the most common challenges associated with building and maintaining your image infrastructure:

1. “Where do we store images?”
2. “How do we secure, resize, and optimize the images for different use cases?”
3. “How do we serve the images to our users reliably?”
4. “How do we do all of these things at scale while having predictable and affordable pricing, especially during spikes?”

To learn more about the vision behind Images, [read the Images blog post.](https://blog.cloudflare.com/announcing-cloudflare-images-beta/) 

## Availability

Cloudflare Images is currently in closed beta. To request an invite, [click here.](https://docs.google.com/forms/d/1x1caSSYQn10dRjxNLJlG-MdHgLnUa2mnR6iUpa2ahxI/edit) 

## Limitations

Currently, Cloudflare Images API requires use of your auth key and email. Support for Bearer Tokens will be added soon.

## Uploading Images

Once you have access to Images, you can upload pictures by call the /images endpoint:

```bash
curl https://api.cloudflare.com/client/v4/accounts/$account_tag/images/v1 \
-H "X-Auth-Key: $auth_key" \
-H "X-Auth-Email: $auth_email" \
-F file=@./logo.png
```

If the upload is successful, you can expect a JSON response body similar to this:

```json
{
   "result": {
      "filename": "logo.png",
      "id": "MTt4OTd0b0w5ajZxR0pLaXRldlBtaFhhO2FiZGVnaA==",
      "variants": [
         {
            "name": "default",
            "url": "https://imagedelivery.net/default/MTt4OTd0b0w5ajZxR0pLaXRldlBtaFhhO2FiZGVnaA=="
         }
      ]
   },
   "success": true,
   "errors": [],
   "messages": []
}
```

## Displaying Images

When you upload an image, you will see a `url` property that can be used to serve the image.
  
Currently, all images are auto-optimized based on device type. In future, we will be introducing custom variants so you can configure exactly how you'd like the image to be optimized.

When you upload an image, you will see a `url` property that can be used to serve the image.
  
Currently, all images are auto-optimized based on device type. In future, we will be introducing custom variants so you can configure exactly how you'd like the image to be optimized.

### Default Variant
The `default` variant has the following preconfigured settings based on device type:
   
   * Desktop: format = auto, fit = scale-down, height = 1440, width: 2560, metadata = none, quality = 85
   * Mobile: format = auto, fit = scale-down, height = 720, width: 1080, metadata = none, quality = 85
   * Tablet: format =. auto, fit = scale-down, height = 1080, width: 1920, metadata = none, quality = 85

If the device type cannot be inferred, the default variant will use the `Desktop` subvariant.

## Deleting Images
```bash
curl -X DELETE https://api.cloudflare.com/client/v4/accounts/$account_tag/images/v1/MTt4OTd0b0w5ajZxR0pLaXRldlBtaFhhO2FiZGVnaA== \
-H "X-Auth-Key: $auth_key" \
-H "X-Auth-Email: $auth_email"

```

If the upload is successful, you can expect a JSON response body similar to this:

```json
{
  "result": {
    "id": "MTt4OTd0b0w5ajZxR0pLaXRldlBtaFhhO2FiZGVnaA=="
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Roadmap

We're just getting started with Cloudflare Images. Here are some of the features you can expect over the next quarter:

<TableWrap>

| Feature | Description |
|------------------|-------------|
| Token Uploads | Enable your users to upload images directly to Cloudflare |
| Dashboard UI | Ability to upload and manage images using the Cloudflare Dashboard |
| Custom Variants | Define custom variants and associate them with your images |
| Signed URL Support | Require a signed URL for access to your images |

</TableWrap>

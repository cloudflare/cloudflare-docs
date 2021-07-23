---
title: How to use Images
order: 1
pcx-content-type: tutorial
---

# Uploading Images

Once you have access to Images, you can upload pictures by calling the /images endpoint:

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
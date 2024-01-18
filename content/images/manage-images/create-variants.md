---
pcx_content_type: how-to
title: Create variants
weight: 5
---

# Create variants

Variants let you specify how images should be resized for different use cases. By default, images are served with a `public` variant, but you can create up to 100 variants to fit your needs. Follow these steps to create a variant.

{{<Aside type="note">}}
Cloudflare Images can deliver SVG files but will not resize them because it is an inherently scalable format.
Resize via the Cloudflare dashboard.
{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Images** > **Variants**.
3. Name your variant and select **Add New Variant**.
4. Define variables for your new variant, such as resizing options, type of fit, and specific metadata options.

## Resize via the API

Make a `POST` request to [create a variant](/api/operations/cloudflare-images-variants-create-a-variant).

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/variants" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --data '{"id":"<NAME_OF_THE_VARIANT>","options":{"fit":"scale-down","metadata":"none","width":1366,"height":768},"neverRequireSignedURLs":true}
```

## Fit options

The `Fit` property describes how the width and height dimensions should be interpreted. The chart below describes each of the options.

| Fit Options | Behavior |
|-------------|----------|
| Scale down | The image is shrunk in size to fully fit within the given width or height, but will not be enlarged.|
| Contain    | The image is resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio.|
| Cover      | The image is resized to exactly fill the entire area specified by width and height and will be cropped if necessary.|
| Crop       | The image is shrunk and cropped to fit within the area specified by the width and height. The image will not be enlarged. For images smaller than the given dimensions, it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`.|
| Pad        | The image is resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio. The extra area is filled with a background color (white by default).|

## Metadata options

Variants allow you to choose what to do with your image’s metadata information. From the **Metadata** dropdown, choose:

- Strip all metadata
- Strip all metadata except copyright
- Keep all metadata

## Public access

When the **Always allow public access** option is selected, particular variants will always be publicly accessible, even when images are made private through the use of [signed URLs](/images/serve-images/serve-private-images).
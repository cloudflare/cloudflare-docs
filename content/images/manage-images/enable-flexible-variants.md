---
pcx_content_type: how-to
title: Enable flexible variants
weight: 11
---

# Enable flexible variants

Flexible variants allow you to create variants with dynamic resizing which can provide more options than regular variants allow. This option is not enabled by default.

## Enable flexible variants via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Images** > **Variants**.
3. Enable **Flexible variants**.

## Enable flexible variants via the API

Make a `PATCH` request to the [Update a variant endpoint](/api/operations/cloudflare-images-variants-update-a-variant).

```bash
curl -X PATCH https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/config \
    --header "Authorization: Bearer <API_TOKEN>" \
    --header "Content-Type: application/json" \
    --data '{"flexible_variants": true}'
```

After activation, you can use the resizing parameters on any Cloudflare image. For example:

`https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/w=400,sharpen=3`

Note that flexible variants cannot be used for images that require a [signed delivery URL](/images/manage-images/serve-images/serve-private-images).

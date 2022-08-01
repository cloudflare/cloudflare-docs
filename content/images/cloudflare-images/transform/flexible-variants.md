---
pcx_content_type: reference
title: Flexible variants
weight: 2
---


# Flexible variants

If you need more flexibility when creating variants than the Cloudflare Images dashboard allows, you can use the API to create flexible variants. Flexible variants allow you to create variants with dynamic resizing. This option is not enabled by default. To activate flexible variants for your account:

```bash
curl -X PATCH https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/config \
    -H "Authorization: Bearer <API_TOKEN>" \
    -H "Content-Type: application/json" \
    --data '{"flexible_variants": true}'
```

Once activated, it is possible to use resizing parameters on any Cloudflare Image. For example:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID/w=400,sharpen=3
```

Note that flexible variants cannot be used for images that require a [signed delivery URL](/images/cloudflare-images/serve-images/serve-private-images-using-signed-url-tokens/).

{{<Aside type="warning" header="Warning">}}

Enabling flexible variants on your account effectively allows anyone to obtain untransformed, full-resolution images and their metadata by changing variant properties in the URL.

{{</Aside>}}

### Supported properties

You must specify at least one option. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated.

{{<render file="_supported-properties.md">}}
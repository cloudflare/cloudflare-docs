---
pcx_content_type: reference
title: Flexible variants
weight: 2
---


# Flexible variants

If you need more flexibility than regular variants allow, you can create flexible variants. Flexible variants allow you to create variants with dynamic resizing. This option is not enabled by default. You can enable flexible variants through the dashboard or via API.

{{<Aside type="warning" header="Warning">}}

Enabling flexible variants on your account effectively allows anyone to obtain untransformed, full-resolution images and their metadata by changing variant properties in the URL.

{{</Aside>}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Images** > **Variants**.
3. Enable **Flexible variants**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
```bash
curl -X PATCH https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/config \
    -H "Authorization: Bearer <API_TOKEN>" \
    -H "Content-Type: application/json" \
    --data '{"flexible_variants": true}'
```
 
{{</tab>}}
{{</tabs>}}

Once activated, it is possible to use resizing parameters on any Cloudflare Image. For example:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/w=400,sharpen=3
```

Note that flexible variants cannot be used for images that require a [signed delivery URL](/images/cloudflare-images/serve-images/serve-private-images-using-signed-url-tokens/), and that Cloudflare Images does not resize [SVG files](/images/cloudflare-images/upload-images/formats-limitations/#svg-files).

### Supported properties

You must specify at least one option. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated.

{{<render file="_supported-properties.md">}}
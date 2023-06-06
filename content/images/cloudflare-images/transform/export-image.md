---
pcx_content_type: how-to
title: Export images
weight: 7
---

# Export images

Cloudflare Images supports image exports. This feature is available both in the Cloudflare dashboard and via API.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Images**.
3. Find the image or images you want to export.
4. If you want to export a single image, select **Export**. If you need to export several images, first select the checkbox on the images you want to export and then select **Export selected**.

Your images will be downloaded to your computer.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To download an image via API, the syntax is as follows:

```txt
GET accounts/<ACCOUNT_ID>/images/v1/<IMAGE_ID>/blob
```

`<IMAGE_ID>` must be fully URL encoded in the API call URL.

Example:

```bash
$ curl -X GET "https://api.cloudflare.com/client/v4/accounts/023e105f4ecef8ad9ca31a8372d0c353/images/v1/ZxR0pLaXRldlBtaFhhO2FiZGVnaA/blob" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
```

Refer to the [API documentation](/api/operations/cloudflare-images-base-image) for more information.

{{</tab>}}
{{</tabs>}}
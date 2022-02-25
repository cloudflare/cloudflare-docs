---
order: 8
pcx-content-type: how-to
title: Export image
---

# Export a single image

You can export a single image from Cloudflare Images. This feature is supported both in the Cloudflare dashboard and via API.

## Export a single image in the dashboard

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Click **Images**.
3.  Find the image you want to export and click **Export**.

Your image will be downloaded to your computer.

## Export a single image via API

To download an image via API, the syntax is as follows:

```txt
GET accounts/<ACCOUNT_ID>/images/v1/<IMAGE_ID>/blob
```

Example:

```bash
$ curl -X GET "https://api.cloudflare.com/client/v4/accounts/023e105f4ecef8ad9ca31a8372d0c353/images/v1/ZxR0pLaXRldlBtaFhhO2FiZGVnaA/blob" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41"
```

Refer to the [API documentation](https://api.cloudflare.com/#cloudflare-images-base-image) for more information.

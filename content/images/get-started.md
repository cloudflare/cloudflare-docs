---
pcx_content_type: get-started
title: Get started
weight: 2
---

# Get started

In this guide, you will get started with Cloudflare Images and make your first API request. 

## Prerequisites

Before you make your first API request, ensure that you have a Cloudflare Account ID and an API token. 

Refer to [Find zone and account IDs](/fundamentals/setup/find-account-and-zone-ids/) for help locating your Account ID and [Create an API token](/fundamentals/api/get-started/create-token/) to learn how to create an access your API token.

## Make your first API request

```curl
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1 \
  --header 'Authorization: <API_TOKEN> \
  --header 'Content-Type: multipart/form-data' \
  --form file=@./<YOUR_IMAGE.IMG>
```

## Enable transformations

Transformations let you optimize images that are stored outside of Cloudflare Images. Cloudflare will automatically cache every transformed image on our global network so that you store only the original image at your origin.

To use transformations, you’ll need to enable this feature on each zone:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Images** > **Transformations**.
3. Select the zone where you want to enable transformations.
4. Select **Enable**.
5. To transform images only from the enabled zone, uncheck **Resize images from any origin**. This will prevent third parties from resizing images at any origin.

{{<Aside type="note">}}

If you are using transformations in a Worker, you need to include the appropriate logic in your Worker code to prevent resizing images from any origin. Unchecking this option in the dash does not apply to transformation requests coming from Cloudflare Workers.

{{</Aside>}}

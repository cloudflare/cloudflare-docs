---
pcx_content_type: reference
title: Make an image private
weight: 9
---

# Make an image private

You can require an image to only be accessible with a signed URL token. To make an image private, pass a JSON blob with the `requireSignedURLs` property set to `true` at the time you request a one-time upload URL:

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/direct_upload \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <API_TOKEN>' \
  --data '{
	  "requireSignedURLs":"true"
   }'
```

If an image is marked to require signed URLs, it can only be accessed using a signed URL token or using a Variant with **Always allow public access** property checked.
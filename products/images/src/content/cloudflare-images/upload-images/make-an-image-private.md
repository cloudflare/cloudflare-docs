---
order: 3
pcx-content-type: reference
---

# Making an image private

You can require an image to only be accessible with a signed URL token. To make an image private, pass a JSON blob with `requireSignedURLs` property set to true at the time you request a one-time upload URL:

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/:account_id/images/v1/direct_upload \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer :token' \
  --data '{
	  "requireSignedURLs":"true"
   }'
```

If an image is marked to require signed URLs, it can only be accessed using a signed URL token or using a Variant with `Always allow public access` property checked.

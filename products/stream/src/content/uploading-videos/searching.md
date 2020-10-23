# Searching over videos

You can search for videos by name through the Stream API by adding a `search` query parameter to the [list media files](https://api.cloudflare.com/#stream-videos-list-videos) endpoint.

## What you will need

To make API requests you will need a [Cloudflare API token](https://www.cloudflare.com/a/account/my-account) and your Cloudflare [account ID](https://www.cloudflare.com/a/overview/).

## cURL example

This example lists media where the name matches `puppy.mp4`.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream?search=puppy" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json"
```

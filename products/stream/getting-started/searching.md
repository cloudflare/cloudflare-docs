---
title: "Searching"
weight: 5
---

### Searching Videos

You can search for videos by name through the Stream API by adding a `search` query parameter to the [list media files](https://api.cloudflare.com/#stream-videos-list-videos) endpoint.

### What You Will Need

To make API requests you will need your [Cloudflare API key](https://www.cloudflare.com/a/account/my-account), your email address and your Cloudflare [account ID](https://www.cloudflare.com/a/overview/).

### cURL example

This example lists media where the name matches `puppy.mp4`.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/stream?search=puppy.mp4" \
     -H "X-Auth-Email: {email}" \
     -H "X-Auth-Key: {api-key}" \
     -H "Content-Type: application/json"
```

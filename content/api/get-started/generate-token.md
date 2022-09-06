---
title: Generate token
pcx_content_type: how-to
weight: 13
---

# Generate the token

Once successfully generated, the token secret is **only shown once**. Make sure to copy the secret to a secure place.

*Warning:* Do not store the secret in plaintext where others may be able to access it. Anyone with this token can perform the authorized actions against the resources the token has been granted access to.

![Token creation completion screen displaying your API token and the `curl`command to test your token](/api/static/token-complete.png)

This screen also includes an example command to test the token (reproduced below). The `/user/tokens/verify` endpoint allows fetching the current status of the given token.

```bash
 curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
     -H "Authorization: Bearer <token secret>" \
     -H "Content-Type:application/json"
```

The result:

```json
{
  "result": {
    "id": "100bf38cc8393103870917dd535e0628",
    "status": "active"
  },
  "success": true,
  "errors": [],
  "messages": [
    {
      "code": 10000,
      "message": "This API Token is valid and active",
      "type": null
    }
  ]
}
```

With this you have successfully created an API Token and can now start working with the Cloudflare API.
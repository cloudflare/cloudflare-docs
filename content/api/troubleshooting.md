---
pcx_content_type: reference
title: Troubleshooting
weight: 3
---

# Troubleshooting API tokens and keys

## The token itself is not verified
Ensure the token has been verified by running the following curl and confirming that the response returns `"status": "active"`.

```bash
curl -X GET 
"https://api.cloudflare.com/client/v4/user/tokens/verify" \
-H "Authorization: Bearer " \
-H "Content-Type:application/json"

{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "f267e341f3dd4697bd3b9f71dd96247f",
    "status": "active",
    "not_before": "2018-07-01T05:20:00Z",
    "expires_on": "2020-01-01T00:00:00Z"
  }
  ```

## The token has incorrect permissions
Review the permissions groups for your token in the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens). Refer to [API token permissions](/api/reference/permissions) for more information.

## The incorrect syntax is used
Occasionally customers will attempt to use an API token with an API key syntax. Ensure you are using the Bearer option rather than the email and API key pair.

## You have the incorrect user permissions
You cannot create a token that exceeds the permission granted to you on your account. For example, if you have been granted an **Admin (Read only)** role, you would need your Super Administrator to update your role so that you could create a token for yourself.
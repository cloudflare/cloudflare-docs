---
order: 11
type: how to
---

# Main API token issues

- **The token itself is not verified**

You can ensure the token has been verified by running the following curl example and confirming the response returns ``status: active``.

```bash
 curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
     -H "Authorization: Bearer <token secret>" \
     -H "Content-Type: application/json"
```

- **The token has incorrect permissions**

Send us a screenshot of the permissions you have set up so that we can verify that the permission has been correctly set.

- **Incorrect syntax**

On occasion, customers will attempt to use an API Token using the API Key syntax. Ensure you are using the _Bearer_ option, rather than the Email and API key pair.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens?page=1&per_page=20&direction=desc" \
    -H "Authorization: Bearer 8M7wS6hCpXVc-DoRnPPY_UCWPgy8aea4Wy6kCe5T"
```

- **Incorrect user permissions when attempting to create a token**

You cannot create a token for yourself exceeding the permission granted to you on your account. For example, if you have been granted an _Admin (Read only)_ role, you would need your Super Administrator to update your role so that you could create a token for yourself.

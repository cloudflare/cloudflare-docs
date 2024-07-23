---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate`

When making requests to Replicate, replace `https://api.replicate.com/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate`.

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate/predictions \
  --header 'Authorization: Token {replicate_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "input":
      {
        "prompt": "What is Cloudflare?"
      }
    }'
```

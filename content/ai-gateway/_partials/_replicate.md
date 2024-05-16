---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_slug}/replicate`

When making requests to Replicate, replace `https://api.replicate.com/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_slug}/replicate`.

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_slug}/replicate/predictions -X POST \
  --header 'Authorization: Token {replicate_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "version": "2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
    "input": {
   	 "prompt": "What is Cloudflare?"
    }
}'
```

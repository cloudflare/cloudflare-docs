---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/anthropic`

When making requests to Anthropic, replace `https://api.anthropic.com/v1/` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/anthropic`.

```bash
---
header: Request
---

curl -X POST https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/anthropic/messages \
  -H 'x-api-key: XXX' \
  -H "anthropic-version: 2023-06-01" \
  -H 'Content-Type: application/json' \
  -d '{
      "model": "claude-3-opus-20240229",
      "max_tokens": 1024,
      "messages": [
          {"role": "user", "content": "Hello, world"}
      ]
    }'
```
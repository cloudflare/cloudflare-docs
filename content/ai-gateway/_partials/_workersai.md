---
_build:
  publishResources: false
  render: never
  list: never
---
`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai/`

When making requests to Workers AI, replace `https://api.cloudflare.com/client/v4/accounts/ACCOUNT_TAG/ai/run` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai`.

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai/@cloudflare/meta-llama/llama-2-7b -X POST \
  --header 'Authorization: Token $TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{ "prompt": "Where did the phrase 'Hello World' come from" } }'
```

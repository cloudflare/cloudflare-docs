---
title: Workers AI
pcx_content_type: get-started
weight: 1
---

# Workers AI
When making requests to Workers AI, replace `https://api.cloudflare.com/client/v4/accounts/ACCOUNT_TAG/ai/run` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai`. 

```
curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai/text_classification -X POST \
  --header 'Authorization: Token XXX \
  --header 'Content-Type: application/json' \
  --data '{  "text": "the pizza is amazing!" }'
```
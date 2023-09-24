---
title: Replicate
pcx_content_type: get-started
weight: 5
---

# Replicate

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/replicate`

When making requests to OpenAI, replace `https://api.replicate.com/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/replicate`. 

```
curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/replicate/predictions -X POST \
  --header 'Authorization: Token XXX \
  --header 'Content-Type: application/json' \
  --data '{
    "version": "2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
    "input": {
   	 "prompt": "what is the weather in SF?"
    }
}'
```

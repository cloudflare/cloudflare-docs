---
title: Replicate
pcx_content_type: get-started
---

# Replicate
[Replicate](https://replicate.com/) runs and fine tunes open-source models.

## Endpoint

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate`

## URL structure

When making requests to Replicate, replace `https://api.replicate.com/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/replicate`.

## Example

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

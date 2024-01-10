---
_build:
  publishResources: false
  render: never
  list: never
---
`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai/`

When making requests to Workers AI, replace `https://api.cloudflare.com/client/v4/accounts/ACCOUNT_TAG/ai/run` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai`.

Then add the model you want to run at the end of the URL. You can see the list of [Workers AI models](https://developers.cloudflare.com/workers-ai/models/) and pick the ID. 

You'll need to generate an [API token](https://dash.cloudflare.com/profile/api-tokens) with Workers AI read access and use it in your request.

```bash
---
header: Request to Workers AI llama model
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai/@cf/meta/llama-2-7b-chat-int8  -X POST \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{ "prompt": "Where did the phrase Hello World come from" }'
```

```bash
---
header: Request to Workers AI text classification model
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai/@cf/huggingface/distilbert-sst-2-int8 -X POST \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{ "text": "This pizza is amazing!" }'
```
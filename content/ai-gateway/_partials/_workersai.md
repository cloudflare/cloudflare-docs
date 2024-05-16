---
_build:
  publishResources: false
  render: never
  list: never
---
`https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_SLUG>/workers-ai/`

When making requests to Workers AI, replace `https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/run` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_SLUG>/workers-ai`.

Then add the model you want to run at the end of the URL. You can see the list of [Workers AI models](https://developers.cloudflare.com/workers-ai/models/) and pick the ID.

You'll need to generate an [API token](/fundamentals/api/get-started/create-token/) with Workers AI read access and use it in your request.

```bash
---
header: Request to Workers AI llama model
---

curl -X POST https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_SLUG>/workers-ai/@cf/meta/llama-2-7b-chat-int8 \
 --header 'Authorization: Bearer <CLOUDFLARE_TOKEN>' \
 --header 'Content-Type: application/json' \
 --data '{"prompt": "What is Cloudflare?"}'
```

```bash
---
header: Request to Workers AI text classification model
---

curl -X POST https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_SLUG>/workers-ai/@cf/huggingface/distilbert-sst-2-int8 \
  --header 'Authorization: Bearer <CLOUDFLARE_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{ "text": "This pizza is amazing!" }'
```
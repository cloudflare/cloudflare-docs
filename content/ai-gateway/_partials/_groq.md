---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY>/groq`

When making requests to [Groq](https://groq.com/), replace `https://api.groq.com/openai/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY>/groq`.

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY>/chat/completions -X POST \
  --header 'Authorization: Bearer <GROQ_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "messages": [
        {
            "role": "user",
            "content": "Explain the importance of fast language models"
        }
    ],
    "model": "mixtral-8x7b-32768"
}'
```
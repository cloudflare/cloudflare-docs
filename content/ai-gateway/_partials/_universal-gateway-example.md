---
_build:
  publishResources: false
  render: never
  list: never
---

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_slug} -X POST \
  --header 'Content-Type: application/json' \
  --data '[
  {
    "provider": "workers-ai",
    "endpoint": "@cf/meta/llama-2-7b-chat-int8",
    "headers": {
      "Authorization": "Bearer <ClOUDFLARE_API_TOKEN>",
      "Content-Type": "application/json"
    },
    "query": {
      "messages": [
        {
          "role": "system",
          "content": "You are a friendly assistant"
        },
        {
          "role": "user",
          "content": "Why is pizza so good"
        }
      ]
    }
  },
  {
    "provider": "openai",
    "endpoint": "chat/completions",
    "headers": {
      "Authorization": "Bearer <OPEN_AI_TOKEN>",
      "Content-Type": "application/json"
    },
    "query": {
      "model": "gpt-3.5-turbo",
      "stream": true,
      "messages": [
        {
          "role": "user",
          "content": "What is Cloudflare?"
        }
      ]
    }
  }
]'
```
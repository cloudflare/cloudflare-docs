---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY>/cohere`

When making requests to [Cohere](https://cohere.com/), replace `https://api.cohere.ai/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY>/cohere`.

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY>/cohere/v1/chat -X POST \
  --header 'Authorization: Token <COHERE_API_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
  "chat_history": [
    {"role": "USER", "message": "Who discovered gravity?"},
    {"role": "CHATBOT", "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"}
  ],
  "message": "What year was he born?",
  "connectors": [{"id": "web-search"}]
}'
```
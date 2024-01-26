---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/aws-bedrock`

When making requests to Amazon Bedrock, replace `https://bedrock-runtime.us-east-1.amazonaws.com/` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/aws-bedrock/bedrock-runtime/us-east-1/`.

Then add the model you want to run at the end of the URL.

```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/aws-bedrock/bedrock-runtime/us-east-1/model/amazon.titan-embed-text-v1/invoke \
  -u AccessKey:SecretKey \
  -H "Content-Type: application/json" \
  -v --aws-sigv4 aws:amz:us-east-1:bedrock \
  -d '{
    "inputText": "Cloudflare’s AI Gateway allows you to gain visibility and control over your AI apps"
    }'
```

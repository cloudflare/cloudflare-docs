---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/google-vertex-ai`


When making requests to Google Vertex, you will need:
- AI Gateway account tag
- AI Gateway gateway name
- Google Vertex API key
- Google Vertex Project Name
- Google Vertex Region (e.g., us-east4)
- Google Vertex model

Your new base URL will use the data above in this structure: `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/google-vertex-ai/v1/projects/PROJECT_NAME/locations/REGION`.

Then you can append the endpoint you want to hit, for example: `/publishers/google/models/gemini-1.0-pro-001:streamGenerateContent`

So your final URL will come together as: `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/google-vertex-ai/v1/projects/PROJECT_NAME/locations/REGION/publishers/google/models/gemini-1.0-pro-001:streamGenerateContent`

```bash
---
header: Example fetch request
---

curl -X POST "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/google-vertex-ai/v1/projects/PROJECT_NAME/locations/REGION/publishers/google/models/gemini-1.0-pro-001:streamGenerateContent" \
    -H "Authorization: Bearer XXX" \
    -H 'Content-Type: application/json' \
    -d '{
      "contents": [
          {
            "role": "user",
              "parts": [
                  {"text": "Tell me a joke"}
              ]
          }
      ]
    }' 

```
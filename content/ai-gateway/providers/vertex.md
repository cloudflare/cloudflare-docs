---
title: Google Vertex AI
pcx_content_type: get-started
---

{{<heading-pill style="beta">}}Google Vertex AI{{</heading-pill>}}

[Google Vertex AI](https://cloud.google.com/vertex-ai) enables developers to easily build and deploy enterprise ready generative AI experiences.

## Endpoint

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/google-vertex-ai`

## What you need

When making requests to Google Vertex, you will need:
- AI Gateway account tag
- AI Gateway gateway name
- Google Vertex API key
- Google Vertex Project Name
- Google Vertex Region (e.g., us-east4)
- Google Vertex model

## URL structure

Your new base URL will use the data above in this structure: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/google-vertex-ai/v1/projects/{project_name}/locations/{region}`.

Then you can append the endpoint you want to hit, for example: `/publishers/google/models/{model}:{generative_ai_rest_resource}`

So your final URL will come together as: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/google-vertex-ai/v1/projects/{project_name}/locations/{region}/publishers/google/models/gemini-1.0-pro-001:generateContent`

### Example

```bash
---
header: Example fetch request
---

curl "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/google-vertex-ai/v1/projects/{project_name}/locations/{region}/publishers/google/models/gemini-1.0-pro-001:generateContent" \
    -H "Authorization: Bearer {vertex_api_key}" \
    -H 'Content-Type: application/json' \
    -d '{
        "contents": {
          "role": "user",
          "parts": [
            {
              "text": "Tell me more about Cloudflare"
            }
          ]
        }'

```
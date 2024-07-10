---
pcx_content_type: configuration
weight: 4
title: Custom metadata
---

# Custom metadata

Custom metadata in AI Gateway allows you to tag requests with user IDs or other identifiers, enabling better tracking and analysis of your requests. Metadata values can be strings, numbers, or booleans, and will appear in your logs, making it easy to search and filter through your data.

## Key Features

- **Custom Tagging**: Add user IDs, team names, test indicators, and other relevant information to your requests.
- **Enhanced Logging**: Metadata appears in your logs, allowing for detailed inspection and troubleshooting.
- **Search and Filter**: Use metadata to efficiently search and filter through logged requests.

## Supported Metadata Types

- String
- Number
- Boolean

{{<Aside type="note">}}

Objects are not supported as metadata values.

{{</Aside>}}

## Implementations

### Using cURL

To include custom metadata in your request using cURL:

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'Authorization: Bearer {api_token}' \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-metadata: {"team": "AI", "user": 12345, "test":true}' \
  --data '{"model": "gpt-4o", "messages": [{"role": "user", "content": "What should I eat for lunch?"}]}'
```

### Using SDK

To include custom metadata in your request using the OpenAI SDK:

```javascript
import OpenAI from "openai";

export default {
 async fetch(request, env, ctx) {
   const openai = new OpenAI({
     apiKey: env.OPENAI_API_KEY,
     baseURL: "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
   });

   try {
     const chatCompletion = await openai.chat.completions.create(
       {
         model: "gpt-4o",
         messages: [{ role: "user", content: "What should I eat for lunch?" }],
         max_tokens: 50,
       },
       {
         headers: {
           "cf-aig-metadata": JSON.stringify({
             user: "JaneDoe",
             team: 12345,
             test: true
           }),
         },
       }
     );

     const response = chatCompletion.choices[0].message;
     return new Response(JSON.stringify(response));
   } catch (e) {
     console.log(e);
     return new Response(e);
   }
 },
};
```

### Using Binding

To include custom metadata in your request using [Bindings](/workers/runtime-apis/bindings/):

```javascript
export default {
 async fetch(request, env, ctx) {
   const aiResp = await env.AI.run(
       '@cf/mistral/mistral-7b-instruct-v0.1',
       { prompt: 'What should I eat for lunch?' },
       { gateway: { id: 'gateway_id', metadata: { "team": "AI", "user": 12345, "test": true} } }
   );

   return new Response(aiResp);
 },
};
```

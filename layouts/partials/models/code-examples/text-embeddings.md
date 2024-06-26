{{/* */}}
## Code Examples

<details>
  <summary>Worker - TypeScript</summary>

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    // Can be a string or array of strings]
    const stories = [
      "This is a story about an orange cloud",
      "This is a story about a llama",
      "This is a story about a hugging emoji",
    ];

    const embeddings = await env.AI.run(
      "{{ .Page.Params.model.name }}",
      {
        text: stories,
      }
    );

    return Response.json(embeddings);
  },
} satisfies ExportedHandler<Env>;
```

</details>

<details>
  <summary>Python</summary>

```py
import os
import requests


ACCOUNT_ID = "your-account-id"
AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")

stories = [
  'This is a story about an orange cloud',
  'This is a story about a llama',
  'This is a story about a hugging emoji'
]

response = requests.post(
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/{{ .Page.Params.model.name }}",
  headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
  json={"text": stories}
)

print(response.json())
```

</details>

<details>
  <summary>curl</summary>

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Page.Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -d '{ "text": ["This is a story about an orange cloud", "This is a story about a llama", "This is a story about a hugging emoji"] }'
```

</details>

<aside class="DocsMarkdown--aside" role="note" data-type="note">

<div class="DocsMarkdown--aside-header">OpenAI compatible endpoints</div>

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](/workers-ai/configuration/open-ai-compatibility/).

</aside>

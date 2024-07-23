{{/* */}}

## Code Examples

{{- $loraFlag := false }}
{{- range .Params.model.properties }}
{{- if and (eq .property_id "lora") (eq .value "true") }}
{{- $loraFlag = true }}
{{- end }}
{{- end }}

{{ if $loraFlag }}

<details>
  <summary>Worker</summary>

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run("{{ .Params.model.name }}", {
      prompt: "tell me a story",
      raw: true, //skip applying the default chat template
      lora: "00000000-0000-0000-0000-000000000", //the finetune id OR name
    });
    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

</details>

<details>
  <summary>curl</summary>

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{
    "prompt": "tell me a story",
    "raw": "true",
    "lora": "00000000-0000-0000-0000-000000000"
  }'
```

</details>

{{ else }}

<details>
  <summary>Worker - Streaming</summary>

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    const messages = [
      { role: "system", content: "You are a friendly assistant" },
      {
        role: "user",
        content: "What is the origin of the phrase Hello, World",
      },
    ];

    const stream = await env.AI.run("{{ .Params.model.name }}", {
      messages,
      stream: true,
    });

    return new Response(stream, {
      headers: { "content-type": "text/event-stream" },
    });
  },
} satisfies ExportedHandler<Env>;
```

</details>

<details>
  <summary>Worker</summary>

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    const messages = [
      { role: "system", content: "You are a friendly assistant" },
      {
        role: "user",
        content: "What is the origin of the phrase Hello, World",
      },
    ];
    const response = await env.AI.run("{{ .Params.model.name }}", { messages });

    return Response.json(response);
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

prompt = "Tell me all about PEP-8"
response = requests.post(
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/{{ .Params.model.name}}",
    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
    json={
      "messages": [
        {"role": "system", "content": "You are a friendly assistant"},
        {"role": "user", "content": prompt}
      ]
    }
)
result = response.json()
print(result)
```

</details>

<details>
  <summary>curl</summary>

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

</details>

<aside class="DocsMarkdown--aside" role="note" data-type="note">

<div class="DocsMarkdown--aside-header">OpenAI compatible endpoints</div>

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](/workers-ai/configuration/open-ai-compatibility/).

</aside>

{{ end }}

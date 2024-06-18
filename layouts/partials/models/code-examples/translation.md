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

    const response = await env.AI.run(
      "{{ .Page.Params.model.name }}",
      {
        text: "I'll have an order of the moule frites",
        source_lang: "english", // defaults to english
        target_lang: "french",
      }
    );

    return new Response(JSON.stringify(response));
  },
} satisfies ExportedHandler<Env>;
```

</details>

<details>
  <summary>Python</summary>

```py
import requests

API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"
headers = {"Authorization": "Bearer {API_TOKEN}"}

def run(model, input):
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()

output = run('{{ .Page.Params.model.name }}', {
  "text": "I'll have an order of the moule frites",
  "source_lang": "english",
  "target_lang": "french"
})

print(output)
```

</details>

<details>
  <summary>curl</summary>

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Page.Params.model.name }} \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{ "text": "Ill have an order of the moule frites", "source_lang": "english", "target_lang": "french" }'
```

</details>

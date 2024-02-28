{{/* */}}
## Code Examples

<details>
  <summary>Worker - TypeScript</summary>

```ts
import { Ai } from "@cloudflare/ai";

export interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const response = await ai.run<"{{ .Page.Params.model.name }}">(
      "{{ .Page.Params.model.name }}",
      {
        text: "This pizza is great!",
      }
    );

    return Response.json(response);
  },
};
```

</details>

<details>
  <summary>Python</summary>

```py
API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/"
headers = {"Authorization": "Bearer {API_KEY}"}

def run(model, input):
    response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input)
    return response.json()

output = run("{{ .Page.Params.model.name }}", { "text": "This pizza is great!" })
print(output)
```

</details>

<details>
  <summary>curl</summary>

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Page.Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -d '{ "text": "This pizza is great!" }'
```

</details>

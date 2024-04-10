{{/* */}}

## Code Examples

<details>
  <summary>Workers - TypeScript</summary>

```ts
import { Ai } from "@cloudflare/ai";

export interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);
    const input = {
      image: [], // image array buffer
      prompt: "Generate a caption for this image",
      max_tokens: 512,
    };
    const response = await ai.run("{{ .Page.Params.model.name}}", input);
    return Response.json({ response });
  },
};
```

</details>

<details>
  <summary>curl</summary>

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Page.Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --data '{
    "image": [255, 255, 255, 0, 0, 0, 255, 255, 255],
    "prompt": "Generate a caption for this image",
    "max_tokens": 512
  }'
```

</details>

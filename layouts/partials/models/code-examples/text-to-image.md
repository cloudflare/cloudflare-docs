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

    const inputs = {
      prompt: "cyberpunk cat",
    };

    const response = await ai.run<"{{ .Page.Params.model.name }}">(
      "{{ .Page.Params.model.name }}",
      inputs
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
};
```

</details>

<details>
  <summary>curl</summary>

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Page.Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -d '{ "prompt": "cyberpunk cat" }'
```

</details>

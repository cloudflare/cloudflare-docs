{{/* */}}
## Code Examples

<details>
  <summary>Worker - TypeScript</summary>

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env) {
    const res: any = await fetch("https://cataas.com/cat");
    const blob = await res.arrayBuffer();

    const inputs = {
      image: [...new Uint8Array(blob)],
    };

    const response = await env.AI.run(
      "{{ .Page.Params.model.name }}",
      inputs
    );

    return new Response(JSON.stringify(response));
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
    --data-binary @orange-llama.png
```

</details>

{{/* */}}
## Code Examples

<details>
  <summary>Workers - Typescript</summary>

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {
    const response = await env.AI.run("{{ .Params.model.name }}", {
      input_text: "Workers AI allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via the Cloudflare API. With the launch of Workers AI, Cloudflare is slowly rolling out GPUs to its global network. This enables you to build and deploy ambitious AI applications that run near your users, wherever they are.",
      max_length: 50
    });
    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

</details>

<details>
  <summary>curl</summary>

```bash
curl https://api.cloudflare.com/client/v4/accounts/{cf_account_id}/ai/run/{{ .Params.model.name }} \
  -H "Authorization: Bearer {cf_api_token}" \
  -d '{
    "input_text": "Workers AI allows you to run machine learning models, on the Cloudflare network, from your own code – whether that be from Workers, Pages, or anywhere via the Cloudflare API. With the launch of Workers AI, Cloudflare is slowly rolling out GPUs to its global network. This enables you to build and deploy ambitious AI applications that run near your users, wherever they are.",
    "max_length": 50
  }'
```

</details>
{{/* */}}

## Code Examples

<details>
  <summary>Workers - TypeScript</summary>

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    // Picture of a dog
    const exampleInputImage = await fetch(
      "https://pub-1fb693cb11cc46b2b2f656f51e015a2c.r2.dev/dog.png"
    );

    // Mask of dog
    const exampleMask = await fetch(
      "https://pub-1fb693cb11cc46b2b2f656f51e015a2c.r2.dev/dog-mask.png"
    );

    const inputs = {
      prompt: "Change to a lion",
      image: [...new Uint8Array(await exampleInputImage.arrayBuffer())],
      mask: [...new Uint8Array(await exampleMask.arrayBuffer())],
    };

    const response =
      await env.AI.run(
        "{{ .Page.Params.model.name }}",
        inputs
      );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
```

</details>

<details>
  <summary>curl</summary>

```bash
$ curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Page.Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -d '{ "prompt": "cyberpunk cat" }'
```

</details>

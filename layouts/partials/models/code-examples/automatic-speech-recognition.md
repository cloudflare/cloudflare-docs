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
    const res = await fetch(
      "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"
    );
    const blob = await res.arrayBuffer();

    const input = {
      audio: [...new Uint8Array(blob)],
    };

    const response = await env.AI.run(
      "{{ .Page.Params.model.name}}",
      input
    );

    return Response.json({ input: { audio: [] }, response });
  },
} satisfies ExportedHandler<Env>;
```

</details>

<details>
  <summary>curl</summary>

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/{{ .Page.Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --data-binary "@talking-llama.mp3"
```

</details>

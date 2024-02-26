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
    const res: any = await fetch(
      "https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"
    );
    const blob = await res.arrayBuffer();

    const ai = new Ai(env.AI);
    const input = {
      audio: [...new Uint8Array(blob)],
    };

    const response = await ai.run<"{{ .Page.Params.model.name }}">(
      "{{ .Page.Params.model.name}}",
      input
    );

    return Response.json({ input: { audio: [] }, response });
  },
};
```

</details>

<details>
  <summary>curl</summary>

```sh
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID}/ai/run/{{ .Page.Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --data-binary @talking-llama.mp3
```

</details>

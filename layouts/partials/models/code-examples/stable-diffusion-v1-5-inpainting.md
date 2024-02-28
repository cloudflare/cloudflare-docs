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
      await ai.run<"@cf/runwayml/stable-diffusion-v1-5-inpainting">(
        "@cf/runwayml/stable-diffusion-v1-5-inpainting",
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

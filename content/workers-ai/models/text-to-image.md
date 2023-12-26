---
title: Text-to-Image
pcx_content_type: get-started
weight: 5
---

# Text-to-Image



* Task type: **text-to-image**
* TypeScript class: **AiTextToImage**

{{<render file="_npm-update.md">}}

## Available Embedding Models

List of available models in for this task type:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/stabilityai/stable-diffusion-xl-base-1.0`                   | Diffusion-based text-to-image generative model by Stability AI. Generates and modify images based on text prompts.<br/>[More information](https://stability.ai/stable-diffusion)<br/>[Terms and license](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/LICENSE.md)<br/>  |

## Examples

{{<tabs labels="worker | curl">}}
{{<tab label="worker" default="true">}}

```ts
import { Ai } from '@cloudflare/ai'

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const inputs = {
        prompt: "cyberpunk cat",
    };

    const response = await ai.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", inputs);

    return new Response(response, {
        headers: {
            "content-type": "image/png",
        },
    });

  }
}
```

{{</tab>}}

{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0 \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '{ "prompt": "cyberpunk cat" }'
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

The response is a Uint8Array binary with a PNG image.

## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
  "type": "object",
  "properties": {
    "prompt": {
      "type": "string"
    },
    "num_steps": {
      "type": "integer",
      "default": 20,
      "maximum": 20
    }
  },
  "required": [
    "prompt"
  ]
}
```

TypeScript class: **AiTextToImageInput**

### Output

```json
{
  "type": "string",
  "contentType": "image/png",
  "format": "binary"
}
```

TypeScript class: **AiTextToImageOutput**

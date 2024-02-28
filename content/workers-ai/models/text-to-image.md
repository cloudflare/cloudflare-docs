---
title: Text-to-Image
pcx_content_type: get-started
weight: 5
---

# Text-to-Image

Generates images from input text. These models can be used to generate and modify images based on text prompts.

* Task type: **text-to-image**
* TypeScript class: **AiTextToImage**

{{<render file="_npm-update.md">}}

## Available models

List of available Text-to-Image models:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/runwayml/stable-diffusion-v1-5-inpainting`                   | Stable Diffusion Inpainting is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input, with the extra capability of inpainting the pictures by using a mask.<br/>  |
| `@cf/bytedance/stable-diffusion-xl-lightning`                   | SDXL-Lightning is a lightning-fast text-to-image generation model. It can generate high-quality 1024px images in a few steps.<br/>  |
| `@cf/lykon/dreamshaper-8-lcm`                   | Stable Diffusion model that has been fine-tuned to be better at photorealism without sacrificing range.<br/>  |
| `@cf/stabilityai/stable-diffusion-xl-base-1.0`                   | Diffusion-based text-to-image generative model by Stability AI. Generates and modify images based on text prompts.<br/>[Terms and license](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/LICENSE.md)<br/>[More information](https://stability.ai/stable-diffusion)<br/>  |
| `@cf/runwayml/stable-diffusion-v1-5-img2img`                   | Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Img2img generate a new image from an input image with Stable Diffusion. <br/>  |

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
    "image": {
      "oneOf": [
        {
          "type": "string",
          "format": "binary"
        },
        {
          "type": "object",
          "properties": {
            "image": {
              "type": "array",
              "items": {
                "type": "number"
              }
            }
          }
        }
      ]
    },
    "mask": {
      "oneOf": [
        {
          "type": "string",
          "format": "binary"
        },
        {
          "type": "object",
          "properties": {
            "mask": {
              "type": "array",
              "items": {
                "type": "number"
              }
            }
          }
        }
      ]
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

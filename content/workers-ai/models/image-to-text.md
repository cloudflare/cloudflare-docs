---
title: Image-to-Text
pcx_content_type: get-started
weight: 5
---

# Image-to-Text



* Task type: **image-to-text**
* TypeScript class: **AiImageToText**

{{<render file="_npm-update.md">}}

## Available models

List of available Image-to-Text models:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/unum/uform-gen2-qwen-500m`                   | UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering. The model was pre-trained on the internal image captioning dataset and fine-tuned on public instructions datasets: SVIT, LVIS, VQAs datasets.<br/>  |

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
    const res: any = await fetch("https://cataas.com/cat");
    const blob = await res.arrayBuffer();

    const ai = new Ai(env.AI);
    const inputs = {
        image: [...new Uint8Array(blob)],
        prompt: "describe the mood of the image"
    };

    const response = await ai.run("@cf/unum/uform-gen2-qwen-500m", inputs);

    return new Response(JSON.stringify(response));
  }
}
```

{{</tab>}}

{{</tabs>}}

**Example Workers AI response**

```json
{
  "summary": "a grumpy cat"
}
```

## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
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
        },
        "prompt": {
          "type": "string"
        },
        "max_tokens": {
          "type": "integer"
        }
      }
    }
  ]
}
```

TypeScript class: **AiImageToTextInput**

### Output

```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "description": {
      "type": "string"
    }
  }
}
```

TypeScript class: **AiImageToTextOutput**

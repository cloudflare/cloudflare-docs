---
title: Image classification
pcx_content_type: get-started
weight: 5
---

# Image classification
ResNet models perform image classification - they take images as input and classify the major object in the image.

* ID:  **@cf/microsoft/resnet-50** - used to `run` this model via SDK or API
* Name: Resnet50 image classification model
* Task: image-classification
* License type: Apache 2.0
* [Terms + Information](https://huggingface.co/microsoft/resnet-50)

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
    };

    const response = await ai.run("@cf/microsoft/resnet-50", inputs);

    return new Response(JSON.stringify({ inputs: { image: [] }, response }));
  }
}
```

{{</tab>}}

{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/microsoft/resnet-50 \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    --data-binary @orange-llama.png
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

```json
{
    "inputs": { "image":[] },
    "response": [
        { "label":"PERSIAN CAT" ,"score":0.4071170687675476 },
        { "label":"PEKINESE", "score":0.23444877564907074 },
        { "label":"FEATHER BOA", "score":0.22562485933303833 },
        { "label":"POMERANIAN", "score":0.033316344022750854 },
        { "label":"JAPANESE SPANIEL", "score":0.024184171110391617 }
    ]
}

```

## API schema
The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
  oneOf: [
    { type: "string", format: "binary" },
    {
      type: "object",
      properties: {
        image: {
          type: "array",
          items: {
            type: "number",
          },
        },
      },
    },
  ],
}
```

### Output

```json
{
  type: "array",
  items: {
    type: "object",
    properties: {
      score: {
        type: "number",
      },
      label: {
        type: "string",
      },
    },
  },
}
```
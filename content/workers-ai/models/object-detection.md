---
title: Object Detection
pcx_content_type: get-started
weight: 5
---

# Object Detection

Object detection models can detect instances of objects like persons, faces, license plates, or others in an image. This task takes an image as input and returns a list of detected objects, each one containing a label, a probability score, and its surrounding box coordinates.

* Task type: **object-detection**
* TypeScript class: **AiObjectDetection**

{{<render file="_npm-update.md">}}

## Available models

List of available Object Detection models:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/facebook/detr-resnet-50`                   | DEtection TRansformer (DETR) model trained end-to-end on COCO 2017 object detection (118k annotated images).<br/>  |
| `@cf/meta/detr-resnet-50`                   | DEtection TRansformer (DETR) model with ResNet-50 backbone for image object detection.<br/>[More information](https://huggingface.co/facebook/detr-resnet-50)<br/>  |

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

    const response = await ai.run("@cf/meta/detr-resnet-50", inputs);

    return new Response(JSON.stringify({ inputs: { image: [] }, response }));
  }
}
```

{{</tab>}}

{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/detr-resnet-50 \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    --data-binary @pedestrian-boulevard-manhattan-crossing.jpg
```

{{</tab>}}
{{</tabs>}}

**Example Workers AI response**

This task returns a list of detected objects, each one containing a label, a probability score, and its surrounding box coordinates.

```json
[
  { "label":"cat" ,"score":0.4071170687675476, "box": { "xmin": 0, "ymin": 0, "xmax": 10, "ymax": 10 } },
  { "label":"face", "score":0.22562485933303833, "box": { "xmin": 15, "ymin": 22, "xmax": 25, "ymax": 35 } },
  { "label":"car", "score":0.033316344022750854, "box": { "xmin": 72, "ymin": 55, "xmax": 95, "ymax": 72 } }
]
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
        }
      }
    }
  ]
}
```

TypeScript class: **AiObjectDetectionInput**

### Output

```json
{
  "type": "array",
  "contentType": "application/json",
  "items": {
    "type": "object",
    "properties": {
      "score": {
        "type": "number"
      },
      "label": {
        "type": "string"
      },
      "box": {
        "type": "object",
        "properties": {
          "xmin": {
            "type": "number"
          },
          "ymin": {
            "type": "number"
          },
          "xmax": {
            "type": "number"
          },
          "ymax": {
            "type": "number"
          }
        }
      }
    }
  }
}
```

TypeScript class: **AiObjectDetectionOutput**

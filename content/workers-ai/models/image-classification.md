---
title: Image classification
pcx_content_type: get-started
weight: 5
---

# Image classification
ResNet models perform image classification - they take images as input and classify the major object in the image.

* ID:  **@cf/microsoft/resnet-50	** - used to `run` this model via SDK or API
* Name: Resnet50 image classification model
* Task: image-classification

## Examples

{{<tabs labels="worker | node | python | curl">}}
{{<tab label="worker" default="true">}}

```js
// todo
```

{{</tab>}}
{{<tab label="node">}}

```js
// todo js
```

{{</tab>}}

{{<tab label="python">}}

```py
# todo
```

{{</tab>}}
{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/microsoft/resnet-50 \
    -X POST \
    -H "Authorization: Bearer {API_TOKEN}" \
    --data-binary @orange-llama.png
```

{{</tab>}}
{{</tabs>}}

## Input/Output schemas
The following schemas are based on [JSON Schema](https://json-schema.org/)

**Input**
```json
{
  "schema": {
    "type": "object",
    "properties": {
      "image": {
        "type": "string",
        "format": "binary"
      }
    },
    "required": ["image"]
  }
}
```

**Output**
```json
{
  "schema": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "score": {
          "type": "number"
        },
        "label": {
          "type": "string"
        }
      }
    }
  }
}
```
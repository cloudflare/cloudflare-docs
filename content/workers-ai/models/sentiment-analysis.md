---
title: Sentiment Analysis
pcx_content_type: get-started
weight: 3
---

# Sentiment Analysis
Model name: `cf/Xenova/distilbert-base-uncased-finetuned-sst-2-english_onnx-quantized` - this model name is used to run this model via SDK and the API.​​

## Use cases

## Examples

{{<tabs labels="worker | node | python | curl ">}}
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
$ todo
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
      "text": {
        "type": "string"
      }
    },
    "required": ["text"]
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
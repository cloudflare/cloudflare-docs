---
title: Using LoRA adapters
pcx_content_type: get-started
meta:
  description: Upload and use LoRA adapters to get fine-tuned inference on Workers AI.
---

# Running fine-tuned inference with LoRA adapters 

Workers AI now supports fine-tuned inference with adapters trained with [Low-Rank Adaptation](https://blog.cloudflare.com/fine-tuned-inference-with-loras). This feature is in open beta and free during this period. {{<inline-pill style="beta">}}

## Limitations
- We only support LoRAs for the following models (must not be quantized):
  - `@cf/llama-meta-llama-2-7b-chat-hf-lora`
  - `@cf/mistralai/mistral-7b-instruct-v0.2-lora`
  - `@cf/google/gemma-2b-it-lora`
- Adapter must be trained with rank `r <=8`. You can check the rank of a pre-trained LoRA adapter through the adapter's  `config.json` file
- LoRA adapter file must be < 100MB
- LoRA adapter files must be named `adapter_config.json` and `adapter_model.safetensors` exactly
- You can test up to 30 LoRA adapters per account

## Choosing compatible LoRA adapters

### Finding open-source LoRA adapters
We have started a [Hugging Face Collection](https://huggingface.co/collections/Cloudflare/workers-ai-compatible-loras-6608dd9f8d305a46e355746e) that lists a few LoRA adapters that are compatible with Workers AI. Generally, any LoRA adapter that fits our limitations above should work. 

### Training your own LoRA adapters
If ... craig's tutorial ...

## Uploading LoRA adapters
In order to run inference with LoRAs on Workers AI, you'll need to create a new fine tune on your account and upload your adapter files. You should have a `adapter_model.safetensors` file with model weights and `adapter_config.json` with your config information. Note that we only accept adapter files in these types.

### Wrangler
You can create a finetune and upload your LoRA adapter via wrangler with the following commands

```bash
# Input: model name, finetune_name, path to LoRA config and model weights
# Output: unique finetune_id
wrangler ai finetune create <model_name> <finetune_name> <file_path>

# Lists all fine tunes in your account
wrangler ai finetune list
```

### REST API
You can also use our REST API to upload your adapter files. You will need a Cloudflare API Token with `Workers AI: Edit` permissions to make calls to our REST API, which you can generate via the Cloudflare Dashboard.

#### Creating a fine-tune on your account
{{<tabs labels="cURL | JSON Output">}}
{{<tab label="cURL" default="true">}}

```bash
## Input: user-defined name of fine tune
## Output: unique finetune_id

curl -X POST https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/finetunes/ \
    -H "Authorization: Bearer {API_TOKEN}" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "SUPPORTED_MODEL_NAME",
      "name": "FINETUNE_NAME",
      "description": "OPTIONAL_DESCRIPTION"
    }'
```
{{</tab>}}
{{<tab label="JSON Output">}}
```sh
---
header: Example JSON output
---
# Example output JSON
{
  "success": true,
  "result": {
    "id": "00000000-0000-0000-0000-000000000", 
    "name": "string",
    "description": "string"
  }
}
```
{{</tab>}}
{{</tabs>}}


#### Uploading your adapter weights and config
You have to call the upload endpoint each time you want to upload a new file, so you usually run this once for  `adapter_model.safetensors` and once for `adapter_config.json`. Make sure you include the `@` before your path to files.

{{<tabs labels="cURL | JSON Output">}}
{{<tab label="cURL" default="true">}}
```bash
## Input: finetune_id, adapter_model.safetensors
## Output: success true/false
curl -X POST https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/finetunes/{FINETUNE_ID}/finetune-assets/ \
    -H 'Authorization: Bearer {API_TOKEN}' \
    -H 'Content-Type: multipart/form-data' \
    -F 'file_name=adapter_model.safetensors' \
    -F 'file=@{PATH/TO/adapter_model.safetensors}' \

## Input: finetune_id, adapter_config.json
## Output: success true/false
curl -X POST https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/finetunes/{FINETUNE_ID}/finetune-assets/ \
    -H 'Authorization: Bearer {API_TOKEN}' \
    -H 'Content-Type: multipart/form-data' \
    -F 'file_name=adapter_config.json' \
    -F 'file=@{PATH/TO/adapter_config.json}'
```
{{</tab>}}
{{<tab label="JSON Output">}}

```sh
---
header: Example JSON output
---
# Example output JSON
{
  "success": true,
}
```
{{</tab>}}
{{</tabs>}}

#### List fine-tunes in your account
{{<tabs labels="cURL | JSON Output">}}
{{<tab label="cURL" default="true">}}

```bash
## Input: n/a
## Output: success true/false
curl -X GET https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/finetunes/ \
    -H 'Authorization: Bearer {API_TOKEN}' \
```
{{</tab>}}
{{<tab label="JSON Output">}}

```sh
---
header: Example JSON output
---
# Example output JSON
{
  "success": true,
  "result": [
    [{
       "id": "00000000-0000-0000-0000-000000000",
       "model": "@cf/llama-meta-llama-2-7b-chat-hf-lora",
       "name": "llama2-finetune",
       "description": "test"
    },
    {
       "id": "00000000-0000-0000-0000-000000000",
       "model": "@cf/mistral/mistral-7b-instruct-v0.1",
       "name": "mistral-finetune",
       "description": "test"
    }]
  ]
}
```
{{</tab>}}
{{</tabs>}}

## Running inference with LoRAs
To make inference requests and apply the LoRA adapter, you will need your model and finetune_id. You will also need to set `raw: true`.

{{<tabs labels="Workers AI SDK  | REST API">}}
{{<tab label="Workers AI SDK" default="true">}}

```javascript
const response = await ai.run(
  "@cf/google/gemma-2b-it-lora", //the model supporting LoRAs
  {
      prompt: "tell me a story",
      raw: true, //skip applying the default chat template
      lora: "3fbc18b9-8e42-4571-ad36-1f9a61f5d70f", //the finetune_id 
  }
);
```

{{</tab>}}
{{<tab label="REST API">}}
```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/google/gemma-2b-it-lora \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -d '{
    "prompt": "Where did the phrase Hello World come from"
    "raw": "true",
    "lora": "3fbc18b9-8e42-4571-ad36-1f9a61f5d70f"
  }'
```

{{</tab>}}
{{</tabs>}}
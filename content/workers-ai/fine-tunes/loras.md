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
  - `@cf/meta-llama/llama-2-7b-chat-hf-lora`
  - `@cf/mistral/mistral-7b-instruct-v0.2-lora`
  - `@cf/google/gemma-2b-it-lora`
  - `@cf/google/gemma-7b-it-lora`
- Adapter must be trained with rank `r <=8`. You can check the rank of a pre-trained LoRA adapter through the adapter's  `config.json` file
- LoRA adapter file must be < 100MB
- LoRA adapter files must be named `adapter_config.json` and `adapter_model.safetensors` exactly
- You can test up to 30 LoRA adapters per account

---

## Choosing compatible LoRA adapters

### Finding open-source LoRA adapters
We have started a [Hugging Face Collection](https://huggingface.co/collections/Cloudflare/workers-ai-compatible-loras-6608dd9f8d305a46e355746e) that lists a few LoRA adapters that are compatible with Workers AI. Generally, any LoRA adapter that fits our limitations above should work. 

---

## Uploading LoRA adapters
In order to run inference with LoRAs on Workers AI, you'll need to create a new fine tune on your account and upload your adapter files. You should have a `adapter_model.safetensors` file with model weights and `adapter_config.json` with your config information. *Note that we only accept adapter files in these types.*

Right now, you can't edit a fine tune's asset files after you upload it. We will support this soon, but for now you will need to create a new fine tune and upload  files again if you would like to use a new LoRA.

Before you upload your LoRA adapter, you'll need to edit your `adapter_model.config` file to include `model_type` as one of `mistral`, `gemma` or `llama` like below.

```json
---
filename: adapter_model.config
highlight: [10]
---
{
  "alpha_pattern": {},
  "auto_mapping": null,
  ...
  "target_modules": [
    "q_proj",
    "v_proj"
  ],
  "task_type": "CAUSAL_LM",
  "model_type": "mistral",
}
```

### Wrangler
You can create a finetune and upload your LoRA adapter via wrangler with the following commands:

```bash
---
header: wrangler CLI
highlight: [1,7]
---
npx wrangler ai finetune create <model_name> <finetune_name> <folder_path>
#🌀 Creating new finetune "test-lora" for model "@cf/mistral/mistral-7b-instruct-v0.2-lora"...
#🌀 Uploading file "/Users/abcd/Downloads/adapter_config.json" to "test-lora"...
#🌀 Uploading file "/Users/abcd/Downloads/adapter_model.safetensors" to "test-lora"...
#✅ Assets uploaded, finetune "test-lora" is ready to use.

npx wrangler ai finetune list
┌──────────────────────────────────────┬─────────────────┬─────────────┐
│ finetune_id                          │ name            │ description │
├──────────────────────────────────────┼─────────────────┼─────────────┤
│ 00000000-0000-0000-0000-000000000000 │ test-lora       │             │
└──────────────────────────────────────┴─────────────────┴─────────────┘
```


### REST API
Alternatively, you can use our REST API to create a finetune and upload your adapter files. You will need a Cloudflare API Token with `Workers AI: Edit` permissions to make calls to our REST API, which you can generate via the Cloudflare Dashboard.

#### Creating a fine-tune on your account
  ```bash
---
header: cURL
---
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

#### Uploading your adapter weights and config
You have to call the upload endpoint each time you want to upload a new file, so you usually run this once for  `adapter_model.safetensors` and once for `adapter_config.json`. Make sure you include the `@` before your path to files.

You can either use the finetune `name` or  `id` that you used when you created the fine tune.

```bash
---
header: cURL
---
## Input: finetune_id, adapter_model.safetensors, then adapter_config.json
## Output: success true/false

curl -X POST https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/finetunes/{FINETUNE_ID}/finetune-assets/ \
    -H 'Authorization: Bearer {API_TOKEN}' \
    -H 'Content-Type: multipart/form-data' \
    -F 'file_name=adapter_model.safetensors' \
    -F 'file=@{PATH/TO/adapter_model.safetensors}' \
```

#### List fine-tunes in your account
You can call this method to confirm what fine-tunes you have created in your account

{{<tabs labels="cURL | JSON Output">}}
{{<tab label="cURL" default="true">}}

```bash
---
header: cURL
---
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
       "model": "@cf/meta-llama/llama-2-7b-chat-hf-lora",
       "name": "llama2-finetune",
       "description": "test"
    },
    {
       "id": "00000000-0000-0000-0000-000000000",
       "model": "@cf/mistralai/mistral-7b-instruct-v0.2-lora",
       "name": "mistral-finetune",
       "description": "test"
    }]
  ]
}
```
{{</tab>}}
{{</tabs>}}

---

## Running inference with LoRAs
To make inference requests and apply the LoRA adapter, you will need your model and finetune `name` or `id`. You should use the chat template that your LoRA was trained on, but you can try running it with `raw: true` and the messages template like below.

{{<tabs labels="Workers AI SDK | REST API">}}
{{<tab label="Workers AI SDK" default="true">}}

```javascript
---
highlight: [5-6]
---
const response = await ai.run(
  "@cf/mistralai/mistral-7b-instruct-v0.2-lora", //the model supporting LoRAs
  {
      messages: [{"role": "user", "content": "Hello world"],
      raw: true, //skip applying the default chat template
      lora: "00000000-0000-0000-0000-000000000", //the finetune id OR name 
  }
);
```

{{</tab>}}
{{<tab label="REST API">}}
```bash
---
highlight: [5-6]
---
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/mistralai/mistral-7b-instruct-v0.2-lora \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -d '{
    "messages": [{"role": "user", "content": "Hello world"}],
    "raw": "true",
    "lora": "00000000-0000-0000-0000-000000000"
  }'
```

{{</tab>}}
{{</tabs>}}
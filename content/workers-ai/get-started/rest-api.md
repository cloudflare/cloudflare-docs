---
title: REST API
pcx_content_type: get-started
weight: 4
---

# Get started - Workers AI API
Workers AI API enables all developers, regardless of where you build and deploy, to easily run inference tasks form you code with a simple HTTP call.

This guide will instruct you through:

* Creating an API key
* Running an inference task via API

## Prerequisites

Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.


## 1. Get an API token

To create an API token:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select the user icon on the top right of your dashboard > **My Profile**.
3. Select [**API Tokens**](https://dash.cloudflare.com/profile/api-tokens) > **Create Token**. 
4. You can go to **Workers AIs** template > **Use template** or go to **Create Custom Token** > **Get started**.

## 2. Run an infereence task via API
After creating your token, you can authenticate and make requests to the API using your API token in the request headers. For example, here is an API request to get all deployments in a project.

In this example, we will run the `@cloudflare/meta-llama/llama-2-7b` model:

```sh
$ curl 'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cloudflare/meta-llama/llama-2-7b' \
  -H 'Authorization: Bearer {API_token}'
  -d '{
        "input": { "prompt": "Where did the phrase 'Hello World' come from" },
   }'
```

Try it with one of your projects by replacing `{account_id}`, and `{API_token}`. Refer to [Find your account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/) for more information.



The API response will look like the following:
```json
{
  "id": "",
  "object": "",
  "created": ,
  "model": "@cloudflare/meta-llama/llama-2-7b",
  "choices": [
    {
      "text": "\n\nThis is indeed a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```

### Exploring other models
This example uses the `@cloudflare/meta-llama/llama-2-7b`, but you can use any of the models in our [catalog](/models) and just replace `{model}` the the desired model name

`api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}`

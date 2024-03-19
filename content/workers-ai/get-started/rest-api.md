---
title: Workers AI REST API
pcx_content_type: get-started
weight: 2
meta:
  description: Use the Cloudflare Workers AI REST API to deploy a large language model (LLM).
---

# Get started with the Workers AI REST API

This guide will instruct you through setting up and deploying your first Workers AI project. You will use the Workers AI REST API to experiment with a large language model (LLM).

## Prerequisites

Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.

## 1. Get an API token

To create an API token:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select the user icon on the top right of your dashboard > **My Profile**.
3. Select [**API Tokens**](https://dash.cloudflare.com/profile/api-tokens) > **Create Token**. 
4. Go to the **Workers AI** template > select **Use template**. You can choose also go to **Create Custom Token** > **Get started** to customize a token.
5. Select **Continue to summary** > in Workers AI API token summary, select **Create Token**.

## 2. Run a model via API

After creating your API token, authenticate and make requests to the API using your API token in the request headers. For example, here is an API request to get all deployments in a project.

In this guide, you will use the [Execute AI model](/api/operations/workers-ai-post-run-model) endpoint to run the [`@cloudflare/meta-llama/llama-2-7b-chat-int8`](/workers-ai/models/llama-2-7b-chat-int8/) model:

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8 \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -d '{ "prompt": "Where did the phrase Hello World come from" }'
```

Replace `{ACCOUNT_ID}` with your [account ID](/fundamentals/setup/find-account-and-zone-ids/) and `{API_token}` with the API token you generated in [step 1](/workers-ai/get-started/rest-api/#1-get-an-api-token).


The API response will look like the following:

```json
{
  "result": {
    "response": "Hello, World first appeared in 1974 at Bell Labs when Brian Kernighan included it in the C programming language example. It became widely used as a basic test program due to simplicity and clarity. It represents an inviting greeting from a program to the world."
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

This example uses the `@cf/meta/llama-2-7b-chat-int8` model, but you can use any of the models in the Workers AI models [catalog](/workers-ai/models/). You need to replace `{model}` with your desired model name.

`api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model}`

By completing this guide, you have created a Cloudflare account (if you did not have one already) and an API token that grants Workers AI read permissions to your account. You executed the [`@cloudflare/meta-llama/llama-2-7b-chat-int8`](/workers-ai/models/llama-2-7b-chat-int8/) model using a cURL command from the terminal and received an answer to your prompt in a JSON response.

## Related resources

- [Models](/workers-ai/models/) - Browse the Workers AI models catalog.
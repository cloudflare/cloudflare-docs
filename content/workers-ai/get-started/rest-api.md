---
title: REST API
pcx_content_type: get-started
weight: 2
meta:
  title: Get started - REST API
  description: Use the Cloudflare Workers AI REST API to deploy a large language model (LLM).
---

# Get started with the Workers AI REST API

This guide will instruct you through setting up and deploying your first Workers AI project. You will use the Workers AI REST API to experiment with a large language model (LLM).

## Prerequisites

Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.

## 1. Get API token and Account ID

You need your API token and Account ID to use the REST API.

To get these values:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **AI** > **Workers AI**.
3. Select **Use REST API**.
4. Get your API token:
    1. Select **Create a Workers AI API Token**.
    2. Review the prefilled information.
    3. Select **Create API Token**.
    4. Select **Copy API Token**.
    5. Save that value for future use.
5. For **Get Account ID**, copy the value for **Account ID**. Save that value for future use.

{{<Aside type="note">}}

If you choose to [create an API token](/fundamentals/api/get-started/create-token/) instead of using the template, that token will need permissions for both `Workers AI - Read` and `Workers AI - Edit`.

{{</Aside>}}

## 2. Run a model via API

After creating your API token, authenticate and make requests to the API using your API token in the request.

You will use the [Execute AI model](/api/operations/workers-ai-post-run-model) endpoint to run the [`@cf/meta/llama-3.1-8b-instruct`](/workers-ai/models/llama-3.1-8b-instruct/) model:

```bash
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -d '{ "prompt": "Where did the phrase Hello World come from" }'
```

Replace the values for `{ACCOUNT_ID}` and `{API_token}`.

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

This example execution uses the `@cf/meta/llama-3.1-8b-instruct` model, but you can use any of the models in the [Workers AI models catalog](/workers-ai/models/). If using another model, you will need to replace `{model}` with your desired model name.

By completing this guide, you have created a Cloudflare account (if you did not have one already) and an API token that grants Workers AI read permissions to your account. You executed the [`@cf/meta/llama-3.1-8b-instruct`](/workers-ai/models/llama-3.1-8b-instruct/) model using a cURL command from the terminal and received an answer to your prompt in a JSON response.

## Related resources

- [Models](/workers-ai/models/) - Browse the Workers AI models catalog.

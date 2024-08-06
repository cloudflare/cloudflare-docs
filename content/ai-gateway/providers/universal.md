---
title: Universal Endpoint
pcx_content_type: get-started
weight: 1
---

# Universal Endpoint
You can use the Universal Endpoint to contact every provider.

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}`

## Description

AI Gateway offers multiple endpoints for each Gateway you create - one endpoint per provider, and one Universal Endpoint. The Universal Endpoint requires some adjusting to your schema, but supports additional features. Some of these features are, for example, retrying a request if it fails the first time, or configuring a [fallback model/provider](/ai-gateway/configuration/fallbacks/).

You can use the Universal endpoint to contact every provider. The payload is expecting an array of message, and each message is an object with the following parameters:

* `provider` : the name of the provider you would like to direct this message to. Can be openai, workers-ai, or any of our supported providers.
* `endpoint`: the pathname of the provider API you’re trying to reach. For example, on OpenAI it can be `chat/completions`, and for Workers AI this might be [`@cf/meta/llama-3.1-8b-instruct`](/workers-ai/models/llama-3.1-8b-instruct/). See more in the sections that are specific to [each provider](/ai-gateway/providers/).
* `authorization`: the content of the Authorization HTTP Header that should be used when contacting this provider. This usually starts with “Token” or “Bearer”.
* `query`: the payload as the provider expects it in their official API.


## Example

{{<render file="_universal-gateway-example.md">}}

The above will send a request to Workers AI Inference API, if it fails it will proceed to OpenAI. You can add as many fallbacks as you need, just by adding another JSON in the array.


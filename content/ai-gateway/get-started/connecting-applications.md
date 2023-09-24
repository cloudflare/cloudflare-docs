---
title: Connecting your application
pcx_content_type: get-started
weight: 2
---

# Connect your AI applications

In this guide, you will learn how to connect your application to your AI Gateway. [You will need to have an AI Gateway created](/ai-gateway/get-started/creating-gateway) to continue with this guide.


## Provider-specific vs. Universal endpoint
Once you have configured a Gateway in the AI Gateway dashboard, click on “API Endpoints” to find your AI Gateway endpoint. AI Gateway offers multiple endpoints for each Gateway you create - one endpoint per provider, and one Universal Endpoint.

Using a provider-specific endpoint is great for when you just want to replace the URL in your code and get going immediately. The schema you will use for making requests is identical, and everything will work just as before.

The Universal Endpoint requires some adjusting to your schema, but supports additional features. Some of these features are, for example, retrying a request if it fails the first time, or configuring a fallback model/provider when a request fails.

### Universal 
`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY`

You can use the Universal endpoint to contact every provider. The payload is expecting an array of message, and each message is an object with the following parameters:

* `provider` : the name of the provider you would like to direct this message to. Can be openai/huggingface/replicate
* `endpoint`: the pathname of the provider API you’re trying to reach. For example, on OpenAI it can be `chat/completions`, and for HuggingFace this might be `bigstar/code`. See more in the sections that are specific to each provider.
* `authorization`: the content of the Authorization HTTP Header that should be used when contacting this provider. This usually starts with “Token” or “Bearer”.
* `query`: the payload as the provider expects it in their official API. 

```
curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY  -X POST \
  --header 'Content-Type: application/json' \
  --data '[
    {
   	 "provider": "huggingface",
   	 "endpoint": "bigcode/starcoder",
   	 "headers": { 
                  "Authorization": "Bearer TOKEN",
        "Content-Type": "application/json"
       },
   	 "query": {
   		 "input": "what'\''s the weather in SF now?"
   	 }
    },
    {
   	 "provider": "openai",
   	 "endpoint": "chat/completions",
       "headers": { 
                  "Authorization": "Bearer TOKEN",
        "Content-Type": "application/json"
       },
   	 "query": {
   		 "model": "gpt-3.5-turbo",
   		 "stream": true,
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "how to build a wooden spoon in 3 short steps? answer with the short as possible way please"
   			 }
   		 ]
   	 }
    },
    {
   	 "provider": "replicate",
   	 "authorization": "Token TOKEN",
   	 "query": {
   		 "version": "2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
   		 "input": {
   			 "prompt": "what is the weather in SF?"
   		 }
   	 }
    }
]'
```

The above will send a request to HuggingFace Inference API, if it fails it will proceed to OpenAI, and then Replicate.

### Workers AI
When making requests to Workers AI, replace `https://api.cloudflare.com/client/v4/accounts/ACCOUNT_TAG/ai/run` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai`. 

```
curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/workers-ai/text_classification -X POST \
  --header 'Authorization: Token XXX \
  --header 'Content-Type: application/json' \
  --data '{  "text": "the pizza is amazing!" }'
```

### OpenAI
`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai`

When making requests to OpenAI, replace `https://api.openai.com/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai`. 


```
curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai/chat/completions -X POST \
  --header 'Authorization: Bearer TOKEN' \
  --header 'Content-Type: application/json' \
  --data ' {
   		 "model": "gpt-3.5-turbo",
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "how to build a wooden spoon in 3 short steps? give as short as answer as possible"
   			 }
   		 ]
   	 }
'
```


If you’re using a library like openai-node, set the baseUrl to your OpenAI endpoint like this:

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: 'my api key', // defaults to process.env["OPENAI_API_KEY"]
	baseUrl: "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai"
});

```

### HuggingFace
`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/huggingface`

When making requests to HuggingFace Inference API, replace `https://api-inference.huggingface.co/models/` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/huggingface`. Note that the model you’re trying to access should come right after, for example `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/huggingface/bigcode/starcoder`.


```
curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/huggingface/bigcode/starcoder -X POST \
   --header 'Authorization: Bearer TOKEN \
  --header 'Content-Type: application/json' \
  --data '{
    "inputs": "Can you please let us know more details about your "
}'
```

If you are using the HuggingFace.js library, you can set your inference endpoint like this:

```javascript
import { HfInferenceEndpoint } from '@huggingface/inference'

const hf = new HfInferenceEndpoint(
	"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway}/huggingface/gpt2",
	env.HF_API_TOKEN
);
```


### Replicate
`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/replicate`

When making requests to OpenAI, replace `https://api.replicate.com/v1` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/replicate`. 

```
curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/replicate/predictions -X POST \
  --header 'Authorization: Token XXX \
  --header 'Content-Type: application/json' \
  --data '{
    "version": "2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
    "input": {
   	 "prompt": "what is the weather in SF?"
    }
}'
```


## Next Steps

{{<resource-group>}}

{{<resource header="Configuring settings" href="/ai-gateway/get-started/configuring-settings" icon="learning-center-book">}} Observe and control your AI applications {{</resource>}}

{{</resource-group>}}
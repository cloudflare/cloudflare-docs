---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY`

AI Gateway offers multiple endpoints for each Gateway you create - one endpoint per provider, and one Universal Endpoint. The Universal Endpoint requires some adjusting to your schema, but supports additional features. Some of these features are, for example, retrying a request if it fails the first time, or configuring a fallback model/provider when a request fails.

You can use the Universal endpoint to contact every provider. The payload is expecting an array of message, and each message is an object with the following parameters:

* `provider` : the name of the provider you would like to direct this message to. Can be openai/huggingface/replicate
* `endpoint`: the pathname of the provider API you’re trying to reach. For example, on OpenAI it can be `chat/completions`, and for HuggingFace this might be `bigstar/code`. See more in the sections that are specific to each provider.
* `authorization`: the content of the Authorization HTTP Header that should be used when contacting this provider. This usually starts with “Token” or “Bearer”.
* `query`: the payload as the provider expects it in their official API.


```bash
---
header: Request
---

curl https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY -X POST \
  --header 'Content-Type: application/json' \
  --data '[
    {
   	 "provider": "huggingface",
   	 "endpoint": "bigcode/starcoder",
   	 "headers": {
        "Authorization": "Bearer $TOKEN",
        "Content-Type": "application/json"
       },
   	 "query": {
   		 "input": "console.log"
   	 }
    },
    {
   	 "provider": "openai",
   	 "endpoint": "chat/completions",
       "headers": {
        "Authorization": "Bearer $TOKEN",
        "Content-Type": "application/json"
       },
   	 "query": {
   		 "model": "gpt-3.5-turbo",
   		 "stream": true,
   		 "messages": [
   			 {
   				 "role": "user",
   				 "content": "What is Cloudflare?"
   			 }
   		 ]
   	 }
    },
    {
   	 "provider": "replicate",
   	 "endpoint": "predictions",
   	 "authorization": "Token $TOKEN",
   	 "query": {
   		 "version": "2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
   		 "input": {
   			 "prompt": "What is Cloudflare?"
   		 }
   	 }
    }
]'
```

The above will send a request to HuggingFace Inference API, if it fails it will proceed to OpenAI, and then Replicate.
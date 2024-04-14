---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/aws-bedrock`

When making requests to Amazon Bedrock, replace `https://bedrock-runtime.us-east-1.amazonaws.com/` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/aws-bedrock/bedrock-runtime/us-east-1/`, then add the model you want to run at the end of the URL.

With Bedrock, you'll need to sign the URL before you make requests to AI Gateway. You can try using the [aws4fetch](https://github.com/mhart/aws4fetch) sdk like below.

```javascript
import { AwsClient } from 'aws4fetch'

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

        // replace with your configuration
        const endpoint = 'https://gateway.ai.cloudflare.com/v1/ACCOUNT_ID/GATEWAY/aws-bedrock/bedrock-runtime/REGION/model/amazon.titan-embed-text-v1/invoke';
        const accessKey = 'removed';
        const secretKey = 'removed';
        const region = 'us-east-1';

        const requestData = {
                inputText: "What does ethereal mean?"
        };

        const headers = {
                'Content-Type': 'application/json'
        };


        // sign the original request
        const stock_url = new URL("https://bedrock-runtime.us-east-1.amazonaws.com/model/amazon.titan-embed-text-v1/invoke")

        const awsClient = new AwsClient({
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
                region: region,
                service: "bedrock"
        })

        const presigned_request = await awsClient.sign(stock_url.toString(), {
                method: "POST",
                headers: headers
        });

        // change the signed request's host to AI Gateway 
        const stock_url_signed = new URL(presigned_request.url);
        stock_url_signed.host = "gateway.ai.cloudflare.com"
        stock_url_signed.pathname = "/v1/ACCOUNT_ID/GATEWAY/aws-bedrock/bedrock-runtime/REGION/model/amazon.titan-embed-text-v1/invoke"

        // make request
        const response = await fetch(stock_url_signed, {
            method: 'POST',
            headers: presigned_request.headers,
            body: JSON.stringify(requestData)
        })

        const data = await response.json();

        return new Response(data);
    },
};
```
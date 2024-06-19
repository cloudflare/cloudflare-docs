---
_build:
  publishResources: false
  render: never
  list: never
---

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/aws-bedrock`

When making requests to Amazon Bedrock, replace `https://bedrock-runtime.us-east-1.amazonaws.com/` in the URL you’re currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/aws-bedrock/bedrock-runtime/us-east-1/`, then add the model you want to run at the end of the URL.

With Bedrock, you will need to sign the URL before you make requests to AI Gateway. You can try using the [`aws4fetch`](https://github.com/mhart/aws4fetch) SDK. For example:

```typescript
import { AwsClient } from 'aws4fetch'

interface Env {
  accessKey: string;
  secretAccessKey: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

    // replace with your configuration
    const cfAccountId = "{account_id}";
    const gatewayName = "{gateway_id}";
    const region = 'us-east-1';

    // added as secrets (https://developers.cloudflare.com/workers/configuration/secrets/)
    const accessKey = env.accessKey;
    const secretKey = env.secretAccessKey;

    const requestData = {
      inputText: "What does ethereal mean?"
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    // sign the original request
    const stockUrl = new URL("https://bedrock-runtime.us-east-1.amazonaws.com/model/amazon.titan-embed-text-v1/invoke")

    const awsClient = new AwsClient({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      region: region,
      service: "bedrock"
    });

    const presignedRequest = await awsClient.sign(stockUrl.toString(), {
      method: "POST",
      headers: headers
    });

    // change the signed request's host to AI Gateway
    const stockUrlSigned = new URL(presignedRequest.url);
    stockUrlSigned.host = "gateway.ai.cloudflare.com"
    stockUrlSigned.pathname = `/v1/${cfAccountId}/${gatewayName}/aws-bedrock/bedrock-runtime/${region}/model/amazon.titan-embed-text-v1/invoke`

    // make request
    const response = await fetch(stockUrlSigned, {
      method: 'POST',
      headers: presignedRequest.headers,
      body: JSON.stringify(requestData)
    })

    if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();
      return new Response(JSON.stringify(response));
    } else {
      return new Response("Invalid response", { status: 500 });
    }
  },
};
```
---
pcx_content_type: configuration
title: Momento
---

# Momento

[Momento](https://gomomento.com/) is a truly serverless caching service. It automatically optimizes, scales, and manages your cache for you.

{{<render file="_database_integrations_definition.md">}}

## Momento Cache

To set up an integration with Momento Cache:

1. You need to have an existing Momento cache to connect to or create a new cache through the [Momento console](https://console.gomomento.com/).

2. Create a cache called `worker`. You'll need to make sure that you choose the same region when generating a Momento API key in the next step.

3. Generate your [API key](https://docs.momentohq.com/develop/authentication/api-keys) to use within your application, select the cloud provider and region your application is in to get the best performance.

4. Add the Momento database integration to your Worker:

    1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    2. In **Account Home**, select **Workers & Pages**.
    3. In **Overview**, select your Worker.
    4. Select **Integrations** > **Momento**. 
    5. Follow the setup flow, selecting the cache created in step 1.

5. To use Momento with Cloudflare Workers through the Web SDK, run the following command to set up your worker:

  ```sh
  $ git clone https://github.com/momentohq/client-sdk-javascript.git
  $ cd client-sdk-javascript/examples/cloudflare-workers/web-sdk
  $ npm install
  ```

6. The following example code show how to set an item in your cache, get it, and return it as a JSON object. The credentials needed to connect to Momento Cache have been automatically added as secrets to your Worker through the integration.

  ```ts
    export default {
      async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

        console.log(`Creating cache client`);
        const momento = new CacheClient({
          configuration: Configurations.Laptop.v1(),
          credentialProvider: CredentialProvider.fromString({
            apiKey:env.MOMENTO_API_KEY
          }),
          defaultTtlSeconds: 60,
        });

        console.log(`Creating fetcher`);

        const client = new MomentoFetcher(momento);
        const cache = env.MOMENTO_CACHE_NAME;
        const key = 'user';
        const f_name = 'mo';
        const l_name = 'squirrel';
        const value = `${f_name}_${l_name}`;

        console.log(`Issuing a set`);

        // setting a value into cache
        await client.set(cache, key, value);

        console.log(`Issuing a get`);

        // getting a value from cache
        const getResponse = await client.get(cache, key)

        return new Response(JSON.stringify({ response: getResponse.toString() }));
      },
    };
  ```

To learn more about Momento, refer to [Momento's official documentation](https://docs.momentohq.com/getting-started).
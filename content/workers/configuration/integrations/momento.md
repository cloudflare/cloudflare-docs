---
pcx_content_type: configuration
title: Momento
---

# Momento

[Momento](https://gomomento.com/) is a truly serverless caching service. It automatically optimizes, scales, and manages your cache for you.

This integration allows you to connect to Momento from your Worker by getting Momento cache configuration and adding it as [secrets](/workers/configuration/environment-variables/) to your Worker.

## Momento Cache

To set up an integration with Momento Cache:

1. You need to have an existing Momento cache to connect to or create a new cache through the [Momento console](https://console.gomomento.com/).

2. If you do not have an existing cache, create one and assign `user-profiles` as the cache name.

3. Add the Momento database integration to your Worker:

    1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    2. In **Account Home**, select **Workers & Pages**.
    3. In **Overview**, select your Worker.
    4. Select **Integrations** > **Momento**. 
    5. Follow the setup flow, review and grant permissions needed to add secrets to your Worker.
    6. Next, connect to Momento.
    7. Select a preferred region.
    8. Click **Add integration**.

4. The following example code show how to set an item in your cache, get it, and return it as a JSON object. The credentials needed to connect to Momento Cache have been automatically added as [secrets](/workers/configuration/secrets/) to your Worker through the integration.

    ```ts
    export default {
      async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const client = new MomentoFetcher(env.MOMENTO_API_KEY, env.MOMENTO_REST_ENDPOINT);
        const cache = env.MOMENTO_CACHE_NAME;
        const key = 'user';
        const f_name = 'mo';
        const l_name = 'squirrel';
        const value = `${f_name}_${l_name}`;

        // set a value into cache
        const setResponse = await client.set(cache, key, value);
        console.log('setResponse', setResponse);

        // read a value from cache
        const getResponse = await client.get(cache, key);
        console.log('getResponse', getResponse);

        return new Response(JSON.stringify({ 
          response: getResponse
        }));
      },
    };
    ```

To learn more about Momento, refer to [Momento's official documentation](https://docs.momentohq.com/getting-started).
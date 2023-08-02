---
pcx_content_type: concept
title: Upstash
---
# Upstash

[Upstash](https://upstash.com/) is a serverless database with Redis and Kafka API. Upstash also offers QStash, a task queue/scheduler designed for the serverless. 

## Upstash Redis

To set up an integration with Upstash:

1. You need an existing Upstash database to connect to. [Create a Upstash database](https://docs.upstash.com/redis#create-a-database) or [load data from an existing database to Upstash](https://docs.upstash.com/redis/howto/connectclient).

2. Insert some data to your Upstash database. You can add data to your Upstash database in two ways:
    - Use the CLI directly from your Upstash console.
    - Alternatively, install [redis-cli](https://redis.io/docs/getting-started/installation/) locally and run the following commands. 
    ```sh
    ➜ set GB "Ey up?"
    OK
    ➜ set US "Yo, what’s up?"
    OK
    ➜ set NL "Hoi, hoe gaat het?"
    OK
    ```
3. Add the Upstash Redis integration to your Worker:

    a. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    b. In **Account Home**, select **Workers & Pages**.
    c. In **Overview**, select your Worker.
    d. Select **Settings** > **Integrations** > **Upstash Redis**. 
    e. Follow the setup flow, selecting the database created in step 1.
    
4. In your Worker, install the `@upstash/redis`, a HTTP client to connect to your database and start manipulating data:

    ```sh
    $ npm install @upstash/redis
    ```

5. The following example shows how to make a query to your Upstash database in a Worker. The credentials needed to connect to Upstash have been automatically added as secrets to your Worker through the integration.

  ``` js
  ---
  filename: Worker code
  ---
  import { Redis } from "@upstash/redis/cloudflare";

  export default {
    async fetch(request, env) {
      const redis = Redis.fromEnv(env);

      const country = request.headers.get("cf-ipcountry");
      if (country) {
        const greeting = await redis.get(country);
        if (greeting) {
          return new Response(greeting);
        }
      }

      return new Response("Hello What's up!");
    },
  };
  ```

{{<Aside type="note">}}

`Redis.fromEnv(env)` automatically picks up the default `url` and `token` names created in the integration. 

If you have renamed the secrets, you must declare them explicitly like in the [Upstash basic example](https://docs.upstash.com/redis/sdks/redis-ts/getstarted#basic-usage).

{{</Aside>}}

To learn more about Upstash, refer to the [Upstash documentation](https://docs.upstash.com/redis).

## Upstash Kafka

To set up an integration with Upstash Kafka:

1. Create a [Kafka cluster and topic](https://docs.upstash.com/kafka).

2. Add the Upstash Kafka integration to your Worker:

    a. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    b. In **Account Home**, select **Workers & Pages**.
    c. In **Overview**, select your Worker.
    d. Select **Settings** > **Integrations** > **Upstash Kafka**. 
    e. Follow the setup flow, selecting the cluster and topic.
    
3. In your Worker, install `@upstash/kafka`, a HTTP/REST based Kafka client:

    ```sh
    $ npm install @upstash/kafka
    ```

4. Use the [upstash-kafka](https://github.com/upstash/upstash-kafka/blob/main/README.md) JavaScript SDK to send data to Kafka.

Refer to [Upstash documentation on Kafka setup with Workers](https://docs.upstash.com/kafka/real-time-analytics/realtime_analytics_serverless_kafka_setup#option-1-cloudflare-workers) for more information. Replace `url`, `username` and `password` with the variables set by the integration. 

## Upstash QStash

To set up an integration with Upstash QStash:

1. Configure the [publicly available HTTP endpoint](https://docs.upstash.com/qstash#1-public-api) that you want to send your messages to.

2. Add the Upstash QStash integration to your Worker:

    a. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    b. In **Account Home**, select **Workers & Pages**.
    c. In **Overview**, select your Worker.
    d. Select **Settings** > **Integrations** > **Upstash QStash**. 
    e. Follow the setup flow.
    
3. In your Worker, install the `@upstash/qstash`, a HTTP client to connect to your database QStash endpoint:
    ```sh
    $ npm install @upstash/qstash
    ```
4. Refer to the [Upstash documentation on how to receive webhooks from QStash in your Cloudflare Worker](https://docs.upstash.com/qstash/quickstarts/cloudflare-workers#3-use-qstash-in-your-handler). 
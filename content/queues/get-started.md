---
title: Get started
pcx_content_type: get-started
weight: 2
meta:
  title: Get started 
---

# Get started 

Cloudflare Queues is a flexible messaging queue that allows you to queue messages for asynchronous processing. By following this guide, you will create your first queue, a Worker to publish messages to that queue, and a consumer Worker to consume messages from that queue.

## Prerequisites

To use Queues, you will need:

1. A [Cloudflare account](/fundamentals/account-and-billing/account-setup/), if you do not have one already.

2. C3 ([`create-cloudflare-cli`](https://www.npmjs.com/package/create-cloudflare)) to help you setup and deploy Workers to Cloudflare as fast as possible. C3 will also install [Wrangler](/workers/wrangler/install-and-update/), a command-line tool for building Cloudflare Workers and accessing Queues. To install `create-cloudflare`, ensure you have [`npm`](https://docs.npmjs.com/getting-started) and [`Node.js`](https://nodejs.org/en/) installed.
3. A Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. Wrangler requires a Node version of `16.13.0` or later. You will install these tools as part of creating a new project in [step 2](/queues/get-started/#2-create-a-worker-project).

## 1. Enable Queues

Queues is currently in [Public Beta](https://blog.cloudflare.com/cloudflare-queues-open-beta/).

{{<Aside type="note">}}

Before you can use Queues, you must enable it via [the Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers/queues). You need a Workers Paid plan to enable Queues.

{{</Aside>}}

To enable Queues:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** > **Queues**.
3. Select **Enable Queues Beta**.

Queues is included in the monthly subscription cost of your Workers Paid plan, and charges based on operations against your queues. Refer to [Pricing](/queues/platform/pricing/) for more details.

## 2. Create a Worker project

You will access your queue from a Worker, the producer Worker. You must create at least one producer Worker to publish messages onto your queue.

To create a producer Worker, run:

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn create cloudflare@latest
```

{{</tab>}}
{{</tabs>}}

In your terminal, you will be asked a series of questions related to your project. 

1. Name your new Worker directory by specifying where you want to create your application.
2. Select `"Hello World" script` as the type of application you want to create.
3. Answer `yes` to using TypeScript.
4. Answer `no` to using Git.
5. Answer `no` to deploying your Worker.

This will create a new directory, which will include both a `src/worker.ts` Worker script, and a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. After you create your Worker, you will create a Queue to access.

## 3. Create a queue

To use queues, you need to create at least one queue to publish messages to and consume messages from.

To create a queue, run:

```sh
$ wrangler queues create <MY_FIRST_QUEUE>
```

Choose a name that is descriptive and relates to the types of messages you intend to use this queue for. Descriptive queue names look like: `debug-logs`, `user-clickstream-data`, or `password-reset-prod`. 

Queue names must be 1 to 63 characters long. Queue names cannot contain special characters outside dashes (`-`), and must start and end with a letter or number.

You cannot change your queue name after you have set it. After you create your queue, you will set up your producer Worker to access it.

## 4. Set up your producer worker

In order to expose your queue to the code inside your Worker, you need to connect your queue to your Worker by creating a binding. [Bindings](/workers/configuration/bindings/) allow your Worker to access resources, such as Queues, on the Cloudflare developer platform.

To create a binding, open your newly generated `wrangler.toml` configuration file and add the following:

```toml
[[queues.producers]]
 queue = "YOUR_QUEUE_NAME"
 binding = "MY_QUEUE"
```

Replace `YOUR_QUEUE_NAME` with the name of the queue you created in step 3. Next, replace `MY_QUEUE` with the name you want for your `binding`. The binding must be a valid JavaScript variable name. This is the variable you will use to reference this queue in your Worker.

### Write your producer Worker

You will now configure your producer Worker to create messages to publish to your queue. Your producer Worker will:

1. Take a request it receives from the browser.
2. Transform the request to JSON format.
3. Write the request directly to your queue.

In your Worker project directory, open the `src` folder and add the following to your `worker.ts` file:

```ts
---
filename: src/worker.ts
highlight: [8]
---
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    let log = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers),
    };
    await env.<MY_QUEUE>.send(log);
    return new Response('Success!');
  },
};
```

Replace `MY_QUEUE` with the name you have set for your binding from your `wrangler.toml`.

Also add the queue to `Env` interface in `worker.ts`.

```ts
---
filename: src/worker.ts
highlight: [2]
---
export interface Env {
   <MY_QUEUE>: Queue<any>;
}
```

If this write fails, your Worker will return an error (raise an exception). If this write works, it will return `Success` back with a HTTP `200` status code to the browser.

In a production application, you would likely use a [`try-catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) statement to catch the exception and handle it directly (for example, return a custom error or even retry).

### Publish your producer Worker

With your `wrangler.toml` file and `worker.ts` file configured, you are ready to publish your producer Worker. To publish your producer Worker, run:

```sh
$ npx wrangler deploy
```

You should see output that resembles the below, with a `*.workers.dev` URL by default.

```
Uploaded <YOUR-WORKER-NAME> (0.76 sec)
Published <YOUR-WORKER-NAME> (0.29 sec)
  https://<YOUR-WORKER-NAME>.<YOUR-ACCOUNT>.workers.dev
```

Copy your `*.workers.dev` subdomain and paste it into a new browser tab. Refresh the page a few times to start publishing requests to your queue. Your browser should return the `Success` response after writing the request to the queue each time.

You have built a queue and a producer Worker to publish messages to the queue. You will now create a consumer Worker to consume the messages published to your queue. Without a consumer Worker, the messages will stay on the queue until they expire, which defaults to four (4) days.

## 5. Create your consumer Worker

A consumer Worker receives messages from your queue. When the consumer Worker receives your queue's messages, it can write them to another source, such as a logging console or storage objects.

In this guide, you will create a consumer Worker and use it to log and inspect the messages with [`wrangler tail`](/workers/wrangler/commands/#tail). You will create your consumer Worker in the same Worker project that you created your producer Worker.

To create a consumer Worker, open your `worker.ts` file and add the following `queue` handler to your existing `fetch` handler:

```ts
---
filename: src/worker.ts
highlight: [11]
---
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    let log = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers),
    };
    await env.<MY_QUEUE>.send(log);
    return new Response('Success!');
  },
  async queue(batch: MessageBatch<any>, env: Env): Promise<void> {
    let messages = JSON.stringify(batch.messages);
    console.log(`consumed from our queue: ${messages}`);
  },
};
```

Replace `MY_QUEUE` with the name you have set for your binding from your `wrangler.toml`.

Every time messages are published to the queue, your consumer Worker's `queue` handler (`async queue`) is called and it is passed one or more messages.

In this example, your consumer Worker transforms the queue's JSON formatted message back to a string and logs that output. In a real world application, your consumer Worker can be configured to write messages to object storage (such as [R2](/r2/)), write to a database (like [D1](/d1/)), or further process messages before calling an external API, such as an [email API](/workers/tutorials/) or a data warehouse with your legacy cloud provider.  

### Connect the consumer Worker to your queue

After you have configured your consumer Worker, you are ready to connect it to your queue.

Each queue can only have one consumer Worker connected to it. If you try to connect multiple consumers to the same queue, you will encounter an error when attempting to publish that Worker.

To connect your queue to your consumer Worker, open your `wrangler.toml` file and add this to the bottom:

```toml
[[queues.consumers]]
 queue = "<YOUR_QUEUE_NAME>"
 # Required: this should match the name of the queue you created in step 3.
 # If you misspell the name, you will receive an error when attempting to publish your Worker.
 max_batch_size = 10 # optional: defaults to 10
 max_batch_timeout = 5 # optional: defaults to 5 seconds
```

Replace `YOUR_QUEUE_NAME` with the queue you created in step 3.

In your consumer Worker, you are using queues to auto batch messages using the `max_batch_size` option and the `max_batch_timeout` option. The consumer Worker will receive messages in batches of `10` or every `5` seconds, whichever happens first. 

`max_batch_size` (defaults to 10) helps to reduce the amount of times your consumer Worker needs to be called. Instead of being called for every message, it will only be called after 10 messages have entered the queue.

`max_batch_timeout` (defaults to 5 seconds) helps to reduce wait time. If the producer Worker is not sending up to 10 messages to the queue for the consumer Worker to be called, the consumer Worker will be called every 5 seconds to receive messages that are waiting in the queue.

### Publish your consumer Worker

With your `wrangler.toml` file and `worker.ts` file configured, publish your consumer Worker by running:

```sh
$ npx wrangler deploy
```

## 6. Read messages from your queue

After you set up consumer Worker, you can read messages from the queue. 

Run `wrangler tail` to start waiting for our consumer to log the messages it receives:

```sh
$ wrangler tail
```

With `wrangler tail` running, open the Worker URL you opened in step 4. 

You should receive a `Success` message in your browser window.

If you receive a `Success` message, refresh the URL a few times to generate messages and push them onto the queue. 

With `wrangler tail` running, your consumer Worker will start logging the requests generated by refreshing.

If you refresh less than 10 times, it may take a few seconds for the messages to appear because batch timeout is configured for 10 seconds. After 10 seconds, messages should arrive in your terminal.

If you get errors when you refresh, check that the queue name you created in step 3 and the queue you referenced in your `wrangler.toml` file is the same. You should ensure that your producer Worker is returning `Success` and is not returning an error.

By completing this guide, you have now created a queue, a producer Worker that publishes messages to that queue, and a consumer Worker that consumes those messages from it.

## Related resources

* Learn more about [Cloudflare Workers](/workers/) and the applications you can build on Cloudflare.

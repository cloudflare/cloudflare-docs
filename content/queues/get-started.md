---
title: Guide
pcx_content_type: get-started
weight: 2
meta:
  title: Get started guide
---

# Get started guide

This guide will instruct you on creating your first queue.

## Prerequisite: Create a Cloudflare account

In order to use Queues, you need a [Cloudflare account](/fundamentals/account-and-billing/account-setup/). If you already have an account, skip this step.

## 1. Enable Queues

Queues is in [Public Beta](https://blog.cloudflare.com/cloudflare-queues-open-beta/). You need a Paid Workers plan to enable Queues. To enable Queues:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers** > **Queues**.
3. Select **Enable Queues Beta**.

You have now enabled Queues with no additional cost.

## 2. Install Wrangler

You will use [Wrangler](/workers/wrangler/get-started/), a command-line tool for building Cloudflare Workers, to access Queues.

To install Wrangler, ensure you have [`npm`](https://docs.npmjs.com/getting-started) and [`Node.js`](https://nodejs.org/en/) installed.

Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. Wrangler requires a Node version of `16.13.0` or later. Install Wrangler by running:

```sh
$ npm install -g wrangler
```

or install with `yarn`:

```sh
$ yarn global add wrangler
```

Queues requires Wrangler version `2.2.1` or higher. Run `wrangler version` to check your version:

```sh
wrangler --version
2.2.1
```

With Wrangler installed, you will now create a queue.

## 3. Create a queue

To create a queue, run:

```sh
wrangler queues create <MY_FIRST_QUEUE>
```

You cannot change your queue name after you have set it. After you create your queue, you will create a Worker to access it.

## 4. Create a producer Worker 

You must create a producer Worker to publish messages onto a queue. To create a producer Worker, run:

```sh
$ wrangler init <WORKER_NAME>
```

In your terminal, you will be asked a series of questions related to your project. For the question `Would you like to use TypeScript? (y/n)`, indicate `y`. This will create an `index.ts` file in your project directory's `src` folder where you will write the code needed for your Worker to access your queue.

### Bind your producer Worker to your queue

You will now bind your Worker to your queue. [Bindings](/workers/platform/bindings/) allow your Worker to access resources, such as Queues, on the Cloudflare developer platform. To create a binding, open your newly generated `wrangler.toml` configuration file and add the following:

```toml
[[queues.producers]]
 queue = "YOUR_QUEUE_NAME"
 binding = "MY_QUEUE"
```

Replace `YOUR_QUEUE_NAME` with the name of the queue you created in step 3. Next, replace `MY_QUEUE` with the name you want for your binding.

### Set up your producer Worker

You will now configure your producer Worker to take a request it receives from the browser, transform the request to JSON format and write it directly to your queue. In your Worker project directory, open the `src` folder and add the following to your `index.ts` file:

```toml
---
filename: src/index.ts
highlight: [4]
---
export default {
 async fetch(request: Request, env: Environment): Promise<Response> {
   let log = await request.json();
   await env.<MY_QUEUE>.send(log);
   return new Response("Success!");
 }
 ```

Replace `MY_QUEUE` with the name you have set for your binding from your `wrangler.toml`.

If this write fails, it will return an error. If it works, it will return `Success`.

### Publish your producer Worker

With your `wrangler.toml` file and `index.ts` file configured, you are ready to publish your producer Worker. To publish your producer Worker, run:

```sh
$ wrangler publish
```

Go to the Cloudflare dashboard and visit your Worker URL. Refresh the page a few times to start publishing requests to your queue. You have built a queue and a producer Worker to publish messages to the queue. You will now create a consumer Worker to take messages off of your queue. Without a consumer Worker, the messages will stay on the queue until they expire after five days.

## 5. Create your consumer Worker

A consumer Worker receives messages from your queue. When the consumer Worker receives your queue's messages, it can write them to another source, such as a logging console or storage objects. For this guide, you will create a consumer Worker and use it to log and inspect the messages with [`wrangler tail`](/workers/wrangler/commands/#tail). You will create your consumer Worker in the same Worker project that you created your producer Worker.

To create a consumer Worker, open your `index.ts` file and add the following `queue` handler to your existing `fetch` handler:

```sh
---
filename: src/index.ts
highlight: [4]
---
export default {
 async fetch(request: Request, env: Environment): Promise<Response> {
   let log = await request.json();
   await env.<MY_QUEUE>.send(log);
   return new Response("Success!");
 }
 async queue(batch: MessageBatch<Error>, env: Environment): Promise<void> {
   let messages = await JSON.stringify(batch.messages)
   console.log(`consumed from our queue: ${messages}`)
 }
}
```

Replace `MY_QUEUE` with the name you have set for your binding from your `wrangler.toml`.

Every time you get a message on the queue, your consumer Worker's `queue` handler (`async queue`) is called and it is passed one or more messages. In this example, your consumer Worker transforms the queue's JSON formatted message back to a string and logs that output. In a real world application, your consumer Worker can be configured to write messages to storage objects, like R2, or a database, like D1.

### Connect consumer Worker to your queue

After you have configured your consumer Worker, you are ready to connect it to your queue. Each queue can only have one consumer Worker connected to it.

To connect your queue to your consumer Worker, open your `wrangler.toml` file and add this to the bottom:

```toml
[[queues.consumers]]
 queue = "<YOUR_QUEUE_NAME>"
 max_batch_size = 10
 max_batch_timeout = 10
```

Replace `YOUR_QUEUE_NAME` with the queue you created in step 3.

In your consumer Worker, you are using queues to auto batch messages using the `max_batch_size` option and the `max_batch_timeout` option. The consumer Worker will receive messages in batches of `10` or every `10` seconds, whichever happens first. 

`max_batch_size` helps to reduce the amount of times your consumer Worker needs to be called. Instead of being called for every message, it will only be called after 10 messages have entered the queue. 

`max_batch_timeout` helps to reduce wait time. If the producer Worker is not sending up to 10 messages to the queue for the consumer Worker to be called, the consumer Worker will be called every 10 seconds to receive messages that are waiting in the queue.

### Publish your consumer Worker

With your `wrangler.toml` file and `index.ts` file configured, publish your consumer Worker by running:

```sh
$ wrangler publish
```

## 6. Read messages from your queue

After you set up consumer Worker, you can read messages from the queue. 

Run `wrangler tail` to start waiting for our consumer to log the messages it receives:

```sh
$ wrangler tail
```

With `wrangler tail` running, open the Worker URL you opened in step 4. You should receive a `Success` message in your browser window. If you receive a `Success` message, refresh the URL a few times to generate messages and push them onto the queue. With `wrangler tail` running, your consumer Worker will start logging the requests generated by refreshing. If you refresh less than 10 times, it may take a few seconds for the messages to appear because batch timeout is configured for 10 seconds. After 10 seconds, messages should arrive in your terminal.

If you get errors when you refresh, check that the queue name you created in step 3 and the queue you referenced in your `wrangler.toml` file is the same.

By completing this guide, you have created a queue, created messages with a produce Worker and received messages from the queue with a producer Worker.

## Next steps

* [Use Queues to store data in R2](/queues/examples/send-errors-to-r2/)
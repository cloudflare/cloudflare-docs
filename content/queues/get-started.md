---
pcx_content_type: get-started
title: Get Started
weight: 3
meta:
  title: Cloudflare Queues - Get Started
---

# Get started

Cloudflare Queues allows developers to send and receive messages with guaranteed delivery. It integrates with [Cloudflare Workers](/workers) and offers at-least once delivery, message batching, and does not charge for egress bandwidth.

Use this guide to create a producer and consumer Worker to deploy your first Queue.

## 1. Install Wrangler

First, install [Wrangler](https://github.com/cloudflare/wrangler2), the command-line interface for developers to build Cloudflare Workers, by running:

{{<Aside type="note">}}

During the private Beta, you will need to use the `queues` release when installing `wrangler`.

{{</Aside>}}

```sh
$ npm install -g wrangler@queues
```

or install with yarn:

```sh
$ yarn add wrangler@queues
```

## 2. Login using wrangler

Next, run the `wrangler login` command, which will open your web browser and complete the login process. If you do not have access to your computer's screen, you can visit the URL printed in your terminal on another computer to log in.

```sh
$ wrangler login
```

Open the browser, log in to your account, and select **Allow**. This will send an OAuth token to Wrangler so it can deploy resources to your account.

## 3. Create a Queue

Create a Queue by running:

```sh
$ wrangler queues create <queue-name>
```

To check that your Queue was created, run:

```sh
$ wrangler queues list
```

## 4. Configure a producer Worker

A producer Worker is a Worker that can send messages to your Queue. After you create a producer Worker and bind it to your Queue, you can send messages to the Queue.

{{<Aside type="note" header="What is a binding?">}}

A [binding](/workers/platform/bindings/) is a how a Worker interacts with resources such as a Queue, [R2 bucket](/r2/api), or [KV namespace](/workers/runtime-apis/kv/). Each binding has a name, which is the name a variable in JavaScript, and a resource that it binds to, like a Queue.

{{</Aside>}}

First, create a Worker using a [template](/workers/get-started/quickstarts/#templates).

```sh
$ wrangler init <PRODUCER_NAME>
```

Next, find your newly generated `wrangler.toml` file in your project's directory and configure your producer.

```toml
name = "<PRODUCER_NAME>"

[[queues.producers]]
  queue = "<QUEUE_NAME>"
binding = "<MY_QUEUE>"
```

For more details about the configuration format...

TODO

---
updated: 2022-07-21
difficulty: Intermediate
content_type: 📝 Tutorial
pcx-content-type: tutorial
title: Deploy a real-time chat application
---

# Deploy a real-time chat application

In this tutorial, you will deploy a serverless, real-time chat application that runs using [Durable Objects](/workers/learning/using-durable-objects). 

This chat application uses a Durable Object to control each chat room. Users connect to the Object using WebSockets. Messages from one user are broadcast to all the other users. The chat history is also stored in durable storage. Real-time messages are relayed directly from one user to others without going through the storage layer.

To continue with this tutorial, you must:
1. Install [Wrangler 2](/workers/wrangler/get-started).
2. Purchase the Workers Paid plan and enable Durable Objects by logging into the [Cloudflare dashboard](https://dash.cloudflare.com) > **Workers** > **Resources** > **Durable Objects**.

## Clone the chat application repository

Open your terminal and clone the [workers-chat-demo](https://github.com/cloudflare/workers-chat-demo) repository:

```sh
$ git clone https://github.com/cloudflare/workers-chat-demo.git
```

## Authenticate Wrangler

After you have cloned the repository, authenticate Wrangler by running:

```sh
$ wrangler login
```

## Publish your project

Open the cloned workers-chat-demo repository. To test the chat application in a local environment, run:

When you are ready to deploy your application, run:

```sh
$ wrangler publish
```

Your application will be deployed to your `*.workers.dev` subdomain. 

To deploy your application to a custom domain within the Cloudflare dashboard, go to your Worker > **Triggers** > **Add Custom Domain**.

To deploy your application to a custom domain using Wrangler, open your project's `wrangler.toml`.

To configure a route in your `wrangler.toml`, add the following to your environment:

```toml
Route = [
{pattern = “example.com/about”, 
Zone_id = <YOUR_ZONE_ID>,
}]
```

If you have specified your zone ID in the environment of your `wrangler.toml`, you will not need to write it again in object form.

To configure a subdomain in your `wrangler.toml`, add the following to your environment:

```toml
Route = [
{pattern = “subdomain.example.com”, 
custom domains = true,
}]
```

By completing this tutorial, you have deployed a real-time chat application with Durable Objects and Cloudflare Workers.
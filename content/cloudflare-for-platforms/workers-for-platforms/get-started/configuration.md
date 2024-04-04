---
pcx_content_type: how-to
title: Configure Workers for Platforms
weight: 1
meta:
title: Configure Workers for Platforms
---

# Configure Workers for Platforms

This guide will instruct you on setting up Workers for Platforms. You will configure a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace), a [dynamic dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dynamic-dispatch-worker) and a [user Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers) to test a request end to end. This guide assumes that you already have a Cloudflare account. If you do not have a Cloudflare account, sign up before continuing.

## Prerequisites: 

### Enable Workers for Platforms

Workers for Platforms is available for Enterprise customers only. To enable Workers for Platforms, contact your Cloudflare account team.

### Learn about Workers for Platforms

Get familar with Workers for Platforms terminology and architecture: [How Workers for Platforms works](cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/).

---

## 1. Create a user Worker

First, create a [user Workers](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers). User Workers are Workers that your end users (end developers) will be uploading.

User Workers can be created using C3. C3 (create-cloudflare-cli) is a command-line tool designed to help you setup and deploy Workers to Cloudflare as fast as possible.

Open a terminal window and run C3 to create your Worker project. This example creates a user Worker called `customer-worker-1`. 


```sh
$ npm create cloudflare@latest customer-worker-1 -- --type=hello-world
```

When following the interactive prompts, answer the questions as below:

- Select `no` to using TypeScript.
- **Select `no` to deploying your application.**

## 2. Create a dispatch namespace 

Create a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace). A dispatch namespace is made up of a collection of [user Workers](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers). 

This example creates a dispatch namespace called `testing`. To create a dispatch namespace, run:

```sh
$ npx wrangler dispatch-namespace create testing
```

## 3. Upload a user Worker to the dispatch namespace

Make sure you are in your user Worker's project directory:

```sh
$ cd customer-worker-1
```

To upload and deploy the user Worker to the dispatch namespace, running the following command:

```sh
$ npx wrangler deploy --dispatch-namespace testing
```

## 4. Create a dispatch Worker

[Dispatch Workers](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dynamic-dispatch-worke) are used to execute user Workers from the dispatch namespace. You will now create a dispatch Worker and add logic it needs to route to the user Worker created in step 2.


Navigate up a level from your user Worker's project directory:
```sh
$ cd ..
```

Create your dispatch Worker. In this example, the dispatch Worker is called `my-dispatcher`. 

```sh
$ npm create cloudflare@latest my-dispatcher
```

When setting up `my-dispatcher`, answer the questions as below:

- Select `no` to using TypeScript.
- Select `yes` to deploying.

Change to your project's directory:

```sh
$ cd my-dispatcher
```

Open the `wrangler.toml` file in your project directory, and add the dispatch namespace binding:

```toml
---
filename: wrangler.toml
---

[[dispatch_namespaces]]
binding = "DISPATCHER"
namespace = "testing" 
```

Add the followinng to the index.js file:

```js
---
filename: index.js
---
export default {
  async fetch(req, env) {
    const worker = env.DISPATCHER.get("customer-worker-1");
    return await worker.fetch(req);
  },
};
```

Deploy your dispatch Worker:

```sh
$ npx wrangler deploy
```

## 5. Test a request

You will now send a request to the route your dynamic dispatch Worker is on. You should receive the response (`Hello world`) you created in your user Worker (`customer-worker-1`) that you call from your dynamic dispatch Worker (`my-dispatcher`).

Preview the response to your Workers for Platforms project at `https://my-dispatcher.<YOUR_WORKER_SUBDOMAIN>.workers.dev/`.

By completing this guide, you have successfully set up a dispatch namespace, dynamic dispatch Worker and user Worker to test a request end to end.

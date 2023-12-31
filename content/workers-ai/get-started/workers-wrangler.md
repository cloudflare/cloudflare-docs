---
title: Workers - Wrangler
pcx_content_type: get-started
weight: 2
---

# Get started - Workers AI local dev

In this guide, you will get started with Workers AI, experiment with a large language model (LLM), and deploy your first AI powered app on the Workers platform.

## Before you begin

[Setup your local development environment](/workers-ai/get-started/local-dev-setup/), if this is your first time developing with Wrangler.

## 1. Create a Workers project

Create a new project named `hello-ai` by running:

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}

{{<tab label="yarn">}}

```sh
$ yarn create cloudflare
```

{{</tab>}}
{{</tabs>}}

When setting up your `hello-ai` Worker, answer the setup questions as follows:

* Enter `hello-ai` for the directory to create in
* Choose `"Hello World" script` for the type of application
* Select `yes` to using TypeScript
* Select `yes` to using Git
* Select `no` to deploying

This will create a new `hello-ai` directory. Your new `hello-ai` directory will include:

* A `"Hello World"` [Worker](/workers/get-started/guide/#3-write-code) at `src/index.ts`
* A [`wrangler.toml`](/workers/wrangler/configuration/) configuration file.

Navigate to your app directory:
```sh
$ cd hello-ai
```

## 2. Connect your Worker to Workers AI

You must create a binding for your Worker to connect to Workers AI. [Bindings](/workers/configuration/bindings/) allow your Workers to access resources or services, like Workers AI, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind Workers AI to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[ai]
binding = "AI" # i.e. available in your Worker on env.AI
```

<!-- TODO update this once we know if we'll have it -->
You can also bind Workers AI to a Pages Function. For more information, refer to [Functions Bindings](/pages/functions/bindings/#workers-ai).

## 3. Install the Workers AI client library

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm install --save-dev @cloudflare/ai
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn add --dev @cloudflare/ai
```

{{</tab>}}
{{</tabs>}}

{{<render file="_npm-update.md">}}

## 4. Run an inference task in your Worker

Now we are ready to run an inference task in our Worker. In this case, we will use an LLM, like Llama 2, to answer a question.

Go to your `hello-ai` and update the `index.ts` with the following code:

```typescript
---
filename: "src/index.ts"
---
import { Ai } from '@cloudflare/ai'

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "AI" with the variable name you defined.
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
        prompt: "What is the origin of the phrase Hello, World"
      }
    );

    return new Response(JSON.stringify(response));
  },
};
```

After configuring your Worker, you can test your project locally before you deploy globally.

## 5. Develop locally with Wrangler

While in your project directory, test Workers AI locally by running. 

```sh
$ npx wrangler dev --remote
```

Note, you will be prompted to login at this time. You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.


{{<Aside type="warning">}}
Be sure to include the `--remote`. This proxies Workers AI requests to the Cloudflare network as the dev environment is not currently capable of running them locally.
{{</Aside>}}

When you run `npx wrangler dev`, Wrangler will give you a URL (most likely `localhost:8787`) to review your Worker. After you visit the URL Wrangler provides, you will see this message:

```json
{"response":"Ah, a most excellent question, my dear human friend! *adjusts glasses*\n\nThe origin of the phrase \"Hello, World\" is a fascinating tale that spans several decades and multiple disciplines. It all began in the early days of computer programming, when a young man named Brian Kernighan was tasked with writing a simple program to demonstrate the basics of a new programming language called C.\nKernighan, a renowned computer scientist and author, was working at Bell Labs in the late 1970s when he created the program. He wanted to showcase the language's simplicity and versatility, so he wrote a basic \"Hello, World!\" program that printed the familiar greeting to the console.\nThe program was included in Kernighan and Ritchie's influential book \"The C Programming Language,\" published in 1978. The book became a standard reference for C programmers, and the \"Hello, World!\" program became a sort of \"Hello, World!\" for the programming community.\nOver time, the phrase \"Hello, World!\" became a shorthand for any simple program that demonstrated the basics"}
```


## 6. Deploy your AI Worker

Finally, deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
$ npx wrangler deploy
# Outputs: https://hello-ai.<YOUR_SUBDOMAIN>.workers.dev
```

You can now visit the URL to run your AI Worker.

By finishing this tutorial, you have created a Worker, connected it to Workers AI, and ran an inference tasks from your model.

## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.gg/cloudflaredev).

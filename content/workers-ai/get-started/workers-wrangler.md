---
title: Workers - Wrangler
pcx_content_type: get-started
weight: 1
---

# Get started

This guide will instruct you through:

* Creating a Workers project
* Connect your Worker to Workers AI
* Running an inference task in your worker

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [`npm`](https://docs.npmjs.com/getting-started).
3. Install [`Node.js`](https://nodejs.org/en/). Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/) requires a Node version of `16.13.0` or later.

## 1. Create a Worker

Create a new project named `workers-ai-app` by running:

```sh
$ npm create cloudflare@latest

```

When setting up your `workers-ai-app` Worker, answer the setup questions as follows:

* Enter `workers-ai-app` for the directory to create in
* Choose `"Hello World" script` for the type of application
* Select `yes` to using TypeScript
* Select `yes` to using Git
* Select `no` to deploying

This will create a new `workers-ai-app` directory. Your new `workers-ai-app` directory will include:

* A `"Hello World"` [Worker](/workers/get-started/guide/#3-write-code) at `src/worker.ts` 
* A [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. `wrangler.toml` is how your `d1-tutorial` Worker will access your D1 database.

## 2. Connect your Worker to Workers AI

You must create a binding for your Worker to connect to Workers AI. [Bindings](/workers/configuration/bindings/) allow your Workers to access resources or services, like Workers AI, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind Workers AI to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[[ai]]
binding = "AI" # i.e. available in your Worker on env.AI
```

Specifically:

* The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker. In this tutorial, name your binding `AI`.
* The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_AI"` or `binding = "myAI"` would both be valid names for the binding.
* Your binding is available in your Worker at `env.<BINDING_NAME>`

<!-- TODO update this once we know if we'll have it -->
You can also bind Workers AI to a Pages Function. For more information, refer to [Functions Bindings](/pages/platform/functions/bindings/#d1-databases).

## 3. Install the Workers AI client library

```sh
$ npm install @cloudflare/ai
```

## 4. Run an inference task in your Worker

Now we are ready to run an inference task in our our worker. In this case 

First, go to your `d1-tutorial` Worker and open the `worker.ts` file. The `worker.ts` file is where you configure your Worker's interactions with D1.

Clear the content of `worker.ts`. Paste the following code snippet into your `worker.ts` file. On the `env` parameter, replace `<BINDING_NAME>` with `DB`:

```typescript
---
filename: "src/worker.ts"
---
import { Ai } from '@cloudflare.com/ai'

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "AI" with the variable name you defined.
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const answer = ai.run({
        model: '@cloudflare/llama-2-7b',
        input: {
            prompt: "What is the origin of the phrase 'Hello, World'" 
        }
    });

    return new Response(JSON.stringify(answer));
  },
};
```

In the code above, you:

* Import the Workers AI client library - `@cloudlfare/ai`
* Define a binding to our Workers AI in our TypeScript code. This binding matches the `binding` value we set in `wrangler.toml` under `[[ai]]`
* Instantiate the `ai` library and pass in the `env.AI` binding
* Call `ai.run`, and pass in a model, and input
* Return the inference results, in JSON format

After configuring your Worker, you can test your project locally before you deploy globally.

## 5. Develop locally with Wrangler

While in your project directory, test Workers AI locally by running:

```sh
$ wrangler dev --remote
```

When you run `wrangler dev`, Wrangler will give you a URL (most likely `localhost:8787`) to review your Worker. After you visit the URL Wrangler provides, you will see this message:

```json
{
  "id": "",
  "object": "",
  "created": ,
  "model": "@cloudflare/meta-llama/llama-2-7b",
  "choices": [
    {
      "text": "\n\nThis is indeed a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  }
}
```

To test that your database is running successfully, add `/api/beverages` to the provided Wrangler URL: for example, `localhost:8787/api/beverages`. After doing this, you should see your data being displayed in the browser.

## 6. Deploy your AI Worker

Before deploying your AI Worker globally, log in with your Cloudflare account by running:

```sh
$ wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

Finally, deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
$ npx wrangler deploy
# Outputs: https://workers-ai-app.<YOUR_SUBDOMAIN>.workers.dev
```

You can now visit the URL to run your AI Worker.

By finishing this tutorial, you have created a Worker, connected it to Workers AI, and ran an inference tasks from your model.

## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.gg/cloudflaredev).

- [todo]()
- [todo]() within your Worker.
- Explore [todo]().


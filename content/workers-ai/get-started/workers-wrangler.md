---
title: Workers - Wrangler
pcx_content_type: get-started
weight: 2
---

# Get started - Workers AI local dev
In this guide, you will get started with Workers AI, experiment with a large laguage model (LLM),  and deploy your first AI powered app on the Workers platform.

## Before you begin
[Setup your local development environment](/workers-ai/get-started/setup-your-cli), if this is your first time developing with Wrangler.

## 1. Create a Workers project

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

<!-- TODO update this once we know if we'll have it -->
You can also bind Workers AI to a Pages Function. For more information, refer to [Functions Bindings](/pages/platform/functions/bindings/#d1-databases).

## 3. Install the Workers AI client library

```sh
$ npm install @cloudflare/ai
```

## 4. Run an inference task in your Worker

Now we are ready to run an inference task in our our worker. In this case, we will use an LLM, like lambda-2, to answer a questions.

Go to your `workers-ai-app` and update the `worker.ts` with the following code: 

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

After configuring your Worker, you can test your project locally before you deploy globally.

## 5. Develop locally with Wrangler

While in your project directory, test Workers AI locally by running:

```sh
$ wrangler dev --remote
```

{{<Aside type="warning">}}
Be sure  include the `--remote`. This proxies Workers AI requests to the Cloudflare network as the dev enviroment is not currently capable of running them.
{{</Aside>}}

When you run `wrangler dev`, Wrangler will give you a URL (most likely `localhost:8787`) to review your Worker. After you visit the URL Wrangler provides, you will see this message:

```json
{
  "result": {
    "data": {
      "output": "Workers AI is the best!"
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```


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
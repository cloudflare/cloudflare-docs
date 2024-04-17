---
title: Deploy a Workers AI project
pcx_content_type: get-started
weight: 1
meta:
  description: Deploy your first Workers AI project using Cloudflare Workers.
---

# Get started with Workers

This guide will instruct you through setting up and deploying your first Workers AI project. You will use [Workers](/workers/), a Workers AI binding, and a large language model (LLM) to deploy your first AI-powered application on the Cloudflare global network.

{{<render file="/_workers-learning-path.md" productFolder="/workers/" >}}

{{<render file="_prereqs.md" productFolder="/workers/" >}}

## Get started in the dashboard

This guide uses the command line. To instead create your Workers AI application using the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages** > **Create application**.
3. Under **Create using a template**, select **LLM App**. After you select your template, an AI binding will be created for you in the dashboard.
4. Review the pregenerated code and select **Deploy**.
5. Preview your Worker at its provided [`workers.dev`](/workers/configuration/routing/workers-dev/) subdomain.

## 1. Create a Worker project

You will create a new Worker project using the `create-cloudflare` CLI (C3). [C3](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `hello-ai` by running:

{{<render file="/_c3-run-command.md" productFolder="/workers/" >}}

Running `npm create cloudflare@latest` will prompt you to install the [`create-cloudflare` package](https://www.npmjs.com/package/create-cloudflare), and lead you through setup. C3 will also install [Wrangler](/workers/wrangler/), the Cloudflare Developer Platform CLI.

When setting up your `hello-ai` Worker, answer the setup questions as follows:

* Enter `hello-ai` for the directory to create in.
* Choose `"Hello World" Worker` for the type of application.
* Select `yes` to using TypeScript.
* Select `yes` to using Git.
* Select `no` to deploying.

This will create a new `hello-ai` directory. Your new `hello-ai` directory will include:

* A `"Hello World"` [Worker](/workers/get-started/guide/#3-write-code) at `src/index.ts`.
* A [`wrangler.toml`](/workers/wrangler/configuration/) configuration file.


Go to your application directory:

```sh
$ cd hello-ai
```

## 2. Connect your Worker to Workers AI

You must create an AI binding for your Worker to connect to Workers AI. [Bindings](/workers/runtime-apis/bindings/) allow your Workers to interact with resources, like Workers AI, on the Cloudflare Developer Platform.

To bind Workers AI to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[ai]
binding = "AI"
```

Your binding is [available in your Worker code](/workers/reference/migrate-to-module-workers/#bindings-in-es-modules-format) on [`env.AI`](/workers/runtime-apis/handlers/fetch/).

<!-- TODO update this once we know if we'll have it -->
You can also bind Workers AI to a Pages Function. For more information, refer to [Functions Bindings](/pages/functions/bindings/#workers-ai).

## 3. Run an inference task in your Worker

You are now ready to run an inference task in your Worker. In this case, you will use an LLM, [`llama-2-7b-chat-int8`](/workers-ai/models/llama-2-7b-chat-int8/), to answer a question.

Update the `index.ts` file in your `hello-ai` application directory with the following code:

```typescript
---
filename: "src/index.ts"
---
export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "AI" with the variable name you defined.
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
        prompt: "What is the origin of the phrase Hello, World"
      }
    );

    return new Response(JSON.stringify(response));
  },
};
```

Up to this point, you have created an AI binding for your Worker and configured your Worker to be able to execute the Llama 2 model. You can now test your project locally before you deploy globally.

## 4. Develop locally with Wrangler

While in your project directory, test Workers AI locally by running [`wrangler dev`](/workers/wrangler/commands/#dev):

```sh
$ npx wrangler dev
```

{{<render file="_ai-local-usage-charges.md" productFolder="workers">}}

You will be prompted to log in after you run the `wrangler dev`. When you run `npx wrangler dev`, Wrangler will give you a URL (most likely `localhost:8787`) to review your Worker. After you go to the URL Wrangler provides, a message will render that resembles the following example:

```json
{
  "result": {
    "response": "Hello, World first appeared in 1974 at Bell Labs when Brian Kernighan included it in the C programming language example. It became widely used as a basic test program due to simplicity and clarity. It represents an inviting greeting from a program to the world."
  }
}
```

## 5. Deploy your AI Worker

Before deploying your AI Worker globally, log in with your Cloudflare account by running:

```sh
$ npx wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

Finally, deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
$ npx wrangler deploy
# Outputs: https://hello-ai.<YOUR_SUBDOMAIN>.workers.dev
```

Your Worker will be deployed to your custom [`workers.dev`](/workers/configuration/routing/workers-dev/) subdomain. You can now visit the URL to run your AI Worker.

By finishing this tutorial, you have created a Worker, connected it to Workers AI through an AI binding, and ran an inference task from the Llama 2 model.

## Related resources

- [Cloudflare Developers community on Discord](https://discord.cloudflare.com) - Submit feature requests, report bugs, and share your feedback directly with the Cloudflare team by joining the Cloudflare Discord server.
- [Models](/workers-ai/models/) - Browse the Workers AI models catalog.
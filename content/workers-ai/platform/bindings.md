---
pcx_content_type: configuration
title: Bindings
weight: 1
---

# Bindings

**Workers**

You must create a binding for your Worker to connect to Workers AI. [Bindings](/workers/configuration/bindings/) allow your Workers to access resources or services, like Workers AI, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind Workers AI to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[ai]
binding = "AI" # i.e. available in your Worker on env.AI
```

This is how you use the binding in your Worker code:

```javascript
---
filename: src/index.ts
---
export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
      const ai = new Ai(env.AI);
      ...
    }
}

export interface Env {
    AI: any;
}
```

**Pages**

To use Workers AI with a Pages project, first create your project. You can either go to the dashboard under **Workers & Pages** > **Create application**, select the **Pages** tab and follow the steps, our you can use Wrangler from the command line, like this:

```bash
wrangler pages project create ai-hello-world
```

Once the project is created, go to the dashboard under **Workers & Pages** > **ai-hello-world** > **Settings** > **Functions**, look for "Workers AI Bindings", press **Add binding** and enter the variable name that you want for your binding.

This is how you use the binding in your [Pages Functions](/pages/platform/functions/) code (assuming you chose the "AI" name):

```javascript
---
filename: functions/ai.ts
---
export const onRequest: PagesFunction<Env> = async (context) => {
  const ai = new Ai(context.env.AI);
  ...
}
```
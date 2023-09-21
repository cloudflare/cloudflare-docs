---
pcx_content_type: configuration
title: Remix + Workers AI
weight: 1
layout: example
---

Remix is a full-stack web framework that operates on both client and server. You can query your D1 database(s) easily from Remix with Remix's [data loading](https://remix.run/docs/en/1.18.1/guides/data-loading) API with the [`useLoaderData`](https://remix.run/docs/en/1.18.1/hooks/use-loader-data) hook.

To set up a new Remix site on Cloudflare Pages that can query D1:

1. Refer to [the Remix guide](/pages/framework-guides/deploy-a-remix-site/).
2. Install the Cloudflare adapter within your Remix project: `npm i @remix-run/cloudflare`.
2. Install the Cloudflare Workers AI SDK within your Remix project: `npm i @cloudflare/ai`.
3. Bind a Workers AI to your [Pages Function](/pages/platform/functions/bindings/#workers-ai).
4. Pass the `--ai=BINDING_NAME` flag when developing locally. `BINDING_NAME` should match what call in your code: for example, `--ai=AI`.

The following example shows you how to define a Remix [`loader`](https://remix.run/docs/en/1.18.1/route/loader) that has a binding to Workers AI.

* Bindings are passed through on the `context.env` parameter passed to a `LoaderFunction`.
* If you configured a [binding](/pages/platform/functions/bindings/#workers-ai) named `AI`, then you would access Workers AI [client API](/workers-ai/platform-sdk-api) methods via `context.env.AI`.

{{<tabs labels="ts">}}
{{<tab label="ts" default="true">}}

```ts
---
filename: app/routes/_index.tsx
---
import type { Ai } from "@cloudflare/ai";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface Env {
  AI: any;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.env as Env;

  const ai = new Ai(env.AI);
  const response = await ai.run({
    model: 'meta-llama-2-7b-chat',
    input: {
        prompt: "Tell me story about Cloudflare's origin "
    }
  })

  return json(results);
};

export default function Index() {
  const results = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <div>
        Cloudflare origin story (as told by llama):
        <pre>{JSON.stringify(results)}</pre>
      </div>
    </div>
  );
}
```
{{</tab>}}
{{</tabs>}}


<!--  -->
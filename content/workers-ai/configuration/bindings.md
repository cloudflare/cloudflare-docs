---
pcx_content_type: configuration
weight: 1
title: Workers Bindings
---

# Bindings

## Workers

[Workers](/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones.

To use Workers AI with Workers, you must create a Workers AI [binding](/workers/runtime-apis/bindings/). Bindings allow your Workers to interact with resources, like Workers AI, on the Cloudflare Developer Platform. You create bindings on the Cloudflare dashboard or by updating your [`wrangler.toml` file](/workers/wrangler/configuration/).

To bind Workers AI to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[ai]
binding = "AI" # i.e. available in your Worker on env.AI
```


## Pages Functions

[Pages Functions](/pages/functions/) allow you to build full-stack applications with Cloudflare Pages by executing code on the Cloudflare network. Functions are Workers under the hood.

To configure a Workers AI binding in your Pages Function, you must use the Cloudflare dashboard. Refer to [Workers AI bindings](/pages/functions/bindings/#workers-ai) for instructions.


## Methods

### async env.AI.run()

`async env.AI.run()` runs a model. Takes a model as the first parameter, and an object as the second parameter.

```javascript
const answer = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
    prompt: "What is the origin of the phrase 'Hello, World'"
});
```

**Parameters**

{{<definitions>}}

- `model` {{<type-link href="/workers-ai/models/">}}string{{</type-link>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The model to run.

  **Supported options**

  - `stream` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
    - Returns a stream of results as they are available.

{{</definitions>}}


```javascript
const answer = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
    prompt: "What is the origin of the phrase 'Hello, World'",
    stream: true
});

return new Response(answer, {
    headers: { "content-type": "text/event-stream" }
});
```
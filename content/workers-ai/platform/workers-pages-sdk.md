---
pcx_content_type: configuration
title: Workers + Pages SDK
weight: 1
---

# Workers + Pages SDK

This SDK provides an interface between a Worker or Pages function and Workers AI.

```javascript
import { run } from "@cloudflare/ai";
```

## Ai class

Workers AI requires an `Ai` instance before you can run a model.

```typescript
export class Ai {
    constructor(binding: any)
}

export type Ai = {
  binding: any;
};
```

### Ai methods

#### new Ai()

To create a new `Ai` instance:

```javascript
import { Ai } from "@cloudflare/ai";

const ai = new Ai(env.AI);
```

* **env.AI** is the project [binding](/workers-ai/platform/bindings/) defined in your `wrangler.toml` configuration.

#### async ai.run()

Runs a model. Takes a model as the first parameter, and an object as the second parameter.

```javascript
import { Ai } from '@cloudflare/ai'

// sessionOptions are optional
const ai = new Ai(env.AI, { sessionOptions: { ctx }});

const answer = ai.run('@cf/meta/llama-2-7b-chat-int8', {
    prompt: "What is the origin of the phrase 'Hello, World'"
});
```

Optionally, you can pass a `streaming` parameter to the `run` method. This will return a stream of results as they are available.

```javascript
import { Ai } from '@cloudflare/ai'

// sessionOptions are optional
const ai = new Ai(env.AI, { sessionOptions: { ctx }});

const answer = await ai.run('@cf/meta/llama-2-7b-chat-int8',
    prompt: "What is the origin of the phrase 'Hello, World'",
    stream: true
);

return new Response(answer, {
    headers: { "content-type": "text/event-stream" }
});
```
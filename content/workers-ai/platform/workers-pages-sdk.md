---
pcx_content_type: configuration
title: Javascript SDK
weight: 2
---

# Javascript SDK

The Javascript SDK provides an interface between a Worker script or a Pages function and Workers AI.

To install the latest SDK in you project:

```bash
npm install @cloudflare/ai --save-dev
```

{{<render file="_npm-update.md">}}

To use the SDK in your code:

```javascript
import { Ai } from "@cloudflare/ai";
```

## Ai class

Workers AI requires an `Ai` instance before you can run a model.

```typescript
export class Ai {
    constructor(
      binding: any,
      options: AiOptions = {}
    )
}

type AiOptions = {
  debug?: boolean;
  sessionOptions?: SessionOptions;
};

type SessionOptions = {
  ctx?: any;
  debug?: boolean;
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

You can pass optional options to the `Ai` instance. For example, streaming requires passing the execution context to the Ai session:

```javascript
import { Ai } from "@cloudflare/ai";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const ai = new Ai(env.AI, { sessionOptions: { ctx: ctx } });
  ...
  }
}
```

#### async ai.run()

Runs a model. Takes a model as the first parameter, and an inputs object as the second parameter.

```javascript
import { Ai } from '@cloudflare/ai'

const ai = new Ai(env.AI);

const answer = ai.run('@cf/meta/llama-2-7b-chat-int8', {
    prompt: "What is the origin of the phrase 'Hello, World'"
});
```

See the documentation of [each model](/workers-ai/models/) for detailed information on their input parameters and output schemas.
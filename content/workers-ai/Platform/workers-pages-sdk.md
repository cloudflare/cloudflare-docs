---
pcx_content_type: configuration
title: Workers + Pages SDK
weight: 1
---

# Workers + Pages SDK

This SDK provides a simmple interface between a Worker or Pages function and Workers AI 

```javascript
import { run } from "@cloudflare/ai";
```

## Ai class

Constellation requires an ai instance before you can run a model.


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

To create a new ai instance:

```javascript
import { Ai } from "@cloudflare/ai";

const ai = new Ai(env.AI);
```

* **env.AI** is the project [binding](/constellation/platform/wrangler/#bindings) defined in your `wrangler.toml` configuration.

#### async ai.run()

Runs a model. Takes a list of tensors as the input.

```javascript
import { Ai } from '@cloudflare.com/ai'

const ai = new Ai(env.AI);

const answer = ai.run({
    model: '@cf/meta/llama-2-7b-chat-int8',
    input: {
        question: "What is the origin of the phrase 'Hello, World'" 
    }
});
```
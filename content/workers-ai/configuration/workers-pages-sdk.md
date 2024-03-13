---
pcx_content_type: configuration
title: Workers & Pages SDK
meta:
    description: An SDK that provides an interface between a [Worker](/workers/) or [Pages Function](/pages/functions/).
---

# Workers & Pages SDK

The Workers & Pages SDK provides an interface between a [Worker](/workers/) or [Pages Function](/pages/functions/) and Workers AI.

The Workers AI client library makes Workers AI APIs available for use in your code. To import the Workers AI client library, run:

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

Import the library in your code:

```javascript
import { Ai } from "@cloudflare/ai";
```

## Constructor

### new `Ai()`

`new Ai()` creates a new `Ai` instance:

```javascript
---
higlight: [1, 11]
---
import { Ai } from "@cloudflare/ai";

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

* **env.AI** is the project [binding](/workers-ai/configuration/bindings/) defined in your `wrangler.toml` configuration.

## async ai.run()

`async ai.run()` is a method of the class instance created by `new Ai()`.

`async ai.run()` runs a model. Takes a model as the first parameter, and an object as the second parameter.

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
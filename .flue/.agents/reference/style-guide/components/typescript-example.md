---
title: TypeScriptExample
description: Rules for the TypeScriptExample component used in Workers docs.
---

## Rules

- If a ` ```js ` or ` ```ts ` fence containing Workers-style code (imports from `cloudflare:workers`, `hono`, `@cloudflare/`, or exports a `default` handler) → **warning**: use `<TypeScriptExample>` instead of a bare fence.
- If a `filename` prop does not end in `.ts` → **warning**: `filename` must end in `.ts`; the JS tab shows the `.js` equivalent automatically.
- If Expressive Code options (e.g. `collapse`) are set directly on the inner fence → **warning**: pass them via the `code` prop on `<TypeScriptExample>` instead.

## Example

````mdx
import { TypeScriptExample } from "~/components";

<TypeScriptExample filename="src/index.ts">
```ts
export default {
  async fetch(req, env): Promise<Response> {
    return new Response("Hello World");
  },
} satisfies ExportedHandler<Env>;
```
</TypeScriptExample>
````

Props: `filename` (optional, must end `.ts`), `playground` (boolean — adds Run in Playground button), `code` (Expressive Code options).

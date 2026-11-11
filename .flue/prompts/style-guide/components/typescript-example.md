---
title: TypeScriptExample
description: Rules for the TypeScriptExample component used in Workers docs.
---

## Rules

- If a ` ```js ` or ` ```ts ` fence containing Workers-style code (imports from `cloudflare:workers`, `hono`, `@cloudflare/`, or exports a `default` handler) → use `<TypeScriptExample>` instead of a bare fence.
- If a `filename` prop does not end in `.ts` → `filename` must end in `.ts`; the JS tab shows the `.js` equivalent automatically.
- If Code options (e.g. `collapse`) are set directly on the inner fence → pass them via the `code` prop on `<TypeScriptExample>` instead.
- If a `<TypeScriptExample>` contains only types (`type`, `interface`, `declare`) → use a plain ` ```ts ` fence instead. The JS tab would be empty, and the build fails on it.
- If `omitTabs` is set and the `<TypeScriptExample>` is not inside a parent `<Tabs>` → remove `omitTabs`. It does not hide the JS version; without a parent `<Tabs>`, the JS and TS blocks render one after the other.

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

Props: `filename` (optional, must end `.ts`), `omitTabs` (boolean — renders the JS and TS panels without their own `<Tabs>` wrapper, for nesting inside a parent `<Tabs>` next to other languages such as Python), `playground` (boolean — adds Run in Playground button), `code` (Astro `Code` options).

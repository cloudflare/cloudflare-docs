---
pcx-content-type: how-to
title: Module System
weight: 5
---

## Wrangler's module system

`wrangler` v2 introduces a first class module system for writing code, similar to thos provided by node.js, deno, and others. This document is a technical explainer for how it works and how it can be leveraged when creating and publishing Workers.

Cloudflare Workers support the [ESM module syntax](https://developers.cloudflare.com/workers/learning/migrating-to-module-workers/). This means you can use the `import`/`export` syntax to add modules to your Worker.

For example:

```sh
mkdir new-project
cd new-project
npx wrangler init -y
npm i meaning-of-life
```

Then, open `/src/index.ts' and add:

```typescript
import meaning from "meaning-of-life";

export default {
  async fetch(request: Request): Promise<Response> {
    return new Response(meaning);
  },
};
```

Now, run `npx wrangler dev` and hit `b` to open the app in your browser.

You should get a blank page with the number `42` on it. The page is served by your Worker which is consuming the `meaning-of-life` package.

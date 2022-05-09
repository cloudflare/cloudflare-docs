---
pcx-content-type: how-to
title: Module System
weight: 5
---

## Wrangler's module system

Cloudflare Workers support the [ESM module syntax](/workers/learning/migrating-to-module-workers/).
This means you can use the `import`/`export` syntax to add modules to your Worker.

As of version 2.0.0, `wrangler` has built-in support for importing modules.

### Module formats

`wrangler` supports importing modules in the following formats:

- JSX
- Typescript
- WebAssembly
- HTML files

### External packages

`wrangler` supports importing modules from external packages.
Here is an example of creating a Worker project that has a dependency on the `meaning-of-life` package from `npm`:

First create the project and install the dependencies.

```sh
$ mkdir new-project
$ cd new-project
$ npx wrangler init -y
$ npm i meaning-of-life
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

You should get a blank page with the number `42` on it.
The page is served by your Worker which is consuming the `meaning-of-life` package.

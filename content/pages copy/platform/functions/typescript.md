---
pcx_content_type: how-to
title: TypeScript
weight: 8
---

# TypeScript

Pages Functions supports TypeScript. Author any files in your `/functions` directory with a `.ts` extension instead of a `.js` extension to start using TypeScript.

To add the runtime types to your project, run:

```sh
$ npm install --save-dev typescript @cloudflare/workers-types
```

Then configure the runtime types by creating a `functions/tsconfig.json` file:

```json
---
filename: functions/tsconfig.json
---
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "lib": ["esnext"],
    "types": ["@cloudflare/workers-types"]
  }
}
```

If you already have a `tsconfig.json` at the root of your project, you may wish to explicitly exclude the `/functions` directory to avoid conflicts. To exlude the `/functions` directory:

```json
---
filename: tsconfig.json
---
{
  "include": ["src/**/*"],
  "exclude": ["functions/**/*"],
  "compilerOptions": {

  }
}
```

Pages Functions can be typed using the `PagesFunction` type. This type accepts an `Env` parameter. To use the `env` parameter:

```ts
---
filename: functions/example.ts
---
interface Env {
	KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const value = await context.env.KV.get('example');
 	return new Response(value);
}
```

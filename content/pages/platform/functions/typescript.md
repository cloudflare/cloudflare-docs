---
pcx-content-type: how-to
title: TypeScript
weight: 1
---

# TypeScript

Pages Functions supports TypeScript. You can author any files in your `functions/` directory with a `.ts` extension instead of a `.js` extension to start taking advantage of TypeScript.

The runtime types can be added to your project by installing the following:

```sh
$ npm install --save-dev typescript @cloudflare/workers-types
```

And then configured by creating a `functions/tsconfig.json` file:

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

If you already have a tsconfig.json at the root of your project, you may wish to explicitly exclude the functions directory to avoid conflicts:

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

Pages Functions themselves can be typed using the `PagesFunction` type. This type accepts an Env parameter. You can use it like so:
```ts
interface Env {
	KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const value = await context.env.KV.get(‘example’);
 	return new Response(value);
}
```

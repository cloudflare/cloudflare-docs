---
pcx_content_type: navigation
title: TypeScript
weight: 2
meta:
  title: Write Cloudflare Workers in TypeScript
---

## TypeScript

TypeScript is a first-class language on Cloudflare Workers. Cloudflare publishes type definitions to [GitHub](https://github.com/cloudflare/workers-types) and [npm](https://www.npmjs.com/package/@cloudflare/workers-types) (`npm install -D @cloudflare/workers-types`). All APIs provided in Workers are fully typed, and type definitions are generated directly from [workerd](https://github.com/cloudflare/workerd), the open-source Workers runtime.

### Known issues

#### Transitive loading of `@types/node` overrides `@cloudflare/workers-types`

You project's dependencies may load the `@types/node` package on their own. As of `@types/node@20.8.4` that package now overrides `Request`, `Response` and `fetch` types (possibly others) specified by `@cloudflare/workers-types` causing type errors.

The way to get around this issue currently is to pin the version of `@types/node` to `20.8.3` in your `package.json` like this:

```json
---
filename: package.json
---
{
	"overrides": {
		"@types/node": "20.8.3"
	}
}
```

For more information, refer to [this GitHub issue](https://github.com/cloudflare/workerd/issues/1298).

### Resources

- [TypeScript template](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-typescript)
- [@cloudflare/workers-types](https://github.com/cloudflare/workers-types)
- [Runtime APIs](/workers/runtime-apis/)
- [TypeScript Examples](/workers/examples/?languages=TypeScript)

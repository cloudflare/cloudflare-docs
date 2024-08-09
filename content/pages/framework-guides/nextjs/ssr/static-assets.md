---
pcx_content_type: reference
title: Routing static assets
meta:
  title: Routing static assets | Full-stack (SSR) | Next.js apps
---

# Routing static assets

When you use a JavaScript framework like Next.js on Cloudflare Pages, the framework adapter (ex: `@cloudflare/next-on-pages`) automatically generates a [`_routes.json` file](/pages/functions/routing/#create-a-_routesjson-file), which defines specific paths of your app's static assets. This file tells Cloudflare, `for these paths, don't run the Worker, you can just serve the static asset on this path` (an image, a chunk of client-side JavaScript, etc.)

The framework adapter handles this for you — you typically shouldn't need to create your own `_routes.json` file.

If you need to, you can define your own `_routes.json` file in the root directory of your project. For example, you might want to declare the `/favicon.ico` path as a static asset where the Worker should not be invoked.

You would add it to the `excludes` filed of your `_routes.json` file:

```json
---
header: _routes.json
---
{
	"version": 1,
	"exclude": ["/favicon.ico"]
}
```

During the build process, `@cloudflare/next-on-pages` will automatically generate its own `_routes.json` file in the output directory. Any entries that are provided in your own `_routes.json` file (in the project's root directory) will be merged with the generated file.
---
pcx_content_type: reference
title: Routing static assets
meta:
  title: Routing static assets | Full-stack (SSR) | Next.js apps
---

# Routing static assets

Cloudflare Pages supports defining a list of patterns that should (or should not) invoke your worker script. This is useful when using a library like [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) as it allows you to exclude certain static assets, like a favicon, from invoking the routing system on each request, saving you money and improving performance.

To opt-out certain static assets, you can create an _routes.json file in your project. This file can specify which assets to [include or exclude](/pages/functions/routing/#create-a-_routesjson-file) from invoking the worker script.

For example, to exclude the `/favicon.ico` asset from invoking the worker script, you can create the following _routes.json file in the root directory of your project:

```json
---
header: _routes.json
---
{
	"version": 1,
	"exclude": ["/favicon.ico"]
}
```

During the build process, `@cloudflare/next-on-pages` will automatically generate an `_routes.json` file in the output directory. Any entries that are provided in your own `_routes.json` file (in the project's root directory) will be merged with the generated file and take effect when deployed to Cloudflare Pages.

The `_routes.json` file should only be used for static assets that do not need to go through the routing system. It should not be used for routes as this could lead to unexpected behavior and incorrect routing.
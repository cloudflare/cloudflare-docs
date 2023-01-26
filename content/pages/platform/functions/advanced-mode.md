---
pcx-content-type: how-to
title: Advanced mode
weight: 9
---

# Advanced mode

Advanced mode allows you to develop your Pages Functions with a `_workers.js` file rather than the `/functions` directory.

In some cases, Pages Functions' built-in file path based routing and middleware system is not desirable for existing applications. You may have a Worker that is complex and difficult to splice up into Pages' file-based routing system. For these cases, Pages offers the ability to define a `_worker.js` file in the output directory of your Pages project.

When using a `_worker.js` file, the entire `/functions` directory is ignored, including its routing and middleware characteristics. Instead, the `_worker.js` file is deployed as is and must be written using the [Module Worker syntax](/workers/runtime-apis/fetch-event/#syntax-module-worker). If you have never used Module syntax, refer to the [JavaScript modules blog post](https://blog.cloudflare.com/workers-javascript-modules/) to learn more. Using Module Workers enables JavaScript frameworks to generate a Worker as part of the Pages output directory contents.

Your custom Module Worker will assume full control of all incoming HTTP requests to your domain. Because of this, your custom Worker is required to make and/or forward requests to your project's static assets.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
---
filename: _worker.js
---
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      // TODO: Add your custom /api/* logic here.
      return new Response('Ok');
    }
    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request);
  },
}
```

{{</tab>}}
{{<tab label="ts">}}
```ts
// Note: You would need to compile your TS into JS and output it as a `_worker.js` file. We do not read `_worker.ts`

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      // TODO: Add your custom /api/* logic here.
      return new Response('Ok');
    }
    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request);
  },
}
```

{{</tab>}}
{{</tabs>}}

* The `env.ASSETS.fetch()` function will allow you to send the user to a modified path which is defined through the `url` parameter. 
* `env` is the object that contains your environment variables and bindings. 
* `ASSETS` is a default Function binding that allows communication between your Function and Pages' asset serving resource. 
* `fetch()` calls to Pages' asset-serving resource and serves the requested asset.

{{<Aside type="warning">}}

Your custom Module Worker is required to forward requests to static assets. Failure to do so will result in broken and/or unwanted behavior because your website's contents will not be served if you do not serve it.

{{</Aside>}}

Then after placing your `_worker.js` file in your output directory, deploy your project normally through your Git integration.

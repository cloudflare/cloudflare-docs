---
pcx_content_type: how-to
title: Advanced mode
weight: 9
---

# Advanced mode

Advanced mode allows you to develop your Pages Functions with a `_workers.js` file rather than the `/functions` directory.

In some cases, Pages Functions' built-in file path based routing and middleware system is not desirable for existing applications. You may have a Worker that is complex and difficult to splice up into Pages' file-based routing system. For these cases, Pages offers the ability to define a `_worker.js` file in the output directory of your Pages project.

When using a `_worker.js` file, the entire `/functions` directory is ignored, including its routing and middleware characteristics. Instead, the `_worker.js` file is deployed and must be written using the [Module Worker syntax](/workers/runtime-apis/fetch-event/#syntax-module-worker). If you have never used Module syntax, refer to the [JavaScript modules blog post](https://blog.cloudflare.com/workers-javascript-modules/) to learn more. Using Module syntax enables JavaScript frameworks to generate a Worker as part of the Pages output directory contents.

## Set up a Function

In advanced mode, your Function will assume full control of all incoming HTTP requests to your domain. Your Function is required to make or forward requests to your project's static assets. Failure to do so will result in broken or unwanted behavior. Your Function must be written in Module syntax.

After making a `_worker.js` file in your output directory, add the following code snippet:

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

In the above code, you have configured your Function to return a response under all requests headed for `/api/`. Otherwise, your Function will fallback to returning static assets.

* The `env.ASSETS.fetch()` function will allow you to return assets on a given request.
* `env` is the object that contains your environment variables and bindings. 
* `ASSETS` is a default Function binding that allows communication between your Function and Pages' asset serving resource. 
* `fetch()` calls to Pages' asset-serving resource and serves the requested asset.

## Migrate from Workers

To migrate an existing Worker to your Pages project, copy your Worker code and paste it into your new `_worker.js` file. Then handle static assets by adding the following code snippet to `_worker.js`:

```ts
---
filename: _worker.js
---
return env.ASSETS.fetch(request);
```

## Deploy your Function

After you have set up a new Function or migrated your Worker to `_worker.js`, make sure your `_worker.js` file is placed in your Pages' project output directory. Deploy your project through your Git integration for advanced mode to take effect.
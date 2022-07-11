---
pcx-content-type: how-to
title: Advanced Mode
weight: 9
---

# Advanced mode

In some cases, the built-in routing and middleware system is not desirable for existing applications. You may already have a Worker that is fairly complex and/or would be tedious to splice it up into Pages' file-based routing system. For these cases, Pages offers developers the ability to define a `_worker.js` file in the output directory of your Pages project.

When using a `_worker.js` file, the entire `/functions` directory is ignored – this includes its routing and middleware characteristics. Instead, the `_worker.js` file is deployed **as is** and **must be** written using the [Module Worker syntax](/workers/runtime-apis/fetch-event/#syntax-module-worker).

If you have never used Module syntax, refer to the [JavaScript modules blog post to learn more](https://blog.cloudflare.com/workers-javascript-modules/). Using Module Workers enables JavaScript frameworks to generate a Worker as part of the Pages output directory contents.

Your custom Module Worker will assume full control of all incoming HTTP requests to your domain. Because of this, your custom Worker is required to make and/or forward requests to your project's static assets.

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
};
```

The `env.ASSETS.fetch()` function will allow you to send the user to a modified path which is defined through the `url` parameter. `env` is the object that contains your environment variables and bindings. `ASSETS` is a default Function binding that allows communication between your Function and Pages' asset serving resource. `fetch()` calls to Pages' asset-serving resource and serves the requested asset.

{{<Aside type="warning">}}

Your custom Module Worker is required to forward requests to static assets. Failure to do so will result in broken and/or unwanted behavior because your website's contents will not be served if you do not serve it.

{{</Aside>}}

Then after placing your `_worker.js` file in your output directory, deploy your project normally through your git integration.
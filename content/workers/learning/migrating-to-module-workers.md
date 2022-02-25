---
order:
pcx-content-type: concept
---

# Migrating to module Workers

This guide will show you how to migrate your Workers from the [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) syntax to the new [Module Worker](https://blog.cloudflare.com/workers-javascript-modules/) format.

## Advantages of migrating

There are several reasons you might want to migrate your Workers to the module syntax:

1.  [Durable Objects](/learning/using-durable-objects) require the module syntax.
2.  Module Workers do not rely on any global bindings, which means the Workers runtime does not need to set up fresh execution contexts, making Module Workers safer and faster to run.
3.  Module Workers are ES Modules, which allows them to be shared and published to npm, for example. Module Workers can be imported by and composed within other Module Workers.

## Migrating a simple Worker

The following example demonstrates a Worker that redirects all incoming requests to a URL with a `301` status code.

With the Service Worker syntax, the example Worker looks like:

```javascript
async function handler(request) {
  const base = "https://example.com";
  const statusCode = 301;

  const destination = new URL(request.url, base);
  return Response.redirect(destination.toString(), statusCode);
}

// Initialize Worker
addEventListener("fetch", (event) => {
  event.respondWith(handler(event.request));
});
```

Module Workers replace the `addEventListener` syntax with an object definition, which must be the file's default export (via `export default`). The example code above becomes:

```javascript
export default {
  fetch(request) {
    const base = "https://example.com";
    const statusCode = 301;

    const destination = new URL(request.url, base);
    return Response.redirect(destination.toString(), statusCode);
  },
};
```

## Accessing event or context data

Workers often need access to data not in the `request` object. For example, sometimes Workers use [`waitUntil`](/runtime-apis/fetch-event#waituntil) to delay execution. Module workers can access `waitUntil` vida the `context` parameter. For a list of Module worker parameters, see [this list](/runtime-apis/fetch-event#parameters).

This example code:

```javascript
async function triggerEvent(event) {
  // Fetch some data
  console.log("cron processed", event.scheduledTime);
}

// Initialize Worker
addEventListener("scheduled", (event) => {
  event.waitUntil(triggerEvent(event));
});
```

Then becomes:

```javascript
async function triggerEvent(event) {
  // Fetch some data
  console.log("cron processed", event.scheduledTime);
}

const worker = {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(triggerEvent(event));
  },
};

export default worker;
```

## Module Workers in the dashboard

The module Worker syntax has full support in the Cloudflare dashboard. Go to **Workers** > **Create a Service** > pick the HTTP Handler example > **Create Service**. After your service is created, select **Quick Edit** and it will launch the dashboard. Select **Send** at the top to test if your service is returning `“Hello world”`.

Then replace:

```javascript
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response("Hello world");
}
```

With:

```javascript
export default {
  fetch() {
    return new Response("Hello world");
  },
};
```

Select **Save and Deploy** and then select **Send** again to test that your Worker is still returning `“Hello world”`.

## Configuring your wrangler.toml

To add support for module Workers to an existing project, update your `wrangler.toml` file like so:

```toml
name = "my-worker"
type = "javascript"
workers_dev = true

[build.upload]
format = "modules"
dir = "./src"
main = "./worker.js" # becomes "./src/worker.js"

[[build.upload.rules]]
type = "ESModule"
globs = ["**/*.js"]

# Uncomment if you have a build script.
# [build]
# command = "npm run build"
```

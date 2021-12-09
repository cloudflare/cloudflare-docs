---
order: 15
pcx-content-type: concept
---

# Migrating to module Workers

This guide will show you how to migrate your Workers from the [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) syntax to the new [JavaScript module](https://blog.cloudflare.com/workers-javascript-modules/) format.

## Advantages of migrating?

There are several reasons you might want to migrate your Workers to the module Worker syntax:

1. Cloudflare Durable Objects require the module syntax to work.
1. Security and performance. Module Workers don’t require any global bindings to be set up behind the scenes, making them safer and faster to run.
1. Composability. Workers written in the new module format can be published to npm and shared, they can also be imported into other module Workers.

## Migrating a simple Worker

Let’s take a straightforward example, a Worker that redirects all incoming requests to a URL with a 301 status code.

With the Service Worker syntax, our Worker looks like:

```javascript
async function handler(request) {
  const base = "https://example.com";
  const statusCode = 301;

  const url = new URL(request.url);
  const { pathname, search } = url;

  const destinationURL = base + pathname + search;
  return Response.redirect(destinationURL, statusCode);
}

// Initialize Worker
addEventListener("fetch", (event) => {
  event.respondWith(handler(event.request));
});
```

JavaScript module Workers replace the `addEventListener` syntax with an object declared with `export default`. The example code above becomes:

```javascript
export default = {
  fetch(request) {
    const base = 'https://example.com';
    const statusCode = 301;
    const url = new URL(request.url);
    const { pathname, search } = url;
    const destinationURL = base + pathname + search;
    return Response.redirect(destinationURL, statusCode);
  },
};
export default worker;
```

## Accessing event or context data

Workers often need access to data not in the `request` object. For example, sometimes Workers use [waitUntil](https://developers.cloudflare.com/workers/runtime-apis/fetch-event#waituntil) to delay execution. Just like with the Service Worker syntax, module Workers have access to the [fetchEvent object](https://developers.cloudflare.com/workers/runtime-apis/fetch-event#supported-fetchevent-properties).

This means that:

```javascript
async function handler(event) {
  // Fetch some data
  console.log("cron processed", event.scheduledTime);
}

// Initialize Worker
addEventListener("scheduled", (event) => {
  event.waitUntil(handler(event));
});
```

Becomes:

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

The module Worker syntax has full support in the Cloudflare Dashboard. You can go to https://workers.new/, pick the HTTP Handler example and click “Create Service”. After it’s created, click “Quick Edit” and it will launch the dashboard. Click the “Send” button at the top to test if your service is returning “Hello world”.

Now, you can replace:

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

Click “Save and Deploy” and then click “Send” again to test that your Worker is still returning “Hello world”.

## Configuring your wrangler.toml

To add support for module Workers to an existing project, you can update your `wrangler.toml` file like so:

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

---
pcx-content-type: how-to
title: Bindings
weight: 5
---

# Bindings

## Adding bindings

A binding is how your Function (Worker) interacts with external resources. You can add KV, Durable Object, and plain-text bindings to your project. A binding is a runtime variable that the Workers runtime provides to your code. You can also use these bindings in development with [Wrangler](/pages/platform/functions/#develop-and-preview-locally).

### KV namespace

Workers KV is Cloudflare's globally replicated key-value storage solution. Within Pages, you can choose from the list of KV namespaces that you created from the dashboard by going to **Account Home** > **Pages** > **your Pages project** > **Settings** > **Functions** > **KV namespace bindings**. Select **Add binding** and input a **Variable name** and select a _KV namespace_ from the list of your existing Workers KV namespaces. You will need to repeat this for both the **Production** and **Preview** environments.

![Editing a KV namespace Binding and adding a Variable name](/pages/platform/media/KV-functions.png)

### KV namespace locally

While developing locally, you can interact with your KV namespace by add `-k, --kv [Namespace binding]` to your run command. For example, if your namespace is bound to `TodoList`, you can access the KV namespace in your local dev by running `npx wrangler pages dev dist --kv TodoList`. The data from this namespace can be accessed using `context.env`.

```js
export async function onRequest({ env }) {
  const task = await env.TodoList.get("Task:123");
  return new Response(task);
}
```

### Durable Object namespace

Durable Objects are Cloudflare's strongly consistent coordination primitive that power capabilities such as connecting WebSockets, handling state, and building applications. As with Workers KV, you first have to [create the Durable Object](/workers/learning/using-durable-objects/#uploading-a-durable-object-worker). You can then configure it as a binding to your Pages project.

Go to **Account Home** > **Pages** > **your Pages project** > **Settings** > **Functions** > **Durable Object bindings**. Select **Add binding** and input a **Variable name** and select a _Durable Object namespace_ from the list of your existing Durable Objects. You will need to repeat this for both the **Production** and **Preview** environments.

![Editing a Durable Object namespace Binding and adding a Variable name](/pages/platform/media/DO-functions.png)

### Durable Objects locally

Just as you can access kv with `-k` or `--kv` you can access durable objects in your local builds with `-o`, `--do` followed by your Durable object name and class.

### Environment variable

An [environment variable](/workers/platform/environment-variables/) is an injected value that can be accessed by your Functions. It is stored as plaintext. You can set your environment variables directly within the Pages interface for both your production and preview environments at run-time and build-time.

To add environment variables, go to **Account Home** > **Pages** > **your Pages project** > **Settings** > **Environment variables**.

![Editing an environment variable by adding a variable name and value](/pages/platform/media/ENV-functions.png)

### Adding environment variables locally

When developing locally, you can access environment variables by adding a binding to your Wrangler commands like `npx wrangler pages dev dist --binding ENV_NAME="ENV_VALUE"`. This allows you to then access the environment value in your component by using `env.ENV_NAME`.

For example, you can run `npx wrangler pages dev dist --binding COLOR="BLUE"` and then:

```js
export async function onRequest({ env }) {
  return new Response(env.COLOR);
}
```

Here is a real-world example of using environment variables inside a middleware function. To connect [Sentry](https://www.sentry.io/) to a Cloudflare Worker, you can use [Toucan js](https://github.com/robertcepa/toucan-js) and access your Sentry Data Source Name (DSN) in your function.

```js
const SentryMiddleware = async ({ request, next, env, waitUntil }) => {
  const sentry = new Toucan({
    dsn: env.SENTRY_DSN,
    context: { waitUntil, request },
  });
  try {
    return await next();
  } catch (thrown) {
    sentry.captureException(thrown);
    return new Response(`Error ${thrown}`, {
      status: 500,
    });
  }
};
export const onRequest = [SentryMiddleware];
```
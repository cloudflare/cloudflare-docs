---
pcx-content-type: how-to
title: Middleware
weight: 6
---

# Middleware 

Middlewares are reusable chunks of logic that can be executed before or after for some section of your application. Middlewares are typically utility functions: error handling, user authentication, and logging are typical candidates for middleware within an application.

## Adding middleware

Middleware is similar to standard Functions except they are always defined in a file named `_middleware.js`. A `_middleware.js` file exports a Pages Function request handler that will run on requests which would match any sibling and child Pages Functions in the folder structure. For example, `functions/users/_middleware.js` file will match requests for `/functions/user/nevi`, `/functions/users/nevi/123` and `functions/users`.

If you want to run a middleware on your entire application, including in front of static files, you can create a `functions/_middleware.js` file.

In `_middleware.js` files, you may export an `onRequest` handler or any of its method-specific variants. The following is an example middleware which handles any errors thrown in child or sibling Pages Functions, using the `next()` method available in the request handler's context object:

```js
---
filename: functions/_middleware.js
---
export async function onRequest(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
```

## Chaining middleware

Additionally, you may export an array of Functions as your middleware handler. This allows you to 'chain' together multiple middlewares that you want to run. For example, here we can handle any errors, and also naively check if the user is authenticated:

```js
---
filename: functions/_middleware.js
---
async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

function authentication(context) {
  if (context.request.headers.get("x-email") != "admin@example.com") {
    return new Response("Unauthorized", { status: 403 });
  }

  return context.next();
}

export const onRequest = [errorHandling, authentication];
```

Here, the `errorHandling` function will run first, capturing any errors in the `authentication` function or any other subsequent child Pages Functions.

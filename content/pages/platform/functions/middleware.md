---
pcx-content-type: how-to
title: Middleware
weight: 6
---

# Middleware

## Adding middleware

Middleware are reusable chunks of logic that can be executed before and/or after route handlers. These are typically utility Functions that should be applied for chunks of an application’s routes. For example, error handling, user authentication, and logging are typical candidates for middleware within an application.

### Exporting middleware

Middleware files are similar to standard Function files. You may export an `onRequest` handler or any of its method-specific variants. Additionally, like Functions files, you may export an array of Functions as your middleware handler.

In your `_middleware.{js|ts}` files, you can define a middleware function that handles errors for all your Functions and export it to all the `onRequest` methods. This means the Functions defined within this file will be called on each function request declared in the directory that the middleware lives in. For example:

```js
---
filename: functions/_middleware.js
---
const errorHandler = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};

const hello = async ({ next }) => {
  const response = await next();
  response.headers.set('X-Hello', 'Hello from functions Middleware!');
  return response;
};

export const onRequest = [errorHandler, hello];
```

In the function above, you can see that the `errorHandler` and `hello` Functions are exported to all requests so that if this middleware is in the base of the `/functions` directory it will run on all Functions defined in that directory. And if the middleware is defined in a subdirectory such as `/functions/todos/_middleware.ts` it will only run on all requests in that directory.

### Method-specific middleware

Much like Function handlers, you may export a method-specific handler instead of the generic `onRequest` name. For example, you may want to define an `errorHandler` for all requests and then an additional `hello` function for `GET` requests:

```js
---
filename: functions/hello/_middleware.js
---
import { errorHandler } from '../shared';
import { hello } from '../custom';

export const onRequest = [errorHandler];

export const onRequestGet = [errorHandler, hello];
```

### Middleware routing

A middleware will handle some checks, changes, or add information to a request before it reaches an endpoint. For logic that needs to be shared across multiple endpoints, define a `_middleware.{js|ts}` file in the `/functions` directory or subdirectory at whatever point you want it to apply. These `_middleware` files still apply in accordance with the URL pattern. For example:

```txt
├── functions
│   ├── _middleware.ts        # Applies to all routes
│   ├── ...
│   └── todos
│       ├── _middleware.ts    # Adds extra middleware to /todos/**
│       ├── ...
└── ...

```

This directory structure has two types of middleware: one that acts on every file in the folder (`functions/_middleware.ts`) and the other that is invoked only for a matching URL prefix (`functions/todos/_middleware.ts`). These middleware files will be applied to the the following URL paths:

```txt
/todos/** => [
 ./functions/_middleware.ts,
 ./functions/todos/_middleware.ts
]
<all other routes> => [
 ./functions/_middleware.ts
]
```

### Middleware chaining

Within Pages, middleware functions have access to a `context.next` function which, when invoked, will await the next function's execution before the current middleware resumes. The ability to wait for other middleware and/or the final route handler(s) to finish is what allows for use cases like error handling, for example.

```js
async function errorHandler(context) {
  try {
    // wait for the next function to finish
    return await context.next();
  } catch (err) {
    // catch and report and errors when running the next function
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

// Attach `errorHandler` to all HTTP requests
export const onRequest = errorHandler;
```

Another use case for the `next` function is passing the request cycle from the current middleware function to the next function in the stack if the current function does not end the request-response cycle. Using the `next()` function will pass control to the next middleware function, depending on the order of execution. For example:

```js
// Attach multiple handlers
export const onRequest = [
  async ({ request, next }) => {
    try {
      // Call the next handler in the stack
      const response = await next();
      const responseText = await response.text();
      //~> "Hello from next base middleware"
      return new Response(responseText + " from middleware");
    } catch (thrown) {
      return new Response(`Error ${thrown}`, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  },
  ({ request, next }) => {
    return new Response("Hello from next base middleware");
  },
];
```

### Middleware data

Handler functions have the ability to pass data between one another. This is done through the `context.data` property, which is accessible and mutable by all handlers throughout a request's execution.

More often than not, `context.data` is only relevant from a middleware's perspective, but it is available to all functions regardless.

```js
---
filename: functions/_middleware.js
---
export async function onRequest(context) {
  let res;

  try {
    context.data.timestamp = Date.now();
    res = await context.next();
  } catch (err) {
    res = new Response('Oops!', { status: 500 });
  } finally {
    let delta = Date.now() - context.data.timestamp;
    res.headers.set('x-response-timing', delta);
    return res;
  }
}
```
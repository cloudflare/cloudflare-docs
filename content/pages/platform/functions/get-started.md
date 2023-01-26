---
pcx-content-type: get-started
title: Get started
weight: 1
---

# Get started

To deploy your first Function, create a `/functions` directory at the root of your project. 

Writing your Functions files in the `/functions` directory will automatically generate a Worker with custom functionality at predesignated routes. For example, let’s take the Function: 

```js
---
filename: helloworld.js
---
export function onRequest(context) {
  return new Response("Hello, world!")
}
```

The `onRequest` handler takes a "request context" object which we'll cover in more detail below. The handler must return a `Response` or a `Promise` of a `Response`.

This function will run on the `/helloworld` route and returns "hello world!".  The reason this function is available on this route is because the file is named `helloworld.js`. Similarly, if this file was called `howdyworld.js`, this function would run on `/howdyworld`.

Let’s take a closer look at how this routing behavior works and how to further customize this.

---
pcx_content_type: how-to
title: Use Pages Functions for A/B testing
---

# Use Pages Functions for A/B testing

In this guide, you will learn how to use [Pages Functions](/pages/platform/functions/) for A/B testing in your Pages projects. A/B testing is a user experience research methodology applied when comparing two or more versions of a web page or application. With A/B testing, you can serve two or more versions of a webpage to users and divide traffic to your site.

## Overview 

Configuring different versions of your application for A/B testing will be unique to your specific use case. For all developers, A/B testing setup can be simplified into a few helpful principles.

Depending on the number of application versions you have (this guide uses two), you can assign your users into experimental groups. The experimental groups in this guide are the base route `/` and the test route `/test`.

To ensure that a user remains in the group you have given, you will set and store a cookie in the browser and depending on the cookie value you have set, the corresponding route will be served.

## Set up your Pages Function

In your project, you can handle the logic for A/B testing using [Pages Functions](/pages/platform/functions/). Pages Functions allows you to handle server logic from within your Pages project. 

To begin:

 1. Go to your Pages project directory on your local machine.
 2. Create a `/functions` directory. Your application server logic will live in the `/functions` directory. 

## Add middleware logic

Pages Functions have utility functions that can reuse chunks of logic which are executed before and/or after route handlers. These are called [middleware](/pages/platform/functions/middleware/). Following this guide, middleware will allow you to intercept requests to your Pages project before they reach your site.

In your `/functions` directory, create a `_middleware.js` file. 

{{<Aside type="Note">}}

When you create your `_middleware.js` file at the base of your `/functions` folder, the middleware will run for all routes on your project. Learn more about [middleware routing](/pages/platform/functions/middleware/).

{{</Aside>}}

Following the Functions naming convention, the `_middleware.js` file exports a single async `onRequest` function that accepts a `request`, `env` and `next` as an argument. 

```js
---
filename: /functions/_middleware.js
---
const abTest = async ({request, next, env}) => {
  /*
  Todo: 
  1. Conditional statements to check for the cookie
  2. Assign cookies based on percentage, then sever 
  */
}

export const onRequest = [abTest]
```

To set the cookie, create the `cookieName` variable and assign any value. Then create the `newHomepagePathName` variable and assign it `/test`:

```js
---
filename: /functions/_middleware.js
highlight: [1,2]
---
const cookieName = "ab-test-cookie"
const newHomepagePathName = "/test"

const abTest = async ({request, next, env}) => {
  /*
  Todo: 
  1. Conditional statements to check for the cookie
  2. Assign cookie based on percentage then serve 
  */
}

export const onRequest = [abTest]
```

## Set up conditional logic

Based on the URL pathname, check that the cookie value is equal to `new`. If the value is `new`, then `newHomepagePathName` will be served.

```js
---
filename: /functions/_middleware.js
highlight: [7,8,9,10,11,12,13,14,15,16,17,18,19]
---
const cookieName = "ab-test-cookie"
const newHomepagePathName = "/test"

const abTest = async ({request, next, env}) => {
  /*
  Todo: 
  1. Assign cookies based on randomly genrated percentage, then serve
  */

  const url = new URL(request.url)
  if (url.pathname === "/") {
    // if cookie ab-test-cookie=new then change the request to go to /test
    // if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"

    let cookie = request.headers.get("cookie")
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}=new`)) {
      // Change the request to go to /test (as set in the newHomepagePathName variable)
      url.pathname = newHomepagePathName
      return env.ASSETS.fetch(url)
    }
  }
}

export const onRequest = [abTest]
```

If the cookie value is not present, you will have to assign one. Generate a percentage (from 0-99) by using: `Math.floor(Math.random() * 100)`. Your default cookie version is given a value of `current`.

If the percentage of the number generated is lower than `50`, you will assign the cookie version to `new`. Based on the percentage randomly generated, you will set the cookie and serve the assets. After the conditional block, pass the request to `next()`. This will pass the request to Pages. This will result in 50% of users getting the `/test` homepage.

The `env.ASSETS.fetch()` function will allow you to send the user to a modified path which is defined through the `url` parameter. `env` is the object that contains your environment variables and bindings. `ASSETS` is a default Function binding that allows communication between your Function and Pages' asset serving resource. `fetch()` calls to the Pages asset-serving resource and returns the asset (`/test` homepage) to your website's visitor.

{{<Aside type="note" header="Binding">}}

A Function is a Worker that executes on your Pages project to add dynamic functionality. A binding is how your Function (Worker) interacts with external resources. A binding is a runtime variable that the Workers runtime provides to your code.

{{</Aside>}}

```js
---
filename: /functions/_middleware.js
highlight: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
---
const cookieName = "ab-test-cookie"
const newHomepagePathName = "/test"

const abTest = async ({ request, next, env }) => {
  const url = new URL(request.url)
  // if homepage
  if (url.pathname === "/") {
    // if cookie ab-test-cookie=new then change the request to go to /test
    // if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"

    let cookie = request.headers.get("cookie")
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}=new`)) {
      // pass the request to /test
      url.pathname = newHomepagePathName
      return env.ASSETS.fetch(url)
    } else {
      const percentage = Math.floor(Math.random() * 100)
      let version = "current" // default version
      // change pathname and version name for 50% of traffic 
      if (percentage < 50) {
        url.pathname = newHomepagePathName
        version = "new"
      }
      // get the static file from ASSETS, and attach a cookie
      const asset = await env.ASSETS.fetch(url)
      let response = new Response(asset.body, asset)
      response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`)
      return response
    }
  }
  return next()
};

export const onRequest = [abTest];
```

## Deploy to Cloudflare Pages

After you have set up your `functions/_middleware.js` file in your project you are ready to deploy with Pages. Push your project changes to GitHub/GitLab.

After you have deployed your application, you will see your middleware Function in the Cloudflare dashboard under **Pages** > **Settings** > **Functions** > **Configuration**. 

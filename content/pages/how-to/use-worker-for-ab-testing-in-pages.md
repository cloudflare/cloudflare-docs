---
pcx-content-type: how-to
title: Use Pages Functions for A/B testing
---

# Use Pages Functions for A/B testing

In this guide, you will learn how to use [Pages Functions](/pages/platform/functions/) for A/B testing in your Pages projects. A/B testing is a user experience research methodology applied when comparing two or more versions of a web page or application. With A/B testing, you can serve two or more versions of a webpage to users and divide traffic to your site.

# Overview 

Configuring different versions of your application for A/B testing will be unique to your specific use case. For all developers, A/B testing setup can be simplified into a few helpful principles.

Depending on the number of application versions you have (this guide uses two), you can assign your users into experimental groups. The experimental groups in this guide are the base route `/` and the test route `/test`.

To ensure that a user remains in the group you have given, a cookie will be set and stored in the browser and depending on cookie value the corresponding route will be served.

You can use any cookie library (for example, [`js-cookie`](https://www.npmjs.com/package/js-cookie)) to generate cookies. This guide assigns a local value to a `cookieName` variable and uses that as the cookie value. Depending on the cookie value, a route is served. 

The cookie assignment is done randomly by using `Math.random()` which generates a list of random decimal numbers. You can make the numbers a whole number by calling the `Math.floor()` method on `Math.random()` like this: `Math.floor(Math.random())` and to make sure that you have a maximum range of numbers you can multiply by 100. This means that you can now think of your assignments in terms of percentages.

Your percentage generator code should look like this `Math.floor(Math.random() * 100)`.

{{<Aside type="Note">}}

Cookies are helpful because they allow users to be served the same version of your application every time they visit and refresh your site. This will help keep the served version consistent for future rollouts. 

{{</Aside>}}

After you have set the value from the cookie, you can then have a conditional rendering set up that checks the value of the existing cookie and then assigns a group. Without a cookie, you will give one and set the URL. 

## Set up your Pages Function

In your project, you can handle the logic for A/B testing using [Pages Functions](/pages/platform/functions/). Pages Functions allows you to handle server logic from within your Pages project. 

To begin, go to your Pages project and create a `/functions` directory. Your application server logic will live in the `/functions` folder. 

## Add middleware logic

Pages Functions have utility functions that can reuse chunks of logic which are executed before and/or after route handlers. These are called [middleware](/pages/platform/functions/#adding-middleware). Following this guide, you will want to intercept requests before they get to your origin server, making ideal use of middleware.

In your `/functions` directory, create a `_middleware.js` file. 



{{<Aside type="Note">}}

When you create your `_middleware.js` file at the base of your `/functions` folder, the middleware will run for all routes on your project. Learn more about [middleware routing](/pages/platform/functions/#middleware-routing).

{{</Aside>}}

Following the Functions naming convention, the `_middleware.js` file exports a single async `OnRequest` function that accepts a `request`, `env` and `next`  as an argument. 

```js
---
filename: /functions/_middleware.js
---
const abtest = async({request, next, env}) => {
  /*
  Todo: 
  1. Conditional statements to check for the cookie
  2. Assign cookies based on percentage, then sever 
  */
}

export const onRequest = [abtest]
```

To identify the cookie, assign it in the browser and give it a unique name. Create a variable above your async function. Here, you can define the second route as `newHomepagePathName` and assign it to the`/test. As seen in the code below:

```js
---
filename: /functions/_middleware.js
highlight: [1,2]
---
const cookieName = "ab-test-cookie"
const newHomepagePathName = "/test"

const abtest = async({request, next, env}) => {
  /*
  Todo: 
  1. Conditional statements to check for the cookie
  2. Assign cookie based on percentage then serve 
  */
}

export const onRequest = [abtest]
```

## Set up conditional logic

In your A/B testing, you want to be able to send a user to particular routes based on the presence of a cookie value. To do this, you must first intercept the URL request. 

Based on the URL pathname, check what cookie value is present in the header. Based on the value, you will either set the base route or the `/test` route and fetch the assets for that route. 

```js
---
filename: /functions/_middleware.js
highlight: [7,8,9,10,11,12,13,14,15,16,17,18,19]
---
const cookieName = "ab-test-cookie"
const newHomepagePathName = "/test"

const abtest = async({request, next, env}) => {
  const url = new URL(request.url)

  if (url.pathname === "/") {
    // if cookie ab-test-hp=new
    // if no cookie set, pass x% of traffic and set a cookie value (current|new)
    
    let cookie = request.headers.get("cookie")
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}`)) {
      if (cookie.includes(`${cookieName}=new`)) {
        // pass the request to /new-homepage
        url.pathname = newHomepagePathName
        return env.ASSETS.fetch(url)
      }
  }
    /*
    Todo: 
    1. Assign cookies based on randomly genrated percentage, then serve

    */
}

export const onRequest = [abtest]

```

If the cookie value is not present, you will have to assign one. You can generate numbers randomly by using the `Math.random()` method and getting whole numbers by calling a `Math.floor()` on the function.

To make the number genrated into percentages, multiple `Math.random()` by 100 and call `Math.floor()` so that all the percentages can be whole numbers. Your default cookie version is given a value of `current`.

If the percentage of the number generated is lower than 50, you will assign the cookie version to `new`. Based on the percentage randomly generated, you will set the cookie and serve the assets. After the conditional block, pass the request to `next()`. This will pass the request back to the browser.

```js
---
filename: /functions/_middleware.js
highlight: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
---
const cookieName = "ab-test-homepage"
const newHomepagePathName = "/test"

const abtest = async ({ request, next, env }) => {
  const url = new URL(request.url)

  // if homepage
  if (url.pathname === "/") {
    // if cookie ab-test-hp=new
    // if no cookie set, pass xy% of traffic and set a cookie value (current|new)
    
    let cookie = request.headers.get("cookie")
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}`)) {
      if (cookie.includes(`${cookieName}=new`)) {
        // pass the request to /new-homepage
        url.pathname = newHomepagePathName
        return env.ASSETS.fetch(url)
      }
    } else {
      const perc = Math.floor(Math.random() * 100)
      let version = "current" // default version

      // change pathname and version name for traffic less than 50% 
      if (perc < 50) {
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

export const onRequest = [abtest];
```

## Deploy to Cloudflare Pages

Now that you have set up your `functions/_middleware.js` file in your project you are ready to deploy with Pages. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) > **Account Home** > **Pages** and select **Create a project**. Select your git repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option     | Value                 |
| ------------------------ | --------------------- |
| Production branch        | `main`                |
| Build command (optional) | `<YOUR_BUILD_COMMAND>`|
| Build output directory   | `<YOUR_BUILD_DIR>`    |

</div>

After you have deployed your application, you will see your middleware Function in the Cloudflare dashboard under **Pages** > **Settings** > **Functions** > **Configuration**. 

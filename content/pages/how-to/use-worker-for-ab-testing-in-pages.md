---
pcx-content-type: how-to
title: Use Pages Functions for A/B testing
---

# Use Pages Functions for A/B testing

In this guide, you will learn how to use [Page Functions](/pages/platform/functions/) for A/B testing in your Pages projects. A/B testing is a user experience research methodology applied when comparing two or more versions of a webpage or application. With A/B testing, you can serve two or more versions of a webpage to users and divide traffic to your site.

# Overview 

While setting up different versions of your application to determine the experience for your users with A/B testing is unique to your specific use case, the process of setting up A/B testing can be broken down into the same helpful principles.

Depending on the number of versions you have(this guide uses two), you can assign your users into experimental groups. To ensure that a user remains in the group you have given, a cookie will be set and stored in the browsers. Then, based on the value of the cookie, they will sever the route associated with that cookie.

{{<Aside type="Note">}}

It is helpful to use cookies because you want users to be served the same version every time they come to your application, even when they refresh. This will help keep things consistent for future rollouts. 

{{</Aside>}}

After you have gotten the value from the cookie, you can then have a conditional rendering set up that checks the value of the existing cookie and then assigns a group. Without a cookie, you will give one and set the URL. 

# Settting up your Pages Function

In your project, you can handle the logic for A/B testing using [Pages Functions](/pages/platform/functions/). Pages Functions allows you to handle server logic from within your Pages project. Create a `/functions` directory at the root of your project to get started. Your application server logic will live in the functions folder. 

## Adding middleware logic.

Pages Functions have utility functions that can reuse chunks of logic which are executed before and/or after route handlers. These are called [middleware](/pages/platform/functions/#adding-middleware). In our A/B testing use-case, we want to intercept the request before it gets to the server, which is perfect middleware use. In your `/functions` directory, create an `_middleware.js` file. 

{{<Aside type="Note">}}

Creating your middleware file at the base of your functions folder means that it will run for all routes on your project. To learn more about [middleware routing](/pages/platform/functions/#middleware-routing) refer to the documentation.

{{</Aside>}}

Following the functions naming convention, the `_middleware.js` file export a single async `OnRequest` function that accepts a `request`, `env` and `next`  as an argument. 

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

To identify the cookie, we assign it in the browser. We will give it a unique name; for this example, create a variable above your async function. You can also define your routes. We will call the second route `/test` in this guide.

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
  2. Assign cookie based on percentage then sever 

  */
  }

export const onRequest = [abtest]
```

## Set up conditional logic

In our A/B testing, we want to be able to send a user to particular routes based on the presence of a cookie value. First, we need to intercept the URL request. 

Based on the URL pathname, we will check what cookie value is present in the header, and based on the value; we will either set the base route or the `/test` route and fetch the assets for that route. 

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
    // if no cookie set, pass xy% of traffic and set a cookie value (current|new)
    
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
    1. Conditional statements to check for the cookie
    2. Assign cookies based on percentage, then sever 

    */
}

export const onRequest = [abtest]

```

On the other hand, if the cookie isn't present, you will have to assign one. You can generate numbers randomly by using the `Math.random()` Javascript method and getting whole numbers by calling a `Math.floor()` on the function.

To make the values into percentages, multiple `Math.random()` by 100 and call`Math.floor()` so that all the percentages can be whole numbers. Our default version is given a value of `current`.

If the percentage is lower than 50, you will assign the version to `new` and based on the value randomly generated; we will set the cookie and serve the assets. After the conditional block pass the request to `next()`, this will pass the request back to the browser.

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


# Deploy to Cloudflare Pages

Now that you have set up your `functions/_middleware.js` file in your project. Deploy your site to Pages by logging in to the Cloudflare dashboard > Account Home > Pages and selecting Create a project. Select the new  GitHub repository that you created and, in the Set upbuilds and deployments section, provide the following information:

<div>

| Configuration option     | Value                 |
| ------------------------ | --------------------- |
| Production branch        | `main`                |
| Build command (optional) | `<YOUR_BUILD_COMMAND>`|
| Build output directory   | `<YOUR_BUILD_DIR>`    |

</div>

After you have deployed your application, you will see your middleware Function under Functions > Configuration in the current build.  

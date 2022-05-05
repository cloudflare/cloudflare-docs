---
pcx-content-type: how-to
title: Use Workers for A/B testing in Pages
---

# Use Workers for A/B testing in Pages

In this guide, you will learn how to use [Workers](/workers/) for A/B testing in your Pages projects. A/B testing is a user experience research methodology that can be applied when comparing two or more versions of a webpage or app against each other to either determine which one performs better, in terms of more engagements to an action or to give users an option to opt-in to features to test. 

It is usually associated with statistical analysis that is used to determine which variation performs better for a given conversion goal, this can allow product teams makes better decisions.


# Overview 

While setting up different versions of your application to determine the experience for your users with A/B testing, it is unique to your specific use case, the actual process of setting up can be broken down into these principles:

## 1. Setting up experimental groups

Depending on the number of versions you have, you can assign your users into experimental groups. To make sure that a users remains in the group you have assigned you will generate a number between 0 and 1 and store that value in a cookie. Then, based on the value of that random number, assign the user to an experiment group

By doing this, when the user returns or visits another page on your site, they’ll remain in the same group. 

{{<Aside type="Note">}}

It is helpful to use cookies because you want to be able to allow access to versions of your application depending on the number value stored in the cookie. For example if you wanted to roll out a new background to users who have cookie value between 0.1 and 0.5 it would be easy to track and measure by storing the number value in a cookie.

{{</Aside>}}

## 2. Serving the versions based on cookie value

After you have gotten the value from the cookie, you can then have conditional rendering set up that checks the value of the exisiting cookie and then assigns a group. In the absence of a cookie you will assign one and set the url. 

## 3. Track engagement with an action

Based on the version of your application you have shown a user, you will want to know the engagement it got. You can do this by triggering a counter by the click of a button and show the results in another route.


# Settting up your Worker

In your Pages project it is possible to modify a request with a Worker before it reaches the server. The Worker you will change the path of the request, set cookies and count events to have a definite number of times users visit each version.

When the request comes in, you will have a conditional statments to check if it's a path you are interested in(the path of the control or a varinet). If not, we pass the request to the server. 

At the root of your project create a `_worker.js` file, in this file export a single default function. This function will handle the conditional statements that you will use to assign cookies 

{{<Aside type= "note">}}
 Pages offers developers the ability to define a `_worker.js` file in the output directory of your Pages project when using a Worker in Pages. 

{{</Aside>}}



```js
---
filename: _worker.js
---
export default {
  async fetch(request, env) {
    return await handleRequest(request, env);
  }
}

/*  
Todo: 
1. Create an async handleRequest function that handles switch cases for cookie assignment
2. Create Helper methods for checking and changing cookie values
3. Use durable objects as a counter for page visits and user actions

*/

```

Before you define the `handleRequest` function, you will have to list the routes for your Base, control and variant. Since we require an action to count the conversions on each option you will need to define a path for the option also. In this example we will also be creating a path for the resesult so we can tell how many people actually clicked on the action when shown. 

The A/B tested path in our case is `/test` defined with variable BASE_PATH. Every request on this path is checked for cookies, to see if the user was already part of a group. See how the `url.pathname` is changed to show the control page or the variant page, which are under `/test/control` or `/test/variant` respectively.


```js
---
filename: _worker.js
highlight: [6,7,8,9]
---
export default {
  async fetch(request, env) {
    return await handleRequest(request, env);
  }
}

const BASE_PATH = '/test'
const CONTROL_PATH = `${BASE_PATH}/control`;
const VARIANT_PATH = `${BASE_PATH}/variant`;
const ACTION_PATH = `${BASE_PATH}/action`;

```

After defining the paths, create an async fucntion which will handle the conditional statements and assign users cookies. The control path checks if the user was already assigned to the control or the variant group and shows the correct page based on that. If the A/B test cookie is not present, then we are dealing with a new user, the next step is to assign the user to a group randomly and count their visit.


```js

//... 

async function handleRequest(request, env) {

  let url = new URL(request.url);

  switch (url.pathname) {

    case BASE_PATH:
      if (hasControlCookie(request)) {
        url.pathname = CONTROL_PATH;
        return await fetch(request);
      } else if (hasVariantCookie(request)) {
        url.pathname = VARIANT_PATH;
        return await fetch(url, request);
      } else {
        const group = Math.random() < 0.5 ? "variant" : "control"

        // We are only counting the page visits here, to prevent double counting page refreshes
        if (group === "variant") {
          url.pathname = VARIANT_PATH;
          // TODO: add counter for views
        } else {
          url.pathname = CONTROL_PATH;
          // TODO: add counter for views
        }
        const response = await fetch(url, request);
        return setAbTestCookie(response, group);
      }
      break; 

}
```

In the code block above you have defined two functions to check what cookie is present and if the header doesn't exist you will asign a group and set the cookie using the `setAbTestCookie` function . The `hasControlCookie` and `hasVariantCookie` will be defined outside the switch statement block. The functions checks for the unique cookie name in the request header and when not present a `pathname` is assigned and `setAbTestCookie` is used to append the cookie name.

```js

//...... 
const COOKIE_NAME = "cloudflare_ab_test";

function hasControlCookie(request) {
  let cookie = request.headers.get("cookie");
  return cookie && cookie.includes(`${COOKIE_NAME}=control`);
}

function hasVariantCookie(request) {
  let cookie = request.headers.get("cookie");
  return cookie && cookie.includes(`${COOKIE_NAME}=variant`);
}

function setAbTestCookie(response, value) {
  // Clone the response so we can update the headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.append("Set-Cookie", `${COOKIE_NAME}=${value}; path=/`);
  return newResponse;
}
```


## Create action paths.

One of the goals of A/B testing is to figure out how users interact with the different versions of your application, you will need to also create a path to count how many times the action item was selected. This can be a button to sign up or advancing to the next page. You can also set up a path to view the results. 

In this example you will set up a counter for how many times the page was shown and how many time the action was clicked from that page and increment the counters based on the number of clicks. You will also set a cookie to prevent double counting the user actions. 


To do this, add a case for the action path within the switch block: 


```js
//...

switch (url.pathname) {

    //.... 

    case ACTION_PATH:
    let response = Response.redirect("{A FALLBACK URL}", 302)

    if (hasControlCookie(request) && actionNotCountedCookie(request)) {
    // Todo: add increment counter
        response = setActionCountedCookie(response);

    } else if (hasVariantCookie(request) && actionNotCountedCookie(request)) {
    // Todo: add increment counter
        response = setActionCountedCookie(response);

    }
    return response;
    break;
}
    
```
From the code block above we have a `actionNotCountedCookie` and `setActionCountedCookie`functions which check that the cookie includes `cloudflare_ab_test_counted=true` and if it doesn't the latter is called on the response.


```js
function actionNotCountedCookie(request) {
  let cookie = request.headers.get("cookie");
  return cookie && !cookie.includes(`cloudflare_ab_test_counted=true`);
}

function setActionCountedCookie(response) {
  // Clone the response so we can update the headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.append("Set-Cookie", `cloudflare_ab_test_counted=true; path=/`);
  return newResponse;
}

```

## Creating result path

In order to save the results from our action path, we need a way to count the user actions. We will use [Durable Objects](/workers/learning/using-durable-objects/), which is a fast and strongly-consistent storage provided by Cloudflare. To have access to Durable Objects from our worker, we will have to use Wrangler.   {add wrangler info}


First create a Durable object namespace and class name. Then we define a list of unique counter for every event we want to track, visiting the pages and counting the actions, then in the siwtch statement code block define the `RESULT_PATH`. 


```js
---
filename: _worker.js
highlight: [10,11,12,13,14]
---
export default {
  async fetch(request, env) {
    return await handleRequest(request, env);
  }
}

const BASE_PATH = '/abtest'
const CONTROL_PATH = `${BASE_PATH}/control`;
const VARIANT_PATH = `${BASE_PATH}/variant`;
const ACTION_PATH = `${BASE_PATH}/action`;
const RESULT_PATH = `${BASE_PATH}/result`;

const COUNTER_CONTROL_SHOW = 'control-show';
const COUNTER_CONTROL_ACTION = 'control-action';
const COUNTER_VARIANT_SHOW = 'variant-show';
const COUNTER_VARIANT_ACTION = 'variant-action';

async function handleRequest(request, env) {

  let url = new URL(request.url);

  switch (url.pathname) {
 //.... 
    case RESULT_PATH:
      let counterControlShow = await getCounterValue(COUNTER_CONTROL_SHOW, env);
      let counterControlAction = await getCounterValue(COUNTER_CONTROL_ACTION, env);
      let counterVariantShow = await getCounterValue(COUNTER_VARIANT_SHOW, env);
      let counterVariantAction = await getCounterValue(COUNTER_VARIANT_ACTION, env);

      const data = {
        controlShow: counterControlShow,
        controlAction: counterControlAction,
        variantShow: counterVariantShow,
        variantAction: counterVariantAction
      }

      return new Response(JSON.stringify(data, null, 2), {
          headers: {
            "content-type": "application/json;charset=UTF-8"
          }
        });
      break;

    // For every other path, we proxy the request without further action
    default:
      return await fetch(request);
  }

}
```

# Setting up counter function with Durable Object 

We want the counter value to be concsitent so we will create a durable object 

```js

export class DURABLE_OBJECT_NAMESPACE {
  constructor(state, env) {
    this.state = state;
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
        let stored = await this.state.storage.get("value");
        this.value = stored || 0;
    })
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url);
    let currentValue = this.value;
    switch (url.pathname) {
    case "/increment":
      currentValue = ++this.value;
      await this.state.storage.put("value", this.value);
      break;
    case "/decrement":
      currentValue = --this.value;
      await this.state.storage.put("value", this.value);
      break;
    case "/value":
      // Just serve the current value. No storage calls needed!
      break;
    default:
      return new Response("Not found " + url.pathname, {status: 404});
    }

    // Return `currentValue`. Note that `this.value` may have been
    // incremented or decremented by a concurrent request when we
    // yielded the event loop to `await` the `storage.put` above!
    // That's why we stored the counter value created by this
    // request in `currentValue` before we used `await`.
    return new Response(currentValue);
  }
}

```


The `RESULT_PATH` case makes use of a `getCounterValue` function which uses the unique counter for every event listed and Derives an object ID from the URL path. Then construct the stub for the Durable Object using the ID. 



```js
async function getCounterValue(key, env) {
  let id = env.DURABLE_OBJECT_NAMESPACE.idFromName(key);
  let obj = env.DURABLE_OBJECT_NAMESPACE.get(id);
  let resp = await obj.fetch("value");
  return await resp.text();
}

async function incrementCounter(key, env) {
  let id = env.DURABLE_OBJECT_NAMESPACE.idFromName(key);
  let obj = env.DURABLE_OBJECT_NAMESPACE.get(id);
  let resp = await obj.fetch("increment");
  return await resp.text();
}

```

The next function we want to implement is an `incrementCounter` to track the number of interactions each options has. You will then add this function to the `ACTION_PATH` and the `BASE_PATH`. Your switch case should now look like this:

```js
---
filename: _worker.js
highlight: [15,18,27,31]
---

async function handleRequest(request, env) {

  let url = new URL(request.url);

  switch (url.pathname) {
    case BASE_PATH:
      if (hasControlCookie(request)) {
        url.pathname = CONTROL_PATH;
        return await fetch(request);
      } else if (hasVariantCookie(request)) {
        url.pathname = VARIANT_PATH;
        return await fetch(url, request);
      } else {
        const group = Math.random() < 0.5 ? "variant" : "control"
        if (group === "variant") {
          url.pathname = VARIANT_PATH;
          incrementCounter(COUNTER_VARIANT_SHOW, env);
        } else {
          url.pathname = CONTROL_PATH;
          incrementCounter(COUNTER_CONTROL_SHOW, env);
        }
        const response = await fetch(url, request);
        return setAbTestCookie(response, group);
      }
      break;

    case ACTION_PATH:
      let response = Response.redirect("https://ptrlaszlo.com/posts/cloudflare-ab-testing", 302)

      if (hasControlCookie(request) && actionNotCountedCookie(request)) {
        await incrementCounter(COUNTER_CONTROL_ACTION, env);
        response = setActionCountedCookie(response);

      } else if (hasVariantCookie(request) && actionNotCountedCookie(request)) {
        await incrementCounter(COUNTER_VARIANT_ACTION, env);
        response = setActionCountedCookie(response);

      }
      return response;
      break;

    case RESULT_PATH:
      let counterControlShow = await getCounterValue(COUNTER_CONTROL_SHOW, env);
      let counterControlAction = await getCounterValue(COUNTER_CONTROL_ACTION, env);
      let counterVariantShow = await getCounterValue(COUNTER_VARIANT_SHOW, env);
      let counterVariantAction = await getCounterValue(COUNTER_VARIANT_ACTION, env);

      const data = {
        controlShow: counterControlShow,
        controlAction: counterControlAction,
        variantShow: counterVariantShow,
        variantAction: counterVariantAction
      }

      return new Response(JSON.stringify(data, null, 2), {
          headers: {
            "content-type": "application/json;charset=UTF-8"
          }
        });
      break;

    // For every other path, we proxy the request without further action
    default:
      return await fetch(request);
  }

}
```

# Deploy to Cloudflare Pages

Now that you have set up your `_workers.js` file in your project. Deploy your site to Pages by logging in to the Cloudflare dashboard > Account Home > Pages and selecting Create a project. Select the new  GitHub repository that you created and, in the Set up builds and deployments section, provide the following information:

<div>

| Configuration option     | Value                 |
| ------------------------ | --------------------- |
| Production branch        | `main`                |
| Build command (optional) | `<YOUR_BUILD_COMMAND>`|
| Build output directory   | `<YOUR_BUILD_DIR>`    |

</div>

After you have deployed your application, you will have to update your Durable Object bindings. Go to setting > Functions > Durable Objects bindings

---
pcx_content_type: reference
title: API reference
weight: 3
meta:
  description: Learn about the APIs used within Pages Functions.
---

# API reference

The following methods can be used to configure your Pages Function.

## Methods

### `onRequests`

{{<definitions>}}

- {{<code>}}onRequest(context[{{<param-type>}}EventContext{{</param-type>}}](#eventcontext)){{</code>}} {{<type>}}Response | Promise&lt;Response&gt;{{</type>}}
  - This function will be invoked on all requests no matter the request method.
- {{<code>}}onRequestGet(context[{{<param-type>}}EventContext{{</param-type>}}](#eventcontext)){{</code>}} {{<type>}}Response | Promise&lt;Response&gt;{{</type>}}
  - This function will be invoked on all `GET` requests.
- {{<code>}}onRequestPost(context[{{<param-type>}}EventContext{{</param-type>}}](#eventcontext)){{</code>}} {{<type>}}Response | Promise&lt;Response&gt;{{</type>}}
  - This function will be invoked on all `POST` requests.
- {{<code>}}onRequestPatch(context[{{<param-type>}}EventContext{{</param-type>}}](#eventcontext)){{</code>}} {{<type>}}Response | Promise&lt;Response&gt;{{</type>}}
  - This function will be invoked on all `PATCH` requests.
- {{<code>}}onRequestPut(context[{{<param-type>}}EventContext{{</param-type>}}](#eventcontext)){{</code>}} {{<type>}}Response | Promise&lt;Response&gt;{{</type>}}
  - This function will be invoked on all `PUT` requests.
- {{<code>}}onRequestDelete(context[{{<param-type>}}EventContext{{</param-type>}}](#eventcontext)){{</code>}} {{<type>}}Response | Promise&lt;Response&gt;{{</type>}}
  - This function will be invoked on all `DELETE` requests.
- {{<code>}}onRequestHead(context[{{<param-type>}}EventContext{{</param-type>}}](#eventcontext)){{</code>}} {{<type>}}Response | Promise&lt;Response&gt;{{</type>}}
  - This function will be invoked on all `HEAD` requests.
- {{<code>}}onRequestOptions(context[{{<param-type>}}EventContext{{</param-type>}}](#eventcontext)){{</code>}} {{<type>}}Response | Promise&lt;Response&gt;{{</type>}}
  - This function will be invoked on all `OPTIONS` requests.

{{</definitions>}}

### `env.ASSETS.fetch()`

The `env.ASSETS.fetch()` function allows you to fetch a static asset from your Pages project.

You can pass a [Request object](/workers/runtime-apis/request/), URL string, or URL object to `env.ASSETS.fetch()` function. The URL must be to the pretty path, not directly to the asset. For example, if you had the path `/users/index.html`, you will request `/users/` instead of `/users/index.html`. This method call will run the header and redirect rules, modifying the response that is returned.

## Types

### `EventContext`

{{<definitions>}}
The following are the properties on the `context` object which are passed through on the `onRequest` methods:

  - `request` [{{<type>}}Request{{</type>}}](/workers/runtime-apis/request/)

      This is the incoming [Request](/workers/runtime-apis/request/).

  - `functionPath` {{<type>}}string{{</type>}}

      This is the path of the request.

  - {{<code>}}waitUntil(promise{{<param-type>}}Promise&lt;any&gt;{{</param-type>}}){{</code>}} {{<type>}}void{{</type>}}

      Refer to [`waitUntil` documentation](/workers/runtime-apis/context/#waituntil) for more information.


  - {{<code>}}passThroughOnException(){{</code>}} {{<type>}}void{{</type>}}

      Refer to [`passThroughOnException` documentation](/workers/runtime-apis/context/#passthroughonexception) for more information. Note that this will not work on an [advanced mode project](/pages/functions/advanced-mode/).

  - {{<code>}}next(input?{{<param-type>}}Request | string{{</param-type>}}, init?{{<param-type>}}RequestInit{{</param-type>}}){{</code>}} {{<type>}}Promise&lt;Response&gt;{{</type>}}

      Passes the request through to the next Function or to the asset server if no other Function is available.

  - `env` [{{<type>}}EnvWithFetch{{</type>}}](#envwithfetch)
  - `params` {{<type>}}Params&lt;P&gt;{{</type>}}

      Holds the values from [dynamic routing](/pages/functions/routing/#dynamic-routes).

      In the following example, you have a dynamic path that is `/users/[user].js`. When you visit the site on `/users/nevi` the `params` object would look like:

      ```js
      {
        user: "nevi"
      }
      ```

      This allows you fetch the dynamic value from the path:

      ```js
      export function onRequest(context) {
        return new Response(`Hello ${context.params.user}`);
      }
      ```

      Which would return `"Hello nevi"`.

  - `data` {{<type>}}Data{{</type>}}

{{</definitions>}}

### `EnvWithFetch`

Holds the environment variables, secrets, and bindings for a Function. This also holds the `ASSETS` binding which is how you can fallback to the asset-serving behavior.

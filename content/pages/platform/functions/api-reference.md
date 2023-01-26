---
pcx-content-type: how-to
title: API Reference
weight: 3
meta:
  description: Learn about the APIs used within Pages Functions.
---

# API reference

The following APIs are used within Functions. 

## Methods

The following methods 

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

The `env.ASSETS.fetch()` function allows you to fetch a static asset. Requests to this will be to the pretty path not directly to the asset (i.e. if you had the path: `functions/users/index.html`, you will request  /users/ instead of /users/index.html). This will run the header and redirect rules, so they will modify the response that is returned.

## Types

### `EventContext`

{{<definitions>}}
The following are the properties on the `context` object which are passed through on the `onRequest` methods:

  - `request` [{{<type>}}Request{{</type>}}](/workers/runtime-apis/request/)
 
      This is the incoming [Request](/workers/runtime-apis/request/).
  
  - `functionPath` {{<type>}}string{{</type>}}
  
      This is the path of the request. 
    
  - {{<code>}}waitUntil(promise{{<param-type>}}Promise&lt;any&gt;{{</param-type>}}){{</code>}} {{<type>}}void{{</type>}}
  
      Refer to [`waitUntil` documentation](/workers/runtime-apis/fetch-event/#waituntil) for more information.
  
  - {{<code>}}passThroughOnException(){{</code>}} {{<type>}}void{{</type>}}
  
      Refer to [`passThroughOnException` documentation](/workers/runtime-apis/fetch-event/#passthroughonexception) for more information. Note that this will not work on an [advanced mode project](/pages/platform/functions/advanced-mode/)
  
  - {{<code>}}next(input?{{<param-type>}}Request | string{{</param-type>}}, init?{{<param-type>}}RequestInit{{</param-type>}}){{</code>}} {{<type>}}Promise&lt;Response&gt;{{</type>}}
  
      Passes the request through to the next Function or to the asset server if no other Function is available. 
  
  - `env` [{{<type>}}EnvWithFetch{{</type>}}](#envwithfetch)
  - `params` [{{<type>}}Params&lt;P&gt;{{</type>}}](#params)
  - `data` [{{<type>}}Data{{</type>}}](#data)
  
{{</definitions>}}

### `EnvWithFetch`

Holds the environment variables, secrets, and bindings for this Function. This also holds the `ASSETS` binding which is how you can fallback to the asset server. 

### Params

Holds the values from the [dynamic routes](/pages/platform/functions/routing/#dynamic-routes)

---
pcx_content_type: concept
title: Turnstile
weight: 1
---

# Turnstile Pages Plugin

[Turnstile](/turnstile/) is Cloudflare's smart CAPTCHA alternative.

The Turnstile Pages Plugin validates Cloudflare Turnstile tokens.

## Installation

```sh
$ npm install @cloudflare/pages-plugin-turnstile
```

## Usage

```typescript
---
filename: functions/register.ts
---
import turnstilePlugin from "../../pages-plugins/packages/turnstile";

/**
 * POST /api/submit-with-plugin
 */

export const onRequestPost = [
		turnstilePlugin({
      // This is the demo secret key. In prod, we recommend you store
      // your secret key(s) safely.
        secret: "0x4AAAAAAASh4E5cwHGsTTePnwcPbnFru6Y",
		}),
		(async (context) => {
		  // Request has been validated as coming from a human
		  const formData = await context.request.formData()
      // Additional solve metadata data is available at context.data.turnstile
		  
		  return new Response(`Successfully verified! ${JSON.stringify(context.data.turnstile)}`)
		})
];
```


This Plugin only exposes a single route to verify an incoming Turnstile response in a `POST` as the `cf-turnstile-response` parameter. It will be available wherever it is mounted. In the example above, it is mounted in `functions/register.ts`. As a result, it will validate requests to `/register`.
 
 The Plugin is mounted with a single object parameter with the following properties:

[`secret`](https://dash.cloudflare.com/login) (mandatory) can both be found in your Turnstile dashboard.

`response` and `remoteip` are optional strings. `response` the turnstile token to verify (if not provided, the plugin will default to extracting `cf-turnstile-response` from a `multipart/form-data` request). `remoteip` should be requester's IP address (defaults to the `CF-Connecting-IP` header of the request).

`onError` is an optional function which takes the Pages Function context object and returns a `Promise` of a `Response`. By default, it will return a human-readable error `Response`.

`context.data.turnstile` will be populated in subsequent Pages Functions (including for the `onError` function) with [the turnstile siteverify response object](/turnstile/get-started/server-side-validation/).

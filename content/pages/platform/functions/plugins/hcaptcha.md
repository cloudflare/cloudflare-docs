---
pcx_content_type: concept
title: hCaptcha
weight: 1
---

# hCaptcha Pages Plugin

The hCaptcha Pages Plugin validates hCaptcha tokens.

## Installation

```sh
$ npm install @cloudflare/pages-plugin-hcaptcha
```

## Usage

```typescript
---
filename: functions/register.ts
---
import hCaptchaPlugin from "@cloudflare/pages-plugin-hcaptcha";

export const onRequestPost: PagesFunction[] = [
  hCaptchaPlugin({
    secret: "0x0000000000000000000000000000000000000000",
    sitekey: "10000000-ffff-ffff-ffff-000000000001",
  }),
  (async ({ request }) => {
    // Request has been validated as coming from a human

    const formData = await request.formData()

    // Store user credentials

    return new Response("Successfully registered!")
  })
];
```

This Plugin only exposes a single route. It will be available wherever it is mounted . In the above example, because it is mounted in `functions/register.ts`, it will validate requests to `/register`. The Plugin is mounted with a single object parameter with the following properties.

[`secret`](https://dashboard.hcaptcha.com/settings) (mandatory) and [`sitekey`](https://dashboard.hcaptcha.com/sites) (optional) can both be found in your hCaptcha dashboard.

`response` and `remoteip` are optional strings. `response` the hCaptcha token to verify (defaults to extracting `h-captcha-response` from a `multipart/form-data` request). `remoteip` should be requester's IP address (defaults to the `CF-Connecting-IP` header of the request).

`onError` is an optional function which takes the Pages Function context object and returns a `Promise` of a `Response`. By default, it will return a human-readable error `Response`.

`data.hCaptcha` will be populated in subsequent Pages Functions (including for the `onError` function) with [the hCaptcha response object](https://docs.hcaptcha.com/#verify-the-user-response-server-side).

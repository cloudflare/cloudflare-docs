---
title: Migrating from hCaptcha
pcx_content_type: migration
weight: 4
layout: single
---

# Migrating from hCaptcha

Customers using hCaptcha today can switch seamlessly to Cloudflare Turnstile. Follow the step-by-step guide below to assist with the upgrade process.

To complete the migration, you must obtain the [sitekey and secret key](/turnstile/get-started/#get-a-sitekey-and-secret-key).

## Client-side integration

1. Update the client-side integration by inserting the Turnstile script snippet in your HTML's `<head>` element:

<div>

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

</div>

2. Locate the `hcaptcha.render()` calls and replace the sitekey with your Turnstile sitekey and the api.

<div>

```js
// before
hcaptcha.render(element, {
    sitekey: "00000000-0000-0000-0000-000000000000"
})
// after
turnstile.render(element, {
    sitekey: "1x00000000000000000000AA"
})
```

</div>

{{<Aside type= "note">}}
Turnstile supports:
* the `render()` call
* hCaptcha invisible mode with the `execute()` call
{{</Aside>}}

## Server-side integration

1. Update the server-side integration by replacing the siteverify URL. Replace:

`https://hcaptcha.com/siteverify`

With:

`https://challenges.cloudflare.com/turnstile/v0/siteverify`

2. Replace the `h-captcha-response` input name with `cf-turnstile-response`.

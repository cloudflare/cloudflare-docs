---
title: Migrating from reCAPTCHA
pcx_content_type: migration
weight: 1
---

# Migrate from reCAPTCHA

If you are using reCAPTCHA today, you can switch seamlessly to Cloudflare Turnstile by following the step-by-step guide below to assist with the upgrade process.

To complete the migration, you must obtain the [sitekey and secret key](/turnstile/get-started/#get-a-sitekey-and-secret-key).

{{<Aside type= "note">}}
Turnstile migration is currently compatible up to reCAPTCHA v2.
{{</Aside>}}

## Client-side integration

1. Update the client-side integration by inserting the Turnstile script snippet in your HTML's `<head>` element

<div>

```html
---
header: Turnstile script snippet
---
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha" async defer></script>
```

{{<Aside type= "note">}}
Adding `?compat=recaptcha` runs Turnstile in compatibility mode, which
enables the following features:
* implicit rendering for reCAPTCHA
* `g-recaptcha-response` input name for forms
* register the Turnstile API as `grecaptcha`
{{</Aside>}}

</div>

2. Locate the `grecaptcha.render()` calls and replace the sitekey with your Turnstile sitekey.

{{<Aside type= "note">}}
Turnstile supports:
* the `render()` call
* reCAPTCHA v2 invisible mode with the `execute()` call
{{</Aside>}}

## Server-side integration

Update the server-side integration by replacing the siteverify URL. Replace:

`https://www.google.com/recaptcha/api/siteverify`

With:

`https://challenges.cloudflare.com/turnstile/v0/siteverify`

{{<Aside type= "warning" header="Differences to reCAPTCHA's siteverify">}}
reCAPTCHA supports `GET` requests using query parameters, i.e: `GET /siteverify?response=<response>&secret=<secret>`.

Turnstile's siteverify endpoint does **not** support this and only accepts `POST` requests with a FormData or JSON body.

Refer to [server-side validation](/turnstile/get-started/server-side-validation/) for more information.
{{</Aside>}}
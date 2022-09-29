---
title: Migrating from reCAPTCHA
pcx_content_type: get-started
weight: 3
layout: single
---

# Migrating from reCAPTCHA

Customers using reCAPTCHA today can switch seamlessly to Cloudflare Turnstile. Follow the step-by-step guide below to assist with the upgrade process. 

To complete the migration, you must obtain the [sitekey and secret key](/turnstile/get-started/#sitekey-and-secret-key).

## Client-side integration 

1. Update the client-side integration inserting the Turnstile script snippet in your HTML's `<head>` element:

<div>

```bash

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?compat=recaptcha" async defer></script>

```

</div>

2. Locate the `grecaptcha.render()` calls and replace the sitekey with your Turnstile sitekey.


## Server-side integration

Update the server-side integration by replacing the siteverify URL. Replace:

`https://www.google.com/recaptcha/api/siteverify`

With:

`https://challenges.cloudflare.com/turnstile/v0/siteverify`

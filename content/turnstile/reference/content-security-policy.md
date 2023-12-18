---
title: Content Security Policy
pcx_content_type: reference
weight: 16
layout: single
---

# Content Security Policy

The HTTP Content-Security-Policy response header allows website administrators to control resources the user agent is allowed to load for a given page.

We recommend using the nonce-based approach documented with [CSP3](https://w3c.github.io/webappsec-csp/#framework-directive-source-list). Make sure to include your nonce in the `api.js` script tag and we will handle the rest. Cloudflare Turnstile works with **strict-dynamic**.

Alternatively, add the following values to your CSP header:

- **script-src**: `https://challenges.cloudflare.com`
- **frame-src**: `https://challenges.cloudflare.com`

We recommend validating your CSP with [Google's CSP Evaluator](https://csp-evaluator.withgoogle.com/).

## With Pre-Clearance

If you are using [Turnstile in pre-clearance mode](https://blog.cloudflare.com/integrating-turnstile-with-the-cloudflare-waf-to-challenge-fetch-requests), Turnstile sets the `cf_clearance` cookie by doing a fetch request to a special endoint in [`/cdn-cgi/`](https://developers.cloudflare.com/fundamentals/reference/cdn-cgi-endpoint/) of your domain.

For this request to succeed, your `connect-src` directive must include `'self'`.

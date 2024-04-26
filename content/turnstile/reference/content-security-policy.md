---
title: Content Security Policy
pcx_content_type: reference
weight: 1
---

# Content Security Policy

The HTTP Content-Security-Policy response header allows website administrators to control resources the user agent is allowed to load for a given page.

We recommend using the nonce-based approach documented with [CSP3](https://w3c.github.io/webappsec-csp/#framework-directive-source-list). Make sure to include your nonce in the `api.js` script tag and we will handle the rest. Cloudflare Turnstile works with **strict-dynamic**.

Alternatively, add the following values to your CSP header:

- **script-src**: `https://challenges.cloudflare.com`
- **frame-src**: `https://challenges.cloudflare.com`

We recommend validating your CSP with [Google's CSP Evaluator](https://csp-evaluator.withgoogle.com/).

{{<Aside type="note">}}
You cannot set your own CSP and/or Referer-Policy via meta tags or [Transform rules](/rules/transform/) in challenge pages.
{{</Aside>}}

## Pre-Clearance support

If you are using [Turnstile in pre-clearance mode](/turnstile/concepts/pre-clearance-support/), Turnstile sets the `cf_clearance` cookie by doing a fetch request to a special endpoint in [`/cdn-cgi/`](/fundamentals/reference/cdn-cgi-endpoint/) of your domain.

For this request to succeed, your `connect-src` directive must include `'self'`.
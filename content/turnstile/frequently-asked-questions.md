---
title: FAQs
pcx_content_type: FAQ
weight: 12
layout: list
---
# Frequently Asked Questions

## How does Content-Security-Policy need to be configured for Turnstile?

The HTTP Content-Security-Policy response header allows website administrators to control resources the user agent is allowed to load for a given page. 

We recommend using the nonce-based approach documented with [CSP3](https://w3c.github.io/webappsec-csp/#framework-directive-source-list). Make sure to include your nonce in the `api.js` script tag and we'll handle the rest. Cloudflare Turnstile works with **strict-dynamic**.

Alternatively, please add the following values to the directives:

* **script-src** https://challenges.cloudflare.com
* **frame-src** https://challenges.cloudflare.com

We recommend validating your CSP with [Google's CSP Evaluator](https://csp-evaluator.withgoogle.com/).

## What is the difference between action and cData?
Action can be used in analytics and is more limited in size. It should identify different pages in a website where a widget is used.

Action should not contain any PII as this is placed into the analytics.

cData is not stored in our analytics. It can contain data that may vary by each challenge instance.

Both cData and action are returned by the siteverify API if a token is presented.

## Can a Turnstile token be used twice?

No, the siteverify API will only validate a token once. If a token has already been checked, the siteverify API will yield an error on subsequent verification attempts indicating that a token has already been spent.

## How long is a Turnstile token valid for before it is rejected by siteverify?

300 seconds.

## What happens if the user takes longer than 5 minutes?

The Turnstile widget needs to be refreshed to generate a new token. This can be done using the `turnstile.reset` function.

## Why does a Turnstile token need to be verified using siteverify?
Turnstile is a front-end widget that creates a token which is cryptographically secured. However, the customer cannot check the validity of the token on their end.

To ensure that a token is not forged by an attacker or has not been consumed yet, the customer needs to check the validity of a token using Cloudflare's siteverify API.

## Can the front-end use siteverify?
The siteverify API must not be called by the front-end as this may reveal the secretkey used to authenticate. An attacker may simply modify the front-end to not perform the siteverify check at all, rendering Turnstile ineffective.

## What is the length of a Turnstile token?
Currently, a Turnstile token can have up to 2048 characters.

## What is challenges.cloudflare.com and why does my application connect to this origin?

Turnstile is hosted under challenges.cloudflare.com. 

## Are there sitekeys and secret keys that can be used for testing?

Yes.

| Sitekey | Description |
| --- | --- |
| `1x00000000000000000000AA` | Always passes |
| `2x00000000000000000000AB` | Always blocks |
| `3x00000000000000000000FF` | Forces an interactive challenge |

|Secret key | Description |
| --- | --- |
| `1x0000000000000000000000000000000AA` | Always passes |
| `2x0000000000000000000000000000000AA` | Always fails | 
| `3x0000000000000000000000000000000AA` | Yields a "token already spent" error | 
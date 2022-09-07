---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Turnstile
---

# Turnstile

Cloudflare’s Turnstile enables customers to use a CAPTCHA-less challenge solution beyond interstitial pages to help protect your sites from fraudulent activities, spam, and abuse.

Traditionally, customers were only able to run Cloudflare challenges such as JavaScript Challenge, Managed Challenge, or CAPTCHA, on interstitial pages.

Turnstile allows the customer to run challenges anywhere on their site in a less-intrusive way.

{{<Aside type="note">}}

Turnstile is reCAPTCHA compatible. Customers using reCAPTCHA or hCaptcha today can switch seamlessly to Cloudflare’s Turnstile.

{{</Aside>}}

Cloudflare dynamically chooses the appropriate type of challenge based on the characteristics of a request via Turnstile. This helps avoid [CAPTCHAs](https://www.cloudflare.com/learning/bots/how-captchas-work/), which also reduces the lifetimes of human time spent solving CAPTCHAs across the Internet.

Depending on the characteristics of a request, Cloudflare will choose an appropriate type of challenge, which may include but is not limited to:

* A non-interactive challenge page (similar to the current JS Challenge).
* An invisible proof of work challenge to the browser.
* A custom interactive challenge (such as clicking a button).
* A CAPTCHA challenge.
 
---

## Availability

Turnstile is available as a free tool for all users.

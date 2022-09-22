---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Turnstile
---

# Turnstile

Turnstile is a Cloudflare security product designed to stop non-human web visitors. It can be embedded into any website and works without showing visitors a CAPTCHA.

In contrast to our Challenge page offerings, Turnstile allows customers to run challenges anywhere on their site in a less-intrusive way without requiring the use of Cloudflare's CDN.

Customers are able to choose the widget type via Turnstile. This helps avoid [CAPTCHAs](https://www.cloudflare.com/learning/bots/how-captchas-work/), which also reduces the lifetimes of human time spent solving CAPTCHAs across the Internet.

Turnstile [widget types](/turnstile/refrence/widget-types/) include:

* A non-interactive challenge.
* A non-intrusive interactive challenge (such as clicking a button), if the visitor is a suspected bot.
* An invisible challenge to the browser.


---

## Availability

Turnstile is currently in open beta and available as a free tool for all customers.

For the beta, customers are limited to 1 million siteverify calls per month. Customers who need additional requests can upgrade to [Enterprise Bot Management](/bots/get-started/bm-subscription/).
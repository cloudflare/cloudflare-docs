---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Turnstile
---

# Turnstile

Turnstile is Cloudflare’s smart CAPTCHA alternative. It can be embedded into any website without sending traffic through Cloudflare and works without showing visitors a CAPTCHA.

![Turnstile Overview](/images/turnstile/turnstile-overview.png)

Turnstile leverages the same technology behind our [Managed Challenge](https://blog.cloudflare.com/end-cloudflare-captcha/), but opens it to anyone not currently utilizing the Cloudflare network. In contrast to our Challenge page offerings, Turnstile allows the customer to run challenges anywhere on their site in a less-intrusive way without requiring the use of Cloudflare’s CDN.

Rather than try to unilaterally deprecate and replace CAPTCHA with a single alternative, we built a platform to test many alternatives and rotate new challenges in and out as they become more or less effective. 

With Turnstile, we adapt the actual challenge outcome to the individual visitor or browser. First, we run a series of small non-interactive JavaScript challenges gathering more signals about the visitor/browser environment. Those challenges include, proof-of-work, proof-of-space, probing for web APIs, and various other challenges for detecting browser-quirks and human behavior. As a result, we can fine-tune the difficulty of the challenge to the specific request and avoid ever showing a visual puzzle to a user.

Turnstile also includes machine learning models that detect common features of end visitors who were able to pass a challenge before. The computational hardness of those initial challenges may vary by visitor, but is targeted to run fast.

Customers are able to choose the widget type via Turnstile. This helps avoid [CAPTCHAs](https://www.cloudflare.com/learning/bots/how-captchas-work/), which also reduces the lifetimes of human time spent solving CAPTCHAs across the Internet.

Turnstile [widget types](/turnstile/reference/widget-types/) include:

* A non-interactive challenge.
* A non-intrusive interactive challenge (such as clicking a button), if the visitor is a suspected bot.
* An invisible challenge to the browser.

---

## Features
 
{{<feature header="Turnstile Analytics" href="/turnstile/reference/turnstile-analytics/">}}
Assess the number of challenges issued, evaluate the challenge solve rate, and view the metrics of issued challenges.
{{</feature>}}
 
---

## Related products
 
{{<related header="Bots" href="/bots/" product="bots">}}
Cloudflare bot solutions identify and mitigate automated traffic to protect your domain from bad bots.
{{</related>}}

---

## Availability

Turnstile is currently in open beta and available as a free tool for all customers.

For the beta, customers are limited to 1 million calls to the siteverify verification endpoint per month per site. Customers who need additional requests can upgrade to [Enterprise Bot Management](/bots/plans/bm-subscription/).
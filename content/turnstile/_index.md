---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Turnstile
---

# Turnstile

{{<description>}}
Cloudflare’s smart CAPTCHA alternative. 
{{</description>}}

Turnstile can be embedded into any website without sending traffic through Cloudflare and works without showing visitors a CAPTCHA.

{{<plan type="all">}}

![Turnstile Overview](/images/turnstile/turnstile-overview.png)

{{<render file="_challenge-behavior.md">}}

Rather than try to unilaterally deprecate and replace CAPTCHA with a single alternative, we built a platform to test many alternatives and rotate new challenges in and out as they become more or less effective.

With Turnstile, we adapt the actual challenge outcome to the individual visitor or browser. First, we run a series of small non-interactive JavaScript challenges gathering more signals about the visitor/browser environment. Those challenges include, proof-of-work, proof-of-space, probing for web APIs, and various other challenges for detecting browser-quirks and human behavior. As a result, we can fine-tune the difficulty of the challenge to the specific request and avoid ever showing a visual puzzle to a user.

Turnstile also includes machine learning models that detect common features of end visitors who were able to pass a challenge before. The computational hardness of those initial challenges may vary by visitor, but is targeted to run fast.

Turnstile [widget types](/turnstile/concepts/widget-types/) include:

* A non-interactive challenge.
* A non-intrusive interactive challenge (such as checking a box), if the visitor is a suspected bot.
* An invisible challenge to the browser.

---

## Accessibility

Turnstile is WCAG 2.1 AA compliant.

---

## Availability

Refer to [Cloudflare Turnstile's product page](https://www.cloudflare.com/products/turnstile/) for more information on Turnstile's plans.

---

## Get started

{{<button-group>}}
{{<button type="primary" href="/turnstile/get-started/">}}Get started{{</button>}}
{{<button type="secondary" href="/turnstile/migration/">}}Migration guides{{</button>}}
{{<button type="secondary" href="https://dash.cloudflare.com/?to=/:account/turnstile" target="_blank">}}Dashboard{{</button>}}
{{</button-group>}}

---

## Features

{{<feature header="Turnstile analytics" href="/turnstile/turnstile-analytics/">}}
Assess the number of challenges issued, evaluate the challenge solve rate, and view the metrics of issued challenges.
{{</feature>}}

{{<feature header="Pre-Clearance" href="/turnstile/concepts/pre-clearance-support/">}}
Integrate Cloudflare challenges on single-page applications (SPAs) by allowing Turnstile to issue a Pre-Clearance cookie.
{{</feature>}}

---

## Related products

{{<related header="Bots" href="/bots/" product="bots">}}
Cloudflare bot solutions identify and mitigate automated traffic to protect your domain from bad bots.
{{</related>}}

{{<related header="WAF" href="/waf/" product="waf">}}
Get automatic protection from vulnerabilities and the flexibility to create custom rules.
{{</related>}}

---
title: FAQ
pcx_content_type: faq
weight: 12
layout: list
structured_data: true
---

# Frequently Asked Questions

{{<faq-item>}}
{{<faq-question level=2 text="How does Content-Security-Policy need to be configured for Turnstile?" >}}

{{<faq-answer>}}

The HTTP Content-Security-Policy response header allows website administrators to control resources the user agent is allowed to load for a given page. 

We recommend using the nonce-based approach documented with [CSP3](https://w3c.github.io/webappsec-csp/#framework-directive-source-list). Make sure to include your nonce in the `api.js` script tag and we will handle the rest. Cloudflare Turnstile works with **strict-dynamic**.

Alternatively, add the following values to the directives:

* **script-src**: `https://challenges.cloudflare.com`
* **frame-src**: `https://challenges.cloudflare.com`

We recommend validating your CSP with [Google's CSP Evaluator](https://csp-evaluator.withgoogle.com/).

{{</faq-answer>}}
{{</faq-item>}}


{{<faq-item>}}
{{<faq-question level=2 text="What is Visitor Solve Rate?" >}}

{{<faq-answer>}}

A full Turnstile Challenge Token Flow consists of a few things:

* A challenge is rendered (issued).
* A challenge is solved on the front end and a token is harvested (solved).
* The token is passed to siteverify, and it is consumed (siteverified).

Visitor Solve Rate is the percentage of tokens that were issued but have not necessarily been siteverified compared to issued challenges.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What is API Solve Rate?" >}}

{{<faq-answer>}}

API Solve Rate is the share of tokens that were siteverified compared to issued. 

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}

{{<faq-question level=2 text="What is the difference between action and cData?" >}}

{{<faq-answer>}}

Action can be used in analytics and is more limited in size. It should identify different pages in a website where a widget is used.

Action should not contain any personally identifiable information (PII) as this is placed into the analytics.

cData is not stored in our analytics. It can contain data that may vary by each challenge instance.

Both cData and action are returned by the siteverify API if a valid token is presented.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}

{{<faq-question level=2 text="Can a Turnstile token be used twice?" >}}

{{<faq-answer>}}

No, the siteverify API will only validate a token once. If a token has already been checked, the siteverify API will yield an error on subsequent verification attempts indicating that a token has already been consumed.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How long is a Turnstile token valid for before it is rejected by siteverify?" >}}

{{<faq-answer>}}

A Turnstile token is valid for 300 seconds.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}

{{<faq-question level=2 text="What happens if the user takes longer than five minutes?" >}}

{{<faq-answer>}}

The Turnstile widget needs to be refreshed to generate a new token. This can be done using the `turnstile.reset` function.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Why does a Turnstile token need to be verified using siteverify?" >}}

{{<faq-answer>}}

Turnstile is a front-end widget that creates a token which is cryptographically secured. However, the customer cannot check the validity of the token on their end.

To ensure that a token is not forged by an attacker or has not been consumed yet, the customer needs to check the validity of a token using Cloudflare's siteverify API.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can the front end use siteverify?" >}}

{{<faq-answer>}}

The siteverify API must not be called by the front end as this may reveal the secretkey used to authenticate. An attacker may simply modify the front end to not perform the siteverify check at all, rendering Turnstile ineffective.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can I use Turnstile when developing locally?" >}}

{{<faq-answer>}}

The dummy sitekeys provided below can be used from any domain, including on `localhost`. 

Cloudflare recommends that sitekeys used in production do not allow local domains (`localhost`, `127.0.0.1`), but users can choose to add local domains to the list of allowed domains.

{{</faq-answer>}}
{{</faq-item>}}


{{<faq-item>}}

{{<faq-question level=2 text="What is the length of a Turnstile token?" >}}

{{<faq-answer>}}

Currently, a Turnstile token can have up to 2048 characters.

{{</faq-answer>}}
{{</faq-item>}}


{{<faq-item>}}
{{<faq-question level=2 text="What is challenges.cloudflare.com, and why does my application connect to this origin?" >}}

{{<faq-answer>}}

Turnstile is hosted under `challenges.cloudflare.com`. 

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can I use Turnstile to protect a React Native application?" >}}

{{<faq-answer>}}

We currently do not offer an easy and official way to embed Turnstile in a React Native application. 

An HTML page rendered in a [WebView](https://github.com/react-native-webview/react-native-webview) can use Turnstile. The page must be loaded from a domain allowed to use the [sitekey](/turnstile/reference/domain-management/), either using `uri` or by specifying the `html` and `baseUrl` options.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Are there sitekeys and secret keys that can be used for testing?" >}}

{{<faq-answer>}}

You can find special sitekeys to be used for testing in the [testing](/turnstile/reference/testing/) section.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Is there an API to create or manage Turnstile widgets?" >}}

{{<faq-answer>}}

Yes, you can refer to the [Turnstile API documentation](/api/operations/accounts-turnstile-widgets-list) to manage your widgets.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="I am seeing a 401 error in your console during a Turnstile security check, is this a problem?" >}}
{{<faq-answer>}}

You can safely ignore the error. It is requesting a [Private Access Token (PAT)](https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/) that your device or browser does not support yet.

{{</faq-answer>}}
{{</faq-item>}}

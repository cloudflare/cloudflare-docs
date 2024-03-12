---
title: FAQ
pcx_content_type: faq
weight: 11
structured_data: true
---

# Frequently Asked Questions

{{<faq-item>}}
{{<faq-question level=2 text="How does Content-Security-Policy need to be configured for Turnstile?" >}}

{{<faq-answer>}}

The HTTP Content-Security-Policy response header allows website administrators to control resources the user agent is allowed to load for a given page.

For specifics regarding Turnstile, refer to the [Content Security Policy](/turnstile/reference/content-security-policy/).

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
{{<faq-question level=2 text="Can the front end use siteverify?" >}}

{{<faq-answer>}}

The siteverify API must not be called by the front end as this may reveal the secretkey used to authenticate. An attacker may simply modify the front end to not perform the siteverify check at all, rendering Turnstile ineffective.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can I use Turnstile when developing locally?" >}}

{{<faq-answer>}}

Dummy sitekeys can be used from any domain, including on `localhost`.

Cloudflare recommends that sitekeys used in production do not allow local domains (`localhost`, `127.0.0.1`), but users can choose to add local domains to the list of allowed domains.

Refer to [Testing](/turnstile/reference/testing/) for more information.

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
{{<faq-question level=2 text="I am seeing a 401 error in your console during a Turnstile security check, is this a problem?" >}}
{{<faq-answer>}}

You can safely ignore the error. It is requesting a [Private Access Token (PAT)](https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/) that your device or browser does not support yet.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How can I obtain the Ray ID or QR code for troubleshooting?" >}}
{{<faq-answer>}}

You will need to provide a [Ray ID](/fundamentals/reference/cloudflare-ray-id/) or QR code when debugging issues. The Ray ID is found at the end of the challenge page. You can obtain the QR code by clicking the success/failure/spinner logo on the widget four times.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What if I encounter an endless challenge loop?" >}}
{{<faq-answer>}}

If you encounter an endless challenge loop, try disabling your browser extensions.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What languages does Turnstile support?" >}}
{{<faq-answer>}}

Refer to the [list of supported languages](/turnstile/reference/supported-languages/) for more information.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Does Turnstile conform to WCAG 2.1 Level AA accessibility standard?" >}}
{{<faq-answer>}}

Yes, Turnstile is WCAG 2.1 Level AA compliant.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can I use Turnstile on URI schemes such as `file://`?" >}}
{{<faq-answer>}}

No, Turnstile only works on `http://` and `https://` URI schemes. Other protocols such as `file://` are not supported.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Why do I see a challenge on my proxied hostnames?" >}}
{{<faq-answer>}}

{{<render file="_proxied-hostnames.md">}}
{{<render file="_challenge-behavior.md">}}

{{</faq-answer>}}
{{</faq-item>}}
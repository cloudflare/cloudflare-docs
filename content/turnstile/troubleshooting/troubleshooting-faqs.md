---
title: Troubleshooting FAQ
pcx_content_type: faq
weight: 6
---

# Troubleshooting FAQ

{{<faq-item>}}
{{<faq-question level=2 text="What happens if the user takes longer than five minutes?" >}}

{{<faq-answer>}}

The Turnstile widget needs to be refreshed to generate a new token. This can be done using the `turnstile.reset` function.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can the front end use siteverify?" >}}

{{<faq-answer>}}

The siteverify API must not be called by the front end as this may reveal the secret key used to authenticate. An attacker may simply modify the front end to not perform the siteverify check at all, rendering Turnstile ineffective.

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
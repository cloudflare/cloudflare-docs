---
pcx_content_type: faq
title: FAQs
weight: 9
structured_data: true
---

# FAQs

{{<faq-item>}}
{{<faq-question level=2 text="Are DLP and DLS the same?" >}}

{{<faq-answer>}}

No, they are not. DLP stands for [Data Loss Prevention](/cloudflare-one/policies/data-loss-prevention/), and it is part of Cloudflare’s Zero Trust offering (requiring Gateway). It allows customers to scan web traffic and SaaS apps for sensitive data like secret keys, financial information (credit card numbers), and other keywords.

[Data Localization Suite](/data-localization/) (DLS) is a suite of features that can provide localization and data residency features.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Are Cloudflare’s services GDPR compliant?" >}}

{{<faq-answer>}}

Yes, even without DLS, Cloudflare services are designed to satisfy the GDPR’s requirements. Cloudflare services are also verified compliant with the EU Cloud CoC, Verification-ID: 2023LVL02SCOPE4316. For further information, visit EU Cloud CoC [public register](https://eucoc.cloud/en/public-register).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How can I use DLS?" >}}

{{<faq-answer>}}

Once you have purchased DLS, the post-sales team will entitle DLS for you, and you will be able to configure all features by yourself via dashboard or API. You can find more specific information under the [Configuration guides](/data-localization/how-to/) section.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Does Regional Services work with HTTP/3 / QUIC?" >}}

{{<faq-answer>}}

Not yet.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Are there other options if I prefer not to have Cloudflare handle TLS termination (decryption)?" >}}

{{<faq-answer>}}

Yes, you have these options available:

- [Spectrum TCP/UDP Apps](/spectrum/) (without TLS Termination)
- [Magic Transit](/magic-transit/)
- [Privacy Gateway](/privacy-gateway/)

These options only offer L3/L4 DDoS protection and using them imply that no application / L7 security or performance services can be applied.

{{</faq-answer>}}
{{</faq-item>}}

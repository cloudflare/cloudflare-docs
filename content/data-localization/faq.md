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

[Data Localization Suite](/data-localization/) (DLS) is a suite of features that can help customers ensure compliance with Data Protection Officers (DPOs), Authorities (DPAs) by providing localization and data residency features.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Is Cloudflare GDPR compliant?" >}}

{{<faq-answer>}}

Yes, even without DLS, Cloudflare is and always has been GDPR compliant. PAYGO customers are also GDPR compliant. Review the [Data Privacy Framework (DPF)](https://www.dataprivacyframework.gov/s/participant-search/participant-detail?id=a2zt0000000GnZKAA0&status=Active).

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

These options only offer L3/L4 DDoS protection and using them imply that no Application / L7 Security or Performance services can be applied.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Is Keyless SSL included with DLS?" >}}

{{<faq-answer>}}

No. Keyless SSL is a Enterprise Add-On. You can find more details in the [Keyless SSL availability](/ssl/keyless-ssl/#availability) section.

{{</faq-answer>}}
{{</faq-item>}}


---
pcx_content_type: faq
title: Other FAQs
weight: 8
structured_data: true
---

# Other FAQs

{{<faq-item>}}
{{<faq-question level=2 text="Why do I see a large amount of traffic from CLOUDFLARENET ASN 13335 in Analytics? Does this indicate a DDoS attack?" >}}

{{<faq-answer>}}

There is a number of different types of traffic which may originate from **CLOUDFLARENET ASN 13335**; just because there is a lot of traffic from this AS, it likely does not indicate a DDoS attack.

Some sources of traffic from ASN13335 include:
* [Workers subrequests](/workers/runtime-apis/fetch/)
* [WARP](/warp-client/known-issues-and-faq/#does-warp-reveal-my-ip-address-to-websites-i-visit)
* [iCloud Private Relay](https://blog.cloudflare.com/icloud-private-relay/) (For reference, iCloud Private Relay’s egress IP addresses are available in this [CSV form](https://mask-api.icloud.com/egress-ip-ranges.csv))
* [Cloudflare Privacy Proxy](https://blog.cloudflare.com/building-privacy-into-internet-standards-and-how-to-make-your-app-more-private-today/)
* Other Cloudflare features like [Health Checks](/health-checks/
)
{{</faq-answer>}}
{{</faq-item>}}
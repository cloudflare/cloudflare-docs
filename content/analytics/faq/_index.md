---
pcx_content_type: navigation
title: FAQs
weight: 41
---

# FAQs

Visit the following pages to see commonly asked questions:

{{<directory-listing>}}
---
### Does CLOUDFLARENET ASN 13335 traffic spike in Analytics (e.g. Security Events or Security Analytics) indicate a DDoS attack?

When you notice a significant volume of traffic originating from **CLOUDFLARENET ASN 13335**, you may assume that Cloudflare is flooding your network with a DDoS attack or generating an excessive traffic. However, multiple types of connections can come from the Cloudflare's ASN, such as Workers Requests, WARP, [iCloud Private Relay](https://blog.cloudflare.com/icloud-private-relay/) and other custom analytics, such as health checks, where we consolidate traffic from numerous other ISPs behind our own as we proxy that traffic and egress it from our network.

For reference, iCloud Private Relay’s egress IP addresses are available in [this](https://mask-api.icloud.com/egress-ip-ranges.csv) CSV form.

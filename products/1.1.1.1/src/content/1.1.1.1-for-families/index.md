---
order: 3
---

# 1.1.1.1 for Families

1.1.1.1 for Families is the easiest way to add a layer of protection to your home network, and protect it from malware and adult content. 1.1.1.1 for Families leverages Cloudflare's global network to ensure that it is fast and secure around the world, and includes the same [strong privacy guarantees](/1.1.1.1/privacy/public-dns-resolver/) that we committed to when we launched 1.1.1.1 two years ago.

1.1.1.1 for Families has two default options: one that blocks malware and the other that blocks malware and adult content. You choose which setting you want depending on which IP address you configure.

## Protect your home against malware

Using the following DNS resolvers will block malicious content:

* **1.1.1.2**
* **1.0.0.2**
* **2606:4700:4700::1112**
* **2606:4700:4700::1002**

## Block malware and adult content

When you change your DNS resolvers to the addresses below, 1.1.1.1 for Families will block malware and adult content.

* **1.1.1.3**
* **1.0.0.3**
* **2606:4700:4700::1113**
* **2606:4700:4700::1003**

Cloudflare will return 0.0.0.0 if the FQDN or IP in a DNS query is classified as malicious.

Ready to set it up? You’ll find an easy guide for every device in the [setup instructions](/1.1.1.1/1.1.1.1-for-families/setup-instructions/) page.

## Domain miscategorization

Customers can decide to block certain categories, like “Gambling” or “Sports”, in addition to security threats like malware and phishing. However, in some cases, a domain can be miscategorized. For example, a social media site might be categorized as “Shopping & Auctions”.

If you are using Gateway or 1.1.1.1 for Families and see a domain that you believe is miscategorized, fill in this [form](https://radar.cloudflare.com/categorization-feedback/) to bring it to our attention. Your submission will remain anonymous.

We review these submissions to improve Cloudflare’s categorization.

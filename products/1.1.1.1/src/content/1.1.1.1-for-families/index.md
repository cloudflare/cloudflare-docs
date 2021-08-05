---
order: 2
pcx-content: reference
---

# 1.1.1.1 for Families

1.1.1.1 for Families is the easiest way to add a layer of protection to your home network, and protect it from malware and adult content. 1.1.1.1 for Families leverages Cloudflare's global network to ensure that it is fast and secure around the world, and includes the same [strong privacy guarantees](/privacy/public-dns-resolver/) that we committed to when we launched 1.1.1.1.

1.1.1.1 for Families categorizes destinations on the Internet based on the potential threat they pose regarding malware, phishing, or other types of security risks. When enabled, 1.1.1.1 for Families will block resolution of these destinations.

1.1.1.1 for Families has two default options: 
* One that blocks malware;
* One that blocks malware and adult content. 

## How to choose a protection

The option you choose depends on the IP address configured.

<details>
<summary>Protect your home against malware</summary>
<div>

Using the following DNS resolvers will block malicious content:

* `1.1.1.2`
* `1.0.0.2`
* `2606:4700:4700::1112`
* `2606:4700:4700::1002`

</div>
</details>

<details>
<summary>Protect your home against malware and adult content</summary>
<div>

When you change your DNS resolvers to the addresses below, 1.1.1.1 for Families will block malware and adult content.

* `1.1.1.3`
* `1.0.0.3`
* `2606:4700:4700::1113`
* `2606:4700:4700::1003`

</div>
</details>

Cloudflare will return `0.0.0.0` if the [fully qualified domain name (FQDN)](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) or IP in a DNS query is classified as malicious.

## Domain miscategorization

If you are using 1.1.1.1 for Families and see a domain that you believe is miscategorized, [fill in this form](https://radar.cloudflare.com/categorization-feedback/) to bring it to our attention. Your submission will remain anonymous.

We review these submissions to improve Cloudflare’s categorization.
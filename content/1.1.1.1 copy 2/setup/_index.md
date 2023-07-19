---
weight: 2
pcx_content_type: reference
title: Set up
layout: single
meta:
    title: Set up Cloudflare 1.1.1.1 resolver
---

# Set up Cloudflare 1.1.1.1 resolver

By default, the [DNS server](https://www.cloudflare.com/learning/dns/what-is-dns/) your devices use is provided by your Internet provider. To start using 1.1.1.1 for your DNS queries, you will need to change the DNS settings in your device or router.

You can also set up 1.1.1.1 for Families for an added layer of protection on your home network against malware and adult content. 1.1.1.1 for Families leverages Cloudflare's global network to ensure that it is fast and secure around the world, and includes the same [strong privacy guarantees](/1.1.1.1/privacy/public-dns-resolver/) that we committed to when we launched 1.1.1.1.

## 1.1.1.1 for Families

1.1.1.1 for Families categorizes destinations on the Internet based on the potential threat they pose regarding malware, phishing, or other types of security risks. When enabled, 1.1.1.1 for Families will block resolution to these destinations.

1.1.1.1 for Families has two default options: 

<details>
<summary>Block malware</summary>
<div>

Use the following DNS resolvers to block malicious content:

* `1.1.1.2`
* `1.0.0.2`
* `2606:4700:4700::1112`
* `2606:4700:4700::1002`

</div>
</details>

<details>
<summary>Block malware and adult content</summary>
<div>

Use the following DNS resolvers to block malware and adult content:

* `1.1.1.3`
* `1.0.0.3`
* `2606:4700:4700::1113`
* `2606:4700:4700::1003`

</div>
</details>

Cloudflare returns `0.0.0.0` if the [fully qualified domain name (FQDN)](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) or IP in a DNS query is classified as malicious.


{{<Aside type="note" header="Domain miscategorization">}}

If you are using 1.1.1.1 for Families and see a domain that you believe is miscategorized, [fill in this form](https://radar.cloudflare.com/categorization-feedback/) to bring it to our attention. Your submission will remain anonymous.

We review these submissions to improve Cloudflare’s categorization.

{{</Aside>}}

### Test 1.1.1.1 for Families

After configuring 1.1.1.1 for Families, you can test if it is working as intended with the following URLs:

- https://malware.testcategory.com/: Use this to test if 1.1.1.1 for Families is blocking known malware addresses correctly.
- https://nudity.testcategory.com/: Use this to test if 1.1.1.1 for Families is blocking known adult content and malware addresses correctly.

## DNS over HTTPS (DoH)

If you have a DoH-compliant client, such as a compatible router, you can set up 1.1.1.1 for Families to encrypt your DNS queries over HTTPS. This prevents spoofing and tracking by malicious actors, advertisers, ISPs, and others. For more information on DoH, refer to the [Learning Center article on DNS encryption](https://www.cloudflare.com/learning/dns/dns-over-tls/).

To configure an encrypted DoH connection to 1.1.1.1 for Families, type one of the following URLs into the appropriate field of your DoH-compliant client:

<details>
<summary>Block malware</summary>
<div>

```txt
https://security.cloudflare-dns.com/dns-query
```

</div>
</details>

<details>
<summary>Block malware and adult content</summary>
<div>

```txt
https://family.cloudflare-dns.com/dns-query
```

</div>
</details>

## DNS over TLS (DoT)

1.1.1.1 for Families also supports DoT if you have a compliant client, such as a compatible DoT router. DoT allows you to encrypt your DNS queries, protecting you from spoofing, malicious actors, and others. You can learn more about DoT in the [Learning Center article on DNS encryption](https://www.cloudflare.com/learning/dns/dns-over-tls/).

To configure an encrypted DoT connection to 1.1.1.1 for Families, type one of the following URLs into the appropriate field of your DoT-compliant client:


<details>
<summary>Block malware</summary>
<div>

```txt
security.cloudflare-dns.com
```

</div>
</details>

<details>
<summary>Block malware and adult content</summary>
<div>

```txt
family.cloudflare-dns.com
```

</div>
</details>
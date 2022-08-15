---
pcx_content_type: reference
title: Secure your website
weight: 2
---

# Secure your website

Cloudflare offers several tools to protect your website against malicious traffic and bad actors.

## Account protection options

For recommendations about how to protect your Cloudflare account, refer to [Account Security](/fundamentals/account-and-billing/account-security/).

## Zone protection options

### Default protection

As long as your traffic is [proxied by Cloudflare](/fundamentals/get-started/concepts/how-cloudflare-works/), Cloudflare automatically protects your application from [DDoS attacks](/ddos-protection/).

Cloudflare also issues and renews free, unshared, publicly trusted [SSL/TLS certificates](/ssl/edge-certificates/universal-ssl/) to all Cloudflare domains.

### One-click protection

For customers on a **Pro** plan or above, Cloudflare offers several [Managed Rulesets](/waf/managed-rulesets/) as part of the Web Application Firewall (WAF).

All customers have access to the [Cloudflare Security Center](/security-center/), which helps identify potential security risks and helps mitigate them with suggested actions.

All customers also have the options to adjust the following **Security** settings:

- [Security level](https://support.cloudflare.com/hc/articles/200170056): Use the IP reputation of a visitor to determine whether to present a [Managed Challenge](/fundamentals/get-started/concepts/cloudflare-challenges/#managed-challenge) page.
- [Challenge Passage](/fundamentals/security/challenge-passage/): Specify the length of time that a visitor can access your website after completing a security challenge.
- [Browser Integrity Check](https://support.cloudflare.com/hc/articles/200170086): Evaluate incoming HTTP headers based on known threats — such as requests with a missing or non-standard user agent — and present a challenge page if needed.
- [Privacy Pass Support](https://support.cloudflare.com/hc/articles/115001992652): Reduce the number of challenges presented to visitors using the **Privacy Pass** browser extension.

### Protection with minimal setup

Based on additional knowledge about your website traffic and requirements, you can also:

- Enable [DNSSEC](/dns/additional-options/dnssec/) to add an extra layer of authentication to DNS queries.
- Enable [bot protection](/bots/get-started/).
- Set up various **Security** rules:
    - [Firewall rules](/firewall/cf-firewall-rules/) block, challenge, or allow requests based on [several characteristics](/ruleset-engine/rules-language/fields/) (user agents, cookies, referrer, and more).
    - [Rate limiting rules](https://support.cloudflare.com/hc/articles/115001635128) (usage-based billing) block IP addresses based on a URL pattern and defined request threshold.
    - [IP Access rules](/waf/tools/ip-access-rules/) block, challenge, or allow requests based on IP address, IP range, country, or ASN.
    - [User Agent Blocking rules](https://support.cloudflare.com/hc/articles/115001856951) block or challenge specific requests based on the associated user agent value.
    - [Zone Lockdown rules](https://support.cloudflare.com/hc/articles/115001595131) (customers on a Pro plan or higher) specify a list of IP addresses, CIDR ranges, or networks that are allowed to access a particular domain, subdomain, or URL.
- Further customize [Web Application Firewall (WAF)](/waf/) and [DDoS Protection](/ddos-protection/) settings.
- Create [forwarding URLs](https://support.cloudflare.com/hc/articles/4729826525965) to prevent access to specify URLs, request schemes, file types, subdomains, or directories by redirecting users to a safe location.
- Restrict access to documents, files, and media by configuring [Token Authentication](https://support.cloudflare.com/hc/articles/115001376488).

### Dedicated products

Cloudflare also offers dedicated products to increase the security of your website and underlying infrastructure:

- [API Shield](/api-shield/): Protect your API from malicious traffic by enforcing schema validation, detecting abuse patterns, and more.
- [Magic Firewall](/magic-firewall/): Use Cloudflare's firewall-as-a-service (FWaaS) to protect office networks and cloud infrastructure with advanced, scalable protection.
- [Magic Transit](/magic-transit/): Delivers network functions at Cloudflare scale — DDoS protection, traffic acceleration, and much more from every Cloudflare data center — for on-premise, cloud-hosted, and hybrid networks.
- [Magic WAN](/magic-wan/): Securely connect any traffic source - data centers, offices, devices, cloud properties - to Cloudflare’s network and configure routing policies to get the bits where they need to go, all within one SaaS solution.
- [Page Shield](/page-shield/): Monitor third-party scripts on your application and receive notifications when they have been compromised or are exhibiting malicious behavior.

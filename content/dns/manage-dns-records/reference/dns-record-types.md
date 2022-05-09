---
pcx-content-type: reference
title: DNS record types
weight: 2
---

# DNS record types

This page provides reference information about the different types of DNS records. For guidance on adding DNS records, refer to [Manage DNS records](/dns/manage-dns-records/how-to/create-dns-records/).

---

## IP address resolution

At least one **IP address resolution** record is required for each domain on Cloudflare. These records are the only ones you can [proxy](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare.

### A and AAAA

[A and AAAA records](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record/) direct browser requests to an origin web server (`A` for IPv4 addresses and `AAAA` for IPv6 addresses).

These records include the following fields:

- **Name**: A subdomain or the root domain, which must:
  - Be 63 characters or less
  - Start with a letter and end with a letter or digit
  - Only contain letters, digits, or hyphens (underscores allowed but discouraged)
- **IPv4/IPv6 address**: Your origin web server address (cannot be a [Cloudflare IP](https://www.cloudflare.com/ips))
- **TTL**: Time to live, which controls how long DNS resolvers should cache a response before revalidating it.
  - If the **Proxy Status** is **Proxied**, this value defaults to **Auto**, which is 300 seconds.
  - If the **Proxy Status** is **DNS Only**, you can customize the value.
- **Proxy status**: For more details, refer to [Proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/).

### CNAME

[CNAME records](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/) direct browser requests to an origin web server, but — unlike an `A` or `AAAA` record — do so via a hostname like `example.com` instead of an IP address.

These records include the following fields:

- **Name**: A subdomain or the root domain, which must:
  - Be 63 characters or less
  - Start with a letter and end with a letter or digit
  - Only contain letters, digits, or hyphens (underscores are allowed but discouraged)
- **Target**: The hostname where traffic should be directed (`example.com`).
- **TTL**: Time to live, which controls how long DNS resolvers should cache a response before revalidating it.
  - If the **Proxy Status** is **Proxied**, this value defaults to **Auto**, which is 300 seconds.
  - If the **Proxy Status** is **DNS Only**, you can customize the value.
- **Proxy status**: For more details, refer to [Proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/).

You can use `CNAME` records to point to other `CNAME` records (`www.example2.com` --> `www.example1.com` --> `www.example.com`), but the final record must point to a hostname with a valid IP address (and therefore a valid `A` or `AAAA` record) if this hostname is meant to proxy traffic.

---

## Email authentication

These records are recommended regardless of whether your domain sends email messages. Creating [secure email records](https://blog.cloudflare.com/tackling-email-spoofing/) can help protect your domain against email spoofing.

If your domain is not used to send email messages, learn more about creating recommended [restrictive records](https://www.cloudflare.com/learning/dns/dns-records/protect-domains-without-email/).

### MX

A mail exchange (MX) record is required to deliver email to a mail server.

- [MX record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-mx-record/)
- [Create an MX record](/dns/manage-dns-records/how-to/email-records/#add-mx-records)

### DKIM

A DomainKeys Identified Mail (DKIM) record ensures email authenticity by cryptographically signing emails:

- [DKIM record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/)
- [Create a DKIM record](/dns/manage-dns-records/how-to/email-records/#configure-email-security-records)

### SPF

A Sender Policy Framework (SPF) record lists authorized IP addresses and domains that can send email on behalf of your domain.

- [SPF record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/)
- [Create an SPF record](/dns/manage-dns-records/how-to/email-records/#configure-email-security-records)

### DMARC

A Domain-based Message Authentication Reporting and Conformance (DMARC) record helps generate aggregate reports about your email traffic and provide clear instructions for how email receivers should treat non-conforming emails.

- [DMARC record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/)
- [Create a DMARC record](/dns/manage-dns-records/how-to/email-records/#configure-email-security-records)

---

## Specialized records

### TXT

A [text (TXT) record](https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/) lets you enter text into the DNS system.

At Cloudflare, these are most commonly used to demonstrate domain ownership prior to issuing SSL/TLS certificates for [your domain](/ssl/edge-certificates/changing-dcv-method/) or an [SSL for SaaS domain](/ssl/ssl-for-saas/common-tasks/certificate-validation-methods/).

You could also use these to create email authentication records, but we recommend that you use our [Email Security Wizard](/dns/manage-dns-records/how-to/email-records/#prevent-domain-spoofing) instead.

{{<Aside type="note">}}

The **Content** for TXT records at Cloudflare must be 2048 characters or less.

{{</Aside>}}

### CAA

A [Certificate Authority Authorization (CAA) record](/ssl/edge-certificates/custom-certificates/caa-records/) specifies which Certificate Authorities (CAs) are allowed to issue certificates for a domain.

### SRV

A [service record (SRV)](https://www.cloudflare.com/learning/dns/dns-records/dns-srv-record/) specifies a host and port for specific services like voice over IP (VOIP), instant messaging, and more.

### PTR

A [pointer (PTR) record](https://www.cloudflare.com/learning/dns/dns-records/dns-ptr-record/) specifies the allowed hosts for a given IP address.

Within Cloudflare, PTR records are used for reverse DNS lookups and should preferably be added to [reverse zones](/dns/additional-options/reverse-zones/).

### SOA

A [start of authority (SOA)](https://www.cloudflare.com/learning/dns/dns-records/dns-soa-record/) record stores information about your domain such as admin email address, when the domain was last updated, and more.

If you are using Cloudflare for your [authoritative DNS](/dns/zone-setups/full-setup/), you do not need to create an SOA record. Cloudflare creates this record automatically when you start using Cloudflare's authoritative nameservers.

### NS

A [nameserver (NS) record](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/) indicates which server should be used for authoritative DNS.

You only need to add NS records when you are [creating custom or vanity nameservers](/dns/additional-options/custom-nameservers/) or [delegating subdomains outside of Cloudflare](https://support.cloudflare.com/hc/articles/360021357131).

### DS and DNSKEY

[DS and DNSKEY](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) records help implement DNSSEC, which cryptographically signs DNS records to prevent domain spoofing.

Most Cloudflare domains do not need to add these records and should instead follow our [DNSSEC setup guide](/dns/additional-options/dnssec/).

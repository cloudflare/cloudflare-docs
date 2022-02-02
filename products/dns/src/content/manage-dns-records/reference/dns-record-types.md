---
order:
pcx-content-type: reference
---

# DNS record types

This page provides reference information about the different types of DNS records. For guidance on adding DNS records, refer to [Manage DNS records](/manage-dns-records/how-to/create-dns-records).

---

## IP address resolution

At least one **IP address resolution** record is required for each domain on Cloudflare. These records are the only ones you can [proxy](../proxied-dns-records) through Cloudflare.

### A and AAAA

[A and AAAA records](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record/) direct browser requests to an origin web server (A for IPv4 addresses and AAAA for IPv6 addressess).

These records include the following fields:

- **Name**: A subdomain or the root domain, which must:
    - Be 63 characters or less
    - Start with a letter and end with a letter or digit
    - Only contain letters, digits, or hyphens (underscores allowed but discouraged)
- **IPv4/IPv6 address**: Your origin web server address (cannot be a [Cloudflare IP](https://www.cloudflare.com/ips))
- **TTL**: Time to live, which controls how often the record needs to be revalidated.
    - If the **Proxy Status** is **Proxied**, this value defaults to **Auto**, which is 300 seconds.
    - If the **Proxy Status** is **DNS Only**, you can customize the value.
- **Proxy status**: For more details, refer to [Proxied DNS records](../proxied-dns-records).

### CNAME

[CNAME records](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/) direct browser requests to an origin web server, but — unlike an A or AAA record — do so via a hostname like `example.com` instead of an IP address.

These records include the following fields:

- **Name**: A subdomain or the root domain, which must:
    - Be 63 characters or less
    - Start with a letter and end with a letter or digit
    - Only contain letters, digits, or hyphens (underscores are allowed but discouraged)
- **Target**: The hostname where traffic should be directed (`example.com`).
- **TTL**: Time to live, which controls how often the record needs to be revalidated.
    - If the **Proxy Status** is **Proxied**, this value defaults to **Auto**, which is 300 seconds.
    - If the **Proxy Status** is **DNS Only**, you can customize the value.
- **Proxy status**: For more details, refer to [Proxied DNS records](../proxied-dns-records).

You can use CNAME records to point to other CNAME records (`www.example2.com` --> `www.example1.com` --> `www.example.com`), but the final record must point to a hostname with a valid IP address (and therefore a valid A or AAAA record).

---

## Email authentication and domain validation

These records are recommended regardless of whether your domain sends email messages. Creating [negative email records](https://blog.cloudflare.com/tackling-email-spoofing/) can help protect your domain against email spoofing.

### MX

MX records are necessary for delivery of email to a mail server:

- [MX record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-mx-record/)
- [Create an MX record](/manage-dns-records/how-to/email-records#add-mx-records)

### DKIM

DKIM records ensure email authenticity by cryptographically signing emails:

- [DKIM record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/)
- [Create a DKIM record](/manage-dns-records/how-to/email-records#configure-email-security-records)

### SPF

SPF records list authorized IP addresses and domains that can send email on behalf of your domain.

- [SPF record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/)
- [Create an SPF record](/manage-dns-records/how-to/email-records#configure-email-security-records)

### DMARC

DMARC records receive aggregate reports about your email traffic and provide clear instructions for how email receivers should treat non-conforming emails.

- [DMARC record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/)
- [Create a DMARC record](/manage-dns-records/how-to/email-records#configure-email-security-records)

---

## Specialized records

### CAA

A [Certificate Authority Authorization (CAA) record](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/caa-records) specifies which Certificate Authorities (CAs) are allowed to issue certificates for a domain.

### SRV

A [service record (SRV)](https://www.cloudflare.com/learning/dns/dns-records/dns-srv-record/) specifies a host and port for specific services like voice over IP (VOIP), instant messaging, and more.

### PTR

A pointer (PTR) record specifies the allowed hosts for a given IP address. They are used for reverse DNS lookups and should preferably be added to [reverse zones](/additional-options/reverse-zones).

### SOA

A [start of authority (SOA)](https://www.cloudflare.com/learning/dns/dns-records/dns-soa-record/) record stores information about your domain such as admin email address, when the domain was last updated, and more.

If you are using Cloudflare for your [authoritative DNS](/zone-setups/full-setup), you do not need to create an SOA record. Cloudflare creates this record automatically when you start using Cloudflare's authoritative nameservers.

### NS

A [nameserver (NS) record](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/) indicates which server should be used for authoritative DNS.

You only need to add NS records when you are [creating custom or vanity nameservers](/additional-options/custom-nameservers) or [delegating subdomains outside of Cloudflare](https://support.cloudflare.com/hc/articles/360021357131).

### DS and DNSKEY

[DS and DNSKEY](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) records help implement DNSSEC, which cryptographically signs DNS records to prevent domain spoofing.

Most Cloudflare domains do not need to add these records and should instead follow our [DNSSEC setup guide](/manage-dns-records/how-to/dnssec).
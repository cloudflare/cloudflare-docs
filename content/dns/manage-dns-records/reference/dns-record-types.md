---
pcx_content_type: reference
title: DNS record types
weight: 2
---

# DNS record types

This page provides reference information about the different types of DNS records. For guidance on adding DNS records, refer to [Manage DNS records](/dns/manage-dns-records/how-to/create-dns-records/).

---

## IP address resolution

At least one **IP address resolution** record is required for each domain on Cloudflare. These records are the only ones you can [proxy](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare.

### A and AAAA

{{<render file="_a-aaaa-definition.md">}}

These records include the following fields:

- **Name**: A subdomain or the root domain, which must:
  - Be 63 characters or less
  - Start with a letter and end with a letter or digit
  - Only contain letters, digits, or hyphens (underscores allowed but discouraged)
- **IPv4/IPv6 address**: Your origin server address (cannot be a [Cloudflare IP](https://www.cloudflare.com/ips))
- **TTL**: Time to live, which controls how long DNS resolvers should cache a response before revalidating it.
  - If the **Proxy Status** is **Proxied**, this value defaults to **Auto**, which is 300 seconds.
  - If the **Proxy Status** is **DNS Only**, you can customize the value.
- **Proxy status**: For more details, refer to [Proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/).

#### Example API call

When creating `A` or `AAAA` records [using the API](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records):

- The `content` of the records is an IP address (IPv4 for `A` or IPv6 for `AAAA`).
- The `proxied` field affects the record's [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/).

{{<render file="_api-field-definitions.md">}}

```json
---
header: Request
highlight: [8, 10]
---
curl -sX POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-H "Content-Type: application/json" \
--data '{
  "type":"A",
  "name":"www.example.com",
  "content":"192.0.2.1",
  "ttl":3600,
  "proxied":false
  }'
```

```json
---
header: Response
---
{
  "result": {
    "id": "<ID>",
    "zone_id": "<ZONE_ID>",
    "zone_name": "example.com",
    "name": "www.example.com",
    "type": "A",
    "content": "192.0.2.1",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "locked": false,
    "meta": {
      "auto_added": false,
      "managed_by_apps": false,
      "managed_by_argo_tunnel": false,
      "source": "primary"
    },
    "comment": null,
    "tags": [],
    "created_on": "2023-01-17T20:37:05.368097Z",
    "modified_on": "2023-01-17T20:37:05.368097Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### CNAME

{{<render file="_cname-definition.md">}}

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

#### Example API call

When creating `CNAME` records [using the API](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records):

- The `content` of the records is a [fully qualified domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name).
- The `proxied` field affects the record's [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/)

{{<render file="_api-field-definitions.md">}}

```json
---
header: Request
highlight: [8, 10]
---
curl -sX POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-H "Content-Type: application/json" \
--data '{
  "type":"CNAME",
  "name":"www.example.com",
  "content":"www.another-example.com",
  "ttl":3600,
  "proxied":false
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "<ID>",
    "zone_id": "<ZONE_ID>",
    "zone_name": "example.com",
    "name": "www.example.com",
    "type": "A",
    "content": "www.another-example.com",
    "proxiable": true,
    "proxied": false,
    "ttl": 1,
    "locked": false,
    "meta": {
      "auto_added": false,
      "managed_by_apps": false,
      "managed_by_argo_tunnel": false,
      "source": "primary"
    },
    "comment": null,
    "tags": [],
    "created_on": "2023-01-17T20:37:05.368097Z",
    "modified_on": "2023-01-17T20:37:05.368097Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

---

## Email authentication

These records are recommended regardless of whether your domain sends email messages. Creating [secure email records](https://blog.cloudflare.com/tackling-email-spoofing/) can help protect your domain against email spoofing.

If your domain is not used to send email messages, learn more about creating recommended [restrictive records](https://www.cloudflare.com/learning/dns/dns-records/protect-domains-without-email/).

### MX

A mail exchange (MX) record is required to deliver email to a mail server.

- [MX record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-mx-record/)
- [Create an MX record](/dns/manage-dns-records/how-to/email-records/#add-mx-records)

{{<render file="_api-field-definitions.md">}}

### DKIM

A DomainKeys Identified Mail (DKIM) record ensures email authenticity by cryptographically signing emails:

- [DKIM record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/)
- [Create a DKIM record](/dns/manage-dns-records/how-to/email-records/#configure-email-security-records)

{{<render file="_api-field-definitions.md">}}

### SPF

A Sender Policy Framework (SPF) record lists authorized IP addresses and domains that can send email on behalf of your domain.

- [SPF record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/)
- [Create an SPF record](/dns/manage-dns-records/how-to/email-records/#configure-email-security-records)

{{<render file="_api-field-definitions.md">}}

### DMARC

A Domain-based Message Authentication Reporting and Conformance (DMARC) record helps generate aggregate reports about your email traffic and provide clear instructions for how email receivers should treat non-conforming emails.

- [DMARC record syntax](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/)
- [Create a DMARC record](/dns/manage-dns-records/how-to/email-records/#configure-email-security-records)

{{<render file="_api-field-definitions.md">}}

---

## Specialized records

### TXT

A [text (TXT) record](https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/) lets you enter text into the DNS system.

At Cloudflare, these are most commonly used to demonstrate domain ownership prior to issuing SSL/TLS certificates for [your domain](/ssl/edge-certificates/changing-dcv-method/) or an [SSL for SaaS domain](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/).

You could also use these to create email authentication records, but we recommend that you use our [Email Security Wizard](/dns/manage-dns-records/how-to/email-records/#prevent-domain-spoofing) instead.

{{<render file="_api-field-definitions.md">}}

{{<Aside type="note">}}

The **Content** for TXT records at Cloudflare must be 2048 characters or less.

{{</Aside>}}

### CAA

A [Certificate Authority Authorization (CAA) record](/ssl/edge-certificates/caa-records/) specifies which Certificate Authorities (CAs) are allowed to issue certificates for a domain.

{{<render file="_api-field-definitions.md">}}

### SRV

A [service record (SRV)](https://www.cloudflare.com/learning/dns/dns-records/dns-srv-record/) specifies a host and port for specific services like voice over IP (VOIP), instant messaging, and more.

#### Example API call

{{<render file="_api-field-definitions.md">}}

```json
---
header: Request
---
curl -sX POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-H "Content-Type: application/json" \
--data '{
  "type":"SRV", 
  "data": {
    "service":"_xmpp",
    "proto":"_tcp",
    "name":"example.com",
    "priority":10,
    "weight":5,
    "port":5223,
    "target":"server.example.com"
  }
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "<ID>",
    "zone_id": "<ZONE_ID>",
    "zone_name": "example.com",
    "name": "xmpp.tcp.example.com",
    "type": "SRV",
    "content": "5\t5223\tserver.example.com",
    "priority": 10,
    "proxiable": false,
    "proxied": false,
    "ttl": 1,
    "locked": false,
    "data": {
      "name": "example.com",
      "port": 5223,       
      "priority": 10,       
      "proto": "_tcp",       
      "service": "_xmpp",       
      "target": "server.example.com",       
      "weight": 5     
    },
    "meta": {       
      "auto_added": false,       
      "managed_by_apps": false,       
      "managed_by_argo_tunnel": false,       
      "source": "primary"     
    },
    "comment": null,
    "tags": [],
    "created_on": "2022-11-08T15:57:39.585977Z",
    "modified_on": "2022-11-08T15:57:39.585977Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### PTR

A [pointer (PTR) record](https://www.cloudflare.com/learning/dns/dns-records/dns-ptr-record/) specifies the allowed hosts for a given IP address.

Within Cloudflare, PTR records are used for reverse DNS lookups and should preferably be added to [reverse zones](/dns/additional-options/reverse-zones/).

{{<render file="_api-field-definitions.md">}}

### SOA

A [start of authority (SOA)](https://www.cloudflare.com/learning/dns/dns-records/dns-soa-record/) record stores information about your domain such as admin email address, when the domain was last updated, and more.

If you are using Cloudflare for your [authoritative DNS](/dns/zone-setups/full-setup/), you do not need to create an SOA record. Cloudflare creates this record automatically when you start using Cloudflare's authoritative nameservers.

{{<render file="_api-field-definitions.md">}}

### NS

A [nameserver (NS) record](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/) indicates which server should be used for authoritative DNS.

You only need to add NS records when you are [creating custom or vanity nameservers](/dns/additional-options/custom-nameservers/) or [delegating subdomains outside of Cloudflare](https://support.cloudflare.com/hc/articles/360021357131).

{{<render file="_api-field-definitions.md">}}

### DS and DNSKEY

[DS and DNSKEY](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) records help implement DNSSEC, which cryptographically signs DNS records to prevent domain spoofing.

Most Cloudflare domains do not need to add these records and should instead follow our [DNSSEC setup guide](/dns/additional-options/dnssec/).

{{<render file="_api-field-definitions.md">}}

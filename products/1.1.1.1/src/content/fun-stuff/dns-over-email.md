---
order: 3
---

# DNS over email

Ah, the classic yet revolutionary DNS over email.

To receive DNS responses over email, send an email to `lookup@resolver.email`. The DNS query goes in the body of the message.

You can send a single domain (defaults to AAAA).

Example:

    example.com

Returns:

![DNS-over-email](../static/dns-over-email.png)

You can also send a record type followed by a domain name. The record types supported are:

    A
    AAAA
    CAA
    CNAME
    DS
    DNSKEY
    MX
    NS
    NSEC
    NSEC3
    RRSIG
    SOA
    TXT

Example:

    AAAA example.com

Returns:

![DNS-over-email](../static/dns-over-email.png)

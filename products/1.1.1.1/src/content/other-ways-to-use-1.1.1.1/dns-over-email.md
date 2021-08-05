---
pcx-content: how-to
---

# DNS over email

To receive DNS responses over email, send an email to `lookup@resolver.email`. The DNS query goes in the body of the message. You can send a single domain (defaults to AAAA).

Example:

```txt
example.com
```

Returns:

<div class="full-img">

![DNS-over-email](../static/dns-over-email.png)

</div>

You can also send a record type followed by a domain name. The record types supported are:

* A
* AAAA
* CAA
* CNAME
* DS
* DNSKEY
* MX
* NS
* NSEC
* NSEC3
* RRSIG
* SOA
* TXT

<br/>

Example:

```txt
AAAA example.com
```

Returns:

<div class="full-img">

![DNS-over-email](../static/dns-over-email.png)

</div>
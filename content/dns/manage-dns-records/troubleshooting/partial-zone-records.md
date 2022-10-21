---
title: Records in partial zones
pcx_content_type: troubleshooting
weight: 11
meta:
  title: Troubleshooting — Records in partial zones
---

# Records in partial zones

When you have a [partial zone](/dns/zone-setups/partial-setup/)[^1] with Cloudflare, you may encounter a warning when adding new `A`, `AAAA`, and `CNAME` DNS records.

Cloudflare surfaces these warnings to prevent you from creating conflicting records between Cloudflare and your authoritative DNS provider.

## More detail

When you [create a new DNS record](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) in a partial zone, Cloudflare automatically checks whether any of your `CNAME` records point to existing `A`, `AAAA`, or `CNAME` records within the same zone.

For example, Cloudflare would show a warning if you had the following records in your partial zone:

```txt
sub1.partialzone.com   CNAME   sub2.partialzone.com
sub2.partialzone.com   A       192.0.2.1
```

Since Cloudflare contains both the `CNAME` and its target, our DNS resolution will send incoming requests to `sub1.partialzone.com` to `192.0.2.1`.

This can cause issues if you already have DNS records for `sub2.partialzone.com` at your authoritative DNS provider. These records may point to `192.0.2.4`, another IP address, or another domain but - because Cloudflare contains the initial record and the target - it never queries your authoritative DNS provider for the record for `sub2.partialzone.com`.

<div class="mermaid">
    flowchart TD
      accTitle: DNS resolution flow with CNAME target in same partial zone
      A[Request to <code>sub1.partialzone.com</code>] --> B[<code>CNAME</code> record to <code>sub2.partialzone.com</code>]
      subgraph Cloudflare
        B --> C[<code>A</code> record for <code>sub2.partialzone.com</code> to <code>192.0.2.1</code>]
      end
      C --> D[<code>192.0.2.1</code>]
      subgraph Authoritative DNS
      E[<code>A</code> record for <code>sub2.partialzone.com</code> to <code>192.0.2.4</code>]
      end
</div>
<br />

When you avoid this situation - meaning you do not have the **target** of the `CNAME` record within your partial zone - this DNS resolution would happen differently.

<div class="mermaid">
    flowchart TD
      accTitle: DNS resolution flow with CNAME target not in partial zone
      A[Request to <code>sub1.partialzone.com</code>] --> B[<code>CNAME</code> record to <code>sub2.partialzone.com</code>]
      B --> C[<code>A</code> record for <code>sub2.partialzone.com</code> to <code>192.0.2.4</code>]
      C --> D[<code>192.0.2.4</code>]
      subgraph Cloudflare
        B
      end
      subgraph Authoritative DNS
        C
      end
</div>
<br />

[^1]: {{<render file="_partial-setup-definition.md">}}
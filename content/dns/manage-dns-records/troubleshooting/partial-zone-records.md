---
title: Records in partial zones
pcx_content_type: troubleshooting
weight: 11
meta:
  title: Troubleshooting — Records in partial zones
---

# Records in partial zones

When you have a [partial zone](/zone-setups/partial/)[^1] with Cloudflare, you may encounter a warning when adding new `A`, `AAAA`, and `CNAME` DNS records.

Cloudflare surfaces these warnings to prevent you from creating conflicting records between Cloudflare and your authoritative DNS provider.

## More detail

When you [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a new DNS record in a partial zone, Cloudflare automatically checks whether any of your `CNAME` records point to existing `A`, `AAAA`, or `CNAME` records within the same zone.

For example, Cloudflare would show a warning if you had the following records in your partial zone:

```txt
sub1.partialzone.com   CNAME   sub2.partialzone.com
sub2.partialzone.com   A       192.0.2.1
```

Since Cloudflare contains both the `CNAME` and its target, our DNS resolution will send incoming requests to `sub1.partialzone.com` to `192.0.2.1`.

<div class="mermaid">
    flowchart TD
      accTitle: DNS resolution flow
      A[Request to <code>sub1.partialzone.com</code>] --> B[<code>CNAME</code> record]
      subgraph Cloudflare
        B --> C[<code>A</code> record for <code>sub1.partialzone.com</code>]
      end
      C --> D[<code>192.0.2.1</code>]
      subgraph Authoritative DNS
      E[<code>A</code> record for <code>sub1.partialzone.com</code>]
      end
</div>
<br />

This can cause issues if you already have DNS records for `sub2.partialzone.com` at your authoritative DNS provider. These records may point to `192.0.2.2`, another IP address, or another domain but - because Cloudflare contains the initial record and the target - it never queries your authoritative DNS provider for the record for `sub2.partialzone.com`.

[^1]: {{<render file="_partial-setup-definition.md">}}
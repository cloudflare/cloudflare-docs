---
title: Records with the same name
pcx_content_type: troubleshooting
weight: 11
meta:
  title: Cannot add DNS records with the same name
---

# Cannot add DNS records with the same name

Occasionally, Cloudflare will not allow you to [create new DNS records](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) with the same value in the **Name** field.

This error can occur due to the special requirements of `CNAME` records[^1].

## Causes

You will encounter this error if you try to do one of the following:

- Create a `CNAME` record with a **Name** matching the name of an existing `A`/`AAAA`[^2] or `CNAME` record.
- Create an `A`/`AAAA` record with a **Name** matching the name of an existing `CNAME` record.

Cloudflare prevents you from creating this combination of records because if a `CNAME` record is provided for a hostname DNS servers expect only that `CNAME` record to provide DNS information for that hostname. 

Adding additional records would send conflicting information to DNS servers. For a technical explanation of the mechanism behind this, refer to [RFC 1034](https://www.rfc-editor.org/rfc/rfc1034).

## Solution

Review your existing DNS records to find the matching value in the **Name** field. Then, decide whether you want to keep the current record or delete it and make a new one.

{{<Aside type="note">}}

`CNAME` records are the only IP resolution record with this type of limitation. You can have more than one `A`/`AAAA` record per hostname, which is a way some domains do [simple load balancing](/dns/manage-dns-records/how-to/round-robin-dns/) for incoming requests.

{{</Aside>}}

[^1]: {{<render file="_cname-definition.md">}}
[^2]: {{<render file="_a-aaaa-definition.md">}}
---
title: NS records already exist
pcx_content_type: troubleshooting
weight: 14
meta:
  title: Existing NS records block new record creation
---

# Existing NS records block new record creation

As you try to create a new DNS record, Cloudflare displays the following error:

```txt
NS records with that host already exist. (Code:81056)
```

## Causes

When a child domain (`blog.example.com`) of your domain (`example.com`) has been set up as a separate [subdomain zone](/dns/zone-setups/subdomain-setup/), corresponding `NS` records must have been placed within the parent zone.

When you are managing DNS records for the parent zone (in this example, `example.com`), you cannot create IP address resolution records (`A`, `AAAA`, or `CNAME`) with a name that specifies the same subdomain that already exists as a separate subdomain zone.

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| `A` | `blog` | `192.0.2.0` | `Auto` |
{{</example>}}

## Solution

Before creating such records, remove any `NS` records with the same name.

{{<Aside type="warning" header="Important">}}

This action might be reverting an existing subdomain setup and may incur in downtime. Refer to [Rollback subdomain setup](/dns/zone-setups/subdomain-setup/rollback/) for more guidance.

{{</Aside>}}
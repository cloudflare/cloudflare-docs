---
title: Verify a domain with CNAME
pcx_content_type: troubleshooting
weight: 13
meta:
  title: Cannot verify a domain with CNAME
---

# Cannot verify a domain with CNAME

When configuring services from external providers - such as email services, for example - it is possible that they require you to verify your domain by placing a `CNAME` record at your zone.

Consider the following sections if this is not working correctly for you.

## Causes

You may find issues if you have one of the following:

- The `CNAME` record you created for domain verification is set to [**Proxied**](/dns/manage-dns-records/reference/proxied-dns-records/).
- The `CNAME` record is correctly set to DNS only (not proxied), but your zone has [**Flatten all CNAMEs**](/dns/cname-flattening/set-up-cname-flattening/#for-all-cname-records) option enabled.

## Solution

Make sure that:

- You have filled in the `CNAME` record fields correctly.
- The proxy status is set to **DNS only**.
- Under **DNS** > **Settings**, CNAME Flattening is set to **Flatten CNAME at apex**.
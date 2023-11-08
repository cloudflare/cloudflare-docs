---
title: Verify a domain with CNAME
pcx_content_type: troubleshooting
weight: 11
meta:
  title: Cannot verify a domain with CNAME
---

# Cannot verify a domain with CNAME

Occasionally,

## Causes

You will encounter this error if you have one of the following:

- The `CNAME` record is proxied.
- The `CNAME` record is correctly set to DNS only, but your zone has "Flatten all CNAMEs" option enabled.

## Solution

Make sure that you fill in the `CNAME` record fields correctly, that the proxy status is set to "DNS only", and that DNS > Settings > CNAME Flattening is set to "Flatten CNAME at apex" (and **not** "Flatten all CNAMEs")
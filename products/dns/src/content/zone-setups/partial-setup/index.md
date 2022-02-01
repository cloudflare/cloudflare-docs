---
order: 1
pcx-content-type: concept
---

import PartialSetupDefinition from "../../_partials/_partial-setup-definition.md"

# Partial (CNAME) setup

<PartialSetupDefinition/>

## How to

- [Set up a partial domain](setup)
- [Convert a partial domain to a full domain](convert-partial-to-full)

## Availability

A partial setup is only available to customers on a Business or Enterprise plan.

## Limitations

A partial (CNAME) setup requires the proxied hostname to be pointed to Cloudflare via a CNAME record. Since [CNAME records are not allowed on the zone apex](https://datatracker.ietf.org/doc/html/rfc1912#section-2.4) (`example.com`), you can only proxy your zone apex to Cloudflare if your authoritative DNS provider supports [CNAME Flattening](/additional-options/cname-flattening).

If your authoritative DNS provider does not support CNAME Flattening, redirect its traffic — for example, with an `.htaccess` file — to a subdomain proxied to Cloudflare.

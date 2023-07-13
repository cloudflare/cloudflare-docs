---
pcx_content_type: reference
title: Records quick scan
---

# DNS records quick scan

To help all customers get started when a new zone is created, Cloudflare offers a quick scan of DNS records.


## How the quick scan works

The scan is built upon a list of recurring patterns of DNS records `type` and `name`, that Cloudflare identifies as being used in existing active zones.

Since DNS record names are automatically appended with the domain that the records are set for, two completely different domains - `domain.com` and `test.xyz`, for example - would probably have a few matches if the lists of DNS records on their zones were compared side by side and the criterion is `type` and `name` combination.

The DNS records `content` would be different for each zone but, based on record `type` and `name`, Cloudflare can identify a recurring pattern and expect to find the same pair when a new domain is added.

## Use case examples

### Address records

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `<IPv4>` | `<TTL>` |
{{</example>}}

The value `@` indicates the domain apex - in the example above, `domain.com` or `test.xyz`.
    
Virtually all zones on a full setup are expected to have an address record pointing to the IP address where the website or application is hosted.

### `www.` records

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| `CNAME` | `www.` | `<DOMAIN>` | `<TTL>` |
{{</example>}}

Since it is still common that visitors will type `www.<DOMAIN>` in their browsers expecting to reach the domain, it is very common that zones have a  `CNAME` record like the example above or something similar, named `www.`, to allow such queries to return the expected result.

### Email records

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| `MX` | `@` | `XXXXXXXXX` | `<TTL>` |
{{</example>}}

or

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| `CNAME` | `mail.` | `<TARGET>` | `<TTL>` |
{{</example>}}

or

{{<example>}}
| Type | Name | Content | TTL |
| --- | --- | --- | --- |
| `A` | `mail.` | `<IPv4>` | `<TTL>` |
{{</example>}}

## Limitations

DKIM records

Very specific names
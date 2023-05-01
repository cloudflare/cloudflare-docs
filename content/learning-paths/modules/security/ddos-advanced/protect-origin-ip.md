---
title: Protect origin IP address
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

Though Cloudflare automatically hides your origin server IP address when you [proxy your DNS records](/learning-paths/modules/security/ddos-baseline/proxy-dns-records/), there are other ways to discover an IP address.

To prevent attackers from discovering your origin's IP address, review the following suggestions.

## Rotate IP addresses

DNS records are in the public domain, meaning that - even though your IP addresses are hidden once you proxy your DNS records - someone could uncover historical records of your addresses.

For additional security, you could rotate the IP addresses of your origin server, which would also require [updating your DNS records](/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) within Cloudflare.

## Review unproxied DNS records

Unproxied DNS records - also known as **DNS-only** records - can sometimes contain origin IP information, especially those used for FTP or SSH.

Review these records to make sure they do not contain origin IP information or use [Cloudflare Spectrum](/spectrum/) to proxy these records.

## Evaluate mail infrastructure

If possible, do not host a mail service on the same server as the web resource you want to protect, since emails sent to non-existent addresses get bounced back to the attacker and reveal the mail server IP address.
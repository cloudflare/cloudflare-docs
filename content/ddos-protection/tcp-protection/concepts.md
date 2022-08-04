---
title: Concepts
pcx_content_type: concept
weight: 4
---

# Concepts

## Prefixes

Advanced TCP Protection protects selected IP prefixes from sophisticated TCP attacks. A prefix can be an IP address or an IP range in CIDR format. You must add prefixes to Advanced TCP Protection so that Cloudflare can analyze incoming packets and offer protection against sophisticated TCP DDoS attacks.

Prefixes added to Advanced TCP Protection must be one of the following:

* A prefix [onboarded to Magic Transit](/magic-transit/how-to/advertise-prefixes/).
* A subset of a prefix onboarded to Magic Transit.

You cannot add a prefix (or a subset of a prefix) that you have not onboarded to Magic Transit or whose status is still _Unapproved_. Contact your account team to get help with prefix approvals.

## Allowlist

The Advanced TCP Protection allowlist is a list of prefixes that will bypass all configured Advanced TCP Protection rules.

For example, you could add prefixes used only by partners of your company to the allowlist so that they are exempt from packet inspection and mitigation actions performed by Advanced TCP Protection.

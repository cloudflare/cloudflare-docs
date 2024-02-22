---
pcx_content_type: concept
title: Advanced nameservers
weight: 2
---

# Advanced nameservers

TBD >> Might make sense to change title and structure

## Anycast network groups

## Nameservers hosting and assignment

While standard Cloudflare nameservers are hosted under `ns.cloudflare.com` or `secondary.cloudflare.com`, advanced nameservers use different domains:

- `foundationdns.com`
- `foundationdns.net`
- `foundationdns.org`

Using the different TLDs (`.com`, `.net`, and `.org`) and making these available only to enterprise accounts allows for better predictability and consistency in nameserver assignment.

There should also be less conflicts when guaranteeing that directly descending zones do not have the same nameserver set.

{{<details header="Descending zones example">}}

Consider the domain `example.com`, and subdomains `abc.example.com` and `123.example.com`:

- `abc.example.com` and `123.example.com` directly descend from `example.com` and cannot have the same nameservers as `example.com`.
- `abc.example.com` and `123.example.com` are sibling domains and can have the same nameservers.
- `new.abc.example.com` directly descends from both `abc.example.com` and `example.com`, and cannot have the same nameservers as them, but can have the same nameservers as `123.example.com`.

{{</details>}}

## Dedicated release process
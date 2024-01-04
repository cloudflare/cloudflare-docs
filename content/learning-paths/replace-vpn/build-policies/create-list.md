---
title: Create an allowlist or blocklist
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

It is likely that you’ll be onboarding to the Cloudflare platform with some predetermined series of security policies. Maybe you have explicit deny lists based on hostnames, IPs, or another measure that tie to individual users. Maybe some networks can access certain apex records and others can’t. The best way to migrate to Cloudflare in a way that will simplify ongoing maintenance is to build as many ‘reusable’ objects as possible. Not only because that makes policy building simpler, but because as those applications, networks, and services organically change and grow, updates to the lists automatically update everywhere that the lists are applied.


In the context of DNS filtering, a blocklist is a list of known harmful domains or IP addresses. An allowlist is a list of allowed domains or IP addresses, such as the domains of essential corporate applications.

Gateway supports creating [lists](/cloudflare-one/policies/gateway/lists/) of URLs, hostnames, or other entries to reference in your policies.

{{<render file="gateway/_lists.md" productFolder="cloudflare-one">}}

## Example policy

| Selector            | Operator  | Value              | Action |
| ------------------- | ----------| -------------------| ------ |
| Domain              | in list   | `Corporate domains`| Allow  |

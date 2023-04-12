---
pcx_content_type: reference
title: Common policies
weight: 1
---

# Common DNS policies

The following policies are commonly used to secure DNS traffic.

{{<render file="gateway/_content-categories.md">}}

{{<render file="/gateway/_policies-optional.md">}}

## Force IPv4

Force users to connect with IPv4.

| Selector          | Operator | Value       | Operator |
| ----------------- | -------- | ----------- | -------- |
| Query Record Type | is       | AAAA        | And      |
| Domain            | is       | example.com |          |

| Action |
| ------ |
| Block  |

## Force IPv6

Force users to connect with IPv6.

| Selector          | Operator | Value       | Operator |
| ----------------- | -------- | ----------- | -------- |
| Query Record Type | is       | A           | And      |
| Domain            | is       | example.com |          |

| Action |
| ------ |
| Block  |

Additionally, you can pair these policies with an [egress policy](/cloudflare-one/policies/filtering/egress-policies/) to control which IP is used to egress to the origin.

Refer to the [DNS policies page](/cloudflare-one/policies/filtering/dns-policies/) for a comprehensive list of other selectors, operators, and actions.

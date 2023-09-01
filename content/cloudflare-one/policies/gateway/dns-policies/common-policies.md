---
pcx_content_type: reference
title: Common policies
weight: 1
---

# Common DNS policies

The following policies are commonly used to secure DNS traffic.

Refer to the [DNS policies page](/cloudflare-one/policies/gateway/dns-policies/) for a comprehensive list of other selectors, operators, and actions.

{{<render file="gateway/_recommended-dns-policies.md">}}

{{<render file="/gateway/_policies-optional.md">}}

## Restrict access to specific groups

Filter DNS queries to allow only specific users access.

The following example includes two policies. The first policy allows the specified group, while the second policy blocks all other users. To ensure the policies are evaluated properly, place the Allow policy above the Block policy. For more information, refer to the [order of precedence](/cloudflare-one/policies/gateway/order-of-enforcement/#order-of-precedence).

### 1. Allow a group

| Selector           | Operator | Value            | Logic | Action |
| ------------------ | -------- | ---------------- | ----- | ------ |
| Content Categories | in       | Social Networks  | And   | Allow  |
| User Group Names   | in       | `marketing-team` |       |        |

### 2. Block all other users

| Selector           | Operator | Value           | Action |
| ------------------ | -------- | --------------- | ------ |
| Content Categories | in       | Social Networks | Block  |

## Control IP version

Enterprise users can pair these policies with an [egress policy](/cloudflare-one/policies/gateway/egress-policies/) to control which IP address is used to egress to the origin server.

### Force IPv4

Force users to connect with IPv4.

| Selector          | Operator | Value       | Logic | Action |
| ----------------- | -------- | ----------- | ----- | ------ |
| Query Record Type | is       | AAAA        | And   | Block  |
| Domain            | is       | example.com |       |        |

### Force IPv6

Force users to connect with IPv6.

| Selector          | Operator | Value       | Logic | Action |
| ----------------- | -------- | ----------- | ----- | ------ |
| Query Record Type | is       | A           | And   | Block  |
| Domain            | is       | example.com |       |        |

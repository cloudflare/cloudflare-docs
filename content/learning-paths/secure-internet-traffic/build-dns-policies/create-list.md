---
title: Create an allowlist or blocklist
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

In the context of DNS filtering, a blocklist is a list of known harmful domains or IP addresses. An allowlist is a list of allowed domains or IP addresses, such as the domains of essential corporate applications.

Gateway supports creating [lists](/cloudflare-one/policies/gateway/lists/) of URLs, hostnames, or other entries to use in your policies.

## Example list policy

The following DNS policy will allow access to all approved corporate domains included in a list called **Corporate Domains**.

| Selector | Operator | Value               | Action |
| -------- | -------- | ------------------- | ------ |
| Domain   | in list  | *Corporate Domains* | Allow  |

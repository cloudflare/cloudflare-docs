---
title: About
pcx_content_type: concept
weight: 2
meta:
  title: About Cloudflare Firewall Rules
layout: single
---

# About Cloudflare Firewall Rules

Cloudflare Firewall Rules is a flexible and intuitive framework for filtering HTTP requests. It gives you fine-grained control over which requests reach your applications, proactively inspecting incoming site traffic and automatically responding to threats.

In a firewall rule you define an [expression](/ruleset-engine/rules-language/expressions/) that tells Cloudflare what to look for in a request, and specify the appropriate [action](/firewall/cf-firewall-rules/actions/) to take when those conditions are met. Expressions can reference [IP Lists](/fundamentals/global-configurations/lists/ip-lists/) - groups of IP addresses that you can reference collectively by name.

To write firewall rule expressions, use the [Rules language](/ruleset-engine/rules-language/), a powerful expression language inspired in the Wireshark Display Filter language.

---
title: Understand site content
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

Before you implement any bot protection, you should review your site's content, as that might affect your implementation.

## Site purpose

### Situation

The general purpose of your site (and its intended audience) may affect the thresholds you use for Bot management.

### Implementation details

If you want to minimize false positives and lost revenue — common for ecommerce or marketing websites — you might lean towards more permissive rules that could lead to higher bot traffic.

If you want to increase protection and minimize bot traffic - common for financial institutions - you might prefer stricter rules, even though they contain a greater risk of false positives.

---

## Static resources

### Situation

{{<render file="_static-resources-list.md" productFolder="bots" >}}

### Implementation details

{{<render file="_static-resources-bm.md" productFolder="bots" >}}
<br/>

If you do not explicitly exclude static resources from your firewall rules, you may block good bots — like mail clients — that routinely fetch static resources.

To exclude static resources, you would need to include `not (cf.bot_management.static_resource)` as part of a firewall rule.

---

## WordPress installations

### Situation

{{<render file="_wordpress-loopback-definition" productFolder="bots" >}}
<br/>

### Implementation details

For more details, refer to [WordPress Loopback errors](/bots/reference/wordpress-loopback-issue/).
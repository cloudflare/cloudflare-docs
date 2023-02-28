---
pcx_content_type: concept
title: Configuration Rules
weight: 7
layout: single
meta:
  title: Configuration Rules (beta)
---

{{<beta>}} Configuration Rules {{</beta>}}

Configuration Rules allow you to customize certain Cloudflare [configuration settings](/rules/configuration-rules/settings/) for matching incoming requests.

The Configuration Rule expression will determine to which requests the rule settings will apply. For more information on expressions, refer to [Expressions](/ruleset-engine/rules-language/expressions/) and [Edit rule expressions](/firewall/cf-dashboard/edit-expressions/).

---

## Availability

The number of available Configuration Rules varies according to your Cloudflare plan:

{{<feature-table id="rules.config_rules">}}

## Execution order

{{<render file="_product_execution_order.md">}}

---
pcx_content_type: concept
title: Configuration Rules
weight: 2
meta:
  title: Configuration Rules
---

# Configuration Rules

Configuration Rules allow you to customize certain Cloudflare [configuration settings](/rules/configuration-rules/settings/) for matching incoming requests.

The configuration rule expression will determine to which requests the rule settings will apply. For more information on expressions, refer to [Expressions](/ruleset-engine/rules-language/expressions/) and [Edit expressions in the dashboard](/ruleset-engine/rules-language/expressions/edit-expressions/).

{{<render file="_rules-requirements.md" withParameters="Configuration Rules require">}}

---

## Availability

The number of available configuration rules varies according to your Cloudflare plan:

{{<feature-table id="rules.config_rules">}}

## Execution order

{{<render file="_product-execution-order.md">}}

{{<render file="_troubleshoot-rules-with-trace.md" withParameters="configuration rules">}}
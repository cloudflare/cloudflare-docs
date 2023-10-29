[cloudflare_us_tia_dls_on_2021.pdf](https://github.com/cloudflare/cloudflare-docs/files/13198314/cloudflare_us_tia_dls_on_2021.pdf)
[cloudflare_iso_27001_27018_27701_certificate_2023.pdf](https://github.com/cloudflare/cloudflare-docs/files/13198313/cloudflare_iso_27001_27018_27701_certificate_2023.pdf)
---
pcx_content_type: concept
title: Configuration Rules
weight: 7
layout: single
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

{{<render file="_product_execution_order.md">}}

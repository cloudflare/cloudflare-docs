---
pcx_content_type: configuration
title: Deploy via API
weight: 3
meta:
  title: Deploy a WAF managed ruleset via API
---

# Deploy a WAF managed ruleset via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to deploy a managed ruleset at the account level or at the zone level.

Deploy WAF managed rulesets to the `http_request_firewall_managed` phase. Other managed rulesets, like DDoS Attack Protection managed rulesets, must be deployed to a different phase. Refer to the specific managed ruleset documentation for details.

The [WAF Managed Rules](/waf/managed-rules/#managed-rulesets) page includes the IDs of the different WAF managed rulesets. You will need this information when deploying the rulesets via API.

Refer to [Deploy a managed ruleset](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/) for instructions on deploying a managed ruleset via API.

## Next steps

To customize the behavior of the rules included in a managed ruleset, [create an override](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

To skip the execution of WAF managed rulesets or some of their rules, [create an exception](/waf/managed-rules/waf-exceptions/define-api/) (also called a skip rule).

Exceptions have priority over overrides.

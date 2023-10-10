---
pcx_content_type: configuration
title: Deploy via API
weight: 6
meta:
  title: Deploy a WAF managed ruleset via API
---

# Deploy a WAF managed ruleset via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to deploy a managed ruleset at the account level or at the zone level.

Deploy WAF managed rulesets to the `http_request_firewall_managed` phase. Other managed rulesets, like DDoS Attack Protection managed rulesets, must be deployed to a different phase. Refer to the specific managed ruleset documentation for details.

The [WAF Managed Rules](/waf/managed-rules/) page includes the IDs of the different WAF managed rulesets. You will need this information when deploying the rulesets via API.

Refer to [Deploy a managed ruleset](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/) for instructions on deploying a managed ruleset via API.

## Next steps

To customize the behavior of the rules included in a managed ruleset, [create an override](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

To skip the execution of WAF managed rulesets or some of their rules, [create a WAF exception](/waf/managed-rules/waf-exceptions/define-api/) (also called a skip rule).

WAF exceptions have priority over overrides.

## Additional notes

* The zone-level `http_request_firewall_managed` phase can have at most three `execute` rules deploying managed rulesets, one for each available managed ruleset.

* Currently, each managed ruleset will execute **at most once per request**. Configuring a second rule that executes the same managed ruleset will have no effect.

    For example, consider two account-level rules with different expressions that execute the same managed ruleset. If the two rules match for the same request, the managed ruleset will not be executed for the second rule.

    As another example, consider an account-level rule that executes a managed ruleset and a zone-level rule that executes the same managed ruleset. If both rules match for the same request, the managed ruleset is only executed when the account-level rule is evaluated.

    This behavior will change in the future so that you can execute each managed ruleset multiple times per request.

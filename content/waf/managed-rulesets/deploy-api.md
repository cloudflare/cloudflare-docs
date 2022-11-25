---
pcx_content_type: configuration
title: Deploy via API
weight: 6
---

# Deploy Managed Rulesets via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to deploy Managed Rulesets at the account level or at the zone level.

Deploy WAF Managed Rulesets to the `http_request_firewall_managed` phase. Other Managed Rulesets, like DDoS Managed Rulesets, must be deployed to a different phase. Check the specific Managed Ruleset documentation for details.

You can define overrides to customize the behavior of the rules included in a Managed Ruleset.

**Note:** The zone-level `http_request_firewall_managed` phase can have at most three `execute` rules deploying Managed Rulesets, one for each available Managed Ruleset.

To learn more about deploying Managed Rulesets and configuring overrides using the Rulesets API, refer to [Work with Managed Rulesets](/ruleset-engine/managed-rulesets/).

{{<Aside type="warning" header="Important">}}

Currently, each Managed Ruleset will execute **at most once per request**. Configuring a second rule that executes the same Managed Ruleset will have no effect.

For example, consider two account-level rules with different expressions that execute the same Managed Ruleset. If the two rules match for the same request, the Managed Ruleset will not be executed for the second rule.

As another example, consider an account-level rule that executes a Managed Ruleset and a zone-level rule that executes the same Managed Ruleset. If both rules match for the same request, the Managed Ruleset is only executed when the account-level rule is evaluated.

This behavior will change in the future so that you can execute each Managed Ruleset multiple times per request.

{{</Aside>}}

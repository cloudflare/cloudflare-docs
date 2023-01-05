---
pcx_content_type: configuration
title: Deploy via API
weight: 6
---

# Deploy managed rulesets via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to deploy managed rulesets at the account level or at the zone level.

Deploy WAF managed rulesets to the `http_request_firewall_managed` phase. Other managed rulesets, like DDoS Attack Protection managed rulesets, must be deployed to a different phase. Check the specific managed ruleset documentation for details.

You can define overrides to customize the behavior of the rules included in a managed ruleset.

**Note:** The zone-level `http_request_firewall_managed` phase can have at most three `execute` rules deploying managed rulesets, one for each available managed ruleset.

To learn more about deploying managed rulesets and configuring overrides using the Rulesets API, refer to [Work with managed rulesets](/ruleset-engine/managed-rulesets/).

{{<Aside type="warning" header="Important">}}

Currently, each managed ruleset will execute **at most once per request**. Configuring a second rule that executes the same managed ruleset will have no effect.

For example, consider two account-level rules with different expressions that execute the same managed ruleset. If the two rules match for the same request, the managed ruleset will not be executed for the second rule.

As another example, consider an account-level rule that executes a managed ruleset and a zone-level rule that executes the same managed ruleset. If both rules match for the same request, the managed ruleset is only executed when the account-level rule is evaluated.

This behavior will change in the future so that you can execute each managed ruleset multiple times per request.

{{</Aside>}}

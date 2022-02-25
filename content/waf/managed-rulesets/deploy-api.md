---
pcx-content-type: how-to
order: 5
---

# Deploy rulesets via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api) to deploy and configure rulesets at the account level or at the zone level.

## Deploying Managed Rulesets

You can deploy WAF Managed Rulesets to the `http_request_firewall_managed` phase, both at the account level and at the zone level.

Other Managed Rulesets, like DDoS Managed Rulesets, must be deployed to a different phase. Check the specific Managed Ruleset documentation for details.

You can define overrides to customize the behavior of the rules included in a Managed Ruleset.

**Note:** There are a few requirements when deploying WAF Managed Rulesets to the `http_request_firewall_managed` phase at the **zone** level:

*   The zone-level phase can only have two `execute` rules deploying Managed Rulesets: one rule for deploying the OWASP Managed Ruleset and another rule for deploying the Cloudflare Managed Rules.

*   You must set the `expression` field to `true` in these two rules, which means that they apply to all zone requests.

To learn more about deploying Managed Rulesets and configuring overrides using the Rulesets API, refer to [Work with Managed Rulesets](https://developers.cloudflare.com/ruleset-engine/managed-rulesets).

<Aside type="warning" header="Important">

Currently, each Managed Ruleset will execute **at most once per request**. Configuring a second rule that executes the same Managed Ruleset will have no effect.

For example, consider two account-level rules with different expressions that execute the same Managed Ruleset. If the two rules match for the same request, the Managed Ruleset will not be executed for the second rule.

As another example, consider an account-level rule that executes a Managed Ruleset and a zone-level rule that executes the same Managed Ruleset. If both rules match for the same request, the Managed Ruleset is only executed when the account-level rule is evaluated.

This behavior will change in the future so that you can execute each Managed Ruleset multiple times per request.

</Aside>

## Deploying custom rulesets

You can create custom rulesets in the `http_request_firewall_custom` phase at the account level. After creating a custom ruleset, you can deploy it to a phase at the account level by adding a rule to the phase entry point that executes the custom ruleset.

\<Aside type='warning' header='Important'>

Currently, you can only deploy custom rulesets to a phase at the account level.

</Aside>

To learn more about creating and deploying custom rulesets using the Rulesets API, refer to [Work with custom rulesets](https://developers.cloudflare.com/ruleset-engine/custom-rulesets).

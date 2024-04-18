---
pcx_content_type: configuration
title: Cloudflare Exposed Credentials Check Managed Ruleset
weight: 4
---

# Cloudflare Exposed Credentials Check

The Cloudflare Exposed Credentials Check Managed Ruleset is a set of pre-configured rules for well-known CMS applications that perform a lookup against a public database of stolen credentials.

{{<Aside type="note">}}

The Cloudflare Exposed Credentials Check Managed Ruleset is only available in the Cloudflare WAF announced on March 2021.

{{</Aside>}}

The managed ruleset includes rules for the following CMS applications:

- WordPress
- Joomla
- Drupal
- Ghost
- Plone
- Magento

Additionally, this managed ruleset also includes generic rules for other common patterns:

- Check forms submitted using a `POST` request containing `username` and `password` arguments
- Check credentials sent as JSON with `email` and `password` keys
- Check credentials sent as JSON with `username` and `password` keys

The default action for the rules in managed ruleset is _Exposed-Credential-Check Header_ (named `rewrite` in the API).

{{<Aside type="note" header="Note">}}

The managed ruleset contains an additional rule that blocks HTTP requests already containing the `Exposed-Credential-Check` HTTP header used by the _Exposed-Credential-Check Header_ action. These requests could be used to trick the origin into believing that a request contained (or did not contain) exposed credentials.

{{</Aside>}}

For more information on exposed credential checks, refer to [Check for exposed credentials](/waf/managed-rules/check-for-exposed-credentials/).

## Configure in the dashboard

You can configure the following settings of the Cloudflare Exposed Credentials Check Managed Ruleset in the dashboard:

- **Set the action to perform.** When you define an action for the ruleset, you override the default action defined for each rule. The available actions are: _Managed Challenge_, _Block_, _JS Challenge_, _Log_, and _Interactive Challenge_. To remove the action override, set the ruleset action to _Default_.
- **Override the action performed by individual rules.** The available actions are: _Exposed-Credential-Check Header_, _Managed Challenge_, _Block_, _JS Challenge_, _Log_, and _Interactive Challenge_. For more information, refer to [Available actions](/waf/managed-rules/check-for-exposed-credentials/#available-actions).
- **Disable specific rules.**
- **Customize the filter expression.** With a custom expression, the Cloudflare Managed Ruleset applies only to a subset of the incoming requests.
- **Configure [payload logging](/waf/managed-rules/payload-logging/configure/)**.

For details on configuring a managed ruleset in the dashboard, refer to [Configure a managed ruleset](/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset).

## Configure via API

To enable the Cloudflare Exposed Credentials Check Managed Ruleset for a given zone via API, create a rule with `execute` action in the entry point ruleset for the `http_request_firewall_managed` phase. For more information on deploying a managed ruleset, refer to [Deploy a managed ruleset](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/).

To configure the Exposed Credentials Check Managed Ruleset via API, create [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) using the Rulesets API. You can perform the following configurations:

- Specify the action to perform for all the rules in the ruleset by creating a ruleset override.
- Disable or customize the action of individual rules by creating rule overrides for those rules.

For examples of creating overrides using the API, refer to [Override a managed ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

{{<Aside type="note" header="Checking for exposed credentials in custom rules">}}

Besides activating the Exposed Credentials Check Managed Ruleset, you can also check for exposed credentials in custom rules. One common use case is to create custom rules on the end user authentication endpoints of your application to check for exposed credentials.

For more information, refer to [Create a custom rule checking for exposed credentials](/waf/managed-rules/check-for-exposed-credentials/configure-api/#create-a-custom-rule-checking-for-exposed-credentials).

{{</Aside>}}

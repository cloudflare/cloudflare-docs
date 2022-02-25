---
pcx-content-type: configuration
title: Cloudflare Exposed Credentials Check
weight: 4
---

# Cloudflare Exposed Credentials Check

The Cloudflare Exposed Credentials Check Managed Ruleset is a set of pre-configured rules for well-known CMS applications that perform a lookup against a public database of stolen credentials.

\<Aside type='warning'>

The Cloudflare Exposed Credentials Check Managed Ruleset is only available in the Cloudflare WAF announced on March 2021.

</Aside>

The Managed Ruleset includes rules for the following CMS applications:

*   WordPress
*   Joomla
*   Drupal
*   Ghost
*   Plone
*   Magento

Additionally, this Managed Ruleset also includes generic rules for other common patterns:

*   Check forms submitted using a `POST` request containing `username` and `password` arguments
*   Check credentials sent as JSON with `email` and `password` keys
*   Check credentials sent as JSON with `username` and `password` keys

The default action for the rules in Managed Ruleset is *Exposed-Credential-Check Header* (named `rewrite` in the API).

\<Aside type='note' header='Note'>

The Managed Ruleset contains an additional rule that blocks HTTP requests already containing the `Exposed-Credential-Check` HTTP header used by the *Exposed-Credential-Check Header* action. These requests could be used to trick the origin into believing that a request contained (or did not contain) exposed credentials.

</Aside>

For more information on exposed credentials checks, refer to [Automated exposed credentials check](/waf/exposed-credentials-check/).

## Configure in the dashboard

You can configure the following settings of the Cloudflare Exposed Credentials Check Managed Ruleset in the dashboard:

*   **Set the action to perform.** When you define an action for the ruleset, you override the default action defined for each rule. The available actions are: *Managed Challenge*, *Block*, *JS Challenge*, *Log*, and *Legacy CAPTCHA*. To remove the action override, set the ruleset action to *Default*.
*   **Override the action performed by individual rules.** The available actions are: *Exposed-Credential-Check Header*, *Managed Challenge*, *Block*, *JS Challenge*, *Log*, and *Legacy CAPTCHA*. For more information, refer to [Available actions](/waf/exposed-credentials-check/#available-actions).
*   **Disable specific rules.**
*   **Customize the filter expression.** With a custom expression, the Cloudflare Managed Ruleset applies only to a subset of the incoming requests.
*   **Configure [payload logging](/waf/managed-rulesets/payload-logging/configure/)**.

For details on configuring a Managed Ruleset in the dashboard, refer to [Configure a Managed Ruleset](/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-managed-ruleset).

## Configure via API

To enable the Cloudflare Exposed Credentials Check Managed Ruleset for a given zone via API, create a rule with `execute` action in the entry point ruleset for the `http_request_firewall_managed` phase. For more information on deploying a Managed Ruleset, refer to [Deploy a Managed Ruleset](/ruleset-engine/managed-rulesets/deploy-managed-ruleset).

To configure the Exposed Credentials Check Managed Ruleset via API, create [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset) using the Rulesets API. You can perform the following configurations:

*   Specify the action to perform for all the rules in the ruleset by creating a ruleset override.
*   Disable or customize the action of individual rules by creating rule overrides for those rules.

For examples of creating overrides using the API, refer to [Override a Managed Ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset).

<Aside type="note" header="Checking for exposed credentials in custom rules">

Besides activating the Exposed Credentials Check Managed Ruleset, you can also check for exposed credentials in custom rules. One common use case is to create custom rules on the end user authentication endpoints of your application to check for exposed credentials.

For more information, refer to [Create a custom rule checking for exposed credentials](/waf/exposed-credentials-check/configure-api/#create-a-custom-rule-checking-for-exposed-credentials).

</Aside>

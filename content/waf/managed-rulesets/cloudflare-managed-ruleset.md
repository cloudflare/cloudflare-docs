---
pcx-content-type: configuration
title: Cloudflare Managed Ruleset
weight: 2
---

# Cloudflare Managed Ruleset

Created by the Cloudflare security team, this ruleset provides fast and effective protection for all of your applications. The ruleset is updated frequently to cover new vulnerabilities and reduce false positives.

Cloudflare recommends that you enable the rules whose tags correspond to your technology stack. For example, if you use WordPress, enable the rules tagged with `wordpress`.

Cloudflare’s [WAF change log](/waf/change-log/) allows you to monitor ongoing changes to the WAF's Managed Rulesets.

## Configure in the dashboard

You can configure the following settings of the Cloudflare Managed Ruleset in the Cloudflare dashboard:

- **Set the action to perform.** When you define an action for the ruleset, you override the default action defined for each rule. The available actions are: _Managed Challenge_, _Block_, _JS Challenge_, _Log_, and _Legacy CAPTCHA_. To remove the action override, set the ruleset action to _Default_.
- **Override the action performed by individual rules or rules with specific tags.** The available actions are: _Managed Challenge_, _Block_, _JS Challenge_, _Log_, and _Legacy CAPTCHA_.
- **Disable specific rules or rules with specific tags.**
- **Customize the filter expression.** With a custom expression, the Cloudflare Managed Ruleset applies only to a subset of the incoming requests.
- **Configure [payload logging](/waf/managed-rulesets/payload-logging/configure/)**.

For details on configuring a Managed Ruleset in the dashboard, refer to [Configure a Managed Ruleset](/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-managed-ruleset).

## Configure via API

To enable the Cloudflare Managed Ruleset for a given zone via API, create a rule with `execute` action in the entry point ruleset for the `http_request_firewall_managed` phase. For more information on deploying a Managed Ruleset, refer to [Deploy a Managed Ruleset](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/).

To configure the Cloudflare Managed Ruleset via API, create [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) using the Rulesets API. You can perform the following configurations:

- Specify the action to perform for all the rules in the ruleset by creating a ruleset override.
- Disable or customize the action of individual rules by creating rule overrides for those rules.

For examples of creating overrides using the API, refer to [Override a Managed Ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

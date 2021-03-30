---
title: About
order: 1
---

# About Cloudflare Web Application Firewall

<Aside type='warning' header='Important'>

The Cloudflare WAF announced in March 2021 is available for selected customers on our paid plans.

</Aside>

The Cloudflare Web Application Firewall (WAF) checks incoming web requests and filters undesired traffic based on sets of rules called rulesets. The matching engine that powers the WAF rules supports the wirefilter syntax, the same syntax used for specifying Firewall Rules.

The WAF includes [several Managed Rulesets](/managed-rulesets), provided by Cloudflare, that you can enable and configure. 

When you enable these Managed Rulesets, you get immediate protection from a broad set of security rules that are regularly updated. Each of these rules has a default action that varies according to the severity of the rule.

You can override the default action or disable one or more rules included in Managed Rulesets. To customize the rules behavior you define specific **configurations** or **overrides**.

You can define a configuration that affects an entire Managed Ruleset, or configure the action and status of one or more rules in the ruleset. Rules have associated **tags** that allow you to search for a specific group of rules and configure them in bulk.

Additionally, you can create custom rulesets with your own WAF rules that you can later enable or deploy.

<Aside type='warning' header='Important'>

Currently, you can only create and deploy custom rulesets via API.

</Aside>

## Available Phases

The Web Application Firewall provides the following [Phases](https://developers.cloudflare.com/firewall/cf-rulesets#phases) where you can deploy WAF rules:

* `http_request_firewall_custom`
* `http_request_firewall_managed`

These Phases exist both at the account level and at the zone level. Considering the available Phases and the two different levels, the WAF rules are evaluated in the following order:

1. Rules in the `http_request_firewall_custom` Phase at the **account** level
1. Rules in the `http_request_firewall_custom` Phase at the **zone** level
1. Rules in the `http_request_firewall_managed` Phase at **account** level
1. Rules in the `http_request_firewall_managed` Phase at the **zone** level

## Deploying rulesets to Phases

You can **deploy** the Managed Rulesets provided by WAF to the following Phases:
* `http_request_firewall_managed` Phase at the **account** level (the Phase `kind` is `root`)
* `http_request_firewall_managed` Phase at the **zone** level (the Phase `kind` is `zone`)

<Aside type='note' header='Note'>

When you deploy a Managed Ruleset in the dashboard using the **Managed Rules** tab of the Firewall app, you are deploying that ruleset to the `http_request_firewall_managed` Phase of the selected zone. 

When you deploy a Managed Ruleset using **Firewall Rulesets** in the dashboard at the account level, you are deploying that ruleset to the `http_request_firewall_managed` Phase of the account. 

</Aside>

To deploy your own WAF rules, create a custom ruleset and add any custom rules to this ruleset. Next, deploy the custom ruleset to a supported Phase.

You can **create** and **deploy** custom rulesets to the `http_request_firewall_custom` Phase at the **account** level (the Phase `kind` is `root`).

<Aside type='warning' header='Warning'>

Currently, creating and deploying custom rulesets is only available via API.

</Aside>

To learn more about Phases, see [Phases](https://developers.cloudflare.com/firewall/cf-rulesets#phases) in the Ruleset Engine documentation.


## Get started

To configure Managed Rulesets using the Cloudflare dashboard, check [Deploy Managed Rulesets for a zone in the dashboard](/managed-rulesets/deploy-zone-dashboard). 

You can also use the Rulesets API to deploy rulesets to the available Phases:

* Deploy Managed Rulesets to the `http_request_firewall_managed` Phase. See [Work with Managed Rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/managed-rulesets).
* Create and deploy custom rulesets to the `http_request_firewall_custom` Phase. See [Work with custom rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/custom-rulesets).


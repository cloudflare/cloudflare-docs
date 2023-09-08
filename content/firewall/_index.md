---
title: Overview
pcx_content_type: overview
weight: 1
layout: single
meta:
  title: Cloudflare Firewall Rules
---

# Cloudflare Firewall Rules

Cloudflare Firewall Rules allows you to create rules that inspect incoming traffic and block, challenge, log, or allow specific requests.

## Main features

* **Rule-based protection**: Use pre-defined rulesets provided by Cloudflare, or define your own firewall rules. Create rules in the Cloudflare dashboard or via API.
* **Complex custom rules**: Each rule's expression can reference multiple fields from all the available HTTP request parameters and fields, allowing you to create complex rules.

## Availability

This table outlines the Firewall Rules features and entitlements available with each customer plan:

{{<feature-table id="security.x_firewall_rules">}}

## Next steps

* Unless you are already an advanced user, refer to [Expressions](/ruleset-engine/rules-language/expressions/) and [Actions](/firewall/cf-firewall-rules/actions/) to learn more about the basic elements of firewall rules.

* To start building your own firewall rules, refer to one of the following pages:

    * [Manage firewall rules in the dashboard](/firewall/cf-dashboard/create-edit-delete-rules/)
    * [Manage firewall rules via the APIs](/firewall/api/)

* You can also manage firewall rules through Terraform. For more information, refer to [Getting Started with Terraform](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/).

## Related resources

* [Cloudflare Rules language](/ruleset-engine/rules-language/)

---
title: Add rules
pcx-content-type: how-to
---

# Rules

You can check for an existing root ruleset from the dashboard or via the [Account rulesets API](https://api.cloudflare.com/#account-rulesets-properties). If you are a new Magic Transit customer, you may not have a root ruleset created for your account. To view examples for root rulesets, review the [Magic Firewall Terraform documentation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/magic_firewall_ruleset).

By default, you can create a maximum of 100 rules. We recommend you create lists of IP addresses to reference within rules to streamline rule management.

## Add a rule

1. From your dashboard, click **Firewall Rulesets**.
1. Click **Magic Firewall**.
1. Click **Add a Rule**.
1. Fill out the information for your new rule.
1. When you are done, click **Add new rule**.

## Create a disabled rule

When you add a new rule, the rule is **Enabled** by default. 

To create a **Disabled** rule, follow the steps in [Add a rule](#add-a-rule) above and toggle **Enabled** to off. When a rule is in the disabled state, the rule will not perform the action until is set to **Enabled**.

To disable an existing rule, from the **Magic Firewall Rules** page, set the **Enabled** toggle to off.

## Update a rule

1. From your dashboard, click **Firewall Rulesets**.
1. Click **Magic Firewall**. A list of firewall rules displays.
1. Locate the rule you want to edit and click **Edit**.
1. Update the rule with your changes and click **Edit rule**.

## Delete an existing rule

1. Locate the rule you'd like to delete in the list.
1. From the end of the row, click **Delete**.
1. Click **Delete** again to confirm the deletion.

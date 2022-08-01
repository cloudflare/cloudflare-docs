---
title: Add rules
weight: 1
pcx_content_type: how-to
---

# Rules

You can check for an existing root ruleset from the dashboard or via the [Account rulesets API](https://api.cloudflare.com/#account-rulesets-properties). If you are a new Magic Transit customer, you may not have a root ruleset created for your account. To view examples for root rulesets, review the [Magic Firewall Terraform documentation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/magic_firewall_ruleset).

By default, you can create a maximum of 100 rules. We recommend you create lists of IP addresses to reference within rules to streamline rule management.

## Add a rule

1.  From your dashboard, click **Firewall Rulesets**.
2.  Click **Magic Firewall**.
3.  Click **Add a Rule**.
4.  Fill out the information for your new rule.
5.  When you are done, click **Add new rule**.

## Create a disabled rule

When you add a new rule, the rule is **Enabled** by default.

To create a **Disabled** rule, follow the steps in [Add a rule](#add-a-rule) above and toggle **Enabled** to off. When a rule is in the disabled state, the rule will not perform the action until is set to **Enabled**.

To disable an existing rule, from the **Magic Firewall Rules** page, set the **Enabled** toggle to off.

## Update a rule

1.  From your dashboard, click **Firewall Rulesets**.
2.  Click **Magic Firewall**. A list of firewall rules displays.
3.  Locate the rule you want to edit and click **Edit**.
4.  Update the rule with your changes and click **Edit rule**.

## Delete an existing rule

1.  Locate the rule you'd like to delete in the list.
2.  From the end of the row, click **Delete**.
3.  Click **Delete** again to confirm the deletion.

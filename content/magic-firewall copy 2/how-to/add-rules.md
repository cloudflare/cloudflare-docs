---
title: Add rules
weight: 1
pcx_content_type: how-to
---

# Rules

You can check for an existing root ruleset from the dashboard or via the [Account rulesets API](/api/operations/listAccountRulesets). If you are a new Magic Transit customer, you may not have a root ruleset created for your account. To view examples for root rulesets, review the [Magic Firewall Terraform documentation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/magic_firewall_ruleset).

By default, you can create a maximum of 100 rules. We recommend you create lists of IP addresses to reference within rules to streamline rule management.

## Add a rule

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic Firewall**.
3. In the **Custom rules** tab, select **Add a Rule**.
4. Fill out the information for your new rule.
5. When you are done, select **Add new rule**.

## Create a disabled rule

When you add a new rule, the rule is **Enabled** by default.

To create a **Disabled** rule, follow the steps in [Add a rule](#add-a-rule) above and toggle **Enabled** to off. When a rule is in the disabled state, the rule will not perform the action until is set to **Enabled**.

To disable an existing rule, from the **Magic Firewall Rules** page, set the **Enabled** toggle to off.

## Update a rule

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic Firewall** > **Custom rules**.
3. Locate the rule you want to edit, and select **Edit**.
4. Update the rule with your changes and select **Edit rule**.

## Delete an existing rule

1. Locate the rule you want to delete in the list.
2. From the end of the row, select **Delete**.
3. Select **Delete** again to confirm the deletion.

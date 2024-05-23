---
pcx_content_type: reference
title: Work with Transform Rules
weight: 5
---

# Work with Transform Rules

You can perform the following operations in the **Transform Rules** page:

- Create new rewrite URL rules, HTTP request header modification rules, and HTTP response header modification rules.
- Configure Managed Transforms.
- View a list of existing rules (both active and paused).
- Activate or pause rules (turn on or off).
- Edit rules.
- Delete rules.
- Reorder rules.

![The Transform Rules page in the Cloudflare dashboard](/images/rules/transform/transform-rules-tab.png)

## Create rules

In **Rules** > **Transform Rules** you can create the following rules:

- [Rewrite URL rules](/rules/transform/url-rewrite/create-dashboard/)
- [HTTP request header modification rules](/rules/transform/request-header-modification/create-dashboard/)
- [HTTP response header modification rules](/rules/transform/response-header-modification/create-dashboard/)

Refer to each linked section for details on creating each rule type.

## Turn on or off a rule

Select the **Enabled** toggle next to the rule to turn it on or off.

## Edit a rule

To edit a rule, select the rule name. Alternatively, select the three dots menu > **Edit**.

## Delete a rule

To delete a rule, select the three dots menu > **Delete** next to the rule you want to remove. In the confirmation dialog that appears, select **Delete** to confirm and complete the operation.

## Order rules

Cloudflare evaluates each type of Transform Rules in list order, where rules are evaluated in the order they appear in the Rules List. You can drag and drop Transform Rules into position to reorder them using the handle next to each rule.

To specify an exact rule position, select the three dots menu > **Move to** and enter the new rule position.

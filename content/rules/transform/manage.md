---
pcx_content_type: reference
title: Work with Transform Rules
weight: 5
---

# Work with Transform Rules

You can perform the following operations in the **Transform Rules** page:

- Create new Rewrite URL Rules, HTTP Request Header Modification Rules, and HTTP Response Header Modification Rules.
- Configure Managed Transforms.
- View a list of existing rules (both active and paused).
- Activate or pause rules (turn on or off).
- Edit rules.
- Delete rules.
- Reorder rules.

![The Transform Rules page in the Cloudflare dashboard](/rules/static/transform/transform-rules-tab.png)

## Create rules

In **Transform Rules** you can create the following rules:

- [Rewrite URL Rules](/rules/transform/url-rewrite/create-dashboard/)
- [HTTP Request Header Modification Rules](/rules/transform/request-header-modification/create-dashboard/)
- [HTTP Response Header Modification Rules](/rules/transform/response-header-modification/create-dashboard/)

Refer to each linked section for details on creating each rule type.

## Manage rules

Manage your existing Transform Rules using the toggle and the links located on the right of the rule you want to change, or by using the handle located on the left of the rule.

![For each rule in the rules list, you can change its order, enable/disable the rule, edit the rule, or delete the rule.](/rules/static/transform/rule-operations.png)

### Enable or disable a rule

Select the on/off toggle associated with a Transform Rule to enable or disable it.

### Edit a rule

Select **Edit** to open the **Edit Rule** panel and make the changes you want.

### Delete a rule

Select **Delete** next to the existing rule you want to remove. In the confirmation dialog that appears, select **Delete** to confirm and complete the operation.

### Order rules

Cloudflare evaluates each type of Transform Rules in list order, where rules are evaluated in the order they appear in the Rules List. You can drag and drop Transform Rules into position to reorder them using the handle on the left of the rule.

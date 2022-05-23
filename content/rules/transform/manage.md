---
pcx-content-type: reference
title: Work with Transform Rules
weight: 5
---

# Work with Transform Rules

**Transform Rules** is a feature of **Rules** in the Cloudflare dashboard.

The **Transform Rules** dashboard interface lets you:

- Configure Managed Transforms.
- Create new URL Rewrite Rules, HTTP Request Header Modification Rules, and HTTP Response Header Modification Rules.
- View a list of existing rules (both active and paused).
- Activate or pause rules (turn on or off).
- Edit rules.
- Delete rules.
- Reorder rules.

![The Transform Rules tab in the Cloudflare dashboard](/rules/static/transform/transform-rules-tab.png)

## Create rules

In the **Transform Rules** tab you can:

- [Configure Managed Transforms](/rules/transform/managed-transforms/configure/)
- [Create a URL Rewrite Rule](/rules/transform/url-rewrite/create-dashboard/)
- [Create an HTTP Request Header Modification Rule](/rules/transform/request-header-modification/create-dashboard/)
- [Create an HTTP Response Header Modification Rule](/rules/transform/response-header-modification/create-dashboard/)

Refer to each linked section for details on creating each rule type.

## Manage rules

Manage your existing Transform Rules using the buttons located on the right of the rule you want to change, or by using the handle located on the left of the rule.

![For each rule in the rules list, you can change its order, enable/disable the rule, edit the rule, or delete the rule.](/rules/static/transform/rule-operations.png)

### Enable or disable a rule

Use the on/off toggle switch associated with a Transform Rule to enable or disable it.

### Edit a rule

Click **Edit** (wrench icon) to open the **Edit Rule** panel and make the changes you want.

### Delete a rule

Click **Delete** (X icon) next to the existing rule you want to remove. In the confirmation dialog that appears, click **Delete** to confirm and complete the operation.

### Order rules

Cloudflare evaluates each type of Transform Rules in list order, where rules are evaluated in the order they appear in the Rules List. You can drag and drop Transform Rules into position to reorder them using the handle on the left of the rule.

---
pcx-content-type: how-to
title: Use lists in expressions
weight: 3
---

# Use lists in expressions

## Expression Builder

To use an IP List in the [Expression Builder](/firewall/cf-dashboard/edit-expressions/#expression-builder):

1. Select _is in list_ or _is not in list_ from the **Operator** drop-down list.

    ![Selecting an IP List from the Value drop-down list when configuring the expression of a firewall rule](/firewall/static/cf-open-proxies-list.png)

1. Select an IP List from the **Value** drop-down list. Depending on your plan, you may be able to select an [IP List managed by Cloudflare](/firewall/cf-firewall-rules/rules-lists/#managed-ip-lists).

1. When you are done composing your rule, click **Deploy** to commit your changes and enable your rule. Click **Save as draft** if you are not ready to enable the rule.

## Expression Editor

To use an IP List in the [Expression Editor](/firewall/cf-dashboard/edit-expressions/#expression-editor) specify the `in` operator and use `$<list_name>` to specify the name of the list.

This expression filters requests from IP addresses that are in an IP List named `office_network`:

```sql
(ip.src in $office_network)
```

Note that names for IP Lists can only include lowercase letters, numbers, and the underscore (`_`) character.

For more on creating lists, refer to [Work with lists](/firewall/cf-dashboard/rules-lists/manage-lists/).

To create a new rule via API using a Managed IP List — for example, `cf.open_proxies` — use the following expression:

```txt
(ip.src in $cf.open_proxies)
```

The available Managed IP Lists depend on your Cloudflare plan. For more information, refer to [Managed IP Lists](/firewall/cf-firewall-rules/rules-lists/#managed-ip-lists).
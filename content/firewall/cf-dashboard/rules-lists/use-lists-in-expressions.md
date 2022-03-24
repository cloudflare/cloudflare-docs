---
pcx-content-type: how-to
title: Use lists in expressions
weight: 371
---

# Use lists in expressions

## Expression Builder

To use an IP List in the [Expression Builder](/firewall/cf-dashboard/create-edit-delete-rules/):

1. Select _is in list_ or _is not in list_ from the **Operator** drop-down list.

    ![Selecting an IP List from the Value drop-down list when configuring the expression of a firewall rule](/firewall/static/cf-open-proxies-list.png)

1. Select an IP List from the **Value** drop-down list.

1. When you are done composing your rule, click **Deploy** to commit your changes and enable your rule. Click **Save as draft** if you are not ready to enable the rule.

## Expression Editor

To use an IP List in the [Expression Editor](/firewall/cf-dashboard/expression-preview-editor/) specify the `in` operator and use `$<list_name>` to specify the name of the list.

This expression filters requests from IP addresses that are in an IP List named `office_network`:

```sql
(ip.src in $office_network)
```

Note that names for IP Lists can only include lowercase letters, numbers, and the underscore (`_`) character.

For more on creating lists, refer to [Use IP Lists: Manage lists](/firewall/cf-dashboard/rules-lists/manage-lists/).

To create a new rule via API using the Cloudflare Open Proxies Managed List, use the following expression:

```txt
(ip.src in $cf.open_proxies)
```

{{<Aside type="warning" header="Important">}}

Access to the Open Proxy List requires a Cloudflare Enterprise plan.

{{</Aside>}}

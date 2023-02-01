---
pcx_content_type: how-to
title: Use lists in expressions
weight: 6
meta:
    description: Learn how to use lists in rule expressions.
---

# Use lists in expressions

## Expression Builder

To use a list in the [Expression Builder](/firewall/cf-dashboard/edit-expressions/#expression-builder):

1. Select _is in list_ or _is not in list_ from the **Operator** drop-down list.

    ![Selecting an IP List from the Value drop-down list when configuring the expression of a firewall rule](/fundamentals/static/images/lists/cf-open-proxies-list.png)

1. Select a list from the **Value** drop-down list. Depending on your plan, you may be able to select a [Managed IP List](/fundamentals/global-configurations/lists/ip-lists/#managed-ip-lists).

1. To commit your changes and enable the rule, select **Deploy**. If you are not ready to enable the rule, select **Save as Draft**.

## Expression Editor

To use a list in the [Expression Editor](/firewall/cf-dashboard/edit-expressions/#expression-editor), specify the `in` operator and use `$<list_name>` to specify the name of the list.

Examples:

* Expression matching requests from IP addresses that are in an IP List named `office_network`:

    ```txt
    ip.src in $office_network
    ```

* Expression matching requests with a source IP address different from IP addresses in the `office_network` IP List:

    ```txt
    not ip.src in $office_network
    ```

* Expression matching requests from IP addresses in the Cloudflare Open Proxies [Managed IP List](/fundamentals/global-configurations/lists/ip-lists/#managed-ip-lists):

    ```txt
    ip.src in $cf.open_proxies
    ```

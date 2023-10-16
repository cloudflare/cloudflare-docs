---
title: Lists
pcx_content_type: overview
weight: 1
layout: single
---

# Lists

Use lists to refer to a group of items (such as IP addresses) collectively, by name, in rule expressions of Cloudflare products. You can create your own custom lists or use lists managed by Cloudflare, such as [Managed IP Lists](/waf/tools/lists/managed-lists/#managed-ip-lists).

Lists have the following advantages:

- When creating a rule, using a list is easier and less error-prone than adding a long list of items such as IP addresses to a rule expression.
- When updating a set of rules that target the same group of IP addresses (or hostnames), using an IP list (or a hostname list) is easier and less error prone than editing multiple rules.
- Lists are easier to read and more informative, particularly when you use descriptive names for your lists.

When you update the content of a list, any rules that use the list are automatically updated, so you can make a single change to your list rather than modify rules individually.

Cloudflare stores your lists at the account level. You can use the same list in rules of different zones in your Cloudflare account.

## Supported lists

Cloudflare supports the following lists:

* [Custom lists](/waf/tools/lists/custom-lists/): Includes custom IP lists, hostname lists, and ASN lists.
* [Managed Lists](/waf/tools/lists/managed-lists/): Lists managed and updated by Cloudflare, such as Managed IP Lists.

Refer to each page for details.

{{<Aside type="note">}}
Bulk Redirects use [Bulk Redirect Lists](/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-lists), a different type of list covered in the Rules documentation.
{{</Aside>}}

## List names

The name of a list must comply with the following requirements:
* The name uses only lowercase letters, numbers, and the underscore (`_`) character in the name. A valid name satisfies this regular expression: `^[a-z0-9_]+$`.
* The maximum length of a list name is 50 characters.

## Work with lists

### Create and edit lists

You can [create lists in the Cloudflare dashboard](/waf/tools/lists/create-dashboard/) or using the [Lists API](/waf/tools/lists/lists-api/).

After creating a list, you can add and remove items from the list, but you cannot change the list name or type.

### Use lists in expressions

Both the Cloudflare dashboard and the Cloudflare API support lists:

* To use lists in an expression from the Cloudflare dashboard, refer to [Use lists in expressions](/waf/tools/lists/use-in-expressions/).
* To reference a list in an API expression, refer to [Values: Lists](/ruleset-engine/rules-language/values/#lists) in the Rules language reference.

{{<Aside type="warning">}}
Currently, not all Cloudflare products support lists in their expressions. Refer to the documentation of each [individual product](/products/) for details on list support.
{{</Aside>}}

### Search list items

You can search for list items in the dashboard or [via API](/api/operations/lists-get-list-items).

For IP Lists, Cloudflare will return IP addresses/ranges that start with your search query (search by prefix). Currently, you cannot search for an IP address contained in a CIDR range of an IP List.

For Bulk Redirect Lists, Cloudflare will return the URL redirects in the list where the source URL or target URL contain your search query (search by substring).

## Availability

List availability varies according to the list type and your Cloudflare plan and subscriptions.

{{<feature-table id="global_configurations.lists">}}

Notes:

* The number of available custom lists depends on the highest plan in your account. Any account with at least one paid plan will get the highest quota.

* You can have a maximum number of 10,000 list items across all custom lists.

* The Cloudflare Enterprise plan provides access to the Cloudflare Open Proxies Managed IP List. Other Managed IP Lists are available as part of Enterprise Security Bundles. For more information, contact your account team.

* Customers on Enterprise plans may contact their account team if they need more custom lists or a larger maximum number of items across lists. For these customers, the maximum number of custom lists per data type is 40 lists.

* For details on the availability of Bulk Redirect Lists, refer to the [Rules](/rules/url-forwarding/#availability) documentation.

---

## User role requirements

The following user roles have access to the list management functionality:

- Super Administrator
- Administrator
- Firewall

## Final remarks

You can only delete a list when there are no rules (enabled or disabled) that reference that list.<br>

{{<render file="_lists-import-notes.md" productFolder="fundamentals">}}

To replace the entire contents of a list, format the data as an array and use the [Update all list items](/api/operations/lists-update-all-list-items) operation in the [Lists API](/waf/tools/lists/lists-api/endpoints/).

You cannot download a list in CSV format from the Cloudflare dashboard. If you need to download the contents of a list, use the [Get list items](/api/operations/lists-get-list-items) operation to fetch the list items.

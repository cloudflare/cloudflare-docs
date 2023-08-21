---
title: Lists
pcx_content_type: overview
weight: 1
layout: single
---

# Lists

Use lists to refer to a group of items (such as IP addresses) collectively, by name, in rule expressions of Cloudflare products. You can create your own custom lists or use lists managed by Cloudflare, such as [Managed IP Lists](/fundamentals/global-configurations/lists/ip-lists/#managed-ip-lists).

Lists have the following advantages:

- When creating a rule, using a list is easier and less error-prone than adding a long list of items such as IP addresses to a rule expression.
- When updating a set of rules that target the same group of IP addresses, using an IP List is easier and less error prone than editing multiple rules.
- Lists are easier to read and more informative, particularly when you use descriptive names for your lists.

When you update the content of a list, any rules that use the list are automatically updated, so you can make a single change to your list rather than modify rules individually.

Cloudflare stores your lists at the account level. You can use the same list in rules of different zones in your Cloudflare account.

## List types

Cloudflare supports the following types of lists:

* [IP Lists](/fundamentals/global-configurations/lists/ip-lists/)
* [Bulk Redirect Lists](/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-lists)

Refer to the page about each list type for details.

## List names

The name of a list must comply with the following requirements:
* The name uses only lowercase letters, numbers, and the underscore (`_`) character in the name. A valid name satisfies this regular expression: `^[a-z0-9_]+$`.
* The maximum length of a list name is 50 characters.

## Working with lists

### Creating and editing lists

You can [create lists in the Cloudflare dashboard](/fundamentals/global-configurations/lists/create-dashboard/) or using the [Lists API](/fundamentals/global-configurations/lists/lists-api/).

After creating a list, you can add and remove items from the list, but you cannot change the list name or type.

### Using lists in expressions

Both the Cloudflare dashboard and the Cloudflare API support lists:

* To use lists in an expression from the Cloudflare dashboard, refer to [Use lists in expressions](/fundamentals/global-configurations/lists/use-in-expressions/).
* To reference a list in an API expression, refer to [Values: Lists](/ruleset-engine/rules-language/values/#lists) in the Rules language reference.

{{<Aside type="warning">}}
Currently, not all Cloudflare products support lists in their expressions. Refer to the documentation of each [individual product](/products/) for details on list support.
{{</Aside>}}

## Availability

List availability varies according to the list type and your Cloudflare plan and subscriptions.

{{<feature-table id="global_configurations.lists">}}

The number of IP Lists you can create depends on the Cloudflare plans associated with the zones in your account. You can store up to a total of 10,000 items across all your lists, regardless of your plan.

The Cloudflare Enterprise plan provides access to the Cloudflare Open Proxies Managed IP List. Other Managed IP Lists are available as part of Enterprise Security Bundles. For more information, contact your account team.

For details on the availability of Bulk Redirect Lists, refer to the [Rules](/rules/url-forwarding/#availability) documentation.

---

## User role requirements

The following user roles have access to the list management functionality:

- Super Administrator
- Administrator
- Firewall

## Final remarks

You can only delete a list when there are no rules (enabled or disabled) that reference that list.<br>

{{<render file="_lists-import-notes.md">}}

To replace the entire contents of a list, format the data as an array and use the [Update all list items](/api/operations/lists-update-all-list-items) operation in the [Lists API](/fundamentals/global-configurations/lists/lists-api/endpoints/).

You cannot download a list in CSV format from the Cloudflare dashboard. If you need to download the contents of a list, use the [Get list items](/api/operations/lists-get-list-items) operation to fetch the list items.

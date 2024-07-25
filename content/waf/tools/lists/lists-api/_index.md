---
pcx_content_type: navigation
title: Lists API
weight: 7
---

# Lists API

The [Lists API](/api/operations/lists-get-lists) provides an interface for programmatically managing the following types of lists:

* [Custom lists](/waf/tools/lists/custom-lists/): Contain one or more strings of the same type (such as IP addresses or hostnames) that you can reference collectively, by name, in rule expressions.

* [Bulk Redirect Lists](/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-lists): Contain URL redirects that you enable by creating a Bulk Redirect Rule.

To use a list in a rule expression, refer to [Values: Lists](/ruleset-engine/rules-language/values/#lists) in the Rules language documentation.

## Get started

To get started, review the Lists [JSON object](/waf/tools/lists/lists-api/json-object/) and [Endpoints](/waf/tools/lists/lists-api/endpoints/).

---

## Rate limiting for Lists API requests

Cloudflare may apply rate limiting to your API requests creating or deleting list items in custom lists and Bulk Redirect Lists.

Each operation (create or delete) on a list item counts as a change. The existing rate limit is based on the number of list changes over time. You can request a maximum of 10,000 list changes in five minutes.

Once the system has processed enough list changes so that they are under the threshold mentioned above, you can make additional API requests with more changes.

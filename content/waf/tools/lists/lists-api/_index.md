---
pcx_content_type: navigation
title: Lists API
weight: 7
layout: single
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

Cloudflare may apply rate limiting to Lists API requests creating or updating custom lists and Bulk Redirect Lists.

API requests creating or updating list items include one or more changes. Those changes are internally queued and then processed by Cloudflare. You can have approximately 1,000 pending list changes waiting to be processed before your requests are rate limited.

Once the system has processed enough changes so that they are under the threshold mentioned above, you can make additional API requests with more changes.
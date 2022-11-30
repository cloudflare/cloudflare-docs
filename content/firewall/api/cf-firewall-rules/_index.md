---
pcx_content_type: reference
title: Firewall Rules API
weight: 1
layout: single
---

# Firewall Rules API

Use the Firewall Rules API to programmatically manage your rules.

When working with the Firewall Rules API, refer to these topics for additional context:

* [Firewall rules actions](/firewall/cf-firewall-rules/actions/)
* [Cloudflare Filters API](/firewall/api/cf-filters/)

To get started with the API, review the Firewall Rules API [JSON object](/firewall/api/cf-firewall-rules/json-object/) and [Endpoints](/firewall/api/cf-firewall-rules/endpoints/).

For more information on the Rules language used to write rule expressions, refer to [Rules language](/ruleset-engine/rules-language/) in the Ruleset Engine documentation.

## Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

* API calls accept and return multiple items, and allow applying data changes to multiple items.
* Although API calls return the [standard response](/fundamentals/api/), the error object follows the [JSON API standard](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.

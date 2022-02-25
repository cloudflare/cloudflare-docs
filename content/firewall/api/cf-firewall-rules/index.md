---
pcx-content-type: reference
order: 405
---

# Firewall Rules API

Use the Firewall Rules API to programmatically manage your rules.

When working with the Firewall Rules API, refer to these topics for additional context:

*   [Firewall Rules actions](/cf-firewall-rules/actions)
*   [Cloudflare Filters API](/api/cf-filters)

To get started with the API, review the Firewall Rules API [JSON object](/api/cf-firewall-rules/json-object) and [Endpoints](/api/cf-firewall-rules/endpoints).

For more information on the Rules language used to write rule expressions, refer to [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language) in the Ruleset Engine documentation.

## Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

*   API calls accept and return multiple items, and allow applying data changes to multiple items.
*   Although API calls return the [standard response](https://api.cloudflare.com/#getting-started-responses), the error object follows the [JSON API standard](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.

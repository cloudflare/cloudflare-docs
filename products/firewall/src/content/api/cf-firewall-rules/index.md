---
order: 405
---

# Firewall Rules API

Use the Firewall Rules API to programmatically manage your rules.

When working with the Firewall Rules API, refer to these topics for additional context:

- [Actions](/cf-firewall-rules/actions/)
- [Expressions](/cf-firewall-rules/fields-and-expressions/)
- [Firewall Rules language](/cf-firewall-language/)
- [Cloudflare Filters](/api/cf-filters/)

To get started with the API, review the Firewall Rules API [JSON object](/api/cf-firewall-rules/json-object/) and [Endpoints](/api/cf-firewall-rules/endpoints/).

## Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

- API calls accept and return multiple items, and allow applying data changes to multiple items.
- Although API calls return the [standard response](https://api.cloudflare.com/#getting-started-responses), the error object follows the [JSON API standard](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.

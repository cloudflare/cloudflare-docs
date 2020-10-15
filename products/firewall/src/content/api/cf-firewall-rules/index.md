---
title: Firewall Rules API
weight: 310
---

You can fully manage your rules programmatically with the Firewall Rules API.

Before getting started with the Firewall Rules API, make sure you're familiar with:

- [Actions](/firewall/cf-firewall-rules/actions/)
- [Expressions](/firewall/cf-firewall-rules/fields-and-expressions/)
- [Firewall Rules language](/firewall/cf-firewall-language/)
- [Cloudflare Filters](/firewall/api/cf-filters/)

### Request URL format

The base URL that must precede all calls to the Cloudflare Firewall Rules API is:

```bash
https://api.cloudflare.com/client/v4/zones/{zone_id}
```

where `{zone_id}` is the value of the _Zone ID_ that appears in your **Domain Summary** in the Cloudflare dashboard **Overview** page. This is the domain for which you want to manage firewall rules via the API.

### Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

- API calls accept and return multiple items, and allow applying data changes to multiple items.
- Although API calls return the [standard response](https://api.cloudflare.com/#getting-started-responses), the error object follows the [JSON API standard](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.

### Get started!

To get started, review the Firewall Rules [JSON object](/firewall/api/cf-firewall-rules/json-object/) and [Endpoints](/firewall/api/cf-firewall-rules/endpoints/).

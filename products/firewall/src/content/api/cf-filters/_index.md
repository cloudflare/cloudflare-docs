---
title: Cloudflare Filters API
alwaysopen: false
weight: 350
---


**Cloudflare Filters** is an API-only component of Firewall Rules for designing complex criteria that rely on boolean operators and other logic to examine incoming HTTP traffic and look for a match.

For example, a filter matching:

- a HTTP user agent, and
- the HTTP path, and
- the source IP address

may be associated with a firewall rule declaring that the request should be blocked.

<Aside type="note">

Currently, Cloudflare Filters in an API-only feature and lacks a graphical user interface.
</Aside>

Before getting started with the Cloudflare Filters API, make sure you're familiar [fields and expressions](/firewall/cf-firewall-rules/fields-and-expressions/).

### Request URL format

The base URL that must precede all calls to the Cloudflare Filters API is:

```bash
https://api.cloudflare.com/client/v4/zones/{zone_id}
```

where `{zone_id}` is the value of the _Zone ID_ that appears in your **Domain Summary** in the Cloudflare dashboard **Overview** page. This is the domain for which you want to manage filters via the API.

### Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

- API calls accept and return multiple items, and allow applying data changes to multiple items.
- Although API calls return the [standard response](https://api.cloudflare.com/#getting-started-responses), the error object follows the [JSON API standard](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.

### Get started!

To get started, review [What is a filter?](/firewall/api/cf-filters/what-is-a-filter/), followed by the Cloudflare Filters [JSON object](/firewall/api/cf-firewall-rules/json-object/) and [Endpoints](/firewall/api/cf-firewall-rules/endpoints/).

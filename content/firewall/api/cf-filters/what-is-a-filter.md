---
title: What is a filter?
pcx_content_type: concept
weight: 1
meta:
  description: A filter is a way of setting up if (traffic matches certain criteria), then do something.
---

# What is a filter?

A filter is a way of saying:

```txt
if (traffic matches certain criteria) then...
```

A filter contains an expression that would return `true` or `false` when evaluated against traffic passing through Cloudflare.

Filter expressions are human and machine readable, and you can compose complex logic to precisely match the traffic that you are interested in detecting and acting upon.

A filter object typically looks like the following:

```json
{
  "id": "<FILTER_ID>",
  "expression": "(http.request.uri.path ~ \"^.*wp-login.php$\" or http.request.uri.path ~ \"^.*xmlrpc.php$\") and ip.src ne 93.184.216.34",
  "description": "WordPress login paths via the login page or mobile RPC endpoint"
}
```

The expression specified in this example filter is:

```txt
(http.request.uri.path ~ "^.*wp-login.php$" or http.request.uri.path ~ "^.*xmlrpc.php$") and ip.src ne 93.184.216.34
```

This filter expression has a `(this or that) and not this` structure designed to:

* Capture two WordPress paths that may be subject to brute force password attacks, and
* Exclude traffic that comes from the IP address `93.184.216.34`.

Imagine that this is an IP for your office. This expression demonstrates a filter that might be used (in a firewall rule) to block access to the WordPress login when accessed outside the office network.

For more information on rule expressions, refer to [Expressions](/ruleset-engine/rules-language/expressions/) in the Rules language documentation.

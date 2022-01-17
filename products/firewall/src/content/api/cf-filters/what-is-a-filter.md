---
title: What is a filter?
pcx-content-type: concept
order: 445
---

# What is a filter?

A filter is a way of saying:

`if (traffic matches certain criteria) then...`

A filter contains an expression that would return _true_ or _false_ when evaluated against traffic passing through Cloudflare.

Filter expressions are human and machine readable, and you can compose complex logic to precisely match the traffic that you are interested in detecting and acting upon.

A filter typically looks like:

```json
{
  "id": "6f58318e7fa2477a23112e8118c66f61",
  "expression": "(http.request.uri.path ~ \"^.*wp-login.php$\" or http.request.uri.path ~ \"^.*xmlrpc.php$\") and ip.src ne 93.184.216.34",
  "description": "WordPress login paths via the login page or mobile RPC endpoint"
}
```

The expression specified in this example filter is:

```bash
(http.request.uri.path ~ "^.*wp-login.php$" or http.request.uri.path ~ "^.*xmlrpc.php$") and ip.src ne 93.184.216.34
```

This filter expression has a `(this or that) and not this` structure designed to:

1. Capture two WordPress paths that may be subject to brute force password attacks, and
1. Exclude traffic that comes from the IP address `93.184.216.34`.

Imagine that this is an IP for your office. This expression demonstrates a filter that might be used (in a Firewall Rule) to block access to the WordPress login when accessed outside the office network.

For more information on rule expressions, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions) in the Rules language documentation.
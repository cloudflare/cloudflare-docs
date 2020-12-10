---
title: What is a filter?
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

1. capture two WordPress paths that may be subject to brute force password attacks, and
2. exclude traffic that comes from the IP address `93.184.216.34`.

Imagine that this is an IP for your office. This expression demonstrates a filter that might be used (in a firewall rule) to block access to the WordPress login when accessed outside of the office network.

Cloudflare has implemented a matching engine that uses expressions defined in the style of Wireshark® display filters, available under the GNU General Public License (GPL) v2. This means that we have combined the power of expressions from a network protocol analyzer with the features of Cloudflare to give you fine-grained control, globally, and at speed.

---
order: 600
---

# Firewall Rules language

The Cloudflare Firewall Rules language is a flexible and intuitive specification for building Firewall Rules expressions. Based on the widely known [Wireshark display filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html), the Firewall Rules language allows you to precisely target HTTP requests with a syntax and semantics familiar to security engineers.

When evaluating a firewall rule, Cloudflare compares values associated with an HTTP request to those defined in the firewall rule's [expression](https://developers.cloudflare.com/firewall/cf-firewall-rules/fields-and-expressions/). If the expression evaluates `true`, Cloudflare triggers the [action](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/) for that rule.

The Firewall Rules language supports two kinds of expression—simple and compound.

## Simple expressions

**Simple expressions** compare a value from an HTTP request to a value defined in the expression. For example, this simple expression matches Microsoft Exchange Autodiscover requests:

```txt
http.request.uri.path matches "/autodiscover\.(xml|src)$"
```

Simple expressions have the syntax

```txt
<field> <comparison-operator> <value>
```

where

- [Fields](https://developers.cloudflare.com/firewall/cf-firewall-language/fields/#fields) specify properties associated with an HTTP request.

- [Comparison operators](https://developers.cloudflare.com/firewall/cf-firewall-language/operators/#comparison-operators) define how values must relate to actual request data for an expression to return `true`.

- [Values](https://developers.cloudflare.com/firewall/cf-firewall-language/values/#values) represent the data associated with fields. When evaluating a firewall rule, Cloudflare compares these values with the actual data obtained from the request.

## Compound expressions

**Compound expressions** use [logical operators](https://developers.cloudflare.com/firewall/cf-firewall-language/operators/#logical-operators) such as `and` to combine two or more expressions into a single expression.

For example, this expression uses the `and` operator to target requests to `www.example.com` that are not on ports 80 or 443:

```txt
host eq www.example.com and not cf.edge.server_port in {80 443}
```

Compound expressions have the following general syntax:

```txt
<expression> <logical-operator> <expression>
```

Compound expressions allow you to generate sophisticated, highly targeted firewall rules.

## Grouping symbols and functions

The Firewall Rules language includes support for grouping symbols and functions. Each of these expand the power and flexibility of the language:

- [Grouping symbols](https://developers.cloudflare.com/firewall/cf-firewall-language/operators/#grouping-symbols) allow you to explicitly group expressions that should be evaluated together.

- [Functions](https://developers.cloudflare.com/firewall/cf-firewall-language/functions/#functions) allow you to manipulate and validate values in expressions.

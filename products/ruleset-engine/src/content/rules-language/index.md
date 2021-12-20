---
pcx-content-type: reference
order: 800
---

# Rules language

The Cloudflare Rules language is a flexible and intuitive specification for building rule expressions. Based on the widely known [Wireshark display filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html), the Rules language allows you to precisely target HTTP requests with a syntax and semantics familiar to security engineers.

When evaluating a rule, Cloudflare compares values associated with an HTTP request to those defined in the rule's [expression](https://developers.cloudflare.com/firewall/cf-firewall-rules/fields-and-expressions/). If the expression evaluates `true`, Cloudflare triggers the [action](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/) for that rule.

The Rules language supports two kinds of expressions: simple and compound.

## Simple expressions

**Simple expressions** compare a value from an HTTP request to a value defined in the expression. For example, this simple expression matches Microsoft Exchange Autodiscover requests:

```txt
http.request.uri.path matches "/autodiscover\.(xml|src)$"
```

Simple expressions have the following syntax:

```txt
<field> <comparison-operator> <value>
```

Where:

- [Fields](/rules-language/fields/#fields) specify properties associated with an HTTP request.

- [Comparison operators](/rules-language/operators/#comparison-operators) define how values must relate to actual request data for an expression to return `true`.

- [Values](/rules-language/values/#values) represent the data associated with fields. When evaluating a rule, Cloudflare compares these values with the actual data obtained from the request.

## Compound expressions

**Compound expressions** use [logical operators](/rules-language/operators/#logical-operators) such as `and` to combine two or more expressions into a single expression.

For example, this expression uses the `and` operator to target requests to `www.example.com` that are not on ports 80 or 443:

```txt
host eq www.example.com and not cf.edge.server_port in {80 443}
```

Compound expressions have the following general syntax:

```txt
<expression> <logical-operator> <expression>
```

Compound expressions allow you to generate sophisticated, highly targeted rules.

## Grouping symbols and functions

The Rules language includes support for grouping symbols and functions. Each of these expand the power and flexibility of the language:

- [Grouping symbols](/rules-language/operators/#grouping-symbols) allow you to explicitly group expressions that should be evaluated together.

- [Functions](/rules-language/functions/#functions) allow you to manipulate and validate values in expressions.

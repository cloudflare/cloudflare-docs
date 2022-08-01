---
title: Expressions
pcx_content_type: reference
weight: 2
meta:
  title: Rule expressions
---

# Rule expressions

The Rules language supports two kinds of expressions: simple and compound.

## Simple expressions

**Simple expressions** compare a value from an HTTP request to a value defined in the expression. For example, this simple expression matches Microsoft Exchange Autodiscover requests:

```txt
http.request.uri.path matches "/autodiscover\.(xml|src)$"
```

Simple expressions have the following syntax:

```txt
<field> <comparison_operator> <value>
```

Where:

- [Fields](/ruleset-engine/rules-language/fields/) specify properties associated with an HTTP request.

- [Comparison operators](/ruleset-engine/rules-language/operators/#comparison-operators) define how values must relate to actual request data for an expression to return `true`.

- [Values](/ruleset-engine/rules-language/values/) represent the data associated with fields. When evaluating a rule, Cloudflare compares these values with the actual data obtained from the request.

## Compound expressions

**Compound expressions** use [logical operators](/ruleset-engine/rules-language/operators/#logical-operators) such as `and` to combine two or more expressions into a single expression.

For example, this expression uses the `and` operator to target requests to `www.example.com` that are not on ports 80 or 443:

```txt
host eq www.example.com and not cf.edge.server_port in {80 443}
```

Compound expressions have the following general syntax:

```txt
<expression> <logical_operator> <expression>
```

Compound expressions allow you to generate sophisticated, highly targeted rules.

## Additional features

You can also use the following Rules language features in your expressions:

- [Grouping symbols](/ruleset-engine/rules-language/operators/#grouping-symbols) allow you to explicitly group expressions that should be evaluated together.

- [Functions](/ruleset-engine/rules-language/functions/) allow you to manipulate and validate values in expressions.

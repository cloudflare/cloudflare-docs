---
title: Expressions
pcx_content_type: reference
weight: 21
meta:
  title: Load Balancing expressions
---

# Load Balancing expressions

[Load Balancing rules](/load-balancing/additional-options/load-balancing-rules/) use two kinds of expressions:

- [Simple expressions](#simple-expressions) compare a value from an HTTP request to a value defined in the expression. A simple expression is identified by the presence of a **comparison operator** (_equals_ or _less than_, for example).

- [Compound expressions](#compound-expressions) combine two or more simple expressions into a single expression. Compound expression contains a **logical operator** (_and_, _or_, for example). With compound expressions you can tailor rules to specific use cases with a high degree of accuracy and precision.

---

## Simple expressions

Simple expressions are composed of three elements:

1.  A **field** that represents a property of an HTTP request.
2.  A representative **value** for that field which Cloudflare compares to the actual request value.
3.  A **comparison operator**, which specifies how the value defined in the expression must relate to the actual value from the request for the operator to return `true`.

When the comparison operator returns `true`, the request matches the expression.

This example expression returns true when a request URI path contains `/content`:

```sql
(http.request.uri.path contains "/content")
```

In general, simple expressions use this pattern:

```sql
<field> <operator> <value>
```

For more details, refer to [Supported fields and operators](/load-balancing/additional-options/load-balancing-rules/reference/).

---

## Compound expressions

A compound expression uses a **logical operator** (_and_, _or_, for example) to combine two or more expressions. Compound expressions allow you to build complex statements within a single expression.

The example expression below returns true when both the HTTP request URI path contains `/content` and the query string contains `webserver`:

```sql
(http.request.uri.path contains "/content")
and (http.request.uri.query contains "webserver")
```

In general, compound expressions use this pattern:

```sql
<expression> <logical operator> <expression>
```

A compound expression can be an operand of a logical operator. This allows multiple operators to construct a compound expression from many individual expressions.

For more details, refer to [Supported fields and operators](/load-balancing/additional-options/load-balancing-rules/reference/).

---

## Working with expressions

The Expression Builder’s visual interface allows you to build expressions without worrying about field names and syntax.

By comparison, the Expression Editor is text only, but it supports advanced features not available in the builder.

### Expression Builder

Compound expressions are easier to scan when displayed in the Expression Builder’s visual interface, and the Expression Preview is a great reference for learning to write more advanced expressions.

This Expression Builder screenshot shows the example compound expression described earlier. Compound expressions are easier to scan when displayed in the Expression Builder’s visual interface.

![Example rule configuration visible in the Expression Builder](/load-balancing/static/images/rules-builder-1.png)

The **Expression Preview** displays the expression in text:

```sql
(http.request.uri.path contains "/content")
and (http.request.uri.query contains "webserver")
```

For a walkthrough, refer to [Creating Load Balancing rules](/load-balancing/additional-options/load-balancing-rules/create-rules/).

### Expression Editor

The Expression Editor is a text-only interface for creating Load Balancing expressions. Although it lacks the visual simplicity of the Expression Builder, the Expression Editor supports advanced features such as support for grouping symbols (parentheses).

To access the Expression Editor in the **Traffic** app, click **Edit expression** in the **Create Custom Rule** dialog.

To return to the builder, click **Use expression builder**.

### Rules lists

Load Balancing Custom Rules does not support IP list operators.

---
title: Expressions
order: 20
pcx-content-type: reference
---

# Load Balancing expressions

[Load Balancing rules](/additional-options/load-balancing-rules) use two kinds of expressions:

- [Simple expressions](#simple-expressions) compare a value from an HTTP request to a value defined in the expression. A simple expression is identified by the presence of a **comparison operator** (_equals_ or _less than_, for example).

- [Compound expressions](#compound-expressions) combine two or more simple expressions into a single expression. Compound expression contains a **logical operator** (_and_, _or_, for example). With compound expressions you can tailor rules to specific use cases with a high degree of accuracy and precision.

---

## Simple expressions

Simple expressions are composed of three elements:

1. A **field** that represents a property of an HTTP request.
2. A representative **value** for that field which Cloudflare compares to the actual request value.
3. A **comparison operator**, which specifies how the value defined in the expression must relate to the actual value from the request for the operator to return `true`.

When the comparison operator returns `true`, the request matches the expression.

This example expression returns true when a request URI path contains `/content`:

```sql
(http.request.uri.path contains "/content")
```

In general, simple expressions use this pattern:

```sql
<field> <operator> <value>
```

For more details, refer to [Supported fields and operators](/additional-options/load-balancing-rules/reference).

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

For more details, refer to [Supported fields and operators](/additional-options/load-balancing-rules/reference).

---

## Working with expressions

The Expression Builder’s visual interface allows you to build expressions without worrying about field names and syntax.

By comparison, the Expression Editor is text only, but it supports advanced features not available in the builder.

### Expression Builder

Compound expressions are easier to scan when displayed in the Expression Builder’s visual interface, and the Expression Preview is a great reference for learning to write more advanced expressions.

This Expression Builder screenshot shows the example compound expression described earlier. Compound expressions are easier to scan when displayed in the Expression Builder’s visual interface.

![Expression Builder in Load Balancing tab of Traffic app](../../static/images/rules-builder-1.png)

The **Expression Preview** displays the expression in text:

```sql
(http.request.uri.path contains "/content") 
and (http.request.uri.query contains "webserver")
```

For a walkthrough, refer to [Creating Load Balancing rules](/additional-options/load-balancing-rules/create-rules).

### Expression Editor

The Expression Editor is a text-only interface for creating Load Balancing expressions. Although it lacks the visual simplicity of the Expression Builder, the Expression Editor supports advanced features such as support for grouping symbols (parentheses).

To access the Expression Editor in the **Traffic** app, click **Edit expression** in the **Create Custom Rule** dialog:

![Edit expression link in Create Custom Rule dialog](../../static/images/rules-builder-edit-expression-link.png)

The Expression Editor displays:

![Expression Editor in Load Balancing tab of Traffic app](../../static/images/rules-editor-1.png)

To return to the builder, click **Use expression builder**.

### Rules lists

Rules Lists allow you to create a group of IP addresses and refer to them collectively, by name, in your Load Balancing expressions.

For example, you might create a list of known office IP addresses and use it in a Load Balancing rule that selects a specific pool for requests from the addresses in the list.

Cloudflare stores your lists at the account level and sends to the edge, so you can view, manage, and incorporate them into firewall rules for any of your zones.

For more details, refer to [Rules Lists](https://developers.cloudflare.com/firewall/cf-firewall-rules/rules-lists) in the Firewall Rules documentation.

---
order: 630
---

# Values

When an HTTP request reaches Cloudflare’s edge, Cloudflare creates a table of field–value pairs against which to match expressions. This table exists for as long as the current request is being processed.

The values that populate Firewall Rules lookup tables are drawn from a variety of sources:

- **Primitive properties** are obtained directly from the request (`http.request.uri.path`, for example).
- **Derived values** are the product of a transformation, composition, or basic operation. For example, the transformation `lower(http.request.uri.patch)` converts the value of `http.request.uri.path` to lowercase.
- **Computed values** are the product of a lookup, computation, or other intelligence. For example, Cloudflare uses a machine learning process to dynamically calculate threat scores, represented by the `cf.threat_score` field.

When working with values in Firewall Rules expressions, keep in mind the notes outlined below for escape characters, case sensitivity, and boolean values.

## Escape characters in values

You must manually escape the backslash (`\`) and double quote (`"`) characters with a backslash when using them as part of a literal value in an expression.

Note in this example that the first and last `"` characters in `"token-type=\"JWT\""` are not part of the literal value, so they do not need escaping:

```sql
(http.request.uri.query contains "token-type=\"JWT\"")
```

## Case sensitivity and regular expressions in values

Since the evaluation of expressions using string values is case-sensitive, consider writing more than one simple expression to capture variants.

Cloudflare Business and Enterprise customer plans have access to the `matches` [comparison operator](https://developers.cloudflare.com/firewall/cf-firewall-language/operators/#comparison-operators), which supports [Google RE2 regular expressions](https://support.google.com/a/answer/1371417?hl=en) so that you can capture multiple variants of a value with a single expression.

## Boolean values

Simple expressions using boolean fields do not require operator notations or values. You only need to insert the field on its own, as shown in the `ssl` example below.

```sql
ssl
```

This simple expression matches requests where the value of the `ssl` field is `true`.

To match requests where `ssl` is `false`, use the boolean `not` operator :

```sql
not ssl
```

## Rules Lists

[Rules Lists](/cf-firewall-rules/rules-lists) allow you to create a group of IP addresses and refer to them collectively, by name, in your firewall rule expressions.

To refer to a Rules List in a firewall rules expression, use _$<list_name>_ and specify the `in` [operator](/cf-firewall-language/operators). This example expression filters requests from IP addresses that are in a Rules List named _office_network_:

```sql
(ip.src in $office_network)
```

Note that names for Rules Lists can only include lowercase letters, numbers and the underscore (`_`) character. For guidance on creating and managing lists, see [_Use Rules Lists: Manage Lists_](https://developers.cloudflare.com/firewall/cf-dashboard/rules-lists/manage-lists).

---
pcx-content-type: reference
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

Cloudflare Business and Enterprise customer plans have access to the `matches` [comparison operator](/cf-firewall-language/operators/#comparison-operators) which supports regular expressions, so that you can capture multiple variants of a value with a single expression.

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

## Arrays

The Cloudflare Firewall Rules language includes [fields](/cf-firewall-language/fields) of `Array` type and [functions](/cf-firewall-language/functions) with `Array` arguments and return values.

You can access individual array elements using an index (a non-negative value) between square brackets (`[]`). Array indexes start at `0` (zero).

Use the special notation `[*]` when specifying an expression that will be evaluated for each array element (like the [`map` high-order function](https://wikipedia.org/wiki/Map_(higher-order_function))). This special index notation will unpack the array, call the enclosing function for all its elements individually, and return a new array containing all the individual return values.

### Examples

Consider the `http.request.headers.names` field with type `Array<String>` in the following examples:

* Obtain the first element in the array:<br/>
  `http.request.headers.names[0]`

* Check if the first array element is equal to `Content-Type` (case sensitive):<br/>
  `http.request.headers.names[0] == "Content-Type"`

* Check if any array element is equal to `Content-Type` (case sensitive):<br/>
  `any(http.request.headers.names[*] == "Content-Type")`

* Check if any array element is equal to `Content-Type`, ignoring the case:<br/>
  `any(lower(http.request.headers.names[*])[*] == "content-type")`

In the last example, the `lower()` function includes the `[*]` notation so that the function is evaluated for each array element. This function, used along `[*]`, returns a new array where each element of the input array is converted to lowercase. Then, the string comparison uses `[*]` to transform the array resulting from applying `lower()` to each header name into an array of boolean values. Finally, `any()` evaluates to true if at least one of these array elements is true.

### Final notes

It is not possible to define your own arrays. You can only use arrays returned by fields, either directly or modified by functions.

Accessing an out-of-bounds array index produces a "missing value". A missing value has the following behavior:

* Any comparison `<expr> <op> <literal>` where `<expr>` evaluates to a missing value will evaluate to false.
* Function calls like `function(<expr>)`, where `<expr>` evaluates to a missing value, will return a missing value in most cases, but the exact behavior can vary per function.

You can only use `[*]` multiple times in the same expression if applied to the same array. Also, you can only use `[*]` in the first argument of a function call.

The Firewall Rules language [operators](/cf-firewall-language/operators) do not directly support arrays or the `[*]` operator — however, they support indexed array elements like `array_value[0]`. For example, you cannot use `[*]` with the `==` operator outside the context of an enclosing function call:

* `http.request.headers.names[*] == "Content-Type"` — **Invalid** expression
* `any(http.request.headers.names[*] == "Content-Type")` — **Valid** expression

## Rules Lists

[Rules Lists](/cf-firewall-rules/rules-lists) allow you to create a group of IP addresses and refer to them collectively, by name, in your firewall rule expressions.

To refer to a Rules List in a firewall rules expression, use _$<list_name>_ and specify the `in` [operator](/cf-firewall-language/operators). This example expression filters requests from IP addresses that are in a Rules List named _office_network_:

```sql
(ip.src in $office_network)
```

Note that names for Rules Lists can only include lowercase letters, numbers and the underscore (`_`) character. For guidance on creating and managing lists, see [_Use Rules Lists: Manage Lists_](https://developers.cloudflare.com/firewall/cf-dashboard/rules-lists/manage-lists).

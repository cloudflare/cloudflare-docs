---
order: 610
---

# Operators

The Cloudflare Firewall Rules language supports comparison and logical operators:

- [Comparison operators](#comparison-operators) specify how values defined in an expression must relate to the actual HTTP request value for the expression to return `true`.
- The `in` operator checks whether an IP address is in a named list of IPs.
- [Logical operators](#logical-operators) combine two expressions to form a compound expression and use order of precedence to determine how an evaluation is evaluated.

## Comparison operators

The Firewall Rules language supports the following comparison operators. Since some operators only support specific data types, the list is organized by data type.

<Aside type='note'>

Access to the `matches` operator requires a Cloudflare Business or Enterprise plan.

</Aside>

The Cloudflare Firewall Rules language supports these comparison operators:

<TableWrap>
<table style="width: 100%;">
  <thead>
   <tr>
      <td></td>
      <td colspan="2" style="text-align:center"><strong>Operator Notation</strong></td>
      <td colspan="3" ><strong>Supported Data Types</strong></td>
      <td></td>
   </tr>
   <tr>
      <td></td>
      <td><strong>English</strong></td>
      <td><strong>C-like</strong></td>
      <td><strong>String</strong></td>
      <td><strong>IP </strong></td>
      <td><strong>Number</strong></td>
      <td><strong>Example (operator in bold)</strong></td>
   </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Equal</strong></td>
      <td><code>eq</code></td>
      <td><code>==</code></td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>
         <code>http.request.uri.path <strong>eq</strong> "/articles/2008/"</code>
      </td>
     </tr>
    <tr>
      <td><strong>Not equal</strong></td>
      <td><code>ne</code></td>
      <td><code>!=</code></td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>
         <code>ip.src <strong>ne</strong> 93.184.216.0</code>
      </td>
    </tr>
    <tr>
      <td><strong>Less than</strong></td>
      <td><code>lt</code></td>
      <td><code>&lt;</code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10004;</td>
      <td>
         <code>cf.threat_score <strong>lt</strong> 10</code>
      </td>
   </tr>
   <tr>
      <td><strong>Less than or equal</strong></td>
      <td><code>le</code></td>
      <td><code>&lt;=</code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10004;</td>
      <td>
         <code>cf.threat_score <strong>le</strong> 20</code>
      </td>
    </tr>
    <tr>
      <td><strong>Greater than</strong></td>
      <td><code>gt</code></td>
      <td><code>></code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10004;</td>
      <td>
         <code>cf.threat_score <strong>gt</strong> 25</code>
      </td>
    </tr>
    <tr>
      <td><strong>Greater than or equal</strong></td>
      <td><code>ge</code></td>
      <td><code>&gt;=</code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10004;</td>
      <td>
         <code>cf.threat_score <strong>ge</strong> 60</code>
      </td>
    </tr>
    <tr>
      <td><strong>Exactly contains</strong></td>
      <td><code>contains</code></td>
      <td></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code>http.request.uri.path <strong>contains</strong> "/articles/"</code>
      </td>
    </tr>
    <tr>
      <td><strong>Matches Google re2 regular expression</strong></td>
      <td><code>matches</code></td>
      <td><code>~</code></td>
      <td>&#10004;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code>http.request.uri.path <strong>matches</strong> "^/articles/200[7-8]/$"</code>
      </td>
    </tr>
    <tr>
      <td><strong>Value is in set of values</strong></td>
      <td><code>in</code></td>
      <td></td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>&#10004;</td>
      <td>
         <code>ip.src <strong>in</strong> {'{ 93.184.216.0 93.184.216.1 }'}</code>
      </td>
    </tr>
  </tbody>
</table>
</TableWrap>

## Logical operators

Logical operators combine two or more expressions into a single compound expression. A compound expression has this general syntax:

```perl
<expression> <logical operator> <expression>
```

### Supported logical operators

Each logical operator is associate with an [order of precedence](#order-of-precedence). The order of precedence (along with [grouping symbols](#grouping-symbols)) determines the order in which Cloudflare evaluates logical operators in an expression. The `not` operator ranks first in order of precedence.

<TableWrap>
<table style="width: 100%;">
  <thead>
   <tr>
      <td></td>
      <td><strong>English Notation</strong></td>
      <td><strong>C-like Notation</strong></td>
      <td><strong>Example</strong></td>
      <td><strong>Order of Precedence</strong></td>
   </tr>
  </thead>
  <tbody>
   <tr>
      <td><strong>Logical NOT</strong></td>
      <td><code>not</code></td>
      <td><code>!</code></td>
      <td>
         <code><strong>not</strong> ( http.host eq "www.cloudflare.com" and ip.src in 93.184.216.0/24 )</code>
      </td>
      <td>1</td>
   </tr>
   <tr>
      <td><strong>Logical AND</strong></td>
      <td><code>and</code></td>
      <td><code>&amp;&amp;</code></td>
      <td>
         <code>http.host eq "www.cloudflare.com" <strong>and</strong> ip.src in 93.184.216.0/24</code>
      </td>
      <td>2</td>
   </tr>
   <tr>
      <td><strong>Logical XOR (exclusive OR)</strong></td>
      <td><code>xor</code></td>
      <td><code>^^</code></td>
      <td>
         <code>http.host eq "www.cloudflare.com" <strong>xor</strong> ip.src in 93.184.216.0/24</code>
      </td>
      <td>3</td>
   </tr>
   <tr>
      <td><strong>Logical OR</strong></td>
      <td><code>or</code></td>
      <td><code>||</code></td>
      <td>
         <code>http.host eq "www.cloudflare.com" <strong>or</strong> ip.src in 93.184.216.0/24</code>
      </td>
      <td>4</td>
   </tr>
  </tbody>
</table>
</TableWrap>

### Order of precedence

<Aside type='note'>

To avoid ambiguity when working with logical operators, use grouping symbols so that the order of evaluation is explicit.

</Aside>

When writing compound expressions, it is important to be aware of the precedence of logical operators so that your expression is evaluated the way you expect.

For example, consider the following generic expression, which uses `and` and `or` operators:

```java
Expression1 and Expression2 or Expression3
```

If these operators had no order of precedence, it would not be clear which of two interpretations is correct:

1. Match when Expression 1 and Expression 2 are both true **or** when Expression 3 is true.
2. Match when Expression 1 is true **and** either Expression 2 or Expression 3 is true.

Since the logical `and` operator has precedence over logical `or`, the `and` operator must be evaluated first. Interpretation 1 is correct.

## Grouping symbols

<Aside type='note'>

Only the [Expression Editor](/cf-dashboard/expression-preview-editor/) and the [Cloudflare API](/api/) support grouping symbols. The [Expression Builder](/cf-dashboard/create-edit-delete-rules/) does not.

</Aside>

The Firewall Rules language supports parentheses (`(`,`)`) as grouping symbols. Grouping symbols allow you to organize expressions, enforce precedence, and nest expressions.

### Group expressions

Use parentheses to explicitly group expressions that should be evaluated together. In this example, the parentheses do not alter the evaluation of the expression, but they unambiguously call out which logical operators to evaluate first.

```java
(Expression1 and Expression2) or Expression3
```

Because grouping symbols are so explicit, you are less likely to make errors if you use them when writing compound expressions.

### Enforce precedence

Grouping symbols are a powerful tool to enforce precedence for grouped elements of a compound expression. In this example, parentheses force the logical `or` operator to be evaluated before the logical `and`:

```java
Expression1 and (Expression2 or Expression3)
```

Without parentheses, the logical `and` operator would take precedence.

### Nest expressions

You can nest expressions grouped by parentheses inside other groups to create very precise, sophisticated expressions, such as this example for a rule designed to block access to a domain:

```sql
(
 (http.host eq "api.example.com" and http.request.uri.path eq "/api/v2/auth") or
 (http.host matches "^(www|store|blog)\.example.com" and http.request.uri.path contains "wp-login.php") or
 ip.geoip.country in {"CN" "TH" "US" "ID" "KR" "MY" "IT" "SG" "GB"} or ip.geoip.asnum in {12345 54321 11111}
) and not ip.src in {11.22.33.0/24}
```

Note that when evaluating the precedence of logical operators, parentheses inside strings delimited by quotes are ignored, such as those in the following regular expression, drawn from the example above:

```sql
"^(www|store|blog)\.example\.com"
```

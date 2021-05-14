---
order: 610
type: table
---

# Operators & grouping symbols

The Cloudflare Firewall Rules language supports comparison and logical operators:

- [Comparison operators](#comparison-operators) specify how values defined in an expression must relate to the actual HTTP request value for the expression to return `true`.
- [Logical operators](#logical-operators) combine two expressions to form a compound expression and use order of precedence to determine how an expression is evaluated.

[Grouping symbols](/cf-firewall-language/operators/#grouping-symbols) allow you to organize expressions, enforce precedence, and nest expressions.

## Comparison operators

Comparison operators return `true` when a value from an HTTP request matches a value defined in an expression.

This is the general pattern for using comparison operators:

```sql
<field> <comparison operator> <value>
```

The Cloudflare Firewall Rules language supports these comparison operators:

<Aside type='warning' header='Important'>

Access to the `matches` operator requires a Cloudflare Business or Enterprise plan.

</Aside>

<TableWrap style='width:100%'>
<table style='width:100%'>
  <thead>
   <tr>
      <th>Name</th>
      <th colspan="2" style="text-align:center">Operator Notation</th>
      <th colspan="3" style="text-align:center">Supported Data Types</th>
      <th></th>
   </tr>
   <tr>
      <td></td>
      <th>English</th>
      <th>C-like</th>
      <th>String</th>
      <th>IP</th>
      <th>Number</th>
      <th>Example (operator in bold)</th>
   </tr>
  </thead>
  <tbody>
    <tr>
      <td>Equal</td>
      <td><code class="InlineCode">eq</code></td>
      <td><code class="InlineCode">==</code></td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>
         <code class="InlineCode">http.request.uri.path <strong>eq</strong> "/articles/2008/"</code>
      </td>
     </tr>
    <tr>
      <td>Not equal</td>
      <td><code class="InlineCode">ne</code></td>
      <td><code class="InlineCode">!=</code></td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>
         <code class="InlineCode">ip.src <strong>ne</strong> 93.184.216.0</code>
      </td>
    </tr>
    <tr>
      <td>Less than</td>
      <td><code class="InlineCode">lt</code></td>
      <td><code class="InlineCode">&lt;</code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>
         <code class="InlineCode">cf.threat_score <strong>lt</strong> 10</code>
      </td>
   </tr>
   <tr>
      <td>Less than<br />or equal</td>
      <td><code class="InlineCode">le</code></td>
      <td><code class="InlineCode">&lt;=</code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>
         <code class="InlineCode">cf.threat_score <strong>le</strong> 20</code>
      </td>
    </tr>
    <tr>
      <td>Greater than</td>
      <td><code class="InlineCode">gt</code></td>
      <td><code class="InlineCode">></code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>
         <code class="InlineCode">cf.threat_score <strong>gt</strong> 25</code>
      </td>
    </tr>
    <tr>
      <td>Greater than<br />or equal</td>
      <td><code class="InlineCode">ge</code></td>
      <td><code class="InlineCode">&gt;=</code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#x2705;</td>
      <td>
         <code class="InlineCode">cf.threat_score <strong>ge</strong> 60</code>
      </td>
    </tr>
    <tr>
      <td>Exactly<br />contains</td>
      <td><code class="InlineCode">contains</code></td>
      <td></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">http.request.uri.path <strong>contains</strong> "/articles/"</code>
      </td>
    </tr>
    <tr>
      <td>Matches<br />regex</td>
      <td><code class="InlineCode">matches</code></td>
      <td><code class="InlineCode">~</code></td>
      <td>&#x2705;</td>
      <td>&#10060;</td>
      <td>&#10060;</td>
      <td>
         <code class="InlineCode">http.request.uri.path <strong>matches</strong> "^/articles/200[7-8]/$"</code>
      </td>
    </tr>
    <tr>
      <td>Value is in <br />a set of values</td>
      <td><code class="InlineCode">in</code></td>
      <td></td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>&#x2705;</td>
      <td>
         <code class="InlineCode">ip.src <strong>in</strong> {'{ 93.184.216.0 93.184.216.1 }'}</code>
      </td>
    </tr>
  </tbody>
</table>
</TableWrap>

## Logical operators

Logical operators combine two or more expressions into a single compound expression. A compound expression has this general syntax:

```sql
<expression> <logical operator> <expression>
```

### Supported logical operators

Each logical operator has an [order of precedence](#order-of-precedence). The order of precedence (along with [grouping symbols](#grouping-symbols)) determines the order in which Cloudflare evaluates logical operators in an expression. The `not` operator ranks first in order of precedence.

<TableWrap>
<table style='width:100%'>
  <thead>
   <tr>
      <th>Name</th>
      <th>English<br />Notation</th>
      <th>C-like<br />Notation</th>
      <th>Example</th>
      <th>Order of Precedence</th>
   </tr>
  </thead>
  <tbody>
   <tr>
      <td>Logical NOT</td>
      <td><code class="InlineCode">not</code></td>
      <td><code class="InlineCode">!</code></td>
      <td>
         <code class="InlineCode"><strong>not</strong> ( http.host eq "www.cloudflare.com" and ip.src in 93.184.216.0/24 )</code>
      </td>
      <td>1</td>
   </tr>
   <tr>
      <td>Logical AND</td>
      <td><code class="InlineCode">and</code></td>
      <td><code class="InlineCode">&amp;&amp;</code></td>
      <td>
         <code class="InlineCode">http.host eq "www.cloudflare.com" <strong>and</strong> ip.src in 93.184.216.0/24</code>
      </td>
      <td>2</td>
   </tr>
   <tr>
      <td>Logical XOR<br />
        (exclusive OR)</td>
      <td><code class="InlineCode">xor</code></td>
      <td><code class="InlineCode">^^</code></td>
      <td>
         <code class="InlineCode">http.host eq "www.cloudflare.com" <strong>xor</strong> ip.src in 93.184.216.0/24</code>
      </td>
      <td>3</td>
   </tr>
   <tr>
      <td>Logical OR</td>
      <td><code class="InlineCode">or</code></td>
      <td><code class="InlineCode">||</code></td>
      <td>
         <code class="InlineCode">http.host eq "www.cloudflare.com" <strong>or</strong> ip.src in 93.184.216.0/24</code>
      </td>
      <td>4</td>
   </tr>
  </tbody>
</table>
</TableWrap>

### Order of precedence

<Aside type='warning' header='Important'>

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

<Aside type='warning' header='Important'>

Only the [Expression Editor](/cf-dashboard/expression-preview-editor/) and the [Cloudflare API](/api/) support grouping symbols. The [Expression Builder](/cf-dashboard/create-edit-delete-rules/) does not.

</Aside>

The Firewall Rules language supports parentheses (`(`,`)`) as grouping symbols. Grouping symbols allow you to organize expressions, enforce precedence, and nest expressions.

### Group expressions

Use parentheses to explicitly group expressions that should be evaluated together. In this example, the parentheses do not alter the evaluation of the expression, but they unambiguously call out which logical operators to evaluate first.

```java
(Expression1 and Expression2) or Expression3
```

Because grouping symbols are so explicit, you are less likely to make errors when you use them to write compound expressions.

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

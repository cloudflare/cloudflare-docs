---
order: 210
---

# Fields And Expressions

## Overview

Every Cloudflare firewall rule, no matter how complex, is really just a combination of 2 elements: an **expression** and an **action**. Expressions define the criteria for an HTTP request to trigger an action; the action tells Cloudflare what to do with that request.

When an HTTP request reaches the firewall, Cloudflare compares values from the request to those defined in the expression. If the expression returns `true`, the expression matches, and Cloudflare triggers the action for that rule.

There are 2 interfaces in the **Firewall** app for creating expressions: the **Expression Builder** and the **Expression Editor**.

The Expression Builder’s visual interface allows you to build expressions without worrying about field names and syntax.

By comparison, the Expression Editor is text only, but it supports advanced features not available in the builder. You can find both in the **Firewall Rules** tab. The Cloudflare API provides an interface for programmatically managing expressions (see _[Cloudflare API: Filters](https://api.cloudflare.com/#filters-properties)_).

When working with Firewall Rules, you will encounter 2 kinds of expressions:

- **Simple expressions** compare a value from an HTTP request to a value defined in the expression. You can identify a simple expression by the presence of a **comparison operator** (_equals, less than_, for example).

- **Compound expressions** combine 2 or more simple expressions into a single
  expression. You can identify a compound expression by the presence of a **logical operator** (_and_, _or_, for example). Since each firewall rule can only contain a single expression, compound expressions allow you to tailor rules to specific use cases with a high degree of accuracy and precision.

## Simple expressions

### Elements of a simple expression

Simple expressions are composed of 3 elements:

1. A **field** that represents a property of an HTTP request.
2. A representative **value** for that field, which Firewall Rules will compare with the actual value from the request.
3. A **comparison operator**, which specifies how the value defined in the expression must relate to the actual value from the request for the operator to return <code><em>true</em></code>.

If the comparison operator returns <code>true</code>, the request matches the expression.

The Expression Builder screenshot below shows an expression for matching requests that do not originate in the United Kingdom.

![](../images/firewall-rules-expressions-explained-1.png)

Notice how the **Expression Preview** displays the expression in text:

ip.geoip.country ne "GB"

In this example, `ip.geoip.country` represents the country associated with the requesting client’s IP address, and the value `"GB"` represents the country code to match. The `ne` notation between them represents the _not equal_ comparison operator. Together, the expression specifies a match for any request with a country field value other than `GB`.

In general, the syntax for a simple expression is:

    <field> <comparison operator> <value>

For more on creating firewall rules using Cloudflare’s visual builder, see _[Expression Builder](/firewall/cf-dashboard/expression-preview-editor/)_.

### Supported comparison operators

This table lists supported comparison operators. Since some operators only support specific data types, the list is broken down by data type.

<TableWrap><table>

  <thead>
    <tr>
      <td colspan="7">
        <strong>Comparison Operators Supported in Firewall Rules</strong>
      </td>
    </tr>
    <tr>
      <td></td>
      <td colspan="2"><strong>Operator Notation</strong></td>
      <td colspan="3"><strong>Data Types Supported</strong></td>
      <td rowspan="2"><strong>Example (operator in bold)</strong></td>
    </tr>
    <tr>
      <td></td>
      <td><strong>English</strong></td>
      <td><strong>C-like</strong></td>
      <td><strong>String</strong></td>
      <td><strong>IP </strong></td>
      <td><strong>Number</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>Equal</strong>
      </td>
      <td>eq</td>
      <td>==</td>
      <td>✔</td>
      <td>✔</td>
      <td>✔</td>
      <td>http.request.uri.path <strong>eq</strong> "/articles/2008/"</td>
    </tr>
    <tr>
      <td><strong>Not equal</strong></td>
      <td>ne</td>
      <td>!=</td>
      <td>✔</td>
      <td>✔</td>
      <td>✔</td>
      <td>ip.src <strong>ne</strong> 93.184.216.0</td>
    </tr>
    <tr>
      <td><strong>Less than</strong></td>
      <td>lt</td>
      <td></td>
      <td>✔</td>
      <td>❌</td>
      <td>✔</td>
      <td>cf.threat_score <strong>lt</strong> 10</td>
    </tr>
    <tr>
      <td><strong>Less than or equal</strong></td>
      <td>le</td>
      <td>{'<='}</td>
      <td>✔</td>
      <td>❌</td>
      <td>✔</td>
      <td>cf.threat_score <strong>le</strong> 20</td>
    </tr>
    <tr>
      <td><strong>Greater than</strong></td>
      <td>gt</td>
      <td>></td>
      <td>✔</td>
      <td>❌</td>
      <td>✔</td>
      <td>cf.threat_score <strong>gt</strong> 25</td>
    </tr>
    <tr>
      <td><strong>Greater than or equal</strong></td>
      <td>ge</td>
      <td>>=</td>
      <td>✔</td>
      <td>❌</td>
      <td>✔</td>
      <td>cf.threat_score <strong>ge</strong> 60</td>
    </tr>
    <tr>
      <td><strong>Exactly contains</strong></td>
      <td>contains</td>
      <td></td>
      <td>✔</td>
      <td>❌</td>
      <td>❌</td>
      <td>http.request.uri.path <strong>contains</strong> "/articles/"</td>
    </tr>
    <tr>
      <td><strong>Matches Google re2 regular expression</strong></td>
      <td>matches</td>
      <td>~</td>
      <td>✔</td>
      <td>❌</td>
      <td>❌</td>
      <td>
        http.request.uri.path <strong>matches</strong> "^/articles/200[7-8]/$"
      </td>
    </tr>
    <tr>
      <td><strong>Value is in set of values</strong></td>
      <td>in</td>
      <td></td>
      <td>✔</td>
      <td>✔</td>
      <td>✔</td>
      <td>ip.src <strong>in</strong> {'{ 93.184.216.0 93.184.216.1 }'}</td>
    </tr>
  </tbody>
</table></TableWrap>

## Compound expressions

### Using logical operators to build compound expressions

A **compound expression** uses a **logical operator** (_and_, _or_, for example) to combine two or more expressions. Compound expressions are powerful because they allow you to build complex statements within a single expression.

For example, suppose we wanted to stop other sites from direct linking to our website’s content. To do that, we might start with an expression that matches on requests to our content URI:

        http.request.uri.path eq "/content/"

While this expression will match requests for content, it does not discriminate between internal and external requests. As is, this rule will match every content request, including those referred from our own domain. We need a way to match only external requests for content. Using the `and` operator, we can create a compound expression that does precisely that:

    http.referer ne ".example.com" and http.request.uri.path eq "/content/"

This compound expression only matches requests that satisfy each of the simple expressions within. That is because the logical `and` operator requires that both operands must be true for the compound expression to return `true`. The general syntax for a compound expression is:

    <expression> <logical operator> <expression>

Note that a compound expression can itself be one of the operands of a logical operator. In this way, you can use multiple operators to construct a compound expression from many individual expressions.

Compound expressions are easier to scan when displayed in the Expression Builder’s visual interface, and the Expression Preview is a great reference for learning to write more advanced expressions.

![](../images/firewall-rules-expressions-explained-2.png)

For more on writing advanced expressions, see _[Firewall Rules language](/firewall/cf-firewall-language/)_.

### Supported logical operators

Firewall Rules supports the following logical operators:

<TableWrap><table style="width: 100%">

  <thead>
    <tr>
      <td colspan="5">
        <strong>Logical Operators Supported in Firewall Rules</strong>
      </td>
    </tr>
    <tr>
      <td></td>
      <td>
        <strong>English</strong>
        <p />
        <strong>Notation</strong>
      </td>
      <td>
        <strong>C-like</strong>
        <p />
        <strong>Notation</strong>
      </td>
      <td><strong>Example (operator in boldface)</strong></td>
      <td><strong>Order of Precedence</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Logical NOT</strong></td>
      <td>not</td>
      <td>!</td>
      <td>
        <strong>not</strong> ( http.host eq "www.cloudflare.com" and ip.src in
        93.184.216.0/24 )
      </td>
      <td>1</td>
    </tr>
    <tr>
      <td><strong>Logical AND</strong></td>
      <td>and</td>
      <td>&&</td>
      <td>
        http.host eq "www.cloudflare.com" <strong>and</strong> ip.src in
        93.184.216.0/24
      </td>
      <td>2</td>
    </tr>
    <tr>
      <td><strong>Logical XOR \ (Exclusive OR)</strong></td>
      <td>xor</td>
      <td>^^</td>
      <td>
        http.host eq "www.cloudflare.com" <strong>xor</strong> ip.src in
        93.184.216.0/24
      </td>
      <td>3</td>
    </tr>
    <tr>
      <td><strong>Logical OR</strong></td>
      <td>or</td>
      <td>||</td>
      <td>
        http.host eq "www.cloudflare.com" <strong>or</strong> ip.src in
        93.184.216.0/24
      </td>
      <td>4</td>
    </tr>
  </tbody>
</table></TableWrap>

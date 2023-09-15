---
title: Edit in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Edit expressions in the dashboard
  description: Edit expressions in the Cloudflare dashboard using the Expression Builder, which allows for a visual approach, or using the Expression Editor, in which you type the expression.
---

# Edit expressions in the dashboard

In the Cloudflare dashboard, there are two options for editing [expressions](/ruleset-engine/rules-language/expressions/):

* **Expression Builder**: Allows you to create expressions using drop-down lists, emphasizing a visual approach to defining an expression.
* **Expression Editor**: A text-only interface that supports advanced features, such as grouping symbols and functions for transforming and validating values.

In general, you can switch back and forth between the Expression Builder and the Expression Editor. However, the Expression Builder does not support [nested expressions](#create-nested-expressions).

## Expression Builder

The Expression Builder allows you to visually create rule expressions by using drop-down lists and entering field values to define one or multiple sub-expressions.

![The Expression Builder interface used to visually define expressions](/images/ruleset-engine/language/expression-builder.png)

The **Expression Preview** displays the expression in text:

```sql
(ip.geoip.country ne "GB")
```

## Expression Editor

The **Expression Editor** is a text-only interface for defining rule expressions that supports the entire specification of Cloudflare's [Rules language](/ruleset-engine/rules-language/), including parentheses as grouping symbols.

![The Expression Editor used to enter advanced expressions](/images/ruleset-engine/language/expression-editor.png)

To access the Expression Editor, select **Edit expression** next to the **Expression Preview**:

![Selecting Edit expression in the Create firewall rule page to switch to the Expression Editor](/images/ruleset-engine/language/expression-builder.png)

To switch back from the Expression Editor to the Expression Builder, select **Use expression builder**.

### Create nested expressions

The Expression Editor supports parentheses as [grouping symbols](/ruleset-engine/rules-language/operators/#grouping-symbols). Use parentheses to explicitly group and nest expressions and, in turn, create highly targeted expressions.

The following rule expression will match requests from any visitor who is not from Malaysia and tries to access WordPress URI paths.

```txt
((http.request.uri.path contains "/xmlrpc.php") or (http.request.uri.path
contains "/wp-login.php") or (http.request.uri.path contains "/wp-admin/"
and not http.request.uri.path contains "/wp-admin/admin-ajax.php" and not
http.request.uri.path contains "/wp-admin/theme-editor.php")) and
ip.geoip.country ne "MY"
```

Only the Expression Editor supports nested expressions such as the one above. If you create a rule with nested expressions in the Expression Editor and try to switch to the Expression Builder, a dialog will warn you that the expression is not supported in the builder. You will be prompted to **Discard changes** and switch to the Expression Builder or **Cancel** and continue working in the editor.

{{<Aside type="note" header="Note">}}
String comparison in rule expressions is case sensitive. To account for possible variations of string capitalization in an expression, you can use the [`lower()`](/ruleset-engine/rules-language/functions/#function-lower) function and compare the result with a lowercased string, like in the following example:

```txt
lower(http.request.uri.path) contains "/wp-login.php"
```
{{</Aside>}}

## Expression validation

Cloudflare validates all expressions before saving them, so if your expression has errors, you will receive an error message in the Cloudflare dashboard, similar to the following:

```txt
Filter parsing error (1:313): ((http.request.uri.path contains
"/xmlrpc.php") or (http.request.uri.path contains "/wp-login.php") or
(http.request.uri.path contains "/wp-admin/" and not
http.request.uri.path contains "/wp-admin/admin-ajax.php" and not
http.request.uri.path contains "/wp-admin/theme-editor.php")) and
ip.geoip.country ne "MY") ^ unrecognised input
```

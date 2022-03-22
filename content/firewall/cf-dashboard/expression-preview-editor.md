---
title: Edit rule expressions
pcx-content-type: how-to
weight: 321
meta:
  title: Edit firewall rule expressions
---

# Edit firewall rule expressions

## Overview

The **Expression Editor** is a text-only interface for creating firewall rule expressions. Although it lacks the visual simplicity of the Expression Builder, the Expression Editor supports the entire specification of Cloudflare's [Rules language](/ruleset-engine/rules-language/).

For example, only the Expression Editor supports grouping symbols. Cloudflare designed the Rules language with [Wireshark Display Filters®](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html) in mind, so although there are some subtle differences, Wireshark users should feel right at home with Cloudflare rules and be able to easily port their existing rules to Cloudflare.

{{<Aside type="warning" header="Important">}}

Firewall rule expressions have a 4 KB limit (approximately 4,000 text characters). This limit applies whether you use the visual **Expression Builder** or edit your expression manually in the **Expression Editor**.

{{</Aside>}}

## Use the Expression Editor

The Expression Editor is located in the **Create firewall rule** and **Edit firewall rule** panels. The editor supports all available [Rules language](/ruleset-engine/rules-language/) fields, operators, and transformation functions. It also supports parentheses as grouping symbols.

To edit an expression in the editor:

1. In **Security** > **WAF** > **Firewall rules**, click **Create a firewall rule** to create a new rule, or click the **wrench** icon to edit an existing rule.

1. In the **Create firewall rule** page, switch to the Expression Editor by clicking **Edit expression**.

    ![Clicking Edit expression in the Create firewall rule page to switch to the Expression Editor](/firewall/static/firewall-rules-expression-builder-0.png)

1. Use the text input to edit your expression. To commit your changes, click **Deploy** or **Save as draft**.

To switch from the editor to the Expression Builder, click **Use expression builder**.

![Clicking Use expression builder in the Create firewall rule page to switch to the Expression Builder](/firewall/static/firewall-rules-expression-editor-0.png)

In general, you can switch back and forth between the Expression Builder and the Expression Editor. However, if you use parentheses to nest expressions in the editor, you will not be able to switch to the Expression Builder, because the builder does not support nested expressions.

## Create nested expressions

A key advantage of the Expression Editor is support for parentheses as [grouping symbols](/ruleset-engine/rules-language/operators/#grouping-symbols), which allow you to explicitly group and nest expressions and, in turn, create highly targeted expressions.

The following rule expression example challenges any visitor who is not from Malaysia and tries to access WordPress URI paths.

```txt
((http.request.uri.path contains "/xmlrpc.php") or (http.request.uri.path 
contains "/wp-login.php") or (http.request.uri.path contains "/wp-admin/" 
and not http.request.uri.path contains "/wp-admin/admin-ajax.php" and not 
http.request.uri.path contains "/wp-admin/theme-editor.php")) and 
ip.geoip.country ne "MY"
```

Only the Expression Editor supports nested expressions such as the one above. If you create a rule with nested expressions in the Expression Editor and try to switch to the Expression Builder, a dialog will warn you that the expression is not supported in the builder. You will be prompted to **Discard changes** and switch to the Expression Builder or **Cancel** and continue working in the editor.

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

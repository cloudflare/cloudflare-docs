---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 1
meta:
  title: Rules troubleshooting
  description: Review common troubleshooting scenarios for Rules features.
---

# Rules troubleshooting

## Interaction between Cloudflare challenges and Rules features

If you are issuing a [challenge](/waf/reference/cloudflare-challenges/) for a given URI path that has one or more Rules features enabled, you should exclude URI paths starting with `/cdn-cgi/challenge-platform/` in your rule expressions to avoid challenge loops.

For example, define a compound expression for your rule using the `and` operator and the [`starts_with()`](/ruleset-engine/rules-language/functions/#function-starts_with) function:

```txt
<OTHER_RULE_CONDITIONS> and not starts_with(http.request.uri, "/cdn-cgi/challenge-platform/")
```

## URL rewrites affect other Rules features executed later

If you rewrite a URI path using a [URL rewrite](/rules/transform/url-rewrite/), this may affect other Rules features executed later — such as [Origin Rules](/rules/origin-rules/) — if they include the URI path in their filter expression.

Consider the following origin rule configuration:

{{<example>}}
* Rule expression: `http.host == "example.com" and starts_with(http.request.uri.path, "/downloads/")`
* **Host header** > **Rewrite to**: `assets.example.com`
{{</example>}}

If you configure a new URL rewrite with the following configuration:

{{<example>}}
* Rule expression: `http.host == "example.com" and starts_with(http.request.uri.path, "/downloads/")`
* **Path** > **Rewrite to** > **Dynamic**: `regex_replace(http.request.uri.path, "^/downloads/", "/")`
{{</example>}}

The origin rule will no longer match `/downloads/*` paths, since URL rewrites run before Origin Rules and the URI path will be rewritten from `"/downloads/"` to `"/"`.

### Solution

To prevent this situation, use raw fields in your rule expression. Raw fields are immutable during the entire request evaluation workflow, and they are not affected by the actions of previously matched rules.

In the current example, you could use the `raw.http.request.uri.path` field in both rules:

**URL rewrite**

{{<example>}}
* Rule expression: `http.host == "example.com" and starts_with(raw.http.request.uri.path, "/downloads/")`
* **Path** > **Rewrite to** > **Dynamic**: `regex_replace(raw.http.request.uri.path, "^/downloads/", "/")`
{{</example>}}

**Origin rule**

{{<example>}}
* Rule expression: `http.host == "example.com" and starts_with(raw.http.request.uri.path, "/downloads/")`
* **Host header** > **Rewrite to**: `assets.example.com`
{{</example>}}

This way, the two rules will work as intended. Additionally, this allows you to use the same expression in the two rules, even when the first rule is updating the URI path value.

For a list of raw fields, refer to the [Fields](/ruleset-engine/rules-language/fields/) reference page.

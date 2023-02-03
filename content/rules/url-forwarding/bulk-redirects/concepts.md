---
title: Concepts
pcx_content_type: concept
weight: 3
meta:
  title: Bulk Redirect concepts
  description: Bulk Redirects work through a combination of URL redirects, a Bulk Redirect list, and a Bulk Redirect rule.
---

# Bulk Redirect concepts

Bulk Redirects involve the following elements:

- **URL redirect**: A simple object with a source URL, a target URL, a status code, and redirect parameters. URL redirects are the list items of Bulk Redirect Lists.

- **Bulk Redirect List**: A list, similar to an IP List, containing one or more URL redirects. To enable all the URL redirects in a Bulk Redirect List, reference the list in a Bulk Redirect Rule. Different Bulk Redirect Rules can reference the same Bulk Redirect List.

- **Bulk Redirect Rule**: A rule powered by the Ruleset Engine, similar to a [Transform Rule](/rules/transform/). A Bulk Redirect Rule has an associated Bulk Redirect List.

A Bulk Redirect Rule enables a Bulk Redirect List, which contains one or more URL redirects.

![Diagram outlining the hierarchy relationship between Bulk Redirect Rules, Bulk Redirect Lists, and URL redirects](/rules/static/bulk-redirects/concepts-diagram.png)

The following example defines a Bulk Redirect List named `list_b` with two URL redirects:

{{<example>}}

**`list_b` Bulk Redirect List**

| Source URL                | Target URL                 | Status code         |
| ------------------------- | -------------------------- | ------------------- |
| `example.com/about`       | `https://example.com/news` | `301` (the default) |
| `example.com/new_feature` | `https://example.com/soon` | `302`               |

{{</example>}}

The following Bulk Redirect Rule, named `Rule 2`, enables the URL redirects in the `list_b` Bulk Redirect List:

{{<example>}}

**`Rule 2` Bulk Redirect Rule**

- **Rule name**: `Rule 2`
- **Associated list**: `list_b`

{{</example>}}

## URL redirects

A URL redirect allows you to configure a source URL, a target URL, a status code, and redirect parameters.

When specifying the source URL, use the available redirect parameters instead of wildcards, which are not supported. For example, the **Include subdomains** parameter allows you to configure a single URL redirect that applies both to subdomains (for example, `https://b.example.com` and `https://a.b.example.com`) and to the apex domain (`https://example.com`). Other parameters allow you to specify how the source URL’s path and query string are handled. For more information, refer to [How it works](/rules/url-forwarding/bulk-redirects/how-it-works/).

URL redirects are the list items of Bulk Redirect Lists.

## Bulk Redirect Lists

Bulk Redirect Lists allow you to create distinct groups of URL redirects for different purposes. You can use a Bulk Redirect List in one or more Bulk Redirect Rules.

A Bulk Redirect List does not perform any redirects on its own — you must reference the list in a Bulk Redirect Rule to enable the redirects in the list.

A Bulk Redirect List cannot contain several URL redirects with the exact same source URL.

For details on the CSV format for importing items to a Bulk Redirect List, refer to [CSV file format](/rules/url-forwarding/bulk-redirects/reference/csv-file-format/).

{{<Aside type="note">}}

You can only reference Bulk Redirect Lists in Bulk Redirect Rules. Other types of rules powered by the Ruleset Engine do not support Bulk Redirect Lists.

{{</Aside>}}

## Bulk Redirect Rules

Bulk Redirect Rules are rules powered by the Ruleset Engine that enable one or more URL redirects through a Bulk Redirect List.

When you configure a Bulk Redirect Rule, you associate a Bulk Redirect List to it, which enables all the URL redirects in that list. You can create a rule for each list, or have many Bulk Redirect Rules referencing the same Bulk Redirect List.

A Bulk Redirect Rule, like all rules powered by the Ruleset Engine, has an action and an expression. Besides these two properties, it also has a name, an optional description, an associated Bulk Redirect List, and a key.

### Expression

The rule expression, or filter expression, specifies the conditions that must be met for the rule to run. By default, all URL redirects of the specified list will apply.

The default expression of a Bulk Redirect Rule is the following:

```txt
http.request.full_uri in $<LIST_NAME>
```

This expression means that the request URL, after some basic normalization (if [URL normalization](/rules/normalization/) is enabled), should match the source URL of a URL redirect in the list `<LIST_NAME>` for the redirect to be applied.

You can use an expression different from the default one to increase the specificity of URL redirect matches. For example, if you set the expression of a Bulk Redirect Rule to the following expression, there will only be a match for requests coming from the United Kingdom:

```txt
ip.src.country == "GB" and http.request.full_uri in $<LIST_NAME>
```

For more information on the available fields, refer to [Available fields and functions](/rules/url-forwarding/bulk-redirects/reference/fields-functions/).

{{<Aside type="note" header="Note">}}

At the left of the `in` operator you can only use fields directly and not values returned by a function. In most situations, you will want to use one of the following fields with the `in` operator:

- `http.request.full_uri`
- `raw.http.request.full_uri`

Refer to [Fields](/ruleset-engine/rules-language/fields/) for more information.

{{</Aside>}}

### Key

The rule key is used in combination with the Bulk Redirect List associated with the rule to select the URL redirect to apply.

When there is a match for the rule expression, Cloudflare compares the value of the rule key with the source URL of each URL redirect in the associated Bulk Redirect List, searching for a match.

The key should be either `http.request.full_uri` or `raw.http.request.full_uri`. Use `raw.http.request.full_uri` to compare the URI received by the web server, before normalization, with the source URLs in the Bulk Redirect List.

The URI field used in the key must be the same as the URI field used in the expression. Otherwise, you may have a match for the rule expression, but no match for any of the source URLs in the list. For example, if you set the key to `http.request.full_uri`, the field used in the rule expression must also be `http.request.full_uri`. Conversely, if you set the key to `raw.http.request.full_uri`, the field used in the expression must be `raw.http.request.full_uri`.

---
pcx_content_type: example
summary: A redirect rule where visitors from an old URL format that included the locale are redirected to the new format.
product:
  - Redirect Rules
title: Remove locale information from URL path
---

# Remove locale information from URL path

This example dynamic redirect for zone `example.com` will redirect visitors from an old URL format that included the locale (for example, `/en-us/<page_name>`) to the new format `/<page_name>`.

{{<example>}}

**When incoming requests match**

* **Field:** _URI Path_
* **Operator:** _matches regex_
* **Value:** `^/[A-Za-z]{2}-[A-Za-z]{2}/`

If you are using the Expression Editor, enter the following expression:<br>
`http.request.uri.path matches "^/[A-Za-z]{2}-[A-Za-z]{2}/"`

**Then**

* **Type:** _Dynamic_
* **Expression:** `regex_replace(http.request.uri.path, "^/[A-Za-z]{2}-[A-Za-z]{2}/(.*)", "/${1}")`
* **Status code:** _301_
* **Preserve query string:** Enabled

{{</example>}}

The function [`regex_replace()`](/ruleset-engine/rules-language/functions/#function-regex_replace) allows you to extract parts of the URL using regular expressions' capture groups. Create capture groups by putting part of the regular expression in parentheses. Then, reference a capture group using `${<num>}` in the replacement string, where `<num>` is the number of the capture group.

For example, the redirect rule would perform the following redirects:

Request URL                             | Target URL                        | Status code
----------------------------------------|-----------------------------------|------------
`example.com/en-us/meet-our-team`       | `example.com/meet-our-team`       | `301`
`example.com/pt-BR/meet-our-team`       | `example.com/meet-our-team`       | `301`
`example.com/en-us/calendar?view=month` | `example.com/calendar?view=month` | `301`
`example.com/meet-our-team`             | (unchanged)                       | n/a
`example.com/robots.txt`                | (unchanged)                       | n/a

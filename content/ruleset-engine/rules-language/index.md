---
pcx-content-type: reference
order: 775
---

# Rules language

The Cloudflare Rules language is a flexible and intuitive specification for building rule expressions. Based on the widely known [Wireshark display filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html), the Rules language allows you to precisely target HTTP requests with a syntax and semantics familiar to security engineers.

When evaluating a rule, Cloudflare compares values associated with an HTTP request to those defined in the rule's [expression](/rules-language/expressions). If the expression evaluates `true`, Cloudflare triggers the [action](/rules-language/actions) for that rule.

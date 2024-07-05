---
_build:
  publishResources: false
  render: never
  list: never
---

The execution order of Rules features is the following:

* [Origin Rules](/rules/origin-rules/)
* [Cache Rules](/cache/how-to/cache-rules/)
* [Configuration Rules](/rules/configuration-rules/)
* [Single Redirects](/rules/url-forwarding/single-redirects/)
* [Bulk Redirects](/rules/url-forwarding/bulk-redirects/)
* [Snippets](/rules/snippets/)

The different types of rules listed above will take precedence over [Page Rules](/rules/page-rules/). This means that Page Rules will be overridden if there is a match for both Page Rules and the Rules products listed above.

{{<render file="_rule-terminating-actions.md" productFolder="ruleset-engine">}}

{{<render file="_challenge-issues.md" withParameters="Rules features">}}
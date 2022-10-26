---
_build:
  publishResources: false
  render: never
  list: never
---

The execution order of Rules products is the following:

* [Origin Rules](/rules/origin-rules/)
* [Cache Rules](/cache/about/cache-rules/)
* [Configuration Rules](/rules/configuration-rules/)
* [Dynamic Redirects](/rules/url-forwarding/dynamic-redirects/)

The different types of rules listed above will take precedence over [Page Rules](https://support.cloudflare.com/hc/articles/218411427). This means that Page Rules will be overridden if there is a match for both Page Rules and the Rules products listed above.
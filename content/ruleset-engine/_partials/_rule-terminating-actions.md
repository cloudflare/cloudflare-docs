---
_build:
  publishResources: false
  render: never
  list: never
---

Generally speaking, for [non-terminating actions](/ruleset-engine/rules-language/actions/) the last change made by rules in the same [phase](/ruleset-engine/about/phases/) will win (later rules can overwrite changes done by previous rules). However, for terminating actions (_Block_, _Redirect_, or one of the challenge actions), rule evaluation will stop and the action will be executed immediately.

For example, if multiple rules with the _Redirect_ action match, Cloudflare will always use the URL redirect of the first rule that matches. Also, if you configure URL redirects using different Cloudflare products (Single Redirects and Bulk Redirects), the product executed first will apply, if there is a rule match (in this case, Single Redirects). Refer to the [Phases list](/ruleset-engine/reference/phases-list/) for the product execution order.

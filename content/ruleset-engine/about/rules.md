---
title: Rules
pcx_content_type: concept
weight: 4
---

# Rules

A **rule** defines a filter and an action to perform on the incoming requests that match the filter. The rule filter **expression** defines the scope of the rule and the rule **action** defines what happens when there is a match for the expression. Rule filter expressions are defined using the [Rules language](/ruleset-engine/rules-language/).

For example, consider the following ruleset with four rules (R1, R2, R3, and R4). For a given incoming request, the expression of the first two rules matches the request properties. Therefore, the action for these rules runs (_Execute_ and _Log_, respectively). The action of the first rule executes a managed ruleset, which means that every rule in the managed ruleset is evaluated. The action of the second rule logs an event associated with the current phase. There is no match for the expressions of rules 3 and 4, so their actions do not run. Since no rule blocks the request, it proceeds to the next phase.

![Example of a rule execution scenario. Defines a ruleset with four rules, where the first rule executes a managed ruleset.](/images/ruleset-engine/rulesets-rules-example.png)

Rules can have additional features through specific Cloudflare products. You may have more fields available for rule expressions, perform different actions, or configure additional behavior in a given phase.

## Rule evaluation

When evaluating a rule, Cloudflare compares the values of request/response properties or derived values (obtained through [fields](/ruleset-engine/rules-language/fields/)) to those defined in the rule's filter expression.

If the entire expression evaluates to `true`, there is a rule match and Cloudflare triggers the [action](/ruleset-engine/rules-language/actions/) configured in the rule. If the expression evaluates to `false`, the rule does not match and its configured action is not applied.

When you use `true` as the rule filter expression, this means "apply the rule to every incoming request" at the current [phase](/ruleset-engine/about/phases/) level, which can be zone or account.

{{<Aside type="note" header="Notes">}}
* A rule filter expression must evaluate to a boolean value (either `true` or `false`).
* Rules of specific Cloudflare products, such as [Transform Rules](/rules/transform/), may include other expressions used to specify dynamic values. These expressions do not have to evaluate to a boolean value.
{{</Aside>}}

### Field values during rule evaluation

While evaluating rules for a given request/response, the values of all request and response [fields](/ruleset-engine/rules-language/fields/) are immutable within each phase. However, field values may change between phases.

For example:

- If a [rewrite URL rule](/rules/transform/url-rewrite/) #1 updates the URI path or the query string of a request, Rewrite URL Rule #2 will not take these earlier changes into consideration.
- If an [HTTP request header modification rule](/rules/transform/request-header-modification/) #1 sets the value of a request header, HTTP request header modification rule #2 will not be able to read or evaluate this new value.
- If a rewrite URL rule updates the URI path or query string of a request, the `http.request.uri`, `http.request.uri.*`, and `http.request.full_uri` fields will have a different value in phases after the `http_request_transform` phase (where rewrite URL rules are executed).

{{<Aside type="note">}}
If you want to use the original field values in rules evaluated later, you can use raw fields (for example, `raw.http.request.uri.path`) in their expressions. These special fields are immutable during the entire request evaluation workflow. For a list of raw fields, refer to [Fields](/ruleset-engine/rules-language/fields/).
{{</Aside>}}
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

## Rule evaluation and field values

While evaluating rules for a given request/response, the values of all request and response [fields](/ruleset-engine/rules-language/fields/) are immutable within each phase. However, field values may change between phases.

For example:

- If a [Rewrite URL Rule](/rules/transform/url-rewrite/) #1 updates the URI path or the query string of a request, Rewrite URL Rule #2 will not take these earlier changes into consideration.
- If a [HTTP Request Header Modification Rule](/rules/transform/request-header-modification/) #1 sets the value of a request header, HTTP Request Header Modification Rule #2 will not be able to read or evaluate this new value.
- If a Rewrite URL Rule updates the URI path or query string of a request, the `http.request.uri`, `http.request.uri.*`, and `http.request.full_uri` fields will have a different value in phases after the `http_request_transform` phase (where Rewrite URL Rules are executed).

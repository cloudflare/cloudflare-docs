---
title: Rules
pcx_content_type: concept
weight: 4
---

# Rules

A **rule** defines a filter and an action to perform on the incoming requests that match the filter. The rule filter **expression** defines the scope of the rule and the rule **action** defines what happens when there is a match for the expression. Rule filter expressions are defined using the [Rules language](/ruleset-engine/rules-language/).

For example, consider the following ruleset with four rules (R1, R2, R3, and R4). For a given incoming request, the expression of the first two rules matches the request properties. Therefore, the action for these rules runs (_Execute_ and _Log_, respectively). The action of the first rule executes a managed ruleset, which means that every rule in the managed ruleset is evaluated. The action of the second rule logs an event associated with the current phase. There is no match for the expressions of rules 3 and 4, so their actions do not run. Since no rule blocks the request, it proceeds to the next phase.

![Example of a rule execution scenario. Defines a ruleset with four rules, where the first rule executes a managed ruleset.](/ruleset-engine/static/rulesets-rules-example.png)

Rules can have additional features through specific Cloudflare products. You may have more fields available for rule expressions, perform different actions, or configure additional behavior in a given phase.

## Rule evaluation

The following sections contain important information on how Cloudflare evaluates rules and their configuration.

### Field values

While evaluating rules for a given request/response, the values of all request and response [fields](/ruleset-engine/rules-language/fields/) are immutable within each phase. However, field values may change between phases.

For example:

- If a [Rewrite URL Rule](/rules/transform/url-rewrite/) #1 updates the URI path or the query string of a request, Rewrite URL Rule #2 will not take these earlier changes into consideration.
- If a [HTTP Request Header Modification Rule](/rules/transform/request-header-modification/) #1 sets the value of a request header, HTTP Request Header Modification Rule #2 will not be able to read or evaluate this new value.
- If a Rewrite URL Rule updates the URI path or query string of a request, the `http.request.uri`, `http.request.uri.*`, and `http.request.full_uri` fields will have a different value in phases after the `http_request_transform` phase (where Rewrite URL Rules are executed).

### Multiple rule matches with the same action

Rules in a phase ruleset are evaluated in order. Cloudflare applies the actions for the matching rules after evaluating all the rules in the ruleset.

Each rule action may support configuration parameters in an `action_parameters` configuration object.

If two or more rules with the same action match an incoming request, the `action_parameters` object of those rules (if defined) is merged. While merging two configuration objects, the configuration settings of later rules will override the settings defined in previous rules, updating or adding configuration properties. The final configuration used by Cloudflare when applying a given action will be this merged version of the action configuration.

For example, if you configure the following two [Origin Rules](/rules/origin-rules/) and both rules match, Cloudflare will use the destination port set by the first rule, and the DNS hostname override and `Host` header value set by the second rule.

```json
{
  "rules": [
    {
      "expression": "http.request.uri.query contains \"/eu/\"",
      "description": "Origin Rule #1",
      "action": "route",
      "action_parameters": {
        "host_header": "example.com",
        "origin": {
          "port": 8081
        }
      }
    },
    {
      "expression": "http.request.uri.query contains \"/eu/\"",
      "description": "Origin Rule #2",
      "action": "route",
      "action_parameters": {
        "host_header": "example.net",
        "origin": {
          "host": "example.net",
        }
      }
    }
  ]
}
```

The merged configuration for the `route` action would be the following:

Parameter         | Value
------------------|--------------
`host_header`     | `example.net`
`origin` > `port` | `8081`
`origin` > `host` | `example.net`

If you also configured a destination port in rule #2, that value would override the `8081` destination port defined in rule #1.
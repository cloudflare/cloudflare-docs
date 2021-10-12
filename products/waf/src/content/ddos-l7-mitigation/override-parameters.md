---
title: Managed Ruleset parameters
pcx-content-type: reference
order: 3
---

# HTTP DDoS Managed Ruleset parameters

Configure the Cloudflare HTTP DDoS Managed Ruleset to change the action applied to a given attack or modify the sensitivity level of the detection mechanism. You can [configure the Managed Ruleset in the Cloudflare dashboard](/ddos-l7-mitigation/configure-dashboard) or [define overrides via Rulesets API](/ddos-l7-mitigation/configure-api).

The available parameters are the following:

* [Action](#action)
* [Sensitivity](#sensitivity)

## Action

API property name: `"action"`.

The action that the WAF will perform for requests that match specific rules of Cloudflare's DDoS mitigation services. The available actions are:

<Definitions>

- **Log**
    - API value: `"log"`.
    - Only available on Enterprise plans. Logs requests that match the expression of a rule detecting layer 7 DDoS attacks. Recommended for validating a rule before committing to a more severe action.

- **Block**
    - API value: `"block"`.
    - Blocks HTTP requests that match the rule expression.

- **Challenge (CAPTCHA)**
    - API value: `"challenge"`.
    - Presents a CAPTCHA challenge to the clients making HTTP requests that match a rule expression.

- **Force Connection Close**
    - API value: _N/A_ (internal rule action that you cannot use in overrides).
    - Closes ongoing HTTP connections. This action does not block a request, but it forces the client to reconnect.
    - The performed action depends on the HTTP version:

      - HTTP/1: set the [`Connection` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#directives) to `close`.
      - HTTP/2: send a [`GOAWAY` frame](https://datatracker.ietf.org/doc/html/rfc7540#section-6.8) to the client.

- **DDoS Dynamic**
    - API value: _N/A_ (internal rule action that you cannot use in overrides).
    - Performs a specific action according to a set of internal guidelines defined by Cloudflare. The executed action can be one of the above or an undisclosed mitigation action.

</Definitions>

<Aside type='warning' header='Important'>

You cannot configure the rule action to _Log_ for rules with the `gatebot` tag or any rule whose `id` starts with `GB`.

However, you can use the _Log_ action in the global ruleset configuration. In this case, any rule with the `gatebot` tag or whose `id` starts with `GB` will ignore the ruleset configuration and use the default action as defined in the Managed Ruleset.

</Aside>

## Sensitivity

API property name: `"sensitivity_level"`.

Defines how sensitive a rule is. Affects the thresholds used to determine if an attack should be mitigated. A higher sensitivity level means having a lower threshold, while a lower sensitivity level means having a higher threshold.

The available sensitivity levels are:

UI value          | API value
------------------|----------
_High_            | `"default"`
_Medium_          | `"medium"`
_Low_             | `"low"`
_Essentially Off_ | `"eoff"`

You cannot increase the sensitivity level beyond _High_ (`"default"`).

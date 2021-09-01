---
title: Managed Ruleset parameters
pcx-content-type: reference
order: 3
---

# L3/4 DDoS Managed Ruleset parameters

Configure the Cloudflare L3/4 DDoS Managed Ruleset to change the action applied to a given attack or modify the sensitivity level of the detection mechanism. To customize these parameters, [define overrides via Rulesets API](/ddos-l34-mitigation/configure-api).

The available parameters are the following:

* Action
* Sensitivity

## Action

API property name: `"action"`.

The action performed for packets that match specific rules of Cloudflare's DDoS mitigation services. The available actions are:

<Definitions>

- **Block**
    - API value: `"block"`.
    - Blocks IP packets that match the rule expression given the sensitivity levels.

- **DDoS Dynamic**
    - API value: _N/A_ (internal rule action that you cannot use in overrides).
    - Performs a specific action according to a set of internal guidelines defined by Cloudflare. The executed action can be _Block_ or an undisclosed mitigation action.

</Definitions>

## Sensitivity

API property name: `"sensitivity_level"`.

Defines how sensitive a rule is. Affects the thresholds used to determine if an attack should be mitigated. A higher sensitivity level means having a lower threshold, while a lower sensitivity level means having a higher threshold.

The available sensitivity levels are:

Sensitivity     | API value
----------------|----------
High            | `"default"`
Medium          | `"medium"`
Low             | `"low"`
Essentially Off | `"eoff"`

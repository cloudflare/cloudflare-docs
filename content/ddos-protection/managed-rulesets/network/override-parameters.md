---
title: Parameters
pcx_content_type: reference
weight: 5
meta:
  title: Network-layer DDoS Attack Protection parameters
---

# Ruleset parameters

Define overrides for the Network-layer DDoS Attack Protection Managed Ruleset to change the action applied to a given attack or modify the sensitivity level of the detection mechanism. You can [define overrides in the Cloudflare dashboard](/ddos-protection/managed-rulesets/network/configure-dashboard/) or [define overrides via Rulesets API](/ddos-protection/managed-rulesets/network/configure-api/).

The available parameters are the following:

- Action
- Sensitivity Level

## Action

API property name: `"action"`.

The action performed for packets that match specific rules of Cloudflare's DDoS mitigation services. The available actions are:

{{<definitions>}}

- **Log**
    - API value: `"log"`.
    - Only available on Enterprise plans. Logs requests that match the expression of a rule detecting network layer DDoS attacks. Recommended for validating a rule before committing to a more severe action.

- **Block**
    - API value: `"block"`.
    - Blocks IP packets that match the rule expression given the sensitivity levels.

- **DDoS Dynamic**
    - API value: _N/A_ (internal rule action that you cannot use in overrides).
    - Performs a specific action according to a set of internal guidelines defined by Cloudflare. The executed action can be _Block_ or an undisclosed mitigation action.

{{</definitions>}}

## Sensitivity Level

API property name: `"sensitivity_level"`.

Defines how sensitive a rule is. Affects the thresholds used to determine if an attack should be mitigated. A higher sensitivity level means having a lower threshold, while a lower sensitivity level means having a higher threshold.

The available sensitivity levels are:

| UI Value          | API value   |
| ----------------- | ----------- |
| _High_            | `"default"` |
| _Medium_          | `"medium"`  |
| _Low_             | `"low"`     |
| _Essentially Off_ | `"eoff"`    |

In most cases, when you select the _Essentially Off_ sensitivity level the rule will not trigger for any of the selected actions, including _Log_. However, if the attack is extremely large, Cloudflare's protection systems will still trigger the rule's mitigation action to protect Cloudflare's network.

---
title: Parameters
pcx_content_type: reference
weight: 5
meta:
  title: Network-layer DDoS Attack Protection parameters
---

# Ruleset parameters

Define overrides for the Network-layer DDoS Attack Protection managed ruleset to change the action applied to a given attack or modify the sensitivity level of the detection mechanism. You can [define overrides in the Cloudflare dashboard](/ddos-protection/managed-rulesets/network/configure-dashboard/) or [define overrides via Rulesets API](/ddos-protection/managed-rulesets/network/configure-api/).

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

{{<render file="managed-rulesets/_sensitivity-level-reference.md">}}

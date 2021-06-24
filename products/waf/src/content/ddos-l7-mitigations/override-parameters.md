---
title: Managed Ruleset override parameters
pcx-content-type: reference
order: 3
---

# DDoS L7 Attack Mitigation Managed Ruleset override parameters

Configure overrides for the DDoS L7 Attack Mitigation Managed Ruleset to change the action applied to a given attack or modify the sensitivity level of the detection mechanism. Define these overrides at the account level or at the zone level.

You can override the following rule properties:

* [Action](#action)
* [Sensitivity](#sensitivity)

<Aside type='warning'>

Currently, you can only configure overrides for the DDoS L7 Attack Mitigation Managed Ruleset via API.

</Aside>

## Action

The action that the WAF will perform for requests that match specific rules of Cloudflare's DDoS mitigation services. The available actions are:

<Definitions>

- _**Log**_ | API value: `log`
    - Only available on Enterprise plans. Logs requests that match the expression of a rule detecting layer-7 DDoS attacks. Recommended for validating a rule before committing to a more severe action.

- _**Block**_ | API value: `block`
    - Blocks HTTP requests that match the rule expression.

- _**Challenge (CAPTCHA)**_ | API value: `challenge`
    - Presents a CAPTCHA challenge to the clients making HTTP requests that match a rule expression.

- _**Force Connection Close**_ | API value: _N/A_
    - Closes ongoing HTTP connections. This action does not block a request, but it forces the client to reconnect.
    - The performed action depends on the HTTP version:

      - HTTP/1: set the [`Connection` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#directives) to `close`.
      - HTTP/2: send a [`GOAWAY` frame](https://datatracker.ietf.org/doc/html/rfc7540#section-6.8) to the client.

    - This is an internal rule action that you cannot use in rule overrides.

- _**DDoS Dynamic**_ | API value: _N/A_
    - Performs a specific action according to a set of internal guidelines defined by Cloudflare. The executed action can be one of the above or an undisclosed mitigation action.
    - This is an internal rule action that you cannot use in rule overrides.

</Definitions>

<Aside type='warning' header='Important'>

You cannot set the rule action to _Log_ using overrides for rules with the `gatebot` category or any rule whose `id` starts with `GB`.

However, you can use the _Log_ action in global override. In this case, any rule with the `gatebot` category or whose `id` starts with `GB` will ignore the override and use the default action as defined in the Managed Ruleset.

</Aside>

## Sensitivity

Defines how sensitive a rule is. Affects the thresholds used to determine if an attack should be mitigated. A higher sensitivity level means having a lower threshold, while a lower sensitivity level means having a higher threshold.

The available sensitivity levels are:

UI value          | API value
------------------|----------
_High_            | `"default"`
_Medium_          | `"medium"`
_Low_             | `"low"`
_Essentially Off_ | `"eoff"`

You cannot increase the sensitivity level beyond _High_ (`"default"`).

## Example

For example, Cloudflare may expose a rule in the Managed Ruleset that is blocking legitimate traffic during your peak hours of operation, and you want to prevent this situation from happening in the future.

**Rule #1** (the rule that is blocking legitimate traffic)

```json
{
  "id": "{problem-rule-id}",
  "version": "1",
  "action": "block",
  "categories": [
    "{category-name}"
  ],
  "last_updated": "2021-06-15T22:55:10.480572Z",
  "ref": "{problem-rule-ref}",
  "enabled": "true"
}
```

**Override #1** (used to alleviate issue caused by `{problem-rule-id}`)

```json
{
  // ...
  "overrides": {
    "rules": [
      {
        "id": "{problem-rule-id}",
        "action": "challenge",
        "sensitivity_level": "low"
      }
    ]
  }
}
```

By setting the action to `challenge` in applying override #1 for `{problem-rule-id}`, clients will be issued a challenge instead of their traffic being blocked. The sensitivity level is also significantly lowered by setting its value to `low`. After this change, only a larger amount of traffic will trigger the `challenge` mitigation action.

---
pcx-content-type: concept
order: 1
---

# Overriding the DDoS L7 Attack Mitigation Managed Ruleset

The DDoS L7 Attack Mitigation Managed Ruleset provides users with both increased observability into layer-7 DDoS attacks mitigated by Cloudflare, and the ability to control how these rules affect a request via overrides. This functionality informs users of ongoing or past attacks and allows them to customize how Cloudflare treats similar attacks to the zone if they happen again.

Use overrides to change the action applied to a given attack or modify the sensitivity level of the detection mechanism. You can define overrides at the account level or at the zone level.

The fields of the rules that you can override are the following:

* `action`: The action that the WAF will perform for requests that match specific rules of Cloudflare's DDoS mitigation services.
* `sensitivity_level`: Defines how sensitive a rule is. Affects the thresholds used to determine if an attack should be mitigated. A higher sensitivity level means having a lower threshold, while a lower sensitivity level means having a higher threshold. You cannot increase the sensitivity level beyond `"default"`.

<Aside type='note' header='Note'>

The DDoS L7 Attack Mitigation Managed Ruleset is always enabled. You can only modify its behavior via overrides.

</Aside>

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

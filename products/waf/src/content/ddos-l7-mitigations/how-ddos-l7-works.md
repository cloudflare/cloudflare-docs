---
pcx-content-type: concept
order: 1
---

# How the DDoS L7 Attack Mitigation Managed Ruleset Overrides work

The DDoS L7 Attack Mitigation Managed Ruleset is used to provide users both increased observability into L7 DDoS attacks mitigated by Cloudflare as well as providing the ability to control how these rules affect a request via the ability to modify the action applied to a given attack as well as allowing users to modify the sensitivity level. This functionality helps to both inform users of attacks which are currently happening or have happened and allows users to effectively "turn some knobs" to change how we might treat the attack next time it is seen against a zone.

In order for users to "turn some knobs" overrides can be use on a per account and per zone basis to modify how rules act and are treated.

<Aside type='note' header='Note'>

The DDoS L7 Attack Mitigation Managed Ruleset is always on and enabled and can only be modified via an override.

To recap, the fields of the rules that can be overridden are as follows:
* `"action"`: The action that the WAF will take on requests that are found to match specific rules as determined by Cloudflares DDoS mitigation services. 
* `"sensitivity_level"`: Describes how sensitive a rule should be. Affects thresholds used when determining if an attack should be mitigated; higher sensitivity is a lower threshold while lower sensitivity is a higher threshold. The sensitivity cannot be increased beyond `"default"`.

</Aside>

For example, Cloudflare may expose a rule in the Managed Ruleset that you find blocks legitimate traffic during peak hours of operation and you want to stop this from happening:

<Example>

Rule #1 (the rule found to be blocking legitimate traffic)

```json
{
    "id": "{problem-rule-id}",
    "version": "1",
    "action": "block",
    "categories": [
        "{some-category}"
    ],
    "last_updated": "2021-06-15T22:55:10.480572Z",
    "ref": "{problem-rule-ref}",
    "enabled": "true"
}
```

Override #1 (used to alleviate issue caused by `{problem-rule-id}`)
```json
{
    ...
    "overrides": {
        "rules": [{
            "id": "{problem-rule-id}",
            "action": "challenge",
            "sensitivity_level": "low"
        }]
    }
}
```

By applying the above override for `{problem-rule-id}` the new action will now `"challenge"` clients instead of blocking traffic outright. The sensitivity is also significantly lowered as to require a larger amount of traffic to trigger the mitigation at all.

</Example>

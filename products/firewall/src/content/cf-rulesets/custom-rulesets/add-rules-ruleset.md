---
title: Add rules to a custom ruleset
alwaysopen: true
order: 752
---

# Add rules to a custom ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

To add rules to an existing custom ruleset, execute a PUT request to the custom ruleset and pass the rules in an array. Each rule contains an expression and action. The rules use the same format as firewall rules.

The following request adds two rules to a custom ruleset.

```json
curl -X "PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{custom-ruleset-id}" \
    -d '{
        "rules": [{
            "expression": "(ip.geoip.country eq \"GB\" and ip.geoip.country eq \"FR\")  or cf.threat_score > 0",
            "action": "challenge",
            "description": "challenge GB and FR or based on IP Reputation"
        },
        {
           "expression": "not http.request.uri.path matches \"^/api/.*$\"",
           "action": "challenge",
           "description": "challenge not /api"
        }]
}'

```

The response returns the `id` of the new rules:

```json
  "result": {
    "id": "{custom-ruleset-id}",
    "name": "Custom Ruleset 1",
    "kind": "custom",
    "version": "2",
    "rules": [
      {
        "id": "{custom-rule-id-1}",
        "version": "1",
        "action": "challenge",
        "expression": "(ip.geoip.country eq \"GB\" and ip.geoip.country eq \"FR\")  or cf.threat_score \u003e 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2020-11-18T23:23:00.876749Z",
        "ref": "{custom-rule-id-1}",
        "enabled": true
      },
      {
        "id": "{custom-rule-id-2}",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "description": "challenge not /api"
        "last_updated": "2020-11-18T23:23:00.876749Z",
        "ref": "{custom-rule-id-2}",
        "enabled": true
      }
    ]
  }
}
```

To update a rule, execute a PUT request to the custom ruleset. Include the `id` of the rule  you want to modify in the rules array and add the fields you want to update. The request replaces the entire ruleset with a new version, and you must include the `id` for the rules you want to keep.

The following request edits a rule in a custom ruleset and updates the order of execution of the rules.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{custom-ruleset-id-2}" \
    -d'
{
        "rules": [
          {
            "id": "{custom-rule-id-2}",
             "expression": "not http.request.uri.path matches \"^/api/.*$\"",
             "action": "js_challenge",
             "description": "js_challenge not /api"
        },
          {
            "id": "{custom-rule-id-1}"}]`}
}'

```

The response returns the modified custom ruleset. Note that the updated rule and ruleset version number increment.

```json
{
  "result": {
    "id": "{custom-ruleset-id}",
    "name": "Custom Ruleset 1",
    "kind": "custom",
    "version": "3",
    "rules": [
      {
        "id": "{custom-rule-id-2}",
        "version": "2",
        "action": "js_challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "description": "js_challenge not /api",
        "last_updated": "2020-11-09T10:48:04.057775Z",
        "ref": "{custom-rule-id-2}",
        "enabled": true
      },
      {
        "id": "{custom-rule-id-1}",
        "version": "1",
        "action": "challenge",
        "expression": "(ip.geoip.country eq \"GB\" and ip.geoip.country eq \"FR\")  or cf.threat_score \u003e 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2020-11-18T23:23:00.876749Z",
        "ref": "{custom-rule-id-1}",
        "enabled": true
      }
    ]
  }
}
```

The PUT request completely replaces the existing contents of the ruleset. If you omit an existing rule from the `rules[]` array, it will not appear in the new version of the ruleset.

The following request updates a ruleset (`{custom-ruleset-id}`) that contains two rules: `{custom-rule-id-1}` and `{custom-rule-id-2}`.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{custom-ruleset-id}" \
    -d'
{
        "rules": [{
                "expression": "ip.src in {2001:DB8::/32}",
                "action": "allow",
                "description": "Do not challenge requests from office"
        },
		{
                "id": "{custom-rule-id-2}"
        }]
}'
```

The PUT request adds a new rule (`{custom-rule-id-3}`), keeps one rule already in the ruleset (`{custom-rule-id-2}`), and deletes one existing rule (`{custom-rule-id-1}`):

```json
{
  "result": {
    "id": "f82ccda3d21f4a02825d3fe45b5e1c10",
    "name": "Custom Ruleset 1",
    "kind": "custom",
    "version": "4",
    "rules": [
      {
        "id": "{custom-rule-id-3}",
        "version": "1",
        "action": "allow",
        "expression": "ip.src in {2001:DB8::/32}",
        "description": "do not challenge login from office",
        "last_updated": "2020-11-09T10:50:57.381574Z",
        "ref": "d815135f604f400bbef0e51010f64a3b",
        "enabled": true
      },
      {
        "id": "{custom-rule-id-2}",
        "version": "2",
        "action": "js_challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "description": "js_challenge not /api",
        "last_updated": "2020-11-09T10:48:04.057775Z",
        "ref": "0cf6e3f29fe743e7ae6587acf3e3c8fa",
        "enabled": true
      }
    ]
  }
}
```
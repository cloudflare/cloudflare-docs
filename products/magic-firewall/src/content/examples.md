---
title: Examples
order:  5
pcx-content-type: configuration
---

# Examples

## Skip Action

The example below blocks all tcp ports, but allows one port (8080)
by using the skip action.

```
curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--data '{
    "name": "Example ruleset",
    "kind": "root",
    "phase": "magic_transit",
    "description": "Example ruleset description",
    "rules": [
      {
        "action": "skip",
        "action_parameters": { "ruleset": "current" },
        "expression": "tcp.dstport in { 8080 } ",
        "description": "Allow port 8080"
      },
      {
        "action": "block",
        "expression": "tcp.dstport in { 1..65535 }",
        "description": "Block all tcp ports"
      }
    ]
}'
```

## Blocking a Country

The example below allows all packets with a source or destion IP coming from Brazil by using its 2-letter country code in <a href="https://www.iso.org/obp/ui/#search/code/">ISO 3166-1 Alpha 2</a> format. 


```
curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--data '{
    "name": "Example ruleset",
    "kind": "root",
    "phase": "magic_transit",
    "description": "Example ruleset description",
    "rules": [
      {
        "action": "block",
        "expression": "ip.geoip.country == \"BR\"",
        "description": "Block traffic from Brazil"
      }
    ]
}'
```

---
title: Examples
order:  5
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

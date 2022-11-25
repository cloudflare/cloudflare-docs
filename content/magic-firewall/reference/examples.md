---
title: Examples
pcx_content_type: reference
weight: 6
---

# Examples

## Skip action

The example below blocks all tcp ports, but allows one port (8080) by using the skip action.

```bash
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

## Block a country

The example below blocks all packets with a source or destination IP address coming from Brazil by using its 2-letter country code in <a href="https://www.iso.org/obp/ui/#search/code/">ISO 3166-1 Alpha 2</a> format.

```bash
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

## Use an IP List

Magic Firewall supports [using lists in expressions](/firewall/cf-dashboard/rules-lists/use-lists-in-expressions/) for the `ip.src` and `ip.dst` fields. The supported lists are:

- `$cf.anonymizer` - Anonymizer proxies
- `$cf.botnetcc` - Botnet command and control channel
- `$cf.malware` - Sources of malware
- `${rules list name}` - The name of an account level Rules List

<!---->

```bash
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
            "expression": "ip.src in $cf.anonymizer",
            "description": "Block traffic from an anonymizer proxy"
          }
        ]
    }'
```

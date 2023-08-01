---
title: Examples
pcx_content_type: reference
weight: 6
---

# Examples

{{<Aside type="warning" header="Warning">}}

The examples on this page all use the `https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets` endpoint. This endpoint is intended to create rules from scratch and **might overwrite existing rules**.

If you have a ruleset already deployed, consider using the `https://api.cloudflare.com/client/v4/accounts/\account_id}/rulesets/{ruleset_id}/rules` endpoint instead.

Refer to [Add rule to ruleset](/ruleset-engine/rulesets-api/add-rule/) and [Create an account ruleset](/api/operations/createAccountRuleset) for more information.

{{</Aside>}}

## Skip action

The example below blocks all tcp ports, but allows one port (8080) by using the skip action.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <YOUR_EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
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
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <YOUR_EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
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

Magic Firewall supports [using lists in expressions](/fundamentals/global-configurations/lists/use-in-expressions/) for the `ip.src` and `ip.dst` fields. The supported lists are:

- `$cf.anonymizer` - Anonymizer proxies
- `$cf.botnetcc` - Botnet command and control channel
- `$cf.malware` - Sources of malware
- `${rules list name}` - The name of an account level Rules List

<!---->

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <YOUR_EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
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
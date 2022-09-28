---
title: Use rules lists
weight: 3
pcx_content_type: how-to
meta:
  title: Define a Rules List
---

# Define a Rules List

[Rules Lists](/firewall/cf-dashboard/rules-lists/#access-the-lists-interface) defined at the account level can be used to match against `ip.src` and `ip.dst` fields. Currently only IPv4 addresses in these lists are used as IPv6 is currently not supported in Magic Firewall.

In order to use this feature first [create a new list](https://api.cloudflare.com/#rules-lists-create-list).

```bash
curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/rules/lists \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--data '{
    "name":"iplist",
    "description":"This contains IPs that should be allowed.",
    "kind":"ip"
    }'
```

## Add IPs to the List

Next [create list items](https://api.cloudflare.com/#rules-lists-create-list-items). This will add elements to the current list.

```bash
    curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/rules/lists/${list_id}/items \
    -H 'Content-Type: application/json' \
    -H 'X-Auth-Email: user@example.com' \
    -H 'X-Auth-Key: 00000000000' \
    --data '[
        {"ip":"10.0.0.1"},
        {"ip":"10.10.0.0/24"}
    ]'
```    

## Use the List in a Rule

Finally add a Magic Firewall rule referencing the Rules List into an existing ruleset:

```bash
    curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets/${ruleset_id}/rules \
    -H 'Content-Type: application/json' \
    -H 'X-Auth-Email: user@example.com' \
    -H 'X-Auth-Key: 00000000000' \
    --data '{
        "action": "skip",
        "action_parameters": {
            "ruleset": "current"
        },
        "expression": "ip.src in $iplist",
        "description": "Allowed IPs from iplist",
        "enabled": true
    }'
```

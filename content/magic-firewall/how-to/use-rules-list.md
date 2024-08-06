---
title: Use IP lists
weight: 3
pcx_content_type: how-to
meta:
  title: Define an IP list
---

# Define an IP list

[IP lists](/waf/tools/lists/custom-lists/#ip-lists) are a part of Cloudflare's custom lists. Custom lists contain one or more items of the same type — IP addresses, hostnames or ASNs — that you can reference in rule expressions.

IP lists are defined at the account level and can be used to match against `ip.src` and `ip.dst` fields. Currently, Magic Firewall only supports IPv4 addresses in these lists, not IPv6.

To use this feature:

## 1. Create a [new IP list](/api/operations/lists-create-a-list).

For example:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rules/lists \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "name": "iplist",
  "description": "This contains IPs that should be allowed.",
  "kind": "ip"
}'
```

## 2. Add IPs to the list

Next, [create list items](/api/operations/lists-create-list-items). This will add elements to the current list.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rules/lists/{list_id}/items \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '[
  {"ip":"10.0.0.1"},
  {"ip":"10.10.0.0/24"}
]'
```

## 3. Use the list in a rule

Finally, add a Magic Firewall rule referencing the list into an existing ruleset:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
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

## Managed lists

{{<Aside type="note">}}Available for customers with a Magic Firewall Advanced plan.{{</Aside>}}

You can create rules with managed lists. Managed IP Lists are [lists of IP addresses](/waf/tools/lists/managed-lists/#managed-ip-lists) maintained by Cloudflare and updated frequently.

You can access these managed lists when you create rules with either _IP destination address_ or _IP source address_ in the **Field** dropdown, and _is in list_ or _is not in list_ in the **Operator** dropdown.

For example:

Field                    | Operator     | Value
------------------------ | ------------ | ---
_IP destination address_ | _is in list_ | _Anonymizers_
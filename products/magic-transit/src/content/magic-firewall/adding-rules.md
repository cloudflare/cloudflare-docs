---
title: Adding rules
order:  2
---

# Adding rules

## Step 1: Check if you already have an existing root ruleset

If you're a new Magic Transit customer, you may not have a root ruleset created for your account.

API Example:
```
curl https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000'
```

<Aside type='note' header='Note'>
Your account ID can be found via the `/client/v4/accounts` endpoint.
</Aside>

An account without a root ruleset will return a response like this one:

```
{
    "result": [],
    "success": true,
    "errors": [],
    "messages": []
}
```

## Step 2: Add a ruleset with an existing rule

If you haven't setup any rules before, you'll need to make a POST call to create the root ruleset with some initial rules.

API Example:

```
curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--data '{
  "name": "Example ruleset",
  "kind": "root",
  "description": "Example ruleset description",
  "phase": "magic_transit",
  "rules": [
    {
      "action": "block",
      "expression": "ip.src == 172.16.0.7",
      "description": "Block IP 172.16.0.7"
    }
  ]
}'
```

Example response:

```
{
  "result": {
    "id": "4376358e00ec4c42b0450b1afed120bf",
    "name": "Example ruleset",
    "description": "Example ruleset description",
    "kind": "root",
    "version": "1",
    "rules": [
      {
        "id": "02ad6deb502c4f82b7a2531e878ac003",
        "version": "1",
        "action": "block",
        "expression": "ip.src == 172.16.0.7",
        "description": "Block IP 172.16.0.7"
        "last_updated": "2020-10-21T20:25:35.473609Z",
        "ref": "02ad6deb502c4f82b7a2531e878ac003",
        "enabled": true
      }
    ],
    "last_updated": "2020-10-21T20:25:35.473609Z",
    "phase": "magic_transit"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

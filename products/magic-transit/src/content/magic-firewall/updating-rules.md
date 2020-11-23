---
title: Updating rules
order:  3
---

# Updating rules

## Step 1: Display the existing ruleset

API Example:

```
curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000'
```

Example data:

```
{
  "result": [
    {
      "id": "4376358e00ec4c42b0450b1afed120bf",
      "name": "stop bad people",
      "description": "block traffic with known bad patterns",
      "kind": "root",
      "version": "1",
      "last_updated": "2020-10-21T20:25:35.473609Z",
      "phase": "magic_transit"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Step 2: Fetch the existing rules

To add a rule to an existing ruleset, we'll need the two things from the previous step:

* The ruleset ID: `4376358e00ec4c42b0450b1afed120bf`
* The version: `1`

We'll use this to fetch the existing rules to help us construct the call to update the ruleset:

```
curl https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets/4376358e00ec4c42b0450b1afed120bf/versions/1 \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' | jq '.result | {description: .description, rules: [ .rules[] | {id: .id, description: .description, action: .action, expression: .expression} ]}'
```

<Aside type='note' header='Note'>

What's up with that jq command? The API response has quite a bit of extra information, e.g. the last updated timestamp, that cannot be sent back to the API when making a PUT request. You do not need to use jq, but make sure you only send fields that are relevant to the update request.

</Aside>

Example response:
```
{
  "description": "block traffic with known bad patterns",
  "rules": [
    {
      "id": "02ad6deb502c4f82b7a2531e878ac003",
      "action": "block",
      "expression": "ip.src == 172.16.0.7",
      "description": "only allow plain http"
    }
  ]
}
```

## Step 3: Update the ruleset

Now, we have enough to make the call to update the ruleset:

```
curl -X PUT https://api.cloudflare.com/client/v4/accounts/${account_id}/rulesets/${ruleset_id} \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--data '{
  "description": "block traffic with known bad patterns",
  "rules": [
    {
      "id": "02ad6deb502c4f82b7a2531e878ac003",
      "action": "block",
      "expression": "ip.src == 172.16.0.7",
      "description": "Block any traffic from source IP 172.16.0.7"
    }
  ]
}'
```

Example response:
```
{
  "result": {
    "id": "4376358e00ec4c42b0450b1afed120bf",
    "name": "stop bad people",
    "description": "block traffic with known bad patterns",
    "kind": "root",
    "version": "2",
    "rules": [
      {
        "id": "02ad6deb502c4f82b7a2531e878ac003",
        "version": "2",
        "action": "block",
        "expression": "ip.src == 172.16.0.1",
        "description": "Block any traffic from source IP 172.16.0.1",
        "last_updated": "2020-10-21T21:58:18.607633Z",
        "ref": "02ad6deb502c4f82b7a2531e878ac003",
        "enabled": true
      }
    ],
    "last_updated": "2020-10-21T21:58:18.607633Z",
    "phase": "magic_transit"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```


<Aside type='note' header='Note'>

The version number has incremented on the ruleset and it's contained rule. You may recall that earlier a version number was used to retrieve the ruleset details via `/accounts/${account_id}/rulesets/${ruleset_id}/versions/${version}`
which means you can fetch older versions of the ruleset for comparison.  Only the most recent version of a ruleset is applied at the edge.

</Aside>

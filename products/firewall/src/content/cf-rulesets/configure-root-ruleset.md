---
title: Configure root rulesets
order: 730
---

# Configure the root ruleset for your account

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Use the following API endpoint to create the root ruleset for your account.

```
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets"
```

In the `data` field, include the following parameters.
* `name` - The name for your ruleset. You cannot change the change the name after creating the root ruleset.
* `kind: root` - Indicates that the ruleset type is `root`. You cannot edit this.
* `description` - _Optional_. You can update this when editing your root ruleset.

The example below uses a POST request to create a root ruleset.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets"
     --data '{
          "name": "Root Ruleset for my account",
          "description": "My Root Ruleset",
          "kind": "root"
     }'
```

The response contains the `id` and `version` of your ruleset.

```json
 {
    "id": "{Root ruleset ID}",
    "name": "Root Ruleset for my account",
    "description": "My Root Ruleset",
    "kind": "root",
    "version": "1",
    "last_updated": "2020-10-06T16:10:04.209198Z",
    "phase": "http_request_main"
  }

```

## Edit your root ruleset

Use the following API endpoint to edit your root ruleset.

```
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}"

```

You can update the `description` for the root ruleset, and the `rules` that your root ruleset deploys.

You cannot update the `name` of the root ruleset or the `kind` of ruleset. Do not include them in the `data` field of your PUT request.

The PUT request in the example below updates the description for a root ruleset. The request creates a new version of the root ruleset.

```
$ curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}" \
    --data '{"description": "New description for my root ruleset" }'
```

Response:

```json
    {
    "id": "{root-ruleset-id}",
    "name": "My account root ruleset",
    "description": "New description for my root ruleset",
    "kind": "root",
    "version": "2",
    "last_updated": "2020-10-08T13:09:40.580066Z",
    "phase": "http_request_main"
  }

```

Note that the root ruleset in the examples above does not contain rules that deploy rulesets.

To add a rule that deploys a ruleset, refer to [deploy a ruleset from your root ruleset](/cf-rulesets/deploy-rulesets/).

<Aside type='note' header='Note'>

The PUT request replaces your existing root ruleset. If your ruleset contains two rules and you want to modify one, you must include both rules in the PUT request. If you want to include an additional rule in your ruleset, you must include the current rules and the new rule in the PUT request.

</Aside>
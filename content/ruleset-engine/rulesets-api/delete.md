---
pcx_content_type: reference
type: overview
title: Delete rulesets
weight: 10
layout: list
---

# Delete rulesets

You can use the API to delete all the versions of a ruleset or delete a specific version of a ruleset.

- [Delete ruleset (all versions)](#delete-ruleset)
- [Delete ruleset version](#delete-ruleset-version)

## Delete ruleset

Deletes all the versions of an existing ruleset at the account or zone level.

Use one of the following API endpoints:

| Operation                               | Method + Endpoint                                     |
| --------------------------------------- | ----------------------------------------------------- |
| [Delete an account ruleset][dr-account] | `DELETE /accounts/{account_id}/rulesets/{ruleset_id}` |
| [Delete a zone ruleset][dr-zone]        | `DELETE /zones/{zone_id}/rulesets/{ruleset_id}`       |

[dr-account]: /api/operations/deleteAccountRuleset
[dr-zone]: /api/operations/deleteZoneRuleset

If the delete operation succeeds, the API method call returns a `204 No Content` HTTP status code.

{{<Aside type="warning" header="Important">}}

You cannot delete a ruleset that is still referenced in other rules. For example, you cannot delete a custom ruleset that is being deployed in a rule with `execute` action.

To delete the ruleset, update or delete any rules that reference the ruleset and try again.

{{</Aside>}}

### Example

The following example request deletes an existing ruleset.

```bash
---
header: Request
---
curl --request DELETE \
https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>"
```

## Delete ruleset version

Deletes a specific version of a ruleset.

Use one of the following API endpoints:

| Operation                                        | Method + Endpoint                                                               |
| -------------------------------------------------| ------------------------------------------------------------------------------- |
| [Delete an account ruleset version][drv-account] | `DELETE /accounts/{account_id}/rulesets/{ruleset_id}/versions/{version_number}` |
| [Delete a zone ruleset version][drv-zone]        | `DELETE /zones/{zone_id}/rulesets/{ruleset_id}/versions/{version_number}`       |

[drv-account]: /api/operations/deleteAccountRulesetVersion
[drv-zone]: /api/operations/deleteZoneRulesetVersion

If the delete operation succeeds, the method call returns a `204 No Content` HTTP status code.

Later updates to the ruleset will not reuse the version number of a deleted ruleset version.

{{<Aside type="warning" header="Important">}}

You cannot delete a ruleset version if it is the latest ruleset version and there is a rule with `execute` action deploying that ruleset.

To delete the ruleset version, update or delete any rules that reference the ruleset and try again.

{{</Aside>}}

### Example

The following example request deletes a version of an existing ruleset.

```bash
---
header: Request
---
curl --request DELETE \
https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{ruleset_id}/versions/{version_number} \
--header "Authorization: Bearer <API_TOKEN>"
```

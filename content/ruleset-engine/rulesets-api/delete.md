---
pcx-content-type: reference
type: overview
title: Delete rulesets
weight: 789
layout: list
---

# Delete rulesets

You can use the API to delete all the versions of a ruleset or delete a specific version of a ruleset.

*   [Delete ruleset (all versions)](#delete-ruleset)
*   [Delete ruleset version](#delete-ruleset-version)

## Delete ruleset

Deletes all the versions of an existing ruleset at the account or zone level.

Use one of the following API endpoints:

| Operation                            | Method + Endpoint                                     |
|--------------------------------------|-------------------------------------------------------|
| [Delete account ruleset][dr-account] | `DELETE /accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>` |
| [Delete zone ruleset][dr-zone]       | `DELETE /zones/<ZONE_ID>/rulesets/<RULESET_ID>`       |

[dr-account]: https://api.cloudflare.com/#account-rulesets-delete-account-ruleset

[dr-zone]: https://api.cloudflare.com/#zone-rulesets-delete-zone-ruleset

If the delete operation succeeds, the API method call returns a `204 No Content` HTTP status code.

\<Aside type='warning' header='Important'>

You cannot delete a ruleset that is still referenced in other rules. For example, you cannot delete a custom ruleset that is being deployed in a rule with `execute` action.

To delete the ruleset, update or delete any rules that reference the ruleset and try again.

</Aside>

### Example

The following example request deletes an existing ruleset.

```bash
---
header: Request
---
curl -X DELETE \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>"
```

## Delete ruleset version

Deletes a specific version of a ruleset.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Delete a version of an account ruleset][drv-account] | `DELETE /accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>/versions/<VERSION_NUMBER>` |
| [Delete a version of a zone ruleset][drv-zone] | `DELETE /zones/<ZONE_ID>/rulesets/<RULESET_ID>/versions/<VERSION_NUMBER>` |

[drv-account]: https://api.cloudflare.com/#account-rulesets-delete-a-version-of-an-account-ruleset

[drv-zone]: https://api.cloudflare.com/#zone-rulesets-delete-a-version-of-a-zone-ruleset

If the delete operation succeeds, the method call returns a `204 No Content` HTTP status code.

Later updates to the ruleset will not reuse the version number of a deleted ruleset version.

\<Aside type='warning' header='Important'>

You cannot delete a ruleset version if it is the latest ruleset version and there is a rule with `execute` action deploying that ruleset.

To delete the ruleset version, update or delete any rules that reference the ruleset and try again.

</Aside>

### Example

The following example request deletes a version of an existing ruleset.

```bash
---
header: Request
---
curl -X DELETE \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>/versions/<VERSION_NUMBER>" \
-H "Authorization: Bearer <API_TOKEN>"
```

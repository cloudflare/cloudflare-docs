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
| [Delete an account ruleset][dr-account] | `DELETE /accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>` |
| [Delete a zone ruleset][dr-zone]        | `DELETE /zones/<ZONE_ID>/rulesets/<RULESET_ID>`       |

[dr-account]: https://developers.cloudflare.com/api/operations/account-rulesets-delete-an-account-ruleset
[dr-zone]: https://developers.cloudflare.com/api/operations/zone-rulesets-delete-a-zone-ruleset

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
curl -X DELETE \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>"
```

## Delete ruleset version

Deletes a specific version of a ruleset.

Use one of the following API endpoints:

| Operation                                             | Method + Endpoint                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| [Delete an account ruleset version][drv-account] | `DELETE /accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>/versions/<VERSION_NUMBER>` |
| [Delete a zone ruleset version][drv-zone]        | `DELETE /zones/<ZONE_ID>/rulesets/<RULESET_ID>/versions/<VERSION_NUMBER>`       |

[drv-account]: https://developers.cloudflare.com/api/operations/account-rulesets-delete-an-account-ruleset-version
[drv-zone]: https://developers.cloudflare.com/api/operations/zone-rulesets-delete-a-zone-ruleset-version

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
curl -X DELETE \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>/versions/<VERSION_NUMBER>" \
-H "Authorization: Bearer <API_TOKEN>"
```

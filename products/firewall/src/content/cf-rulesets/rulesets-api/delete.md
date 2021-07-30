---
pcx-content-type: reference
alwaysopen: true
order: 788
---

# Delete rulesets

You can use the API to delete all the versions of a ruleset or delete a specific version of a ruleset.

* [Delete ruleset (all versions)](#delete-ruleset)
* [Delete ruleset version](#delete-ruleset-version)

## Delete ruleset

To delete all the versions of an existing ruleset at the account or zone level, use one of the following API endpoints:

```bash
---
header: Account-level endpoint
---
DELETE /accounts/{account-id}/rulesets/{ruleset-id}
```

```bash
---
header: Zone-level endpoint
---
DELETE /zones/{zone-id}/rulesets/{ruleset-id}
```

If the delete operation succeeds, the API method call returns a `204 No Content` HTTP status code.

<Aside type='warning' header='Important'>

You cannot delete a ruleset that is still being referenced by other rules. For example, you cannot delete a custom ruleset being referenced in a rule with `execute` action. To delete the ruleset, update or delete any rules that reference the ruleset and try again.

</Aside>

### Example

The following example request deletes an existing ruleset.

```json
curl -X DELETE \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}"
```

## Delete ruleset version

To delete a specific version of a ruleset, use one of the following API endpoints:

```bash
---
header: Account-level endpoint
---
DELETE /accounts/{account-id}/rulesets/{ruleset-id}/versions/{version-number}
```

```bash
---
header: Zone-level endpoint
---
DELETE /zones/{zone-id}/rulesets/{ruleset-id}/versions/{version-number}
```

If the delete operation succeeds, the method call returns a `204 No Content` HTTP status code.

Later updates to the ruleset will not reuse the version number of a deleted ruleset version.

<Aside type='warning' header='Important'>

You cannot delete a ruleset version if:

* You are trying to delete the latest ruleset version and there is a rule with `execute` action deploying that ruleset without specifying a version
* There is a rule with `execute` action deploying the exact ruleset version you are trying to delete

To delete the ruleset version, update or delete any rules that still reference the ruleset version (or the ruleset, if you are deleting the latest version of a ruleset) and try again.

</Aside>

### Example

The following example request deletes a version of an existing ruleset.

```json
curl -X DELETE \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}/versions/{version-number}"
```

---
title: Enable
pcx_content_type: how-to
weight: 1
meta:
    title: Enable version management
---

# Enable Version Management

{{<render file="_enable-versioning.md">}}

{{<render file="_enable-default-creation.md">}}

# Disable Version Management

There is no option on the UI to disable Zone Versioning. To disable it, you need to use the next API call endpoint, to find every rule from the `http_request_select_configuration` ruleset phase that has the zone's name as the zone field in the expression property:

```
curl 'https://api.cloudflare.com/client/v4/accounts/<account_id>/rulesets/phases/http_request_select_configuration/entrypoint' \
--header 'X-Auth-Email: '$auth_email'' \
--header 'X-Auth-Key: '$auth_key

```

After that you will need to check the next validations:

## 1. Delete a rule from the ruleset

```
curl -X 'DELETE' 'https://api.cloudflare.com/client/v4/accounts/<account_id>/rulesets/<ruleset_id>/rules/<rule_id>' \
--header 'X-Auth-Email: '$auth_email'' \
--header 'X-Auth-Key: '$auth_key''

```

After all the rules are deleted, we need to find and delete all HTTP Applications.

## 2. Find all HTTP Applications

```
curl 'https://api.cloudflare.com/client/v4/zones/<zone_id>/http_applications' \
--header 'X-Auth-Email: '$auth_email'' \
--header 'X-Auth-Key: '$auth_key''

```

## 3. Delete HTTP Application

```
curl -X 'DELETE''https://api.cloudflare.com/client/v4/zones/<zone_id>/http_applications/<http_application_id>' \
--header 'X-Auth-Email: '$auth_email'' \
--header 'X-Auth-Key: '$auth_key''

```


Once all these steps are completed, Zone Versioning should go back to its original “Enable Versioning” landing page.

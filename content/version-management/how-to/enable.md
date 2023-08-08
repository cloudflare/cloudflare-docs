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

## Disable Version Management

To disable Zone Versioning:

1. [Deploy](/version-management/how-to/environments/#change-environment-version) **Version Zero** to your **Production** environment. When you disable Zone Versioning, all your zone settings will revert to those in your Version Zero, so you should validate these settings are correct before proceeding.

2. Send a `GET` request to the `/accounts/{account_id}/rulesets/phases/http_request_select_configuration/entrypoint` endpoint.

    ```bash
    curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/phases/http_request_select_configuration/entrypoint" \
    --header "X-Auth-Email: <EMAIL>" \
    --header "X-Auth-Key: <API_KEY>"
    ```

    In the response, save the following values:

    - The top-level ruleset `id`.
    - The rule `id` of every rule that has the zone's name as the zone field in the `expression` property.

3. Using the `id` of those rules, send [`DELETE` requests](/api/operations/deleteAccountRulesetRule) for every rule in the ruleset.

4. Then, send a `GET` request to find all HTTP applications (or versions of your zone).

    ```bash
    curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/http_applications" \
    --header "X-Auth-Email: <EMAIL>" \
    --header "X-Auth-Key: <API_KEY>"
    ```

    Save the `id` of each HTTP application.

5. Using the `id` of those HTTP applications, send [`DELETE` requests](/api/operations/deleteAccountRulesetRule) for every application.

    ```bash
    curl --request DELETE "https://api.cloudflare.com/client/v4/zones/{zone_id}/http_applications/{http_application_id}" \
    --header "X-Auth-Email: <EMAIL>" \
    --header "X-Auth-Key: <API_KEY>"
    ```

Once all these steps are completed, Zone Versioning will go back to its original landing page.
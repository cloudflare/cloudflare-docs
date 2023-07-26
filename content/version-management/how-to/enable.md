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

If you disable Zone Versioning, all your zone settings will revert to those in your [Version Zero](/version-management/about/#versions). Confirm that these settings are accurate before proceeding.

To disable Zone Versioning:

1. Send a `GET` to the `/accounts/<ACCOUNT_ID>/rulesets/phases/http_request_select_configuration/entrypoint` endpoint.

    ```sh
    curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/phases/http_request_select_configuration/entrypoint' \
    --header "X-Auth-Email: user@cloudflare.com" \
    --header "X-Auth-Key: REDACTED"
    ```

    In the response, save the following values:

    - The top-level ruleset `id`.
    - The rule `id` of every rule that has the zone's name as the zone field in the `expression` property.

2. Using the `id` of those rules, send [`DELETE` requests](/api/operations/deleteAccountRulesetRule) for every rule in the ruleset.

3. Then, send a `GET` request to find all HTTP applications (or versions of your zone).

    ```sh
    curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/http_applications" \
    --header "X-Auth-Email: user@cloudflare.com" \
    --header "X-Auth-Key: REDACTED"
    ```

    Save the `id` of each HTTP application.

4. Using the `id` of those HTTP applications, send [`DELETE` requests](/api/operations/deleteAccountRulesetRule) for application.

    ```sh
    curl --request DELETE "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/http_applications/<HTTP_APPLICATION_ID>" \
    --header "X-Auth-Email: user@cloudflare.com" \
    --header "X-Auth-Key: REDACTED"
    ```

Once all these steps are completed, Zone Versioning will go back to its original landing page.
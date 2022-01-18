---
order: 42
pcx-content-type: how-to
---

# Configure custom fields

You can configure custom fields — selected from the list of HTTP request headers, HTTP response headers, and cookies — to include in Logpush log entries of a zone or account. Once configured, these custom fields will be enabled for all the Logpush jobs in the zone/account that use the HTTP requests dataset and include the request headers, response headers, or cookie fields.

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api) to create a rule that configures custom fields. For more information on concepts like phases, rulesets, and rules, as well as the available API operations, refer to the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/) documentation.

To configure custom fields:

1. Create a rule to configure the list of custom fields.
1. Include custom fields in your Logpush job.

## 1. Create a rule to configure the list of custom fields

Create a rule configuring the list of custom fields in the `log_custom_fields` phase at the account or at the zone level. Set the rule action to `log_custom_field` and the rule expression to `true`.

The `action_parameters` object that you must include in the rule that configures the list of custom fields should have the following structure:

```json
"action_parameters": {
  "request_fields": [
    { "name": "<http_request_header_name_1_in_lower_case>" },
    { "name": "<http_request_header_name_2_in_lower_case>" },
    // ...
  ],
  "response_fields": [
    { "name": "<http_response_header_name_1_in_lower_case>" },
    { "name": "<http_response_header_name_2_in_lower_case>" },
    // ...
  ],
  "cookie_fields": [
    { "name": "<cookie_name_1>" },
    { "name": "<cookie_name_2>" },
    // ...
  ]
}
```

Ensure that your rule definition complies with the following:

* You must include at least one of the following arrays in the `action_parameters` object: `request_fields`, `response_fields`, and `cookie_fields`.
* You must enter HTTP request and response header names in lower case.
* Cookie names are case sensitive — you must enter cookie names with the same capitalization they have in the HTTP request.
* You must set the rule expression to `true`.

The example below defines a rule at the zone level, but you can also define this configuration at the account level. To do that, you must use a different endpoint and set the ruleset `kind` to `root`.

Perform the following steps to create the rule:

1. Use the [List existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view#list-existing-rulesets) operation to check if there is already a ruleset for the `log_custom_fields` phase at the zone level:

    ```bash
    curl -X GET \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets" \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>"
    ```

    If there is a ruleset for the `log_custom_fields` phase at the zone level, take note of the ruleset ID.

1. (Optional) If the response did not include a ruleset with `"kind": "zone"` and `"phase": "log_custom_fields"`, create the phase entry point ruleset using the [Create ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create) operation:

    ```json
    curl -X POST \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets" \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    -d '{
      "name": "Zone-level phase entry point",
      "kind": "zone",
      "description": "This ruleset configures custom log fields.",
      "phase": "log_custom_fields"
    }'
    ```

    Take note of the ruleset ID included in the response.

1. Use the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) operation to define the rules of the entry point ruleset you found (or created in the previous step), adding a rule with the custom fields configuration. The rules you include in the request will replace all the rules in the ruleset.

    The following example configures custom fields with the names of the HTTP request headers, HTTP response headers, and cookies you wish to include in Logpush logs:

    ```json
    curl -X PUT \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    -d '{
      "rules": [
        {
          "action": "log_custom_field",
          "expression": "true",
          "description": "Set Logpush custom fields for HTTP requests",
          "action_parameters": {
            "request_fields": [
              { "name": "content-type" },
              { "name": "x-forwarded-for"},
              { "name": "host" }
            ],
            "response_fields": [
              { "name": "server" },
              { "name": "content-type" },
              { "name": "allow" }
            ],
            "cookie_fields": [
              { "name": "__ga" },
              { "name": "accountNumber" },
              { "name": "__cfruid"}
            ]
          }
        }
      ]
    }'
    ```

    Example response:

    ```json
    {
      "result": {
        "id": "<RULESET_ID>",
        "name": "Zone-level phase entry point",
        "description": "This ruleset configures custom log fields.",
        "kind": "zone",
        "version": "2",
        "rules": [
          {
            "id": "<RULE_ID_1>",
            "version": "1",
            "action": "log_custom_field",
            "action_parameters": {
              "request_fields": [
                { "name": "content-type" },
                { "name": "x-forwarded-for"},
                { "name": "host" }
              ],
              "response_fields": [
                { "name": "server" },
                { "name": "content-type" },
                { "name": "allow" }
              ],
              "cookie_fields": [
                { "name": "__ga" },
                { "name": "accountNumber" },
                { "name": "__cfruid"}
              ]
            },
            "expression": "true",
            "description": "Set Logpush custom fields for HTTP requests",
            "last_updated": "2021-11-21T11:02:08.769537Z",
            "ref": "<RULE_REF_1>",
            "enabled": true
          }
        ],
        "last_updated": "2021-11-21T11:02:08.769537Z",
        "phase": "log_custom_fields"
      },
      "success": true,
      "errors": [],
      "messages": []
    }
    ```

## 2. Include the custom fields in your Logpush job

Next, include `Cookies`, `RequestHeaders`, and/or `ResponseHeaders`, depending on your custom field configuration, in the list of fields of the `logpull_options` job parameter when creating or updating a job. The logs will contain the configured custom fields and their values in the request/response.

For example, consider the following request that creates a job that includes custom fields:

```json
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs" \
-H "X-Auth-Email: <EMAIL>" \ 
-H "X-Auth-Key: <API_KEY>" \
-d '{
  "name":"<DOMAIN_NAME>",
  "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2",
  "dataset": "http_requests",
  "logpull_options":"fields=RayID,EdgeStartTimestamp,Cookies,RequestHeaders,ResponseHeaders&timestamps=rfc3339",
  "ownership_challenge":"00000000000000000000"
}'
```

<Aside type="note" header="Note for Cloudflare Access users">

If you are a Cloudflare Access user, as of January 2022 you have to manually add the `cf-access-user` user identity header to your logs by creating a new ruleset or adding the `cf-access-user` HTTP request header to your custom fields configuration. Additionally, make sure that you include the `RequestHeaders` field in your Logpush job.

</Aside>

## Final remarks

* You can configure up to 40 custom fields across all field types (HTTP request headers, HTTP response headers, and cookies) per zone.
* The maximum length of custom field data per field type (HTTP request headers, HTTP response headers, or cookies) is 2 KB. Any data over this limit will be truncated.

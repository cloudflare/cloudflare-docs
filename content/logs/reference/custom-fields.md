---
pcx_content_type: how-to
title: Custom fields
weight: 43
---

# Custom fields

You can configure custom fields — selected from the list of HTTP request headers, HTTP response headers, and cookies — to include in Logpush log entries of a zone. Once configured, these custom fields will be enabled for all the Logpush jobs in the zone that use the HTTP requests dataset and include the request headers, response headers, or cookie fields.

Custom fields can be enabled via API or the Cloudflare dashboard.

## Enable custom rules via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a rule that configures custom fields. For more information on concepts like phases, rulesets, and rules, as well as the available API operations, refer to the [Ruleset Engine](/ruleset-engine/) documentation.

To configure custom fields:

1. Create a rule to configure the list of custom fields.
2. Include the `Cookies`, `RequestHeaders`, and/or `ResponseHeaders` fields in your Logpush job.

### 1. Create a rule to configure the list of custom fields

Create a rule configuring the list of custom fields in the `http_log_custom_fields` phase at the zone level. Set the rule action to `log_custom_field` and the rule expression to `true`.

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

Perform the following steps to create the rule:

1. Use the [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) operation to check if there is already a ruleset for the `http_log_custom_fields` phase at the zone level (you can only have one zone ruleset per phase):

    ```bash
    curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets" \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>"
    ```

    If there is a ruleset for the `http_log_custom_fields` phase at the zone level, take note of the ruleset ID.

2. (Optional) If the response did not include a ruleset with `"kind": "zone"` and `"phase": "http_log_custom_fields"`, create the phase entry point ruleset using the [Create ruleset](/ruleset-engine/rulesets-api/create/) operation:

    ```json
    curl -X POST \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets" \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    -d '{
      "name": "Zone-level phase entry point",
      "kind": "zone",
      "description": "This ruleset configures custom log fields.",
      "phase": "http_log_custom_fields"
    }'
    ```

    Take note of the ruleset ID included in the response.

3. Use the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation to define the rules of the entry point ruleset you found (or created in the previous step), adding a rule with the custom fields configuration. The rules you include in the request will replace all the rules in the ruleset.

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
        "phase": "http_log_custom_fields"
      },
      "success": true,
      "errors": [],
      "messages": []
    }
    ```

### 2. Include the custom fields in your Logpush job

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

{{<Aside type="note" header="Note for Cloudflare Access users">}}

If you are a Cloudflare Access user, as of March 2022 you have to manually add the `cf-access-user` user identity header to your logs by creating a custom fields ruleset or adding the `cf-access-user` HTTP request header to your custom fields configuration. Additionally, make sure that you include the `RequestHeaders` field in your Logpush job.

{{</Aside>}}

## Enable custom fields via dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select the domain you want to use.
2. Go to **Analytics & Logs** > **Logs**.
3. In the **Custom Fields** section, select **Edit Custom Fields**.
4. Select **Set new Custom Field**. 
5. From the **Field Type** dropdown, select _Request Header_, _Response Header_ or _Cookies_ and type the **Field Name**. 
6. When you are done, select **Save**.

## Final remarks

* You can configure up to 40 custom fields across all field types (HTTP request headers, HTTP response headers, and cookies) per zone.
* The maximum length of custom field data is 8 KB. Any data over this limit will be truncated.
* For headers which may be included multiple times (for example, the `set-cookie` response header), a custom field will only log the first instance of the header. Subsequent headers of the same type will be ignored.
* Currently, Cloudflare only logs original request/response headers. Headers that were modified earlier in the request lifecycle with [Transform Rules](/rules/transform/request-header-modification/examples/) will not be logged.
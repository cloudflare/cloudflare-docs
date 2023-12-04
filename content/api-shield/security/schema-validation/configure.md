---
title: Configure
pcx_content_type: how-to
type: overview
layout: list
meta:
  title: Configure Schema Validation
---

# Configure Schema Validation 2.0

{{<Aside type="note">}}
Schema Validation 2.0 API is currently in an experimental functionality and may change in future updates.
{{</Aside>}}

Schema Validation 2.0 allows all corresponding configuration calls to be made via API. This validation centers more around individual endpoints and lets you set mitigation actions for each endpoint individually. Additionally, you can use Cloudflare-provided learned schemas that we [learn automatically](/api-shield/management-and-monitoring/#endpoint-schema-learning) from your traffic for individual endpoints. 

{{<Aside type="note">}}
[Classic Schema Validation documentation](/api-shield/reference/classic-schema-validation/) is available for reference only.
{{</Aside>}}

## Upload schemas via the API to Schema Validation

1. Upload a schema.
2. Ensure that your endpoints are added in Endpoint Management.
3. Set the schema to `active` if it is not already done.
4. Set the Schema Validation zone-wide action from `none` to `log`.
5. Send test traffic that violates the schema.
6. View test traffic in Security Events by filtering for **Service** > **API Shield - Schema Validation**.
7. Optional:
    - Set a single endpoint to `block`.
    - Set the Schema Validation zone-wide to `block`.
    - Temporarily override all schemas zone-wide to `none`.
    - Remove the temporary override.

Cloudflare recommends you to rerun test traffic and monitor the HTTP response codes after changing any settings to ensure Schema Validation is operating as expected.

Settings changes may take a few minutes to implement.

{{<Aside type="note">}}
Endpoints must be listed in Endpoint Management for Schema Validation to match requests.
{{</Aside>}}

## Configuration

### Upload and activate a schema

Upload a schema via the v4 API using `POST`. This example requires a `example_schema.yaml` schema file in the current folder.

```bash
---
header: cURL command
---
curl --request POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas" \
--header "Authorization: Bearer <API_TOKEN>" \
--form file=@example_schema.yaml --form kind=openapi_v3 --form name=example_schema --form validation_enabled=false
```

```json
---
header: Result
---
{
    "result":
    {
        "schema":
        {
            "schema_id": "af632e95-c986-4738-a67d-2ac09995017a",
            "name": "example_schema",
            "kind": "openapi_v3",
            "source": "<SOURCE>",
            "created_at": "2023-04-03T15:10:08.902309Z"
        }
    },
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

By default, Schema Validation is disabled for an uploaded schema so that you can inspect it first. You can upload a schema and enable it immediately by setting the form parameter `validation_enabled=true`.

Use a `PATCH` request to activate a schema after inspection.

```bash
---
header: cURL command
---
curl --request PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}" \
--header "Authorization: Bearer <API_TOKEN>" \
--header 'Content-Type: application/json' \
--data '{
 "validation_enabled": true
 }'
```

```json
---
header: Result
---
{
    "result":
    {
        "schema_id": "0bf58160-5da3-48ac-80a9-069f9642c1a0",
        "name": "api_schema.json",
        "kind": "openapi_v3",
        "validation_enabled": true,
        "created_at": "0001-01-01T00:00:00Z"
    },
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

When a schema is active, it executes the mitigation action specified for each operation. Refer to [change the default and operation-specific mitigation action](/api-shield/security/schema-validation/configure/#change-the-default-and-operation-specific-mitigation-action).

### Add new operations to Endpoint Management

Schemas contain a set of servers, paths, and methods, which together define an operation. Schema Validation only acts on the requests to operations which have been added to the API Shield Endpoint Management. If a schema contains operations which have not been added to Endpoint Management, they can be retrieved together with the configuration information about added operations.

```bash
---
header: cURL command
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations?feature=schema_info&page=1&per_page=50000" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Result
---
{
    "result":
    {
        "existing_operations":
        [
            {
                "operation_id": "5c734fcd-455d-4040-9eaa-dbb3830526ae",
                "method": "POST",
                "host": "example.com",
                "endpoint": "/pets",
                "last_updated": "2023-04-04T16:07:37.575971Z",
                "features":
                {
                    "schema_info":
                    {
                        "active_schema":
                        {
                            "id": "0bf58160-5da3-48ac-80a9-069f9642c1a0",
                            "name": "example_schema",
                            "created_at": "2023-04-04T12:52:05.036341Z",
                            "is_learned": false,
                            "mitigation_action": null
                        },
                        "learned_available": false
                    }
                }
            }
        ],
        "new_operations":
        [
            {
                "method": "GET",
                "host": "example.com",
                "endpoint": "/pets",
            }
        ]
    },
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

To receive information about the configuration of existing operations, Cloudflare recommends passing the `?feature=schema_info` parameter.

You can add new operations in a schema to Endpoint Management using `POST`.

```bash
---
header: cURL command
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations" \
--header "Authorization: Bearer <API_TOKEN>" \
--header 'Content-Type: application/json' \
--data '[
  {
   "method": "GET",
   "host": "example.com",
   "endpoint": "/pets",
  }
]'
```

```json
---
header: Result
---
{
    "result":  [
            {
                "operation_id": "6c734fcd-455d-4040-9eaa-dbb3830526ae",
                "method": "GET",
                "host": "example.com",
                "endpoint": "/pets",
                "last_updated": "2023-04-04T16:07:37.575971Z"
         }
     ],
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

You can add all operations in a schema that do not already exist in Endpoint Management by combining two commands as one. There is a maximum of 20 operations for this API call. The example requires the `jq` tool.

```bash
---
header: cURL command
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data "(curl --silent "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations?feature=schema_info" \
--header "Authorization: Bearer <API_TOKEN>" | jq ".result.new_operations")"
```

{{<Aside type="note">}}
If you run this command again immediately, it will result in an error as all `new_operations` are now `existing_operations`.
{{</Aside>}}

### Change the default and operation-specific mitigation action

If a schema is uploaded and active for a set of operations, it validates incoming requests to each operation and decides whether a mitigation action should be taken. This mitigation action is defined per operation and can take the values **none**, **log**, and **block**, which correspond to no action, logging the requests, or blocking them before they reach the origin. 

New operations will not have a mitigation action set and will use the zone-wide default mitigation action. The current default mitigation action can be retrieved using `GET`.

```bash
---
header: cURL command
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/settings/schema_validation" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Result
---
{
    "result":  {
        "validation_default_mitigation_action": "none", 
        "validation_override_mitigation_action": null
    }
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

A new value out of `none`, `log`, and `block` can be set using `PUT`.

```bash
---
header: cURL command
---
curl --request PUT "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/settings/schema_validation" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "validation_default_mitigation_action": "block"
}'
```

```json
---
header: Result
---
{
    "result":  {
        "validation_default_mitigation_action": "block", 
        "validation_override_mitigation_action": null
    }
    "success": true,
    "errors":
    [],
    "messages":
    []
}

```

If the mitigation action for an individual operation is of interest, the current value can be retrieved with `GET` using the operation ID. 

```bash
---
header: cURL command
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Result
---
{
    "result":  {
        "mitigation_action": "null"
    }
    "success": true,
    "errors":
    [],
    "messages":
    []
}

```

If the value is `null`, it means that no mitigation action has been specified for this operation and the default mitigation action is being used. 

You can set the mitigation action to a value out of `none`, `block`, `log`, and `null` by using `PUT`.

```bash
---
header: cURL command
---
curl --request PUT "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
    "mitigation_action": "block"
}'
```

```json
---
header: Result
---
{
    "result":  {
        "mitigation_action": "block"
    }
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

### List all schemas

You can get an overview of the schemas currently active on a zone using `GET`. 

`validation_enabled=true` is an optional parameter.

```bash
---
header: cURL command
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas?omit_source=true" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Result
---
{
    "result":  [
        {
	        "schema_id": "af632e95-c986-4738-a67d-2ac09995017a",
	        "name": "example_schema",
	        "kind": "openapi_v3",
	        "source": "<SOURCE>",
	        "created_at": "2023-04-03T15:10:08.902309Z"
	    }
    ]
    "success": true,
    "errors":
    [],
    "messages":
    []
}

```

{{<Aside type="note">}}
We recommend using the query parameter `omit_source=true` to only display active schemas and not retrieve the source for every schema to get less output.
{{</Aside>}}

### Delete a schema

You can delete a schema using `DELETE`.

```bash
---
header: cURL command
---
curl --request DELETE "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Result
---
{
    "result":  null,
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

### Activate a learned schema for an operation

Cloudflare provides automatically learned parameter schemas for all operations in Endpoint Management with a sufficient amount of requests. A learned schema can be inspected using `GET`.

```bash
---
header: cURL command
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations/{operation_id}?feature=parameter_schemas" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Result
---
{
    "result":
    {
        "operation_id": "5c734fcd-455d-4040-9eaa-dbb3830526ae",
        "method": "PATCH",
        "host": "example.com",
        "endpoint": "/pets",
        "last_updated": "2023-04-04T16:07:37.575971Z",
        "features":
        {
            "parameter_schemas":
            {
                "last_updated": "2023-04-03T20:11:55.879006Z",
                "parameter_schemas":
                {
                    "responses": null,
                    "parameters":
                    [
                        {
                            "in": "query",
                            "name": "var1",
                            "schema":
                            {
                                "type": "string"
                            },
                            "required": true,
                            "description": "Sufficient requests have been observed for this parameter to provide high confidence in this parameter schema."
                        }
                    ],
                    "x-cf-parameter-schemas": "operation schema with automatically learned path and query parameters"
                }
            }
        }
    },
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```

If you are satisfied with the inspected parameter schema, you can add and activate it using `PUT`. 

```bash
---
header: cURL command
---
curl --request PUT "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations/{operation_id}/cloudflare_learned_schema?timestamp=2023-04-03T20:11:55.879006Z" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Result
---
{
    "result": null,
    "success": true,
    "errors":
    [],
    "messages":
    []
}

```

{{<Aside type="note">}}
Parameter schemas are updated between every 24 hours up to one week. To ensure that a parameter schema has not been updated during the inspection, Cloudflare recommends that you pass the `last_updated` timestamp of the parameter-schema feature (not the `last_updated` of the whole operation) as an identifier in the timestamp query parameter.
{{</Aside>}}

### Disable Schema Validation

To quickly disable schema validation for a whole zone, use `PATCH`. This operation will override all operation-mitigation actions.

```bash
---
header: cURL command
---
curl --request PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/settings/schema_validation" \
--header "Authorization: Bearer <API_TOKEN>" \
--header 'Content-Type: application/json' \
--data '{
    "validation_override_mitigation_action": "none"
}'
```
```json
---
header: Result
---
{
    "result":  {
        "validation_default_mitigation_action": "block", 
        "validation_override_mitigation_action": "none"
    }
    "success": true,
    "errors":
    [],
    "messages":
    []
}
```
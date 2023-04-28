---
title: Configure
pcx_content_type: how-to
type: overview
layout: list
meta:
  title: Configure Schema Validation
---

# Configure Schema Validation 2.0

Schema Validation 2.0 allows all corresponding configuration calls to be made via API. It centers more around individual endpoints and lets you set mitigation actions for each endpoint individually. Additionally, you can use Cloudflare-provided learned schemas that we [learn automatically](/api-shield/management-and-monitoring/#endpoint-schema-learning) from your traffic for individual endpoints. 

{{<Aside type="note">}}

[Classic Schema Validation documentation](/api-shield/reference/classic-schema-validation/) is available for reference only.

{{</Aside>}}

## Procedure to upload schemas via the API to Schema Validation

1. Upload a schema.
2. Ensure that your endpoints are added in Endpoint Management.
3. Set the schema to `active` if it is not already done.
4. Set the Schema Validation zone-wide action from `none` to `log`.
5. Send test traffic that violates the schema.
6. View test traffic in Firewall Events by filtering for **Service** > **API Shield** > **Schema Validation**.
7. Optional:
    - Set a single endpoint to `block`.
    - Set the Schema Validation zone-wide to `block`.
    - Temporarily override all schemas zone-wide to `none`.
    - Remove the temporary override.

Cloudflare recommends you to rerun test traffic and monitor the HTTP response codes after every settings change to ensure Schema Validation is operating as expected.

Settings changes may take a few minutes to implement.

{{<Aside type="note">}}

Endpoints must be listed in Endpoint Management for Schema Validation to match requests.

{{</Aside>}}

## Use cases

### Upload and activate a schema

A schema can be uploaded via the v4 API using `POST`.

<div>

```sh
---
header: cURL command
---
$ curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas" \
  -H "Authorization: Bearer REDACTED" \
  --form file=@example_schema.yaml --form kind=openapi_v3 --form name=example_schema --form validation_enabled=false
```

</div>
<div>

```sh
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
            "source": "{redacted}",
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

</div>

Per default, Schema Validation is disabled for an uploaded schema to allow for inspection. A schema can be uploaded directly in enabled form by setting the form parameter `validation_enabled=true`.

A schema could be activated after inspection using `PATCH`.

<div>

```sh
---
header: cURL command
---
$ curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json' \
  -d '{
        "validation_enabled": true
    }'
 ```
 </div>
 <div>

```sh
---
header: Result
---
{
    "result":
    {
        "schema_id": "0bf58160-5da3-48ac-80a9-069f9642c1a0",
        "name": "sv_2_testing.json",
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

</div>

When a schema is active, it executes the mitigation action specified for each operation. Refer to [change the default and operation-specific mitigation action](/api-shield/security/schema-validation/configure/#change-the-default-and-operation-specific-mitigation-action).

### Add new operations to Endpoint Management

Schemas contain a set of servers, paths, and methods, which together define an operation. Schema Validation only acts on the requests to operations which have been added to the API Shield Endpoint Management. If a schema contains operations which have not been added to Endpoint Management, they can be retrieved together with the configuration information about added operations.

<div>

```sh
---
header: cURL command
---
$ curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations?feature=schema_info" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json'
```
</div>
<div>

```sh
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
</div>

To receive information about the configuration of existing operations, Cloudflare recommends passing the `?feature=schema_info` parameter.

You can add new operations in a schema to Endpoint Management using `GET`.

<div>

```sh
---
header: cURL command
---
$ curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations?feature=schema_info" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json' \
  -d '  [
            {
                "method": "GET",
                "host": "example.com",
                "endpoint": "/pets",
            }
        ]'
```
</div>
<div>

```sh
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
</div>

You can add all operations in a schema that do not already exist in Endpoint Management by combining two commands as one.

<div>

```sh
---
header: Example using cURL
---
$ curl -s -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json' \
  -d "$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations?feature=schema_info" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json' | jq ".result.new_operations")"
```
</div>

{{<Aside type="note">}}

If you run this command again immediately, it will result in an error as all `new_operations` are now `existing_operations`.

{{</Aside>}}

### Change the default and operation-specific mitigation action

If a schema is uploaded and active for a set of operations, it validates incoming requests to each operation and decides whether a mitigation action should be taken. This mitigation action is defined per operation and can take the values **none**, **log**, and **block**, which correspond to no action, logging the requests, or blocking it before it reaches the origin. 

New operations will not have a mitigation action set and will use the zone-wide default mitigation action. The current default mitigation action can be retrieved using `GET`.

<div>

```sh
---
header: cURL command
---
$ curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/settings/schema_validation" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json'
```
</div>
<div>

```sh
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
</div>

A new value out of **none**, **log**, and **block** can be set using `PUT`.

<div>

```sh
---
header: cURL command
---
$ curl -X PUT "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/settings/schema_validation" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json' \
  -d '{
        "validation_default_mitigation_action": "block"
    }
```
</div>
<div>

```sh
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
</div>

If the mitigation action for an individual operation is of interest, the current value can be retrieved with `GET` using the operation-ID. 

<div>

```sh
---
header: cURL command
---
$ curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json'
```
</div>
<div>

```sh
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
</div>

If the value is **null**, it means that no mitigation action has been specified for this operation and the default mitigation action is being used. 

You can set the mitigation action to a value out of **none**, **block**, **log**, and **null** by using `PUT`.

<div>

```sh
---
header: cURL command
---
$ curl -X PUT "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json' \
  -d '{
        "mitigation_action": "block"
    }
```
</div>
<div>

```sh
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

</div>

### List all schemas

You can get an overview of the schemas currently active on a zone using `GET`.

<div>

```sh
---
header: cURL command
---
$ curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas?validation_enabled=true&omit_source=true" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json'
```
</div>
<div>

```sh
---
header: Result
---
{
    "result":  [
        {
	        "schema_id": "af632e95-c986-4738-a67d-2ac09995017a",
	        "name": "example_schema",
	        "kind": "openapi_v3",
	        "source": "{redacted}",
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

</div>

{{<Aside type="note">}}

We recommend using the query parameters `validation_enabled=true` and `omit_source=true` to only display active schemas and not retrieve the source for every schema to have a less convoluted output.

{{</Aside>}}

### Delete a schema

You can delete a schema using `DELETE`.

<div>

```sh
---
header: cURL command
---
$ curl -X DELETE "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/user_schemas/{schema_id}" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json'
```
</div>
<div>

```sh
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

</div>

### Activate a learned schema for an operation

Cloudflare provides automatically learned parameter schemas for all operations in Endpoint Management that see a sufficient amount of requests. A learned schema can be inspected using `GET`.

<div>

```sh
---
header: cURL command
---
$ curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations/{operation_id}?feature=parameter_schemas" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json'
```
</div>
<div>

```sh
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

</div>

If you are satisfied with the inspected parameter schema, it can be added and activated using `PUT`. 

<div>

```sh
---
header: cURL command
---
$ curl -X PUT "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/operations/{operation_id}/cloudflare_learned_schema?timestamp=2023-04-03T20:11:55.879006Z" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json'
```
</div>
<div>

```sh
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
</div>

{{<Aside type="note">}}

Parameter schemas are updated between every 24 hours up to one week. To ensure that a parameter schema has not been updated during the inspection, we advise that you pass the `last_updated` timestamp of the parameter-schema feature (not the `last_updated` of the whole operation) as an identifier in the timestamp query parameter.

{{</Aside>}}

### Disable Schema Validation

If schema validation should be quickly disabled for a whole zone, `PATCH` can be made to override all operation-mitigation actions.

<div>

```sh
---
header: cURL command
---
$ curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/settings/schema_validation" \
  -H "Authorization: Bearer REDACTED" \
  -H 'Content-Type: application/json' \
  -d '{
        "validation_override_mitigation_action": "none"
    }
```
</div>
<div>

```sh
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
</div>
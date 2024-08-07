---
title: Configure JWT Validation
pcx_content_type: how-to
type: overview
layout: wide
weight: 1
meta:
  title: Configure JWT Validation
---

# Configure JWT Validation

Use the Cloudflare API to configure [JWT Validation](/api-shield/security/jwt-validation/), which requires Token Configurations and Token Validation Rules.

## Token Configurations

A Token Configuration defines a JSON Web Key Set (JWKs), which is used to validate JSON Web Tokens (JWTs) sent by clients and information on where these JWTs are sent in the request.

{{<Aside type="note">}}
A zone may have up to four Token Configurations.
{{</Aside>}}

Token Configurations require the following information:

|  <div style="width:120px">Field name</div> | Description | Example | Notes |
| --- | --- | --- | --- |
| `title` | A human-readable name for the configuration that allows to quickly identify the purpose of the configuration. | Production JWT configuration | Limited to 50 characters. |
| `description ` | A human-readable description that gives more details than `title` which serves as a means to allow customers to better document the use of the configuration. | This configuration is used for all endpoints in endpoint management and checks the JWT in the authorization header.| Limited to 500 characters. |
| `token_sources` | A list of possible locations where then JWT can be found on the request. | `http.request.headers[\"authorization\"][0]` <br /> `http.request.cookies[\"Authorization\"][0]`| Refer to the [information](#token-sources) below. |
|  `token_type` | This specifies the type of token to validate. | `jwt` | Only `jwt` is currently supported. |
| `credentials` | This describes the cryptographic public keys that should be used to validate JWTs. This field must be a JSON web key. |  Refer to the example below. | Refer to the [information](#credentials) below. |

### Token sources

Each item must be a Ruleset Engine expression that resolves to a string.

Currently supported fields are `http.request.headers` and `http.request.cookies`.

You can set up to four token sources. If a request has more than one of these fields set, only one will be used. Leading `Bearer: ` strings in request tokens are automatically ignored.

Refer to the [Ruleset Engine documentation](/ruleset-engine/rules-language/fields) for details on working with Ruleset Engine fields.

### Credentials

API Shield supports credentials of type `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `ES256`, and `ES384`. RSA keys must be at least 2048-bit. Each JSON web key must have a “KID” which must be present in the JWT's header as well to allow  API Shield to match them.

We allow up to 4 different keys in order to aid in key rollover.

Cloudflare will remove any fields that are unnecessary from each key and will drop keys that we do not support.

It is highly recommended to validate the output of the API call to check that the resulting keys appear as intended.

## Token Configuration JSON object

The example below shows a JSON object with all of the information necessary to create a Token Configuration using the Cloudflare API. If you would like to create JWKs for testing, refer to [mkjwk JSON Web Key Generator](https://mkjwk.org/).

```json
---
header: Example
---
{
    "title": "Production JWT configuration",
    "description": "This configuration checks the JWT in the authorization header or cookie.",
    "token_sources": [
        "http.request.headers[\"authorization\"][0]",
        "http.request.cookies[\"Authorization\"][0]"
    ],
    "token_type": "jwt",
    "credentials": {
        "keys": [
            {
                "kty": "EC",
                "use": "sig",
                "crv": "P-256",
                "kid": "93UrzmNu1mqXs5cZcvCPkTlMHB2Jya30vSTkiBb0vhU",
                "x": "QG3VFVwUX4IatQvBy7sqBvvmticCZ-eX5-nbtGKBOfI",
                "y": "A3PXCshn7XcG7Ivvd2K_DerW4LHAlIVKdqhrUnczTD0",
                "alg": "ES256"
            }
        ]
    }
}
```


## Create a Token Configuration using the Cloudflare API

Use cURL or any other API client tool to send the new configuration to Cloudflare’s API to enable JWT Validation. Make sure to replace `{zone_id}` with the relevant zone ID and add your [authentication credentials](/fundamentals/api/get-started/create-token/) header.

```bash
---
header: Example using cURL
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/token_validation" \
--header 'Content-Type: application/json' \
--data '{
    "title": "Production JWT configuration",
    "description": "This configuration checks the JWT in the authorization header or cookie.",
    "token_sources": [
        "http.request.headers[\"authorization\"][0]",
        "http.request.cookies[\"Authorization\"][0]"
    ],
    "token_type": "jwt",
    "credentials": {
        "keys": [
            {
                "kty": "EC",
                "use": "sig",
                "crv": "P-256",
                "kid": "93UrzmNu1mqXs5cZcvCPkTlMHB2Jya30vSTkiBb0vhU",
                "x": "QG3VFVwUX4IatQvBy7sqBvvmticCZ-eX5-nbtGKBOfI",
                "y": "A3PXCshn7XcG7Ivvd2K_DerW4LHAlIVKdqhrUnczTD0",
                "alg": "ES256"
            }
        ]
    }
}'
```

The response will be in a Cloudflare `v4` response envelope and the result contains the created configuration. Note the returned ID, as it will be used to reference the Token Configuration when creating Token Validation rules using the API.

```json
---
header: Example response
---
{
    "result": {
        "id": "d5902294-00c3-4aed-b517-57e752e9cd58",
        "token_type": "JWT",
        "title": "Production JWT configuration",
        "description": "This configuration checks the JWT in the authorization header or cookie.",
        "token_sources": [
            "http.request.headers[\"authorization\"][0]",
            "http.request.cookies[\"Authorization\"][0]"
        ],
        "credentials": {
            "keys": [
                {
                    "x": "QG3VFVwUX4IatQvBy7sqBvvmticCZ-eX5-nbtGKBOfI",
                    "y": "A3PXCshn7XcG7Ivvd2K_DerW4LHAlIVKdqhrUnczTD0",
                    "alg": "ES256",
                    "crv": "P-256",
                    "kid": "93UrzmNu1mqXs5cZcvCPkTlMHB2Jya30vSTkiBb0vhU",
                    "kty": "EC"
                }
            ]
        },
        "created_at": "2023-11-08T16:45:17.236841Z",
        "last_updated": "2023-11-08T16:45:17.236841Z"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

## Token Validation Rules

Token Validation Rules allow you to enforce a security policy using existing Token Configurations.

Token Validation Rules can be configured using the Cloudflare API or [dashboard](/api-shield/security/jwt-validation/#add-a-jwt-validation-rule).

| <div style="width:120px">Field name</div> | Description | Example | Notes |
| --- | --- | --- | --- |
| `title` | A human-readable name allowing you to quickly identify it. | JWT Validation on `v1` and `v2.example.com` | Limited to 50 characters. |
| `description` | A human-readable description that gives more details than `title` and helps to document it.	| Log requests without a valid `authorization` header. | Limited to 500 characters. |
| `action` | The Firewall Action taken on requests that do not meet `expression`. | `log` | Possible: `log` or `block` |
| `enabled` | Enable or disable the rule. | `true` | Possible: `true` or `false` |
| `expression` | The rule's security policy. | `is_jwt_valid ("00170473-ec24-410e-968a-9905cf0a7d03")` | Make sure to escape any quotes when creating rules using the Cloudflare API. <br /> Refer to [Define a security policy](/api-shield/security/jwt-validation/configure/#define-a-security-policy) below. |
| `selector` | Configure what operations are covered by this rule. | | Refer to [Applying a rule to operations](/api-shield/security/jwt-validation/configure/#apply-a-rule-to-operations) below. |

### Selectors

Selectors control the scope of your token validation rule.

If you only need JWT Validation on specific hostnames or subdomains of your apex domain, use the hostname in a selector to include it in the JWT Validation rule.

If you need to exclude endpoints from JWT validation that never have valid JWTs used with them (by design), such as a path and method used to establish a valid JWT in the first place, you must use the endpoint’s operation ID to exclude the endpoint in a selector.

To find the operation ID, refer to [Endpoint Management](/api-shield/management-and-monitoring/) or use the [Cloudflare API](/api/operations/api-shield-endpoint-management-retrieve-information-about-all-operations-on-a-zone).

## Define a security policy

{{<Aside type="note">}}
A request must also match an operation covered by this rule to trigger an action.

Refer to [Apply a rule to operations](/api-shield/security/jwt-validation/configure/#apply-a-rule-to-operations) for more information.
{{</Aside>}}

A Token Validation rule's expression defines a security policy that a request must meet.

For example, the expression `is_jwt_valid("51231d16-01f1-48e3-93f8-91c99e81288e") or is_jwt_valid("51231d16-01f1-48e3-93f8-91c99e81288e")` will trigger if an incoming request does not have at least one valid authentication token.

These expressions are similar to [expressions used in Ruleset Engine](/ruleset-engine/rules-language/), with a few key differences:

- The Token Validation rule actions trigger if the expression evaluates `false`, as opposed to Ruleset expressions.
- The Token Validation rules can use dedicated functions that reference Token Configurations.

Operators such as `or`, `and`, `eq`, and more are usable in expressions in the same way as in expressions used in Ruleset Engine.

The following functions can be used to interact with JWT Tokens on a request:

| <div style="width:150px">Function</div> | Description | Notes |
| --- | --- | --- |
| `is_jwt_valid(token_configuration_id String) bool` | `True` if the request has a valid token according to the Token Configuration with the ID `token_configuration_id`. | `token_configuration_id` must be the ID of an existing Token Configuration. This will return `false` if the token is missing from the request. |
| `is_jwt_present(token_configuration_id String) bool` | `True` if the request has a token as configured in the Token Configuration with the ID `token_configuration_id`. | `token_configuration_id` must be the ID of an existing Token Configuration. |

### Common use cases

Refer to the following example use cases to understand which security policy to use. For most use cases, Cloudflare recommends requiring a valid token across your API and excluding any paths that are used to establish or refresh tokens using selectors.

#### Require a token

The `is_jwt_present("51231d16-01f1-48e3-93f8-91c99e81288e")` expression will trigger an action if a request is missing a JWT.

It can be combined with a `log` action in the Token Validation rule to log requests that are missing an authentication header.

#### Require a valid token

The `is_jwt_valid("51231d16-01f1-48e3-93f8-91c99e81288e")` expression will trigger an action if a request does not have a valid JWT.

It can be combined with a `block` action in the Token Validation rule to block requests with no or invalid credentials.

#### Require at least one of two possible tokens

The `is_jwt_valid("51231d16-01f1-48e3-93f8-91c99e81288e") or  is_jwt_valid("fddfc39e-3686-4683-ab23-bf917da6bb43")` expressions will trigger an action if a request does not have at least one valid token.

This can occur if you need to split JWKs into multiple token configurations.

#### Require a valid token but ignore requests without a token

The `is_jwt_valid("51231d16-01f1-48e3-93f8-91c99e81288e") or not is_jwt_valid("51231d16-01f1-48e3-93f8-91c99e81288e")` expressions will trigger an action if a request has an invalid token, ignoring requests with no tokens at all.

## Apply a rule to operations

Only one Token Validation rule can apply to an operation. If an operation is covered by multiple rules, then the rule with highest precedence will take effect.

You can configure which operations JWT Validation is enforced on using the `selector` field.

{{<Aside type="note">}}
Selectors will also apply to new operations. New operations that match an existing selector will automatically be covered by that Token Validation rule.
{{</Aside>}}

For example, the following selector will apply a rule to all operations in `v1.example.com` and `v2.example.com`, except for two operations on these hosts:

```json
---
header: Selector example
---
{
    "include": [
        {
            "host": [
                "v1.example.com",
                "v2.example.com"
            ]
        }
    ],
    "exclude": [
        {
            "operation_ids": [
                "f9c5615e-fe15-48ce-bec6-cfc1946f1bec", // POST v1.example.com/login
                "56828eae-035a-4396-ba07-51c66d680a04"  // POST v2.example.com/login
            ]
        }
    ]
}
```

Operations can be included at a host level and ignored on a per-operation basis.

You can use the `POST /zones/{zone_id}/api_gateway/token_validation/rules/preview` endpoint to see the operations covered by this rule:

```bash
---
header: Example using cURL
---
curl --request PUT \
'https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/token_validation/rules/preview' \
--header 'Content-Type: application/json' \
--data '{
    "include": [
        {
            "host": [
                "v1.example.com",
                "v2.example.com"
            ]
        }
    ],
    "exclude": [
        {
            "operation_ids": [
                "f9c5615e-fe15-48ce-bec6-cfc1946f1bec", // POST v1.example.com/login
                "56828eae-035a-4396-ba07-51c66d680a04"  // POST v2.example.com/login
            ]
        }
    ]
}'
```

The response will include all operations on a zone with an additional `state` field.

The `state` field can be `ignored`, `excluded`, or `included`. Included operations will match the hostname selectors you specified. Excluded operations will match the operation IDs you specified in the selector. Ignored operations are those that do not match anything specified in the selector.

```json
---
header: Result
---
{
    "result": {
        "operations": [
            {
                "operation_id": "ed15fcb6-5a73-41cd-91af-8c61e5bb1cdb",
                "method": "GET",
                "host": "example.com",
                "endpoint": "/api/accounts/{var1}",
                "last_updated": "2023-05-24T14:54:34.806506Z",
                "state": "ignored"
            },
            {
                "operation_id": "e7a582cd-3cfb-4061-ab5b-722e6e42f545",
                "method": "GET",
                "host": "v1.example.com",
                "endpoint": "/api/accounts/{var1}",
                "last_updated": "2023-05-24T14:54:34.806506Z",
                "state": "included"
            },
            {
                "operation_id": "ddd5df5a-795c-40ce-b38c-38e9d7ef9ae8",
                "method": "GET",
                "host": "v2.example.com",
                "endpoint": "/api/accounts/{var1}",
                "last_updated": "2023-05-24T14:54:34.806506Z",
                "state": "included"
            },
            {
                "operation_id": "4d20befb-0120-45d5-9b29-5835fd41b44e",
                "method": "GET",
                "host": "v3.example.com",
                "endpoint": "/api/accounts/{var1}",
                "last_updated": "2023-05-24T14:54:34.806506Z",
                "state": "ignored"
            },
            {
                "operation_id": "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
                "method": "POST",
                "host": "v1.example.com",
                "endpoint": "/login",
                "last_updated": "2023-05-24T14:54:34.806506Z",
                "state": "excluded"
            },
            {
                "operation_id": "56828eae-035a-4396-ba07-51c66d680a04",
                "method": "POST",
                "host": "v2.example.com",
                "endpoint": "/login",
                "last_updated": "2023-05-24T14:54:34.806506Z",
                "state": "excluded"
            },
            {
                "operation_id": "cf86874c-8d0c-4337-ae14-4e2459b541ac",
                "method": "GET",
                "host": "v3.example.com",
                "endpoint": "login",
                "last_updated": "2023-05-24T14:54:34.806506Z",
                "state": "ignored"
            }
        ],
        "total": 7,
        "included": 2,
        "excluded": 2,
        "ignored": 3,
        "selected_hosts": [
            "v1.example.com",
            "v2.example.com"
        ],
        "available_hosts": [
            "example.com",
            "v1.example.com",
            "v1.example.com",
            "v3.example.com"
        ]
    },
    "success": true,
    "errors": [],
    "messages": [],
    "result_info": {
        "page": 1,
        "per_page": 20,
        "count": 20,
        "total_count": 1631
    }
}
```

Operations with a `included` state will be covered by the Token Validation Rule. The response also shows the hostnames of included operations in `result.selected_hosts` and shows all hostnames used by all zone operations in `result.available_hosts`.

You can also send an empty object in the request body:

```bash
---
header: Example using cURL
---
curl --request PUT \
'https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/token_validation/rules/preview' \
--header 'Content-Type: application/json' \
--data '{ }'
```

The response will show all zone operations and all possible hosts, which you can use to build your own selector.

## Token Validation Rule JSON object

The example below shows a JSON object with all the necessary information to create a Token Validation Rule using the Cloudflare API.

Replace any Token Configurations IDs and operation IDs with the IDs that exist in your zone.

```json
---
header: Token Validation Rule JSON example
---
[
    {
        "title": "JWT Validation on v1 and v2.example.com",
        "description": "Log requests without a valid authorization header.",
        "action": "log",
        "enabled": true,
        "expression": "is_jwt_valid(\"00170473-ec24-410e-968a-9905cf0a7d03\")",
        "selector": {
            "include": [
                {
                    "host": [
                        "v1.example.com",
                        "v2.example.com"
                    ]
                }
            ],
            "exclude": [
                {
                    "operation_ids": [
                        "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
                        "56828eae-035a-4396-ba07-51c66d680a04"
                    ]
                }
            ]
        }
    }
]
```

## Create a Token Validation Rule using the Cloudflare API

Use cURL or any other API client tool to send the new configuration to Cloudflare’s API to enable JWT Validation. Make sure to replace `{zone_id}` with the relevant zone ID and add your [authentication credentials](/fundamentals/api/get-started/create-token/) header.

Replace any Token Configurations IDs and operation IDs with the IDs that exist in your zone.

A single request can create multiple rules. To do so, pass multiple rule objects in the JSON array of the request body.

```bash
---
header: Example using cURL
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/token_validation/rules" \
--header 'Content-Type: application/json' \
--data '[
    {
        "title": "JWT Validation on v1 and v2.example.com",
        "description": "Log requests without a valid authorization header.",
        "action": "log",
        "enabled": true,
        "expression": "is_jwt_valid(\"00170473-ec24-410e-968a-9905cf0a7d03\")",
        "selector": {
            "include": [
                {
                    "host": [
                        "v1.example.com",
                        "v2.example.com"
                    ]
                }
            ],
            "exclude": [
                {
                    "operation_ids": [
                        "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
                        "56828eae-035a-4396-ba07-51c66d680a04"
                    ]
                }
            ]
        }
    }
]'
```

The response will be in a Cloudflare `v4` response envelope and the result contains the created rules. Note the returned ID for each rule, which can be used to edit or delete an existing rule.

```json
---
header: Result
---
{
    "result": [
        {
            "id": "5ec7c417-6964-4b24-b82c-a23a7ec8f90c",
            "title": "JWT Validation on v1 and v2.example.com",
            "description": "Log requests without a valid authorization header.",
            "action": "log",
            "enabled": true,
            "expression": "is_jwt_valid(\"00170473-ec24-410e-968a-9905cf0a7d03\")",
            "selector": {
                "include": [
                    {
                        "host": [
                            "v1.example.com",
                            "v2.example.com"
                        ]
                    }
                ],
                "exclude": [
                    {
                        "operation_ids": [
                            "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
                            "56828eae-035a-4396-ba07-51c66d680a04"
                        ]
                    }
                ]
            },
            "created_at": "2023-10-18T12:08:09.575388Z",
            "last_updated": "2023-10-18T12:08:09.575388Z",
            "modified_by": "user@cloudflare.com"
        }
    ],
    "success": true,
    "errors": [],
    "messages": []
}
```

## Maintenance

### Update Token Configuration

It is best practice to rotate keys after some time. To support updating the keys, Cloudflare allows up to four keys per configuration. This allows you to add a second, new key to an already existing key. You can start issuing JWTs with the new key only and remove the old key after some time. Additionally, this feature allows the deployment of testing or development keys next to production keys.

The input to updating the keys is the same as when creating a configuration where you supplied the initial keys using the credentials key and needs to be a JWK.

{{<Aside type="note">}}
Cloudflare will remove any fields that are unnecessary from each key and will drop keys that we do not support.

It is highly recommended to validate the output of the {{<glossary-tooltip term_id="API call">}}API call{{</glossary-tooltip>}} to check that the resulting keys appear as intended.
{{</Aside>}}

Use the `PUT` command to update keys.

```bash
---
header: Example using cURL
---
curl --request PUT \
'https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/token_validation/{config_id}/credentials' \
--header 'Content-Type: application/json' \
--data '{
    "keys": [
        {
            "kty": "EC",
            "use": "sig",
            "kid": "test",
            "x": "-0LNzBheJPn-Zy6JmanTIUX7xc3jgqU714IQY0oU6mw",
            "y": "KONxBybUcRsJQmtu17jMAHsILSw009AuU3ulfUGv3FI",
            "alg": "ES256"
        },
        {
            "kty": "EC",
            "crv": "P-256",
            "kid": "test-2",
            "x": "iIbPRbOeLzjGPvv7iwmzCOTU03R0xDqbenp2D6GUcWo",
            "y": "tDkEh95PnfWwIXciCtdBBVA7wfghx_egmZ1Zcvu2lWw",
            "alg": "ES256"
        }
    ]
}'
```

Make sure to replace `{zone_id}` with the relevant zone ID and add your [authentication credentials](/fundamentals/api/get-started/create-token/) header.

### Update Token Validation Rules

Token Validation rules can be updated with a `PATCH` request. A single `PATCH` request can update multiple rules.

A `PATCH` request is specified as a JSON array in the request body. Each item in that array contains updates to a single rule, defined by `id`.

The following example updates one rule and disables another:

```bash
---
header: Example using cURL
---
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/token_validation/rules"  \
--header "Content-Type: application/json" \
--data '[
    {
        "id": "714d3dd0-cc59-4911-862f-8a27e22353cc",
        "action": "log",
        "title": "updated title"
    },
    {
        "id": "7124f9bc-d6b5-430d-b488-b6bc2892f2fb",
        "enabled": false
    }
]'
```

Rules can be reordered by setting a position field in the `PATCH` body.

This example places rule `714d3dd0-cc59-4911-862f-8a27e22353cc` after rule `7124f9bc-d6b5-430d-b488-b6bc2892f2fb`:

```bash
---
header: Example using cURL
---
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/token_validation/rules" \
--header 'Content-Type: application/json' \
--data '[
    {
        "id": "714d3dd0-cc59-4911-862f-8a27e22353cc",
        "position": {
            "after": "7124f9bc-d6b5-430d-b488-b6bc2892f2fb"
        }
    }
]'
```

This example places rule `714d3dd0-cc59-4911-862f-8a27e22353cc` before rule `7124f9bc-d6b5-430d-b488-b6bc2892f2fb`:

```bash
---
header: Example using cURL
---
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/api_gateway/token_validation/rules" \
--header 'Content-Type: application/json' \
--data '[
    {
        "id": "714d3dd0-cc59-4911-862f-8a27e22353cc",
        "position": {
            "before": "7124f9bc-d6b5-430d-b488-b6bc2892f2fb"
        }
    }
]'
```

## Perform JWT Validation

Here is an overview of how JWT Validation processes incoming requests:

1. We extract the JWT in accordance with the configuration from the incoming request.
2. We decode the JWT and look for the JWTs header KID claim.
3. We use the KID and ALG claim to find the correct keys in the list of supplied keys.

  {{<Aside type="note">}}
  The absence of matching keys directly marks the JWT as invalid.
  {{</Aside>}}

4. We validate the authenticity of the JWT by checking the signature using the selected key.
5. Should the JWT contain an EXP claim (expiration time), we validate that the JWT is not expired.

  {{<Aside type="note">}}
  We allow a mismatch of up to 60 seconds to account for clock drifts between the Cloudflare network and the JWT issuer. A token may still be regarded as valid one minute after it was supposed to expire when both clocks are perfectly in sync.
  {{</Aside>}}

6. Should the JWT contain a NBF claim (not before time), we validate that the JWT is already valid.

  {{<Aside type="note">}}
  The same accuracy applies as for EXP claims. As such, a token may be already regarded as valid one minute before its NBF claim in case of perfect synchronization between issuer and validator.
  {{</Aside>}}

7. The final validation result and whether a token was present at all is made available to the WAF which applies the policy’s configured action (`log`/`block`).
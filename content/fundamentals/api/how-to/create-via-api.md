---
title: Create tokens via API
pcx_content_type: how-to
weight: 12
---

# Create API tokens via the API

Generate new API tokens on the fly via the API. Before you can do this, you must create an API token in the Cloudflare dashboard that can create subsequent tokens.

## Generating the initial token

Before you can create tokens via the API, you need to generate the initial token via the Cloudflare dashboard.

1. From the [API Tokens management screen](https://dash.cloudflare.com/profile/api-tokens), select **Create Token**.
2. Select the `Create Additional Tokens` template. This template contains the user permission for creating API tokens. This allows you to mimic the exact behavior presented in the dashboard from the API.

{{<Aside type="note">}}

Cloudflare highly recommends that you do not grant other permissions to the token when using this template. Make sure you safeguard the new token because it can create tokens with access to any of a user's resources.

{{</Aside>}}

Cloudflare also recommends limiting the use of the token via client IP address filtering or TTL to reduce the potential for abuse in the event that the token is compromised. Refer to [Restrict token use](/fundamentals/api/how-to/restrict-tokens/) for more information.

## Creating API tokens with the API

Once you create an API token that can create other tokens, you can now use it in the API. Refer to the [API schema docs](/api/operations/user-api-tokens-create-token) for more information.

To create a token:

1.  Define the policy.
2.  Define the restrictions.
3.  Create the token.

### 1. Define the Access Policy

An Access Policy defines what resources the token can act on and what permissions the token has to those resources. This process is similar to how you [create tokens in the Cloudflare dashboard](/fundamentals/api/get-started/create-token/).

Each token can contain multiple policies.

```json
[
  {
    "id": "f267e341f3dd4697bd3b9f71dd96247f",
    "effect": "allow",
    "resources": {
      "com.cloudflare.api.account.zone.eb78d65290b24279ba6f44721b3ea3c4": "*",
      "com.cloudflare.api.account.zone.22b1de5f1c0e4b3ea97bb1e963b06a43": "*"
    },
    "permission_groups": [
      {
        "id": "c8fed203ed3043cba015a93ad1616f1f",
        "name": "Zone Read"
      },
      {
        "id": "82e64a83756745bbbb1c9c2701bf816b",
        "name": "DNS Read"
      }
    ]
  }
]
```

| Field              | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `id`               | Unique read-only identifier for the policy generated after creation. |
| `effect`           | Defines whether this policy is allowing or denying access. If only creating one policy, use `allow`. The evaluation order for policies is as follows: 1. Explicit `DENY` Policies; 2. Explicit `ALLOW` Policies; 3. Implicit `DENY ALL`.            |
| `resources`         | Defines what resources are allowed to be configured. |
| `permission_groups` | Defines what permissions the policy grants to the included resources. |


#### Resources

API token policies support three resource types: `User`, `Account`, and `Zone`.

{{<Aside type="note">}}
 
Fetch each object's ID by calling the appropriate `GET <object>` API. Refer to [User](/api/operations/user-user-details), [Account](/api/operations/accounts-list-accounts), and [Zone](/api/operations/zone-list-zones) documentation for more details.
  {{</Aside>}}

##### Account

Include a single account or all accounts in a token policy.

*   A **single account** is denoted as:`"com.cloudflare.api.account.<ACCOUNT_ID>": "*"`.
*   **All accounts** is denoted as:`"com.cloudflare.api.account.*": "*"`

##### Zone

Include a **single zone**, **all zones in an account**, or **all zones in all accounts** in a token policy.

*   A **single zone** is denoted as:`"com.cloudflare.api.account.zone.<ZONE_ID>": "*"`
*   **All Zones in an account** are denoted as:`"com.cloudflare.api.account.<ACCOUNT_ID>": {"com.cloudflare.api.account.zone.*": "*"}`
*   **All zones in all accounts** is denoted as:`"com.cloudflare.api.account.zone.*": "*"`

##### User

For user resources, you can only reference yourself, which is denoted as:`"com.cloudflare.api.user.<USER_TAG>": "*"`

#### Permission groups

Determine what permission groups should be applied. Refer to the full list of permission groups either in [the documentation](/fundamentals/api/reference/permissions/) or fetch the permission groups [via the API](/api/operations/permission-groups-list-permission-groups). It is only required to pass the `id` of the permission group in the policy. Permission groups are scoped to specific resources, so a permission group in a policy will only apply to the resource type it is scoped for.

### 2. Define the restrictions

Set up any limitations on how the token can be used. API tokens allow restrictions for client IP address filtering and TTLs. Refer to [Restrict token use](/fundamentals/api/how-to/restrict-tokens/) for more information.

When defining TTLs, you can set the time at which a token becomes active with `not_before` and the time when it expires with `expires_on`. Both of these fields take UTC timestamps in the following format: `"2018-07-01T05:20:00Z"`.

Limit usage of a token by client IP address filters with the following object:

```json
{
  "request.ip": {
    "in": [
      "199.27.128.0/21",
      "2400:cb00::/32"
    ],
    "not_in": [
      "199.27.128.0/21",
      "2400:cb00::/32"
    ]
  }
}
```

Each parameter in the `in` and `not_in` objects must be in CIDR notation. For example, use `192.168.0.1/32` to specify a single IP address.

### 3. Create the token

Combine the previous information to create a token as in the following example:

```json
$ curl -X POST 
"https://api.cloudflare.com/client/v4/user/tokens" \
     -H "Authorization: Bearer <api token secret>" \
     -H "Content-Type: application/json" \
     --data '
 {
  "name": "readonly token",
  "policies": [
    {
      "effect": "allow",
      "resources": {
        "com.cloudflare.api.account.zone.eb78d65290b24279ba6f44721b3ea3c4": "*",
        "com.cloudflare.api.account.zone.22b1de5f1c0e4b3ea97bb1e963b06a43": "*"
      },
      "permission_groups": [
        {
          "id": "c8fed203ed3043cba015a93ad1616f1f",
          "name": "Zone Read"
        },
        {
          "id": "82e64a83756745bbbb1c9c2701bf816b",
          "name": "DNS Read"
        }
      ]
    }
  ],
  "not_before": "2020-04-01T05:20:00Z",
  "expires_on": "2020-04-10T00:00:00Z",
  "condition": {
    "request.ip": {
      "in": [
        "199.27.128.0/21",
        "2400:cb00::/32"
      ],
      "not_in": [
        "199.27.128.1/32"
      ]
    }
  }
}'
```

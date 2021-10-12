---
title: Creating tokens via API
order: 10
---

# Creating API tokens via the API

With API Tokens it is possible to be able to generate new tokens on the fly via the API. Doing so requires creating an API Token in the UI with the ability to create subsequent tokens. This page walks through how to create the seed token, and then creating API Tokens via the API

## Generating the initial token

Before you can create Tokens via the API you need to generate the initial Token which will have the ability to do so via the Cloudflare Dashboard. From the [API Tokens management screen](https://dash.cloudflare.com/profile/api-tokens), select `Create Token` and select the `Create Additional Tokens` Template. This template will contain the user permission for creating API Tokens. This allows you to mimic the exact behavior presented in the UI from the API.

<Aside type="note">

It is highly recommended when using this template to not grant other permissions to the token. This token should be safeguarded given it can create tokens with access to any resource the user has.

</Aside>

Limiting the use of the token via IP filtering or TTL is also recommended to reduce the potential for abuse in the event that the token is compromised. See [adding restrictions](/tokens/advanced/restrictions) for more information.

## Creating API tokens with the API

Once an API Token is created that can create other tokens, the next step is using it in the API. The complete API schema docs for these operations are [available here](https://api.cloudflare.com/#user-api-tokens-properties), but below is a walkthrough of the process to create a token with the API.

Creating a Token requires defining two sections of config and then sending the API request.

1. Define the policy
2. Define the restrictions
3. Create the token

### Define the Access Policy

A Access Policy defines what resources the token can act on and what permissions it has to those resources. If you have created tokens in the UI, you will notice similarities in how this works.

Let's look at an example Token's policy. Each token can contain multiple policies.

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

Now to define each field of the policy:

* `id` - This is a unique identifier for the policy generated after creation and is read-only
* `effect` - Whether this policy is allowing or denying access. If only creating 1 policy then `allow` should be used. The evaluation order for policies is as follows:
  1. Explicit `DENY` Policies
  2. Explicit `ALLOW` Policies
  3. Implicit `DENY ALL`
* `resources` - This is where you define what resources are allowed to be configured. More detail below.
* `permission_groups` - This defines what permissions will the policy grant to the included resources. More detail below.

#### Resources

Currently API Token Policies support 3 resource types: `User`, `Account`, `Zone`.

Note: Each respective object's `tag` can be fetched by calling the appropriate `GET <object>` API. See [User](https://api.cloudflare.com/#user-properties), [Account](https://api.cloudflare.com/#accounts-list-accounts), and [Zone](https://api.cloudflare.com/#zone-list-zones) documentation for details.

##### Account

A **single account** or **all accounts** can be included in a token policy.

* A **single account** is denoted as:`"com.cloudflare.api.account.<account_tag>": "*"`.
* **All accounts** is denoted as:`"com.cloudflare.api.account.*": "*"`

##### Zone

A **single zone**, **all zones in an account**, or **all zones in all accounts** can be included in a token policy:

* A **single zone** is denoted as:`"com.cloudflare.api.account.zone.<zone_tag>": "*"`
* **All Zones in an account** are denoted as:`"com.cloudflare.api.account.<account_tag>": {"com.cloudflare.api.account.zone.*": "*"}`
* **All zones in all accounts** is denoted as:`"com.cloudflare.api.account.zone.*": "*"`

##### User

For user resources, the only option is referencing one's self which is done with:`"com.cloudflare.api.user.<user_tag>": "*"`

### Permission groups

The last piece to defining a policy is what Permission Groups should be applied. You can see the full list of permission groups either in [the docs here](../../create/permissions), or [fetched via the API](https://api.cloudflare.com/#permission-groups-list-permission-groups). It is only required to pass the `id` of the permission group in the policy. Permission Groups are scoped to specific resources, so a permission group in a policy will only apply to the resource type it is scoped for.

### Define the restrictions

Last in defining the token is setting up any limitations on how the token can be used. Currently, API Tokens allow for IP filtering and TTLs. You can find general info in [Restricting Token Use](/tokens/advanced/restrictions).

When defining TTLs you can set the time at which a token becomes active, `not_before` and the time when it expires, `expires_on`. Both of these fields take timestamps in UTC in the following format: `"2018-07-01T05:20:00Z"`.

Limiting usage of a token by IP filters is defined with the following object:

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

Each parameter in the `in` and `not_in` objects must be in CIDR notation. For example, specifying a single IP would be `192.168.0.1/32`.

## Creating the token

Putting this all together we can now create a token like so:

```json
curl -X POST "https://api.cloudflare.com/client/v4/user/tokens" \
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

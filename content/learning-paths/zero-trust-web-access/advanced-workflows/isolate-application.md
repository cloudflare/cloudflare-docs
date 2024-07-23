---
title: Isolate Access applications
pcx_content_type: overview
weight: 2
layout: learning-unit
---

{{<Aside type="note">}}
Requires the Browser Isolation add-on.
{{</Aside>}}

[Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/) integrates with your web-delivered Access applications to protect sensitive applications from data loss. You can build Access policies that require certain users to access your application exclusively through Browser Isolation, while other users matching different policies continue to access the application directly. For example, you may wish to layer on additional security measures for third-party contractors or other users without a corporate device.

Cloudflare sends all isolated traffic through our Secure Web Gateway inspection engine, which allows you to apply [Gateway HTTP policies](/cloudflare-one/policies/gateway/http-policies/) such as:

- Restrict specific actions and HTTP request methods.
- Inspect the request body to match against [Data Loss Prevention](/cloudflare-one/policies/data-loss-prevention/) (DLP) profiles with as much specificity and control as if the user had deployed an endpoint agent.
- Control users ability to cut and paste, upload and download files, or print while in an isolated session.

## Prerequisites

{{<render file="access/_isolation-prereqs.md" productFolder="cloudflare-one">}}

## Enable Browser Isolation

{{<render file="access/_enable-isolation.md" productFolder="cloudflare-one">}}

## Example Access policies

In the following example, Policy 1 allows employees on corporate devices to access the application directly. Users who do not match Policy 1, such as employees and contractors on unmanaged devices, will load the application in an isolated browser.

```mermaid
flowchart LR
accTitle: Access policies for a private web application
A[Full-time employee]-->policy1-->D
B[Contractor]-->policy2-->E
subgraph C[Access application]
  policy1["Policy 1:
  Allow employees
  who pass device posture checks"]
  policy2["Policy 2:
  Allow and isolate contractors"]
end
D[Normal browsing]
E["Isolated browsing
with HTTP policies applied"]
```

**Policy 1: Allow employees who pass device posture checks**

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

| Action | Rule type | Selector | Value |
| ------ | ---- | -------- | -----------|
| Allow  | Include | Emails ending in | `@team.com` |
|        | Require | [Device Posture - Serial Number List](/cloudflare-one/identity/devices/warp-client-checks/corp-device/) | `Corporate serial numbers` |

| Additional settings | Status  |
| ------------------- | ------- |
| Isolate application | Disabled |

{{</tab>}}

{{<tab label="api" no-code="true">}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/access/apps/{app_uuid}/policies \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "decision": "allow",
  "name": "Allow employees who pass device posture checks",
  "include": [
    {
      "email_domain": {
        "domain": "team.com"
      }
    }
  ],
  "exclude": [],
  "require": [
    {
      "device_posture": {
        "integration_uid": "<SERIAL_NUMBER_LIST_UUID>"
      }
    }
  ],
  "precedence": 1
}'
```

To create a list of serial numbers, refer to [Create Zero Trust list](/api/operations/zero-trust-lists-create-zero-trust-list).

{{</tab>}}
{{</tabs>}}

**Policy 2: Allow and isolate contractors**

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

| Action | Rule type | Selector | Value |
| ------ | ---- | -------- | -----------|
| Allow  | Include | Emails ending in | `@team.com`, `@contractors.com` |

| Additional settings | Status  |
| ------------------- | ------- |
| Isolate application | Enabled |

{{</tab>}}

{{<tab label="api" no-code="true">}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/access/apps/{app_uuid}/policies \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "decision": "allow",
  "name": "Allow and isolate contractors",
  "include": [
    {
      "email_domain": {
        "domain": "team.com"
      }
    },
    {
      "email_domain": {
        "domain": "contractors.com"
      }
    }
  ],
  "exclude": [],
  "require": [],
  "precedence": 2,
  "isolation_required": true
}'
```

{{</tab>}}
{{</tabs>}}

## Example HTTP policies

### Disable file downloads in isolated browser

Prevents users on unmanaged devices from downloading any files from your private application.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

| Selector                     | Operator | Value                 | Logic | Action  |
|------------------------------|----------|-----------------------|-------|---------|
| Host                         | in       | `internal.site.com`   | And   | Isolate |
| Passed Device Posture Checks | not in   | `Corporate serial numbers` |       |         |

| Policy settings | Status |
| --------------  | - |
| Disable file downloads | Enabled |

{{</tab>}}

{{<tab label="api" no-code="true">}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/rules \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Disable file downloads in isolated browser",
  "conditions": [
    {
      "type": "traffic",
      "expression": {
        "in": {
          "lhs": "http.request.host",
          "rhs": [
            "internal.site.com"
          ]
        }
      }
    },
    {
      "type": "device_posture",
      "expression": {
        "any": {
          "in": {
            "lhs": {
              "splat": "device_posture.checks.passed"
            },
            "rhs": [
              "<SERIAL_NUMBER_LIST_UUID>"
            ]
          }
        }
      }
    }
  ],
  "action": "isolate",
  "precedence": 14002,
  "enabled": true,
  "description": "",
  "rule_settings": {
    "block_page_enabled": false,
    "block_reason": "",
    "biso_admin_controls": {
      "dcp": false,
      "dcr": false,
      "dd": true,
      "dk": false,
      "dp": false,
      "du": false
    }
  },
  "filters": [
    "http"
  ]
}'
```

To create a list of serial numbers, refer to [Create Zero Trust list](/api/operations/zero-trust-lists-create-zero-trust-list).

{{</tab>}}
{{</tabs>}}

### Block file downloads of sensitive data

{{<Aside type="note">}}
Requires Data Loss Prevention add-on.
{{</Aside>}}

Block users on unmanaged devices from downloading files that contain credit card numbers. This logic requires two policies:

- **Policy 1: [Disable file downloads in isolated browser](/learning-paths/zero-trust-web-access/advanced-workflows/isolate-application/#disable-file-downloads-in-isolated-browser)**

- **Policy 2: Block credit card numbers**

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

| Selector                     | Operator | Value                      | Logic | Action  |
|------------------------------|----------|----------------------------|-------|---------|
| Host                         | in       | `internal.site.com`        | And   | Block   |
| [DLP Profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/)                  | in       | _Financial Information_    | And   |         |
| Passed Device Posture Checks | not in   | _Corporate serial numbers_ |       |         |

{{</tab>}}

{{<tab label="api" no-code="true">}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/rules \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Block credit card numbers",
  "conditions": [
    {
      "type": "traffic",
      "expression": {
        "and": [
          {
            "in": {
              "lhs": "http.request.host",
              "rhs": [
                "internal.site.com"
              ]
            }
          },
          {
            "any": {
              "in": {
                "lhs": {
                  "splat": "dlp.profiles"
                },
                "rhs": [
                  "<DLP_PROFILE_UUID>"
                ]
              }
            }
          }
        ]
      }
    },
    {
      "type": "device_posture",
      "expression": {
        "any": {
          "in": {
            "lhs": {
              "splat": "device_posture.checks.passed"
            },
            "rhs": [
              "<SERIAL_NUMBER_LIST_UUID>"
            ]
          }
        }
      }
    }
  ],
  "action": "block",
  "precedence": 14003,
  "enabled": true,
  "description": "",
  "rule_settings": {
    "block_page_enabled": false,
    "block_reason": "",
    "biso_admin_controls": null
  },
  "filters": [
    "http"
  ]
}'
```

To configure a DLP profile, refer to [Update predefined profile](/api/operations/dlp-profiles-update-predefined-profile) or [Create custom profile](/api/operations/dlp-profiles-create-custom-profiles).

{{</tab>}}
{{</tabs>}}
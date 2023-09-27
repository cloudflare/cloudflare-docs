---
title: Configure Managed Transforms
pcx_content_type: how-to
weight: 1
layout: single
meta:
    description: Learn how to configure Managed Transforms.
---

# Configure Managed Transforms

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2. Go to **Rules** > **Transform Rules**.

3. Go to the **Managed Transforms** tab.

4. Enable or disable the [desired Managed Transforms](/rules/transform/managed-transforms/reference/) by selecting the toggle next to each entry. The Cloudflare dashboard will only list available Managed Transforms according to your Cloudflare plan and product subscriptions.

{{</tab>}}
{{<tab label="api" no-code="true">}}

**1. Get list of available Managed Transforms**

Check the Managed Transform's current status and availability using the [List Managed Transforms](/api/operations/managed-transforms-list-managed-transforms) operation.

The following example request obtains a list of available Managed Transforms, organized by request or response, with information about their current status (`enabled` field) and if you can update them, based on conflicts with other enabled Managed Transforms (`has_conflict` field).

Each Managed Transform item will optionally contain a `conflicts_with` array informing you about any Managed Transforms that will conflict with the current Managed Transform when enabled.

The response will only include available Managed Transforms according to your Cloudflare plan and product subscriptions.

```bash
---
header: Request
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/managed_headers \
--header "Authorization: Bearer <API_TOKEN>"
```

<details>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "managed_request_headers": [
      {
        "id": "add_bot_protection_headers",
        "enabled": false,
        "has_conflict": false
      },
      {
        "id": "add_client_certificate_headers",
        "enabled": false,
        "has_conflict": false
      },
      {
        "id": "add_visitor_location_headers",
        "enabled": false,
        "has_conflict": false
      },
      {
        "id": "add_true_client_ip_headers",
        "enabled": false,
        "has_conflict": false,
        "conflicts_with": [
          "remove_visitor_ip_headers"
        ]
      },
      {
        "id": "remove_visitor_ip_headers",
        "enabled": false,
        "has_conflict": false,
        "conflicts_with": [
          "add_true_client_ip_headers"
        ]
      }
    ],
    "managed_response_headers": [
      {
        "id": "remove_x-powered-by_header",
        "enabled": false,
        "has_conflict": false
      },
      {
        "id": "add_security_headers",
        "enabled": false,
        "has_conflict": false
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

**2. Change the status of Managed Transforms**

Change the status of the [desired Managed Transforms](/rules/transform/managed-transforms/reference/) using the [Update status of Managed Transforms](/api/operations/managed-transforms-update-status-of-managed-transforms) operation.

Add the Managed Transforms you wish to change to the request body, and update their status in the `enabled` field. You cannot enable a Managed Transform that has a conflict with a currently enabled Managed Transform (that is, an item where `has_conflict` is `true`).

Make sure you include the Managed Transforms you are updating in the correct JSON object (`managed_request_headers` or `managed_response_headers`).

```bash
---
header: Request
---
curl --request PATCH \
https://api.cloudflare.com/client/v4/zones/{zone_id}/managed_headers \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "managed_request_headers": [
    {
      "id": "add_visitor_location_headers",
      "enabled": true
    }
  ],
  "managed_response_headers": [
    {
      "id": "remove_x-powered-by_header",
      "enabled": true
    }
  ]
}'
```

The response will include all the available Managed Transforms and their new status after the update.

<details>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "managed_request_headers": [
      {
        "id": "add_bot_protection_headers",
        "enabled": false,
        "has_conflict": false
      },
      {
        "id": "add_client_certificate_headers",
        "enabled": false,
        "has_conflict": false
      },
      {
        "id": "add_visitor_location_headers",
        "enabled": true,
        "has_conflict": false
      },
      {
        "id": "add_true_client_ip_headers",
        "enabled": false,
        "has_conflict": false,
        "conflicts_with": [
          "remove_visitor_ip_headers"
        ]
      },
      {
        "id": "remove_visitor_ip_headers",
        "enabled": false,
        "has_conflict": false,
        "conflicts_with": [
          "add_true_client_ip_headers"
        ]
      }
    ],
    "managed_response_headers": [
      {
        "id": "remove_x-powered-by_header",
        "enabled": true,
        "has_conflict": false
      },
      {
        "id": "add_security_headers",
        "enabled": false,
        "has_conflict": false
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

{{</tab>}}
{{</tabs>}}

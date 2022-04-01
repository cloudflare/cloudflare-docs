---
title: Enable a Managed Transform
pcx-content-type: how-to
weight: 1
---

# Enable a Managed Transform

## In the dashboard

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2.  Go to **Rules** > **Transform Rules**.

3.  Click **Managed Transforms**. A pop-up dialog appears.

    IMAGE

4. Enable the [desired Managed Transforms](/rules/transform/managed-transforms/reference/) by clicking the toggle next to each entry.

## Via API

To enable a Managed Transform via API:

1. Check the Managed Transform's current status and availability using the [Get all managed headers](https://api.cloudflare.com/#managed-headers-api-list-all-managed-headers) operation.
2. Change the status of the [desired Managed Transforms](/rules/transform/managed-transforms/reference/) using the [Change state of managed headers](https://api.cloudflare.com/#managed-headers-api-change-state-of-managed-headers) operation.


### 1. Get list of available Managed Transforms

The following request obtains a list of all Managed Transforms, organized by request or response, with information about their current status (`enabled` field) and if you can update them (`available` field):

```json
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/managed_headers" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "managed_request_headers": [
      {
        "id": "add_bot_protection_headers",
        "enabled": false,
        "available": false
      },
      {
        "id": "add_visitor_location_headers",
        "enabled": false,
        "available": true
      },
      {
        "id": "remove_visitor_ip_headers",
        "enabled": false,
        "available": true
      }
    ],
    "managed_response_headers": [
      {
        "id": "remove_x-powered-by_header",
        "enabled": false,
        "available": true
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```


### 2. Enable a Managed Transform

Add the Managed Transforms you wish to change to the request body, and update their status in the `enabled` field. 

Make sure you include the Managed Transforms you are updating in the correct JSON object (`managed_request_headers` or `managed_response_headers`).

```json
---
header: Request
---
curl -X PATCH \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/managed_headers" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
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

```json
---
header: Response
---
{
  "result": {
    "managed_request_headers": [
      {
        "id": "add_bot_protection_headers",
        "enabled": false,
        "available": false
      },
      {
        "id": "add_visitor_location_headers",
        "enabled": true,
        "available": true
      },
      {
        "id": "remove_visitor_ip_headers",
        "enabled": false,
        "available": true
      }
    ],
    "managed_response_headers": [
      {
        "id": "remove_x-powered-by_header",
        "enabled": true,
        "available": true
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

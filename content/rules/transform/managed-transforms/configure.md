---
title: Configure Managed Transforms
pcx_content_type: how-to
weight: 1
---

# Configure Managed Transforms

## In the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2. Go to **Rules** > **Transform Rules**.

   ![Access the Managed Transform settings from Rules > Transform Rules in the Cloudflare dashboard.](/rules/static/transform/managed-transforms-card.png)

3. Click **Managed Transforms**.

4. In the pop-up dialog that appears, enable or disable the [desired Managed Transforms](/rules/transform/managed-transforms/reference/) by clicking the toggle next to each entry. The Cloudflare dashboard will only list available Managed Transforms according to your Cloudflare plan and product subscriptions.

5. Click **Close**.

## Via API

To enable a Managed Transform via API:

1. Check the Managed Transform's current status and availability using the [Get all managed headers](https://api.cloudflare.com/#managed-headers-api-list-all-managed-headers) operation.
2. Change the status of the [desired Managed Transforms](/rules/transform/managed-transforms/reference/) using the [Change state of managed headers](https://api.cloudflare.com/#managed-headers-api-change-state-of-managed-headers) operation.

### 1. Get list of available Managed Transforms

The following request obtains a list of available Managed Transforms, organized by request or response, with information about their current status (`enabled` field) and if you can update them, based on conflicts with other enabled Managed Transforms (`has_conflict` field).

Each Managed Transform item will optionally contain a `conflicts_with` array informing you about any Managed Transforms that will conflict with the current Managed Transform when enabled.

The response will only include available Managed Transforms according to your Cloudflare plan and product subscriptions.

```bash
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
				"conflicts_with": ["remove_visitor_ip_headers"]
			},
			{
				"id": "remove_visitor_ip_headers",
				"enabled": false,
				"has_conflict": false,
				"conflicts_with": ["add_true_client_ip_headers"]
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

### 2. Change the status of Managed Transforms

Add the Managed Transforms you wish to change to the request body, and update their status in the `enabled` field. You cannot enable a Managed Transform that has a conflict with a currently enabled Managed Transform (that is, an item where `has_conflict` is `true`).

Make sure you include the Managed Transforms you are updating in the correct JSON object (`managed_request_headers` or `managed_response_headers`).

```bash
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
				"conflicts_with": ["remove_visitor_ip_headers"]
			},
			{
				"id": "remove_visitor_ip_headers",
				"enabled": false,
				"has_conflict": false,
				"conflicts_with": ["add_true_client_ip_headers"]
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

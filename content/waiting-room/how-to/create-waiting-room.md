---
title: Create a waiting room
pcx_content_type: how-to
weight: 1
meta:
  title: Create a waiting room
---

# Create a waiting room

A waiting room can be created from the dashboard or via API.

## Create a waiting room from the dashboard

{{<Aside>}}For additional context on creating a waiting room, refer to [Get started](/waiting-room/get-started/).{{</Aside>}}

1.  Within your application, go to **Traffic** > **Waiting Rooms**.
2.  Click **Create**.
3.  Customize the [settings](/waiting-room/reference/configuration-settings/) for your waiting room. For additional guidance refer to [Best practices](/waiting-room/reference/best-practices/).
4.  Click **Next**.
5.  If you can [customize your waiting room](/waiting-room/how-to/customize-waiting-room/), update the HTML and CSS as needed.
6.  Click **Next**.
7.  Review your settings before saving. If you customized your waiting room, make sure to [preview the result](/waiting-room/how-to/customize-waiting-room/#preview-waiting-room/).
8.  Click **Save**. Your new waiting room will be enabled by default.

## Create a waiting room via the API

{{<Aside>}}For additional context on creating a waiting room, refer to [Get started](/waiting-room/get-started/).{{</Aside>}}

Create a waiting room by appending the following endpoint in the [Waiting Room API](https://api.cloudflare.com/#waiting-room-create-waiting-room) to the Cloudflare API base URL.

```txt
POST zones/{zone_identifier}/waiting_rooms
```

The Cloudflare API base URL is:

```txt
https://api.cloudflare.com/client/v4
```

For authentication instructions, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

Configure your waiting room with the following required parameters in the `data` field:

- `name` - A unique name for the waiting room. Use only alphanumeric characters, hyphens, and underscores.
- `host` - Host name for which you want to configure a waiting room.
- `total_active_users` - The total number of active user sessions on the route at a point in time.
- `new_users_per_minute` - The number of new users gaining entry into the route every minute.

The following parameters are optional:

- `path` - The path within the host for which you want to configure a waiting room. The waiting room will be enabled for all subpaths as well.
- `description` - A description of the waiting room.
- `session_duration` - Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route.
- `custom_page_html` - HTML code to customize the appearance of your waiting room. Cloudflare provides a sample HTML template that enables the display of estimated wait time on the waiting room page. The default waiting room is used if `custom_page_html` is not specified. Refer to [Waiting Room API properties](https://api.cloudflare.com/#waiting-room-properties).

## Example

The following example API request configures a waiting room.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone-id}/waiting_rooms" \
-H "X-Auth-Email: user@example.com" \
-H "X-Auth-Key: xxxxxxxx" \
-H "Content-Type: application/json" \
--data '{
  "name": "shop_waiting_room",
  "description": "Waiting room for webshop",
  "host": "shop.example.com",
  "path": "/shop",
  "queue_all": true,
  "new_users_per_minute": 200,
  "total_active_users": 300,
  "session_duration": 1,
  "disable_session_renewal": false,
  "json_response_enabled": false,
  "queueing_method": "FIFO",
  "cookie_attributes": {
    "samesite": "auto",
    "secure": "auto"
  }
}'
```

The response for the request above is:

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": [
		{
			"id": "1111111111111111111111",
			"created_on": "2014-01-01T05:20:00.12345Z",
			"modified_on": "2014-01-01T05:20:00.12345Z",
			"name": "shop_waiting_room",
			"description": "Waiting room for webshop",
			"host": "shop.example.com",
			"path": "/shop",
			"queue_all": true,
			"new_users_per_minute": 200,
			"total_active_users": 300,
			"session_duration": 1,
			"disable_session_renewal": false,
			"json_response_enabled": false,
			"queueing_method": "FIFO",
			"cookie_attributes": {
				"samesite": "auto",
				"secure": "auto"
			}
		}
	]
}
```

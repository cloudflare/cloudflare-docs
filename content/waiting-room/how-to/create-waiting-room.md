---
title: Create a waiting room
pcx_content_type: how-to
weight: 1
meta:
  title: Create a waiting room
---

# Create a waiting room

You can create a waiting room from the dashboard or via API.

{{<Aside>}}For additional context on creating a waiting room, refer to [Get started](/waiting-room/get-started/).{{</Aside>}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
1. Within your application, go to **Traffic** > **Waiting Room**.
2. Select **Create**.
3. Customize the [settings](/waiting-room/reference/configuration-settings/) for your waiting room. For additional guidance refer to [Best practices](/waiting-room/reference/best-practices/).
4. Select **Next**.
5. If you wish to [customize your waiting room](/waiting-room/how-to/customize-waiting-room/), update the HTML and CSS as needed. If you are using this waiting room to manage traffic for your mobile app or API, enable the JSON response toggle. Make sure that you have set up a [JSON friendly response](/waiting-room/how-to/json-response/) for your client (mobile or web app).
6. Select the **Queuing status code** to determine the HTTP status code that is returned when a user is in the waiting room.
7. Select **Next**.
8. Review your settings before saving. If you customized your waiting room, make sure to [preview the result](/waiting-room/how-to/customize-waiting-room/#preview-waiting-room).
9. Select **Save**. Your new waiting room will be enabled by default.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To create a Waiting Room using the API, send a [`POST` request](/api/operations/waiting-room-create-waiting-room) to the `/zones/{zone_identifier}/waiting_rooms` endpoint:

- For parameter references, refer to [Configuration settings](/waiting-room/reference/configuration-settings/)
- For authentication instructions, refer to [Create an API token](/fundamentals/api/get-started/create-token/).
- For help with endpoints and pagination, refer to [Make API calls](/fundamentals/api/how-to/make-api-calls/).

```json
---
header: Request
---
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_identifier}/waiting_rooms" \
--header 'Authorization: Bearer REDACTED' \
--header 'Content-Type: application/json' \
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
  "queueing_method": "fifo",
  "queueing_status_code": 202,
  "cookie_attributes": {
    "samesite": "auto",
    "secure": "auto"
  }
}'
```

The response contains the complete definition of the newly created Waiting Room.

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "1111111111111111111111",
      "created_on": "2023-01-01T05:20:00.12345Z",
      "modified_on": "2023-01-01T05:20:00.12345Z",
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
      "queueing_method": "fifo",
      "queueing_status_code": 202,
      "cookie_attributes": {
        "samesite": "auto",
        "secure": "auto"
      },
    }
  ]
}
```

{{</tab>}}
{{</tabs>}}
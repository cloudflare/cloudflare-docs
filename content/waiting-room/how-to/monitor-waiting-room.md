---
order: 2
pcx-content-type: how-to
---

# Monitor waiting room status

You can monitor the status of your waiting rooms using the [dashboard](#status-in-the-dashboard) or the [API](#status-in-the-api).

<Aside>Future work will create a separate area of application analytics for Cloudflare Waiting Rooms.</Aside>

## Status in the dashboard

Open the **Waiting Rooms** dashboard to view the list of your waiting rooms.

![Waiting Rooms User Interface](../static/wr-dashboard.png)

The **Status** column displays the current state of the waiting room:

* **Not Queueing**: 
  - Waiting room enabled, but has not reached traffic threshold to send visitors to waiting room.
  - Shows estimated number of users in the application.
* **Queueing**: 
  - Waiting room enabled and sending visitors to waiting room.
  - Shows estimated number of users in the queue.
  - On hover, shows maximum wait time expected for users.
* **Disabled**: The waiting room is suspended.
* **Queue All**: 
  - Forces all traffic to queue in the waiting room.
  - On hover, shows estimated number of users in the queue.

## Status in the API

[Check whether traffic is queueing in a configured waiting room](https://api.cloudflare.com/#waiting-room-get-waiting-room-status) by appending the following endpoint to the Cloudflare API base URL:

```shell
GET zones/{zone_identifier}/waiting_rooms/{identifier}/status
```

The response is:
*  `queueing` if visitors are currently queueing in the waiting room.
*  `not_queueing` if the room is empty or if the waiting room is suspended.

To check whether a configured waiting room is suspended or whether the traffic is force-queued to the waiting room, append the following endpoint to the Cloudflare API base URL.

```shell
GET zones/{zone_identifier}/waiting_rooms/{identifier}
```

The endpoint above [fetches all settings](https://api.cloudflare.com/#waiting-room-waiting-room-details) for a configured waiting room:

```
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "REDACTED",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "shop_waiting_room",
    "description": "Waiting room for webshop",
    "suspended": false,
    "host": "shop.example.com",
    "path": "/shop",
    "queue_all": true,
    "new_users_per_minute": 200,
    "total_active_users": 300,
    "session_duration": 1,
    "disable_session_renewal": false,
    "json_response_enabled": false,
    "queueing_method": "random",
    "cookie_attributes": {
      "samesite": "auto",
      "secure": "auto"
    },
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}"
  }
```

The value of `suspended` indicates whether a waiting room is activated or suspended:
* `false`: The waiting room is activated.
* `true`: The waiting room is suspended.

The value of  `queue_all` indicates whether all traffic is forced to queue in the waiting room:
* `false`: Visitors are diverted to the waiting room only if traffic exceeds the configured threshold.
* `true`: All traffic is forced to queue in the waiting room, and no traffic passes from the waiting room to the origin.

## Queueing activation

Waiting rooms queue traffic at the data-center level to increase scalability, letting each data center make decisions independently.

Because of this design, a waiting room might queue traffic from a specific data centers before the waiting room reaches its limit of `new_users_per_minute`. 

To stop a waiting room from active queueing, increase the minimum values for `new_users_per_minute` and `total_active_users`.

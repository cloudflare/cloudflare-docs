---
pcx-content-type: how-to
title: Support mobile app traffic
weight: 3
---

# Support mobile app traffic

If you need to manage mobile app traffic, Cloudflare provides a JSON-friendly waiting room that sits in front of your API endpoints:

1.  When a user [is queued](/waiting-room/about/#how-it-works), we return our own [JSON response](#integrate-waiting-room-variables).
2.  When a user leaves the waiting room, we forward their request to your origin server and return your default JSON.

Since the format of the waiting room response is controlled by an HTTP header (`Accept: application/json` or `Accept: text/html`), a single waiting room can handle both mobile and web traffic.

{{<Aside type="note">}}

Only certain customers can support mobile traffic with their waiting rooms. For more details, see our <a href="/plans">Plans</a> page.

{{</Aside>}}

***

## Before you begin

This tutorial assumes you have previously [planned out](/waiting-room/get-started/) and [created](/waiting-room/how-to/create-via-dashboard/) a waiting room.

***

## Step 1 — Prepare your mobile app

### Integrate waiting room variables

To utilize a waiting room, you need to create a new template in your mobile app to receive the JSON response. For a full list of these variables, refer to the `json_response_enabled` parameter in the [Cloudflare API docs](https://api.cloudflare.com/#waiting-room-create-waiting-room).

### Allow cookies

Since a waiting room [requires cookies](/waiting-room/reference/waiting-room-cookie/), your mobile app will need to support cookies. For ease of use, consider using a cookie manager like [CookieJar](https://pkg.go.dev/net/http#CookieJar).

## Step 2 — Enable JSON response

To receive a JSON response, you first need to enable that option on your waiting room:

*   **Via the dashboard**: When [customizing a waiting room](/waiting-room/additional-options/customize-waiting-room/), toggle **JSON Response** to **On**.
*   **Via the API**: When [creating a waiting room](https://api.cloudflare.com/#waiting-room-create-waiting-room), set `json_response_enabled` to `true`.

## Step 3 — Get JSON data

To get the JSON data associated with a waiting room, make a request to that endpoint with the header `Accept: application/json`.

    ---
    header: Request
    ---
    curl -X GET "https://example.com/waitingroom" \
        -H "Accept: application/json"

```json
---
header: Response
---
{
    "cfWaitingRoom": {
        "inWaitingRoom": true,
        "waitTime": 5,
        "waitTimeKnown": true,
        "waitTimeFormatted": "5 minutes",
        "queueIsFull": false,
        "queueAll": false,
        "lastUpdated": "2021-08-03T23:46:00.000Z",
        "refreshIntervalSeconds": 20
    }
}
```

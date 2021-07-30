---
order: 8
pcx-content-type: how-to
---

# Support mobile app traffic

If you need to manage mobile app traffic, Cloudflare provides a JSON-friendly waiting room that sits in front of your API endpoints:
1. When a user [is queued](/about#how-it-works), we return our own [JSON response](#integrate-waiting-room-variables).
1. When a user leaves the waiting room, we forward their request to your origin server and return your default JSON.

Since the format of the waiting room response is controlled by an HTTP header (`Accept: application/json` or `Accept: text/html`), a single waiting room can handle both mobile and web traffic.

<Aside type="note">

Only certain customers can support mobile traffic with their waiting rooms. For more details, see our <a href="/about/plans">Plans</a> page.

</Aside>

---

## Before you begin

This tutorial assumes you have previously [planned out](/get-started) and [created](/how-to/create-via-dashboard) a waiting room.

---

## Step 1 — Prepare your mobile app

### Integrate waiting room variables

To utilize a waiting room, you need to create a new template in your mobile app to receive the JSON response.

Use the following variables to display information about a waiting room:

- `inWaitingRoom`: Boolean indicating if the user is in the Waiting Room (always true).
- `waitTime`: Integer indicating the current estimated time in minutes the user will wait in the Waiting Room. Only valid if `waitTimeKnown` is true.
- `waitTimeKnown`: Boolean indicating if `waitTime` is accurate. If false, `waitTime` is not available.
- `waitTimeFormatted`: String displaying the `waitTime` for users, formatted in English. If `waitTimeKnown` is false, `waitTimeFormatted` will display "unavailable".
- `queueIsFull`: Boolean indicating if the Waiting Room's queue is currently full and not accepting new users at the moment.
- `queueAll`: Boolean indicating if all users will be queued in the Waiting Room and no one will be let into the origin website.
- `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and access the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
- `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user can attempt to leave the waiting room and access the origin website.

### Allow cookies

Since a waiting room [requires cookies](/reference/waiting-room-cookie), your mobile app will need to support cookies. For ease of use, consider using a cookie manager like [CookieJar](https://pkg.go.dev/net/http#CookieJar).

## Step 2 — Enable JSON response

To receive a JSON response, you first need to enable that option on your waiting room:

- **Via the dashboard**: When [customizing a waiting room](/how-to/customize-waiting-room), toggle **JSON Response** to **On**.
- **Via the API**: When [creating a waiting room](https://api.cloudflare.com/#waiting-room-create-waiting-room), set `json_response_enabled` to `true`.

## Step 3 — Get JSON data

To get the JSON data associated with a waiting room, make a request to that endpoint with the header `Accept: application/json`.

```
---
header: Request
---
curl -X GET "https://example.com/waitingroom" \
    -H "Accept: application/json"
```

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
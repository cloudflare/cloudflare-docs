---
pcx_content_type: how-to
title: Get JSON response for mobile and other non-browser traffic
weight: 6
---

# Get JSON response for mobile and other non-browser traffic

If you need to manage traffic in a non-browser environment such as a mobile app or web app, Cloudflare provides a JSON-friendly waiting room that can be consumed via your API endpoints:

1. When a user is queued, we return our own JSON response.
2. When a user leaves the waiting room, we forward the request to your origin server and return the response from your origin server (be it JSON, XML, an HTML page, etc.).

In order to consume the waiting room response in the JSON format, the following steps must be taken:

## Step 1 – Enable JSON response

To receive a JSON response, you first need to enable that option in your waiting room.
- **Via the dashboard**: When [customizing a waiting room](/waiting-room/how-to/customize-waiting-room/), enable **JSON Response**.
- **Via the API**: When [creating a waiting room](/api/operations/waiting-room-create-waiting-room), set `json_response_enabled` to true.

## Step 2 – Get JSON data

Make a request to your waiting room endpoint with the header `Accept: application/json`. Note that the header has to match exactly `Accept: application/json`. If it is anything else or has any additional content such as `Accept: application/json, text/html` the response will not return in the JSON format. You must retry the request every `refreshIntervalSeconds` in order for users to advance in the queue.

```curl
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

## Cookies in the request header

Waiting Room is driven by a waiting room cookie, that determines the position of the user in the queue. Because of this, the cookie must be included in each of the subsequent requests to the Waiting Room API for the user. This is mandatory regardless of a user having been queued or not. If a request does not include a cookie, the waiting room will assume a new user and will return a new cookie in the response header. Consequently, this will place the user at the end of the queue. Thus, when consuming the waiting room in a non-browser environment it is important to include the waiting room cookie in the request header.

Refer to the [Waiting Room cookies](/waiting-room/reference/waiting-room-cookie/), for more information.

## Advancing in the queue

In a browser environment, the page automatically refreshes every `refreshIntervalSeconds` to ensure that the user advances in the queue. In a non-browser environment, where the Waiting Room JSON-friendly API is being consumed, it is expected that your backend service (or API) also refreshes/makes a request to the Waiting Room configured endpoint every `refreshIntervalSeconds` to ensure the advancing of the user in the queue.

These are some of the places where the JSON-friendly response can be consumed (this list is not exhaustive):

1. In a mobile app traffic
    - **Integrate Waiting Room variables** – Create a new template in your mobile app to receive the JSON response. For a full list of these variables, refer to the `json_response_enabled` parameter in the [Cloudflare API docs](/api/operations/waiting-room-create-waiting-room).
    - **Allow cookies** – As mentioned above, a waiting room [requires cookies](/waiting-room/reference/waiting-room-cookie/), and your mobile app will need to support cookies. For ease of use, consider using a cookie manager like [CookieJar](https://pkg.go.dev/net/http#CookieJar).
    - **Consume JSON data** - Make a request to the Waiting Room endpoint with the `Accept: application/json` header.

2. Inside Cloudflare Workers (or in your own backend service)
    - **Integrate Waiting Room variables** – Expect a JSON response in your backend API. For a full list of these variables, refer to the `json_response_enabled` parameter in the [Cloudflare API docs](/api/operations/waiting-room-create-waiting-room).
    - **Include cookies in the request header** – As mentioned above, a waiting room [requires cookies](/waiting-room/reference/waiting-room-cookie/), and your backend API will need to support cookies. For ease of use, consider using a cookie manager like [CookieJar](https://pkg.go.dev/net/http#CookieJar).
    - **Enable JSON response** - Via the dashboard or via the API.
    - **Consume JSON data** - Make a request to the Waiting Room endpoint with the `Accept: application/json` header.
        
        Here is an example, demonstrating the usage of the waiting room endpoint inside a Worker. The request headers include the necessary `accept` and `cookie` header values that are required by the Waiting Room API. The accept header ensures that a JSON-friendly response is returned, if a user is queued. Otherwise, if the request is sent to the origin, then whatever the response origin returns gets returned back. In this example, a hardcoded `__cfwaitingroom` value is embedded in the cookie field. In a real-life application, however, we expect that a cookie returned by the Waiting Room API is used in each of the subsequent requests to ensure that the user is placed accordingly in the queue and let through to the origin when it is the users turn.

```bash
const waitingroomSite = 'https://examples.cloudflareworkers.com/waiting-room';
 
async function handleRequest() {
  const init = {
    headers: {
      'accept': 'application/json',
      'cookie': '__cfwaitingroom=F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgV'
    }
  }
 
  return await fetch(waitingroomSite, init)
    .then(response => response.json())
    .then(response => {
      if (response.cfWaitingRoom.inWaitingRoom) {
        return Response('in waiting room', { 'content-type': 'text/html' });
      }
      else {
        return new Response(response);
      }
    })
}
 
addEventListener('fetch', event => {
  return event.respondWith(handleRequest());
});
```

{{<Aside type="note">}}

Only Advanced Waiting Room customers can support JSON-friendly format with their waiting rooms. For more details, refer to our [Plans page](/waiting-room/plans/).

{{</Aside>}}


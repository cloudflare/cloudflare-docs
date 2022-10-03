---
pcx_content_type: how-to
title: Return a JSON-friendly waiting room response
weight: 6
---

# Return a JSON-friendly waiting room response

If you need to manage traffic in a non-browser environment such as a mobile app or web app, Cloudflare provides a JSON-friendly waiting room that can be consumed via your API endpoints:

1. When a user is queued, we return our own JSON response.
2. When a user leaves the waiting room, we forward the request to your origin server and return the response from your origin server (be it JSON, XML, or an HTML page etc).

In order to consume the waiting room response in the JSON format, the following steps must be taken:

## Step 1 – Enable JSON response

To receive a JSON response, you first need to enable that option in your waiting room.
- **Via the dashboard**: When [customizing a waiting room](/waiting-room/how-to/customize-waiting-room/), toggle JSON Response to On.
- **Via the API**: When [creating a waiting room](https://api.cloudflare.com/#waiting-room-create-waiting-room), set `json_response_enabled` to true.

## Step 2 – Get JSON data 

Make a request to your waiting room endpoint with the header `Accept: application/json`. Note that the header has to match exactly `Accept: application/json`, if it is anything else or has any additional content such as `Accept: application/json, text/html` the response will not return in the JSON format. You must retry the request every `refreshIntervalSeconds` in order for users to advance in the queue.

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

Since Waiting Room is driven by a waiting room cookie that determines the position of the user in the queue, the cookie must be included in each of the subsequent requests to the waiting room API for the user. This cookie must be included in each subsequent request regardless of if a user was queued or not. If a request does not include a cookie, the waiting room will assume a new user and will return a new cookie in the response header, and consequently will place the user at the end of the queue. Thus, it is important when consuming the waiting room in a non-browser environment to include the waiting room cookie in the request header.

Refer to the [waiting room cookies](/waiting-room/reference/waiting-room-cookie/), for more information.

## Advancing in the queue

In a browser environment, the page automatically refreshes every `refreshIntervalSeconds` to ensure that the user advances in the queue. In a non-browser environment, where the waiting room JSON-friendly API is being consumed, it is expected that your backend service (or API) also refreshes/makes a request to the waiting room configured endpoint every `refreshIntervalSeconds` to ensure the advancing of the user in the queue.

Following are a few (but not limited to) places where the JSON-friendly response can be consumed:

1. In a mobile app traffic
    - **Integrate waiting room variables** – Create a new template in your mobile app to receive the JSON response. For a full list of these variables, refer to the `json_response_enabled` parameter in the [Cloudflare API docs](https://api.cloudflare.com/#waiting-room-create-waiting-room).
    - **Allow cookies** – As mentioned above, a waiting room [requires cookies](/waiting-room/reference/waiting-room-cookie/), your mobile app will need to support cookies. For ease of use, consider using a cookie manager like [CookieJar](https://pkg.go.dev/net/http#CookieJar).
    - **Consume JSON data** - Make a request to the waiting room endpoint with the `Accept: application/json` header.

2. Inside Cloudflare Workers (or in your own backend service)
    - **Integrate waiting room variables** – Expect a JSON response in your backend API. For a full list of these variables, refer to the `json_response_enabled` parameter in the [Cloudflare API docs](https://api.cloudflare.com/#waiting-room-create-waiting-room).
    - **Include cookies in the request header** – As mentioned above, a waiting room [requires cookies](/waiting-room/reference/waiting-room-cookie/), your backend API will need to support cookies. For ease of use, consider using a cookie manager like [CookieJar](https://pkg.go.dev/net/http#CookieJar).
    - **Enable JSON response** - Via the dashboard or via the API.
    - **Consume JSON data** - Make a request to the waiting room endpoint with the `Accept: application/json` header.
        
        Here is an example, demonstrating the usage of the waiting room endpoint inside a Worker. The request headers include the necessary `accept` and `cookie` header values that are required by the waiting room API. The accept header ensures that a JSON-friendly response is returned, if a user is queued, otherwise, if the request is sent to the origin then whatever the response origin returns gets returned back. In this example, a hardcoded `__cfwaitingroom` value is embedded in the cookie field, but in a real-life application, we expect that a cookie returned by the waiting room API is used in each of the subsequent requests that ensures that the user is placed accordingly in the queue and let through to the origin when it is the users turn.

```bash
const waitingroomHost = 'https://examples.cloudflareworkers.com/waiting-room;
async function handleRequest() {
 const init = {
   headers: {
     'accept': 'application/json',
	‘cookie’: ‘__cfwaitingroom=F)J@NcRfUjXnZr4u7x!A%D*G-KaPdSgV’
   },
  };
  const response = await fetch(‘https://example.com/waiting-room’, init)
.then(response => response.json());
  if (response.cfWaitingRoom.inWaitingRoom) {
	return Response(“in waiting room”, { ‘content-type’: ‘text/html’     
  })
  } else {
    return new Response(response);
  }
}
addEventListener('fetch', event => {
 return event.respondWith(handleRequest());

});
```

{{<Aside type="note">}}

Only Advanced waiting room customers can support JSON-friendly format with their waiting rooms. For more details, refer to our [Plans page](/waiting-room/plans/).

{{</Aside>}}


---
pcx_content_type: how-to
title: Embed in an iFrame
weight: 5
---

# Embed in an iFrame

Because of how a waiting room [tracks visitor progress](#background), you need to [specify certain cookie attributes](#allow-cookies-to-pass-through-iframes) to properly embed a waiting room in an iFrame.

## Background

The [`SameSite` attribute of a cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) specifies whether that cookie can be shared with other domains that load on the same page (ad banners, iFrames). By default, browsers do not send cookies on cross-site subrequests to prevent attackers from stealing or manipulating information present in your cookies.

However, this behavior can prevent a waiting room from queueing a user properly if that waiting room is embedded in an iFrame. The waiting room depends on the [`__cfwaitingroom` cookie](/waiting-room/reference/waiting-room-cookie/) to track a user in the queue. But, since the browser blocks the cookie from reaching the waiting room by default, an active and queueing waiting room cannot queue the user and will never let them access the application.

## Available options

To customize how your waiting room responds to cookies, include the `cookie_attributes` object when you [create a waiting room](/api/operations/waiting-room-create-waiting-room) (only available via the API).

Available options include:

*   `samesite`: Configures the `SameSite` attribute on the waiting room cookie:

    *   **auto** (default): Meant to be as flexible as possible, defaulting to **lax** but becoming **none** if you have enabled [**Always Use HTTPS**](/ssl/edge-certificates/additional-options/always-use-https/).
    *   **lax**: Cookies are not sent on typical cross-site subrequests (for example to load images or frames into a third party site), but are sent when a user is navigating to the origin site
    *   **strict**: Cookies will only be sent in a first-party context.
    *   **none**: Cookies will always be sent.

*   `secure`: Configures the `Secure` attribute on the waiting room cookie, which requires the request to be made over `https`:

    *   **auto** (default): Meant to be as flexible as possible, defaulting to **never** but becoming **always** if you have enabled [**Always Use HTTPS**](/ssl/edge-certificates/additional-options/always-use-https/).
    *   **always**: Cookies can only be sent using `https` requests.
    *   **never**: Cookies can be sent using `http` or `https` requests.

## Allow cookies to pass through iFrames

If you are embedding a waiting room in an iFrame, specify the following values on `cookie_attributes` object when [creating a waiting room](/api/operations/waiting-room-create-waiting-room) (only available via the API):

*   `samesite`: `none`
*   `secure`: If you have [**Always Use HTTPS**](/ssl/edge-certificates/additional-options/always-use-https/) enabled, set to `auto`. If you have it disabled, set to `always`.

### Example

<details>
<summary>Request</summary>
<div>

```json
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone-id}/waiting_rooms" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: xxxxxxxx" \
     -H "Content-Type: application/json" \
     --data '{"name":"shop_waiting_room",
              "description":"Waiting room for webshop",
              "host":"shop.example.com",
              "path":"/shop",
              "queue_all": true,
              "new_users_per_minute":200,
              "total_active_users":300,
              "session_duration":1,
              "disable_session_renewal": false,
              "json_response_enabled": false,
              "queueing_method": "FIFO",
              "cookie_attributes": {
                "samesite": "none",
                "secure": "auto"
              },
            }'
```

</div>

</details>

<details>
<summary>Response</summary>
<div>

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "1111111111111111111111",
      "created_on": "2021-01-01T05:20:00.12345Z",
      "modified_on": "2021-01-01T05:20:00.12345Z",
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
        "samesite": "none",
        "secure": "auto"
      },
    }
  ]
}
```

</div>

</details>

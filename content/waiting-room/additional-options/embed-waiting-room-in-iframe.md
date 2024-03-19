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

* `samesite`: Configures the `SameSite` attribute on the waiting room cookie:

  * **auto** (default): Meant to be as flexible as possible, defaulting to **lax** but becoming **none** if you have enabled [**Always Use HTTPS**](/ssl/edge-certificates/additional-options/always-use-https/).
  * **lax**: Cookies are not sent on typical cross-site subrequests (for example to load images or frames into a third party site), but are sent when a user is navigating to the origin site
  * **strict**: Cookies will only be sent in a first-party context.
  * **none**: Cookies will always be sent.

* `secure`: Configures the `Secure` attribute on the waiting room cookie, which requires the request to be made over `https`:

  * **auto** (default): Meant to be as flexible as possible, defaulting to **never** but becoming **always** if you have enabled [**Always Use HTTPS**](/ssl/edge-certificates/additional-options/always-use-https/).
  * **always**: Cookies can only be sent using `https` requests.
  * **never**: Cookies can be sent using `http` or `https` requests.

## Allow cookies to pass through iFrames

If you are embedding a waiting room in an iFrame, specify the following values on `cookie_attributes` object when [creating a waiting room](/api/operations/waiting-room-create-waiting-room) (only available via the API):

* `samesite`: `none`
* `secure`: If you have [**Always Use HTTPS**](/ssl/edge-certificates/additional-options/always-use-https/) enabled, set to `auto`. If you have it disabled, set to `always`.

### Example

{{<details header="Request">}}

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

{{</details>}}

{{<details header="Response">}}

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

{{</details>}}

## Limitations

Major browsers have introduced restrictions on third-party cookies, the very kind of cookie
used by waiting rooms in iframes. Waiting Room uses [Cookies Having Independent Partitioned State (CHIPS)](https://developer.mozilla.org/en-US/docs/Web/Privacy/Privacy_sandbox/Partitioned_cookies)
to work around these restrictions, but there are some drawbacks:

 - A user viewing the waiting room both within an iframe and outside the iframe will be
   treated as two separate users, with each instance potentially exiting the queue at
   different times and counting separately in analytics.
 - For a waiting room to be embedded in an iframe, both the embedded page and the embedding
   page must be accessed over HTTPS.
 - CHIPS is not supported on Safari or Safari-derived browsers (e.g. Orion and most iOS browsers)
   unless they have third-party cookie blocking disabled in their settings. These users will be
   stuck at the end of the queue, unable to progress until the queue is empty, and may count
   multiple times in analytics.

In general, if there is an issue setting and retrieving the waiting room cookie, you should
expect users to be stuck at the end of the queue, and counting as multiple users in analytics.

These limitations may not apply if the embedded page and embedding page share a common domain
name. For example, a page at `example.com` embedding a waiting room at `shop.example.com` may
be considered first party by browsers, and not subject to third-party cookie restrictions.

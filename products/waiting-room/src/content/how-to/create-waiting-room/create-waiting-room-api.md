---
title: Create a Waiting Room via the API
alwaysopen: true
weight: 260
hidden: false
---

# Create a Waiting Room via the API

Create a waiting room by appending the following endpoint in the [Waiting Room API](https://api.cloudflare.com/#waiting-room-create-waiting-room) to the Cloudflare API base URL.

```shell
POST zones/{zone_identifier}/waiting_rooms
```

The Cloudflare API base URL is:

```shell
https://api.cloudflare.com/client/v4
```

For authentication instructions, see [_Getting Started: Requests_](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, see [_Getting Started: Endpoints_](https://api.cloudflare.com/#getting-started-endpoints).

Configure your waiting room with the following required parameters in the `data` field:

* `name` - A unique name for the waiting room. Use only alphanumeric characters, hyphens, and underscores.
* `host` - Host name for which you want to configure a waiting room.
* `total_active_users` - The total number of active user sessions on the route at a point in time.
* `new_users_per_minute` - The number of new users gaining entry into the route every minute.

The following parameters are optional:

* `path` - The path within the host for which you want to configure a waiting room. The waiting room will be enabled for all subpaths as well.
* `description` - A description of the the waiting room.
* `session_duration` - Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route.
* `custom_page_html` - HTML code to customize the appearance of your waiting room. Cloudflare provides a sample HTML template that enables the display of estimated wait time on the waiting room page. The default waiting room is  used if `custom_page_html` is not specified. See [_Waiting Room API properties_](https://api.cloudflare.com/#waiting-room-properties).


## Example

The following example API request configures a waiting room with the same settings as the example shown in [_Create a waiting room using the Cloudflare dashboard_](/how-to/create-waiting-room/create-waiting-room-dashboard).

```shell
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone-id}/waiting_rooms" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: xxxxxxxx" \
     -H "Content-Type: application/json" \
     --data '{"name":"shop_waiting_room",
              "description":"Waiting room for webshop",
              "host":"shop.example.com",
              "path":"/shop",
              "new_users_per_minute":200,
              "total_active_users":300,
              "session_duration":1
              }'
```

The response for the request above is:

```shell
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
      "new_users_per_minute": 200,
      "total_active_users": 300,
      "session_duration": 1
    }
  ]
}
```

## Customize a Waiting Room web page using the Waiting Room API

You can use the Waiting Room API to customize the web page served to visitors when they are placed in a virtual waiting room.

In the following PATCH request, the `custom_page_html` field contains the HTML code for the [customized waiting room](../create-waiting-room-dashboard/customize-waiting-room#custom-waiting-room):

```shell
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone-id}/waiting_rooms/{waiting-room-id}"
     -H "X-Auth-Email: user@example.com"
     -H "X-Auth-Key: xxxxxxxx"
     -H "Content-Type: application/json"
     --data '{"custom_page_html":"<p>Include custom HTML here</p>"}'
```

```shell
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "1111111111111111111111",
      "name": "webshop-waiting-room",
      "description": "Waiting room for webshop",
      "host": "example.com",
      "path": "/shop",
      "suspended": false,
      "queue_all": false,
      "new_users_per_minute": 200,
      "total_active_users": 300,
      "session_duration": 1,
      "custom_page_html": "<p>Include custom HTML here</p>",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z"
    }
  ]
}
```

### Preview the HTML code for a customized waiting room

Before making an API request to configure a waiting room web page with customized HTML, you can preview your custom HTML by uploading it to a preview endpoint:

```shell
POST https://api.cloudflare.com/client/v4/zones/<zone_id>/waiting_rooms/preview
```

In the request body, include the customized HTML content in the `custom_html` field:

```shell
{
    "custom_html": "<p>Include custom HTML here</p>"
}
```

Note that you pass HTML content to the preview endpoint in the `custom_html` field, but when you are using the API to configure a waiting room, you pass the HTML content in the `custom_page_html` field.

Example request:

```shell
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone-id}/waiting_rooms/preview"
     -H "X-Auth-Email: user@example.com"
     -H "X-Auth-Key: xxxxxxxx"
     -H "Content-Type: application/json"
     --data '{"custom_html":"<p>Include custom HTML here</p>"}'
```

The preview endpoint returns a temporary URL in the response body where you can preview your custom page:

```shell
{
  "result": {
    "preview_url": "https://waitingrooms.dev/preview/111111111111"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

You do not have to have a Cloudflare account to access the preview link, so you can validate the waiting room webpage on multiple devices.

### Preview the default or current waiting room web page

After [generating a preview URL](https://api.cloudflare.com/#waiting-room-create-a-custom-waiting-room-page-preview), use the following endpoint to generate a link to preview the currently configured web page for a waiting room, or the default page if no custom page is configured.

```shell
GET https://waitingrooms.dev/preview/{preview-id}
```

The link in the response displays the content of the `custom_page_html` field, rendered with [mustache](https://mustache.github.io).

Use the optional `force_queue` query parameter to preview the waiting room web page when all traffic is force-queued.

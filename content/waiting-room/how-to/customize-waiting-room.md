---
pcx_content_type: how-to
title: Customize a waiting room
weight: 2
---

# Customize a waiting room 

A waiting room can be customized from the dashboard or via API.

## Customize a waiting room from the dashboard

To design and preview the appearance of a waiting room, select the **Customization** tab in the **Create waiting room** page.

Cloudflare offers options to customize the appearance of your waiting room:

- [Default waiting room](#default-waiting-room): An unbranded waiting room that displays an estimated waiting time to visitors.
  - Select a language for your default waiting room page. You can choose from the following languages: English, Arabic, German, Spanish, French, Indonesian, Italian, Japanese, Korean, Dutch, Polish, Portuguese (Brazilian), Turkish and Chinese (Simplified and Traditional).
- [Custom waiting room](#custom-waiting-room): Edit template text or create your own HTML code:
  - Customize both HTML or CSS content, including fonts, colors, static images, additional languages and more.
  - Edit content directly in the dashboard or import relevant files.
- [Return a JSON-friendly waiting room response](/waiting-room/how-to/json-response/): Toggle to also enable a JSON response with a user's status in the waiting room.

### Default waiting room

To choose the default, unbranded waiting room:

1.  Select a waiting room.
2.  Go to the **Customization** step.
3.  Select **Default waiting room**.
4.  Select the language for your waiting room default page.

### Custom waiting room

{{<Aside type="note">}}Only certain customers can customize their waiting rooms. For more details, refer to our [Plans](/waiting-room/plans/) page.{{</Aside>}}

To customize a waiting room:

1.  Select a waiting room.
2.  Go to the **Customization** step.
3.  Select **Custom waiting room**.

You can edit the HTML code directly in the text box:

- Select **Download default template** to download a HTML file containing the default template content to your computer.
- Select **Download** to download a HTML file containing the text box content to your computer.
- Select **Copy** to copy the text from the text box to your clipboard, then paste it into an editor of your choice.

The template text contains [code to display the wait time](#display-wait-time). If you want to display the estimated wait time to visitors, do not delete this content.

#### Upload an HTML file

1.  Select **Import** to upload a HTML file from your computer.
2.  Select the file in the dialog and select **Open**.

Make further edits in the text box. Include the [code to display the wait time](#display-wait-time) to display the estimated queue time on the waiting room page or create your own custom page using [available variables](#available-variables).

#### Display wait time

The following content in the `<main>` section of the template HTML code displays the wait time:

```html
<h2 id="time-remaining">
  <noscript>
    {{#waitTimeKnown}}Your estimated wait time is {{waitTimeFormatted}}...{{/waitTimeKnown}}
    {{^waitTimeKnown}}{{#queueIsFull}}The estimated wait time is greater than a day. You will
    automatically be placed in the queue once space is available.{{/queueIsFull}}
    {{^queueIsFull}}Your estimated wait time is unavailable.{{/queueIsFull}}{{/waitTimeKnown}}
  </noscript>
</h2>
```

The following script within the `<body>` section after `<main>` fetches the wait time:

```html
<script type="text/javascript">
  var remainingEl = document.getElementById('time-remaining');
  var waitTime = {{waitTime}};
  var waitTimeKnown = {{waitTimeKnown}};

  var remainingString = 'Your estimated wait time is ';

  if (!waitTimeKnown) {
    remainingString += 'unavailable.'
  } else {
    if (waitTime === 1) {
      remainingString += waitTime + ' minute...';
    } else {
      remainingString += waitTime + ' minutes...';
    }
  }

  remainingEl.innerText = remainingString;
</script>
```

#### Available variables

When you create a waiting room with custom HTML, you can have access to several variables to customize your response. For a full list of variables, refer to the `json_response_enabled` parameter in the [Cloudflare API docs](/api/operations/waiting-room-create-waiting-room).

#### Multiple-language support

Customizable waiting rooms can display text in any language supported by the UTF-8 character set. To display estimated wait time, you can use numeric variables like `waitTimeMinutes` and `waitTimeHours` within your waiting room template, regardless of user language. However, at the time, the following variables are only available in English: `waitTimeFormatted`, `timeUntilEventStartFormatted`, and `timeUntilEventEndFormatted`.

#### Resource hosting

If you are using images or other resources for your customized waiting room, **do not** host those assets on the hostname covered by your waiting room. Otherwise, any requests for these assets will not be able to pass through the waiting room.

### Preview waiting room

To preview the appearance of a waiting room:

1.  In your application, go to **Traffic** > **Waiting Room**.
2.  Either [create a waiting room](/waiting-room/how-to/create-waiting-room/#create-a-waiting-room-from-the-dashboard/) or [edit an existing one](/waiting-room/how-to/edit-delete-waiting-room/).
3.  Go to the **Review** step.
4.  Select **Preview waiting room**:

- Choose **Queueing** to display the waiting room appearance when it is enabled on the dashboard and **Queue-all** is not enabled.
- Choose **Queue-All** to display the waiting room appearance when it is enabled on the dashboard and **Queue-all** is enabled. When **Queue-all** is enabled for a waiting room, the estimated wait time is not displayed.

### Troubleshooting

If you see something unexpected when previewing your waiting room, review your custom code for proper syntax. Often, you might forget to close each tag with its appropriate closing tag (the tag name with a `/`).

## Customize a waiting room via API

You can use the Waiting Room API to customize the web page served to visitors when they are placed in a virtual waiting room.

In the following `PATCH` request, the `custom_page_html` field contains the HTML code for the [customized waiting room](/waiting-room/how-to/customize-waiting-room/):

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone-id}/waiting_rooms/{waiting-room-id}"
     -H "X-Auth-Email: user@example.com"
     -H "X-Auth-Key: xxxxxxxx"
     -H "Content-Type: application/json"
     --data '{"custom_page_html":"<p>Include custom HTML here</p>"}'
```

```json
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
      "disable_session_renewal": false,
      "json_response_enabled": false,
      "queueing_method": "FIFO",
      "cookie_attributes": {
        "samesite": "auto",
        "secure": "auto"
      },
      "custom_page_html": "<p>Include custom HTML here</p>",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z"
    }
  ]
}
```

### Preview the HTML code for a customized waiting room

Before making an API request to configure a waiting room web page with customized HTML, you can preview your custom HTML by uploading it to a preview endpoint:

```txt
POST https://api.cloudflare.com/client/v4/zones/<zone_id>/waiting_rooms/preview
```

In the request body, include the customized HTML content in the `custom_html` field:

```html
{
    "custom_html": "<p>Include custom HTML here</p>"
}
```

Note that you pass HTML content to the preview endpoint in the `custom_html` field, but when you are using the API to configure a waiting room, you pass the HTML content in the `custom_page_html` field.

Example request:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone-id}/waiting_rooms/preview"
     -H "X-Auth-Email: user@example.com"
     -H "X-Auth-Key: xxxxxxxx"
     -H "Content-Type: application/json"
     --data '{"custom_html":"<p>Include custom HTML here</p>"}'
```

The preview endpoint returns a temporary URL in the response body where you can preview your custom page:

```json
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

After [generating a preview URL](/api/operations/waiting-room-create-a-custom-waiting-room-page-preview), use the following endpoint to generate a link to preview the currently configured web page for a waiting room, or the default page if no custom page is configured.

```txt
GET https://waitingrooms.dev/preview/{preview-id}
```

The link in the response displays the content of the `custom_page_html` field, rendered with [mustache](https://mustache.github.io).

Use the optional `force_queue` query parameter to preview the waiting room web page when all traffic is force-queued.

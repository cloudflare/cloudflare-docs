---
order: 1
pcx-content-type: how-to
---

# Customize a waiting room

To design and preview the appearance of a waiting room, select the **Customization** tab in the **Create Waiting Room** page.

Cloudflare offers options to customize the appearance of your waiting room:

*   [Default waiting room](#default-waiting-room): An unbranded waiting room that displays an estimated waiting time to visitors.
*   [Custom waiting room](#custom-waiting-room): Edit template text or create your own HTML code:
    *   Customize both HTML or CSS content, including fonts, colors, static images, additional languages and more.
    *   Edit content directly in the dashboard or import relevant files.
*   [Support mobile app traffic](/additional-options/mobile-traffic): Toggle to also enable a JSON response with a user's status in the waiting room.

## Default waiting room

To choose the default, unbranded waiting room:

1.  Select a waiting room.
2.  Go to the **Customization** step.
3.  Click **Default Waiting Room**.

## Custom waiting room

<Aside type="note">

Only certain customers can customize their waiting rooms. For more details, see our <a href="/plans">Plans</a> page.

</Aside>

To customize a waiting room:

1.  Select a waiting room.
2.  Go to the **Customization** step.
3.  Click **Custom Waiting Room**.

You can edit the HTML code directly in the text box:

*   Click **Download Template** to download a HTML file containing the default template content to your computer.
*   Click **Download** to download a HTML file containing the text box content to your computer.
*   Click **Copy** to copy the text from the text box to your clipboard, then paste it into an editor of your choice.

The template text contains [code to display the wait time](#display-wait-time). If you want to display the estimated wait time to visitors, do not delete this content.

### Upload an HTML file

1.  Click **Import** to upload a HTML file from your computer.
2.  Select the file in the dialog and click **Open**.

Make further edits in the text box. Include the [code to display the wait time](#display-wait-time) to display the estimated queue time on the waiting room page or create your own custom page using [available variables](#available-variables).

### Display wait time

The following content in the `<main>` section of the template HTML code displays the wait time:

```html
     <h2 id="time-remaining">
        <noscript>
          {{#waitTimeKnown}}Your estimated wait time is
          {{waitTimeFormatted}}...{{/waitTimeKnown}}
          {{^waitTimeKnown}}{{#queueIsFull}}The estimated wait time is
          greater than a day. You will automatically be placed in the
          queue once space is available.{{/queueIsFull}}
          {{^queueIsFull}}Your estimated wait time is
          unavailable.{{/queueIsFull}}{{/waitTimeKnown}}
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

### Available variables

When you create a waiting room with custom HTML, you can have access to several variables to customize your response. For a full list of variables, refer to the `json_response_enabled` parameter in the [Cloudflare API docs](https://api.cloudflare.com/#waiting-room-create-waiting-room).

### Multiple-language support

Customize your waiting room to display in any language supported by the UTF-8 character set. Additionally, all [variables](#available-variables) support internationalization except for **waitTimeFormatted** (English only).

### Resource hosting

If you are using images or other resources for your customized waiting room, **do not** host those assets on the hostname covered by your waiting room. Otherwise, any requests for these assets will not be able to pass through the waiting room.

## Preview waiting room

To preview the appearance of a waiting room:

1.  In your application, go to **Traffic** > **Waiting Rooms**.
2.  Either [create a waiting room](/how-to/create-via-dashboard) or [edit an existing one](/how-to/edit-delete-waiting-room).
3.  Go to the **Review** step.
4.  Click **Preview Waiting Room**:

*   Choose **Queueing** to display the waiting room appearance when it is enabled on the dashboard and **Queue all** is not enabled.
*   Choose **Queue All** to display the waiting room appearance when it is enabled on the dashboard and **Queue all** is enabled. When **Queue all** is enabled for a waiting room, the estimated wait time is not displayed.

## Troubleshooting

If you see something unexpected when previewing your waiting room, review your custom code for proper syntax. Often, you might forget to close each tag with its appropriate closing tag (the tag name with a `/`).

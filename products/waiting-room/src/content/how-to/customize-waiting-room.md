---
order: 1
pcx-content-type: how-to
---

# Customize a waiting room

<Aside>
Only Project Fair Shot (and soon Enterprise) customers can customize their waiting rooms.
</Aside>

To design and preview the appearance of a waiting room, select the **Customization** tab in the **Create Waiting Room** page.

Cloudflare offers options to customize the appearance of your waiting room:
* [Default waiting room](#default-waiting-room): An unbranded waiting room that displays an estimated waiting time to visitors.
* [Custom waiting room](#custom-waiting-room): Edit template text or create your own HTML code:
  - Customize both HTML or CSS content, including fonts, colors, static images, additional languages and more.
  - Edit content directly in the dashboard or import relevant files.

## Default waiting room
To choose the default, unbranded waiting room, click **Default Waiting Room**.

![Choose default waiting room](../static/default-form.png)

## Custom waiting room

To customize a waiting room, click **Custom Waiting Room**.

![Choose custom waiting room](../static/custom-form.png)

You can edit the HTML code directly in the text box:

* Click **Download Template** to download a HTML file containing the default template content to your computer.
* Click **Download** to download a HTML file containing the text box content to your computer.
* Click **Copy** to copy the text from the text box to your clipboard, then paste it into an editor of your choice.

The template text contains [code to display the wait time](#display-wait-time). If you want to display the estimated wait time to visitors, do not delete this content.

### Upload an HTML file

1. Click **Import** to upload a HTML file from your computer.
1. Select the file in the dialog and click **Open**.

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

When you create a waiting room with custom HTML, you can use the following variables:
- **waitTime**: An `integer` showing the user's estimated wait time in minutes.
- **waitTimeFormatted**: An English `string` showing a user's estimated wait time:
  - If `waitTime` is between 0 and 59, string will be `X minutes`
  - If `waitTime` is between 60 - 119, string will be `More than 1 hour`
  - If `waitTime` is more than 1440, string will be `More than a day`
- **waitTimeKnown**: A `boolean` value. Not available when the queue is full or **queue all** is enabled.
- **queueIsFull**: A `boolean` value. Changes to `True` when the queue is longer than 24 hours.

### Multiple-language support

Customize your waiting room to display in any language supported by the UTF-8 character set. Additionally, all [variables](#available-variables) support internationalization except for **waitTimeFormatted** (English only).

## Preview waiting room

To preview the appearance of a waiting room:
1. In your application, go to **Traffic** > **Waiting Rooms**.
1. Either [create a waiting room](../create-via-dashboard) or [edit an existing one](../edit-delete-waiting-room).
1. Go to the **Review** step.
1. Click **Preview Waiting Room**:
  * Choose **Queueing** to display the waiting room appearance when it is enabled on the dashboard and **Queue all** is not enabled.
  * Choose **Queue All** to display the waiting room appearance when it is enabled on the dashboard and **Queue all** is enabled. When **Queue all** is enabled for a waiting room, the estimated wait time is not displayed.

## Troubleshooting

If you see something unexpected when previewing your waiting room, review your custom code for proper syntax. Often, you might forget to close each tag with its appropriate closing tag (the tag name with a `/`).

---
title: Customize a Waiting Room
alwaysopen: false
weight: 256
hidden: false
---

# Customize a Waiting Room

To design and preview the appearance of a waiting room, select the **Customization** tab in the **Create Waiting Room** page.

Cloudflare offers options to customize the appearance of your waiting room:
* [Default waiting room](#default-waiting-room): An unbranded waiting room that displays an estimated waiting time to visitors.
* [Custom waiting room](#custom-waiting-room): Edit template text or create your own HTML code:
  * You can edit the HTML content in a text box within the **Customization** page.
  * Alternatively, you can import a HTML file.

## Default waiting room
To choose the default, unbranded waiting room, click **Default Waiting Room**.

![Choose default waiting room](../../../static/default-form.png)

## Custom waiting room

To customize a waiting room, click **Custom Waiting Room**. A text box containing editable template text displays.

![Choose custom waiting room](../../../static/custom-form.png)

You can edit the HTML code directly in the text box.

* Click **Download Template** to download a HTML file containing the default template content to your computer.
* Click **Download** to download a HTML file containing the text box content to your computer.
* Click **Copy** to copy the text from the text box to your clipboard, then paste it into an editor of your choice.

The template text contains [code to display the wait time](#display-wait-time). If you want to display the estimated wait time to visitors, do not delete this content.

### Upload a Waiting Room HTML file

1. Click **Import** to upload a HTML file from your computer.
1. Select the file in the dialog and click **Open**.

Make further edits in the text box. Include the [code to display the wait time](#display-wait-time) to display the estimated queue time on the waiting room page or create your own custom page using [available variables](#available-variables).

### Display wait time

The following content in the `<main>` section of the template HTML code displays the wait time:

```html
     <h2 id="time-remaining">
        <noscript>
          {{#waitTimeKnown}}Your estimated wait time is {{waitTime}}
          minutes...{{/waitTimeKnown}} {{^waitTimeKnown}}Your estimated wait
          time is unavailable.{{/waitTimeKnown}}
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


## Preview waiting room

Click **Preview Waiting Room** to preview the waiting room.
* Choose **Queueing** to display the waiting room appearance when it is enabled on the dashboard and **Queue all** is disabled.
* Choose **Queue All** to display the waiting room appearance when it is enabled on the dashboard and **Queue all** is enabled. When **Queue all** is enabled for a waiting room, the estimated wait time is not displayed.

## Next steps

Click **Next** or the **Review** tab to review and save your waiting room.

---
pcx-content-type: how-to
title: Debug mode
weight: 0
---

# Debug mode

Zaraz offers a debug mode to troubleshoot the events and triggers systems. To activate debug mode you need to create a special debug cookie (`zarazDebug`) containing your debug key.
You can set this cookie manually or via the `zaraz.debug` helper function available in your console.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Go to **Zaraz** > **Settings**.
3. Copy your **Debug Key**.
4. Open a web browser and access its Developer Tools. For example, to access Developer Tools in Google Chrome, click **View** > **Developer** > **Developer Tools**.
5. Click the **Console** pane and enter the following command to create a debug cookie:

    ```js
    zaraz.debug("YOUR_DEBUG_KEY")
    ```

6.  Refresh your browser to see the debug logs. They will appear in the Console pane.

Zaraz’s debug mode is now enabled. To exit debug mode, just remove the cookie with `zaraz.debug()`.

## Activate Preserve Log in Google Chrome

Due to the temporary nature of the Console pane in web browsers, you might want to activate the **Preserve Log** option for the Console pane. If you do not activate this option, you will lose the previous debug information whenever the page refreshes.

To activate the **Preserve Log** option in Google Chrome:

1. Open **Developer Tools**.
2. Go to **Console**.
3. Select the **Console settings** cog > **Preserve logs**.

![Chrome's console panel to access preserve logs](/zaraz/static/console-settings.png)
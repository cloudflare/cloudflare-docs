---
pcx_content_type: how-to
title: Debug mode
weight: 4
---

# Debug mode

Zaraz offers a debug mode to troubleshoot the events and triggers systems. To activate debug mode you need to create a special debug cookie (`zarazDebug`) containing your debug key.
You can set this cookie manually or via the `zaraz.debug` helper function available in your console.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Zaraz** > **Settings**.
3. Copy your **Debug Key**.
4. Open a web browser and access its Developer Tools. For example, to access Developer Tools in Google Chrome, select **View** > **Developer** > **Developer Tools**.
5. Select the **Console** pane and enter the following command to create a debug cookie:

    ```js
    zaraz.debug("YOUR_DEBUG_KEY")
    ```

Zaraz’s debug mode is now enabled. A pop-up window will show up with the debugger information. To exit debug mode, remove the cookie by typing `zaraz.debug()` in the console pane of the browser.
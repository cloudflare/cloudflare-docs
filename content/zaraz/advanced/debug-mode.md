---
pcx-content-type: how-to
title: Debug mode
weight: 0
---

# Debug mode

Zaraz offers a debug mode to troubleshoot the events and triggers systems. To activate the debug mode you need to create a special debug cookie containing your debug key.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Go to **Zaraz**.
3. In the main Zaraz screen, click **Settings**.
4. Copy your **Debug Key**.
5. Open a web browser and access its Developer Tools. For example, to access Developer Tools in Google Chrome, click **View** > **Developer** > **Developer Tools**.
6. Click the **Console** pane and enter the following command to create a debug cookie:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">document.cookie=&quot;debug=YOUR_DEBUG_KEY&quot;</span></div></span></span></span></code></pre>{{</raw>}}

7.  Refresh your browser to see the debug logs. They will appear in the Console pane.

Zaraz’s debug mode is now enabled. However, due to the temporary nature of the Console pane in web browsers, you need to activate the **Preserve Log** option for the Console pane. If you do not activate this option, you will lose the previous debug information whenever the Console refreshes.

To activate the **Preserve Log** option in Google Chrome:

1. Open **Developer Tools**.
2. Go to **Console**.
3. Select the **Console settings** cog > **Preserve logs**.

![Chrome's console panel to access preserve logs](/zaraz/static/console-settings.png)
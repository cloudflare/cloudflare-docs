---
pcx-content: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# macOS

Follow these steps to configure 1.1.1.1:

1. Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.
1. Click on the **Network** icon > **Advanced**.
1. Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **OK** > **Apply**.

<CaptivePortals/>

## Configure your browser to use DNS over HTTPS

There are several browsers compatible with DNS over HTTPS (DoH). This protocol lets you encrypt your connection to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

### Mozilla Firefox

1. Click the menu button.
1. Select **Settings**.
1. In the **General** menu, scroll down to access **Network Settings**.
1. Click on the **Settings** button.
1. Click **Enable DNS over HTTPS**. By default, it resolves to Cloudflare DNS.

### Google Chrome

<Aside type="note">

This setting may already be enabled by default.

</Aside>

1. Click on the three-dot menu in your browser window.
1. Select **Settings**.
1. Scroll down to **Privacy and security** > **Security**.
1. Scroll down and enable the **Use secure DNS** switch.

Your browser infers the DNS over HTTPS provider you want based on your system DNS. To benefit from Cloudflare DoH, make sure your system is [properly configured](/setup-1.1.1.1/).

### Microsoft Edge

<Aside type="note">

This setting may already be enabled default.

</Aside>

1. Go to `edge://settings/privacy`.
1. Scroll down to the **Security** section.
1. Make sure the **Use secure DNS** option is enabled.
1. Select **Choose a service provider** > **Cloudflare (1.1.1.1)**.

### Brave

1. Click the menu button in your browser window.
1. Navigate to **Settings**.
1. On the left side of the menu, scroll down and click **Aditional settings**.
1. Navigate to **Privacy and security** > **Security**.
1. Enable **Use secure DNS**.
1. Click **With Custom** and choose *Cloudflare (1.1.1.1)* as a service provider from the drop-down menu.

### Safari

As of today, Safari does not support DNS over HTTPS.

### How to check if my browser is configured correctly?

1. Visit [1.1.1.1 help page](https://1.1.1.1/help).
1. Verify that `Using DNS over HTTPS (DoH)` is `Yes`.
---
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# macOS

<StreamVideo id="b95943849d53350130ba22d039fa6faf"/>

1. Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.
1. Click on the **Network** icon.
1. Click **Advanced**.
1. Select the **DNS** tab. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **OK** > **Apply**.

<CaptivePortals/>

## Configure your browser to use DNS over HTTPS

There are several browsers compatible with DNS over HTTPS (DoH) that you can use to connect to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

### Mozilla Firefox

1. Click the hamburger menu at the top-right corner of your browser window.
1. Select **Preferences**.
1. In the **General** menu, scroll down to access **Network Settings**.
1. Click on the **Settings** button.
1. Click **Enable DNS over HTTPS**. By default, it resolves to Cloudflare DNS.

### Google Chrome

<Aside>

**Note:** This setting may already be enabled on Chrome by default.

</Aside>

1. Click on the three-dot menu in the top-right corner of your browser window.
1. Select **Settings**.
1. Navigate to **Privacy and security** > **Security**.
1. Enable the **Use secure DNS** switch.

Your browser infers the DNS over HTTPS provider you want based on your system DNS. To benefit from Cloudflare DoH, make sure your system is [properly configured](/setting-up-1.1.1.1/).

### Microsoft Edge

1. Go to `edge://settings/privacy`.
1. Scroll down to the **Security** section.
1. Make sure the **Use secure DNS** option is checked and enabled.
1. Choose *Cloudflare (1.1.1.1)* as a service provider.

### Brave

1. Click the hamburger menu at the top-right corner of your browser window.
1. Navigate to **Settings**.
1. Navigate to **Privacy and security** > **Security**.
1. Enable the **Use secure DNS**.
1. Choose *Cloudflare (1.1.1.1)* as a service provider.

### Safari

As of today, Safari does not support DNS over HTTPS.

### How to check if my browser is configured correctly?

1. Visit [1.1.1.1 help page](https://1.1.1.1/help).
1. Verify that `Using DNS over HTTPS (DoH)` is `Yes`.
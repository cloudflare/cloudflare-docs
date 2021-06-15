---
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Windows

## Windows 10

<StreamVideo id="92b27227d737a866adc8b0572cf0db89"/>

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**
1. Click **Properties**.
1. Click **Use The Following DNS Server Addresses**.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **OK**.
1. Now, go to **Internet Protocol Version 6**.
1. Click **Properties** > **Use The Following DNS Server Addresses**.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **Close**.

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
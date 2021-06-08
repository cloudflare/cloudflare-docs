---
order: 7
---

# macOS

Follow this quick guide to start using 1.1.1.1 on your Mac.

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

1. Click **OK**.
1. Click **Apply**.

<Aside>

**Note:** Setting up a static IP address to configure a DNS server may prevent you from connecting to some public Wi-Fi networks that use captive portals (these are the web pages some wireless networks employ to let users login and use their services). 

If you are experiencing connectivity issues related to captive portals:
1. Remove the static IP addresses from the device.
1. Connect to the Wi-Fi network.
1. Once the connection has been established, add the static IP addresses back.

</Aside>
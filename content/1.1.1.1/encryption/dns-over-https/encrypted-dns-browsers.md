---
pcx_content_type: how-to
title: Configure DoH on your browser
---

# Configure DoH on your browser

There are several browsers compatible with DNS over HTTPS (DoH). This protocol lets you encrypt your connection to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

Some browsers might already have this setting enabled.

## Mozilla Firefox

1. Select the menu button > **Settings**.
2. In the **General** menu, scroll down to access **Network Settings**.
3. Select **Settings**.
4. Select **Enable DNS over HTTPS**. By default, it resolves to Cloudflare DNS.

## Google Chrome

1. Select the three-dot menu in your browser > **Settings**.
2. Select **Privacy and security** > **Security**.
3. Scroll down and enable **Use secure DNS**.
4. Select the **With** option, and from the drop-down menu choose *Cloudflare (1.1.1.1)*.

## Microsoft Edge

1. Select the three-dot menu in your browser > **Settings**.
2. Select **Privacy, Search, and Services**, and scroll down to **Security**.
3. Enable **Use secure DNS**.
4. Select **Choose a service provider**.
5. Select the **Enter custom provider** drop-down menu and choose *Cloudflare (1.1.1.1)*.

## Brave

1. Select the menu button in your browser > **Settings**.
2. Select **Security and Privacy** > **Security**.
3. Enable **Use secure DNS**.
4. Select **With Custom** and choose *Cloudflare (1.1.1.1)* as a service provider from the drop-down menu.

## Check if browser is configured correctly

Visit [1.1.1.1 help page](https://1.1.1.1/help) and check if `Using DNS over HTTPS (DoH)` show `Yes`.
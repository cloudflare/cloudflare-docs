---
pcx-content-type: how-to
title: Configure DoH on your browser
---

# Configure DoH on your browser

There are several browsers compatible with DNS over HTTPS (DoH). This protocol lets you encrypt your connection to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

Some browsers might already have this setting enabled.

## Mozilla Firefox

1. Click the menu button.
2. Select **Settings**.
3. In the **General** menu, scroll down to access **Network Settings**.
4. Click **Settings**.
5. Click **Enable DNS over HTTPS**. By default, it resolves to Cloudflare DNS.

## Google Chrome

1. Click the three-dot menu in your browser
2. Click **Settings**.
3. Click **Privacy and security** > **Security**.
4. Scroll down and enable **Use secure DNS**.
5. Click the **With** option, and from the drop-down menu choose *Cloudflare (1.1.1.1)*.

## Microsoft Edge

1. Click the three-dot menu in your browser.
2. Click **Settings**.
3. Click **Privacy, Search, and Services**, and scroll down to **Security**.
4. Enable **Use secure DNS**.
5. Click **Choose a service provider**.
6. Click the **Enter custom provider** drop-down menu and choose *Cloudflare (1.1.1.1)*.

## Brave

1. Click the menu button in your browser.
2. Click **Settings**.
3. Click **Security and Privacy** > **Security**.
4. Enable **Use secure DNS**.
5. Click **With Custom** and choose *Cloudflare (1.1.1.1)* as a service provider from the drop-down menu.

## How to check if browser is configured correctly

Visit [1.1.1.1 help page](https://1.1.1.1/help) and check if `Using DNS over HTTPS (DoH)` is `Yes`.
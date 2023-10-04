---
pcx_content_type: reference
title: Extensions
weight: 5
---

# Extensions

Browser Isolation supports running native Chromium Web Extensions in the remote browser.

This capability allows extending tools that require DOM access (such as password managers and ad blockers) to isolated pages.

## Install an extension inside the remote browser

### Prerequisite: Isolate Chrome Web Store

{{<Aside type="note">}}
This step is not required when browsing via Clientless Web Isolation. You can access the Chrome Web Store at `https://<authdomain>.cloudflareaccess.com/browser/https://chrome.google.com/webstore`.
{{</Aside>}}

Installing extensions requires Chrome Web Store isolation. Create an [HTTP policy](/cloudflare-one/policies/gateway/http-policies/) to isolate the Chrome Web Store (`chrome.google.com`).

### Install an extension

1. Go to `https://chrome.google.com/webstore` while isolated.
1. Choose your desired extension.
1. Select **Add to Chrome**. To confirm extension installation, select **Add extension**.

Remote browser extensions are automatically reinstalled across isolated sessions.

## Remove an extension from the remote browser

1. Go to any isolated webpage.
1. Right-click anywhere to open the context menu and select **Show isolation toolbar**.
1. Select the jigsaw icon in the isolation toolbar to open the extension manager.
1. Select the hamburger icon for the desired extension to open the extension controls.
1. Select **Remove from Chromium**. To confirm removal, select **Remove**.

## Useful extensions

### Modify remote browser user agent

[User-Agent Switcher for Chrome](https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg) enables controlling the User Agent sent from the remote browser to an isolated website.

### Control remote browser request headers

[ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) enables controlling arbitrary request headers sent from the remote browser to an isolated website.

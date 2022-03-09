---
pcx-content-type: reference
title: Extensions
weight: 5
---

# Extensions

Browser Isolation supports running native Chromium Web Extensions in the remote browser.

This capability allows extending tools that require DOM access (such as password managers and ad-blockers) to isolated pages.

## Install an extension inside the remote browser

### Prerequisite: Isolate Chrome Web Store

Installing extensions requires that the Chrome Web Store is isolated, first create an [HTTP policy](/cloudflare-one/policies/filtering/http-policies/) that isolates the Chrome Webstore (chrome.google.com).

This step is not required when browsing via Clientless Web Isolation. All traffic is implicitly isolated and the Chrome Web Store can be accessed by browsing to `https://<authdomain>.cloudflareaccess.com/browser/https://chrome.google.com/webstore`.

### Install an extension

- Navigate to https://chrome.google.com/webstore while isolated.
- Find and select your desired extension.
- Select "Add to Chrome".
- Approve the extension installation by selecting "Add extension".

Remote browser extensions are automatically reinstalled across isolated sessions.

## Removing extensions from the remote browser

Extensions may be uninstalled within the remote browser from any isolated page.

- Navigate to any isolated webpage.
- Right click to open the context menu and select "Show isolation toolbar"
- Within the isolation toolbar on the bottom of the page, select the Jigsaw icon to open the extension manager.
- Select the hamburger icon for the desired extension to open the extension controls.
- Choose "Remove from Chromium..."
- Select "Remove" to confirm extension uninstallation.

# Useful extensions

## Modify remote browser user agent

[User Agent Switcher](https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg) enables controlling the User Agent sent from the remote browser to an isolated website.

## Control remote browser request headers

[ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) enables controlling arbitrary request headers sent from the remote browser to an isolated website.

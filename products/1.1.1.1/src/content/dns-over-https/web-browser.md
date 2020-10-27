---
order: 10
---

# Configure your browser to use DNS over HTTPS

There are several browsers compatible with DNS over HTTPS (DoH) that you can use to connect to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

## Mozilla Firefox

1. [Open Preferences](https://support.mozilla.org/en-US/kb/firefox-options-preferences-and-settings): Click on the `hamburger` icon at the top right corner of your browser, and click on `Preferences`.
2. [Open Connection Settings](https://support.mozilla.org/en-US/kb/connection-settings-firefox): Scroll down to access `Network Settings`. Click on the `Settings` button.
3. Enable DNS over HTTPS: Click `Enable DNS over HTTPS`. By default, it resolves to Cloudflare DNS.

## Google Chrome / Microsoft Edge / Brave

1. Open Settings: In your address bar, type the following and hit Enter `chrome://flags/#dns-over-https`. It takes you to `Secure DNS lookups`
2. [Enable DNS over HTTPS](https://www.chromium.org/developers/dns-over-https): Click on `Secure DNS lookups` radio button to enable DoH.
3. Configure Cloudflare DNS: Your browser infers the DNS over HTTPS provider you want based on your system DNS. To benefit from Cloudflare DoH, make sure your system is [properly configured](https://1.1.1.1/dns/#setup-instructions).

## Safari

As of today, Safari does not support DNS over HTTPS.

## How to check if my browser is configured correctly?

1. Visit [1.1.1.1 help page](https://1.1.1.1/help)
2. Verify that `Using DNS over HTTPS (DoH)` is `Yes`

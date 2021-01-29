---
order: 10
---

# Configure your browser to use DNS over HTTPS

There are several browsers compatible with DNS over HTTPS (DoH) that you can use to connect to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

## Mozilla Firefox

1. Click the hamburger menu at the top-right corner of your browser window.
1. Click **Preferences**.
1. In the **General** menu, scroll down to access `Network Settings`.
1. Click on the `Settings` button.
1. Click **Enable DNS over HTTPS**. By default, it resolves to Cloudflare DNS.

## Google Chrome 

1. Click on the three-dot menu at in the top-right corner of your browser window.
1. Click **Settings**.
1. Navigate to **Privacy and security > Security**.
1. Enable the **Use secure DNS** switch.

Your browser infers the DNS over HTTPS provider you want based on your system DNS. To benefit from Cloudflare DoH, make sure your system is [properly configured](https://1.1.1.1/dns/#setup-instructions).

## Microsoft Edge

1. Go to `edge://settings/privacy`.
1. Scroll down to the **Security** section.
1. Make sure the **Use secure DNS** option is checked and enabled.
1. Choose *Cloudflare (1.1.1.1)* as a service provider.

## Brave

1. Click the hamburger menu at the top-right corner of your browser window.
1. Navigate to **Settings**.
1. Navigate to **Privacy and security > Security**.
1. Enable the **Use secure DNS**.
1. Choose *Cloudflare (1.1.1.1)* as a service provider.

## Safari

As of today, Safari does not support DNS over HTTPS.

## How to check if my browser is configured correctly?

1. Visit [1.1.1.1 help page](https://1.1.1.1/help)
2. Verify that `Using DNS over HTTPS (DoH)` is `Yes`

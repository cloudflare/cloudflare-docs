---
order:
pcx-content-type: how-to
---

# Configure DoH on your browser

There are several browsers compatible with DNS over HTTPS (DoH). This protocol lets you encrypt your connection to 1.1.1.1 in order to protect your DNS queries from privacy intrusions and tampering.

## Mozilla Firefox

1. Click the menu button.
1. Select **Settings**.
1. In the **General** menu, scroll down to access **Network Settings**.
1. Click on the **Settings** button.
1. Click **Enable DNS over HTTPS**. By default, it resolves to Cloudflare DNS.

### Google Chrome / Microsoft Edge / Brave

<Aside type="note">

This setting may already be enabled by default.

</Aside>

1. In your address bar, type the following and hit **Enter**:
 `chrome://settings/security`. This will take you to the Security page where you can enable DoH.
2. Scroll down below the Advanced section and toggle **Use secure DNS** and choose **With Cloudflare (1.1.1.1)**.

## How to check if my browser is configured correctly?

1. Visit [1.1.1.1 help page](https://1.1.1.1/help).
1. Verify that `Using DNS over HTTPS (DoH)` is `Yes`.

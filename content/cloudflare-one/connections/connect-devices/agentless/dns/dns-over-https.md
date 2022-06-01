---
pcx-content-type: how-to
title: DNS over HTTPS
weight: 2
---

# Configure DNS over HTTPS

Browsers can be configured to use any DNS over HTTPS (DoH) endpoint. If you choose to configure DoH directly in your browser, you must choose a Gateway location as your DoH endpoint, otherwise Gateway DNS filtering will not occur in that browser.

## Prerequisites

Obtain your location's [DoH subdomain](/cloudflare-one/glossary/#doh-subdomain) (previously known as a unique id).

## Mozilla Firefox

1. In the Firefox menu, select **Settings**.
2. In the General menu, scroll down to **Network Settings**.
3. Click **Settings**.
4. Select **Enable DNS over HTTPS**.
5. In the **Use Provider** drop-down menu, select _Custom_.
6. In the **Custom** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.
7. Click **OK**.
8. Enter **about:config** in the address bar.
9. Click **Accept the risk!** if you see a prompt from Firefox.
10. Set **network.trr.bootstrapAddress** to `162.159.36.5`.
11. Set **network.trr.mode** to `3`.

You can now send DNS queries through the DoH protocol.

{{<Aside type="note">}}

If you want to disable DoH for your organization so that Gateway can be enforced, create a policy to block [this canary domain](https://support.mozilla.org/en-US/kb/canary-domain-use-application-dnsnet).

{{</Aside>}}

## Google Chrome

1. Click the three-dot menu in your browser.
2. Click **Settings**.
3. Click **Privacy and security** > **Security**.
4. Scroll down and enable **Use secure DNS**.
5. Select **With Custom**.
6. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

You can now send DNS queries through the DoH protocol. Read more about [enabling DNS over HTTPS](https://www.chromium.org/developers/dns-over-https) on Chrome.

## Microsoft Edge

1. Click the three-dot menu in your browser.
2. Click **Settings**.
3. Click **Privacy, Search, and Services**, and scroll down to **Security**.
4. Enable **Use secure DNS**.
5. Click **Choose a service provider**.
6. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

You can now send DNS queries through the DoH protocol.

## Brave

1. Click the menu button in your browser.
2. Click **Settings**.
3. Click **Security and Privacy** > **Security**.
4. Enable **Use secure DNS**.
5. Select **With Custom**.
6. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

You can now send DNS queries through the DoH protocol.

## Safari

As of today, Safari does not support DNS over HTTPS.

---
pcx-content-type: how-to
title: DNS over HTTPS
weight: 2
---

# DNS over HTTPS

## Browser

Browsers can be configured to use any DoH endpoint. If you choose to configure DoH directly in your browser, you must choose a Gateway location as your DoH endpoint, otherwise Gateway DNS filtering will not occur in that browser.

### Firefox

{{<Aside type="note">}}

If you want to disable DoH for your organization so that Gateway can be enforced, create a policy to block [this canary domain](https://support.mozilla.org/en-US/kb/canary-domain-use-application-dnsnet).

{{</Aside>}}

{{<table-wrap>}}

| Before you start |
| ---------------- |
| Obtain a location's [DoH subdomain](/cloudflare-one/glossary/#doh-subdomain) (previously known as a unique id). |

{{</table-wrap>}}

With Firefox, you can send DNS queries using the DNS over HTTPS protocol.

1.  Open **Preferences** and scroll to the bottom.

2.  Click on **Network Settings**.

3.  Click on **Settings**.

4.  Check **Enable DNS over HTTPS**.

5.  Choose **Custom** from the drop-down for **Use Provider**.

6.  Enter `https://YOUR_UNIQUE_SUBDOMAIN.cloudflare-gateway.com/dns-query` in the **Custom** field. In place of `YOUR_UNIQUE_SUBDOMAIN`, include your **unique ID**.

7.  Click **OK**.

8.  Enter **about:config** in the address bar.

9.  Click on **Accept the risk!** if you see a prompt from Firefox.

10. Set network.trr.bootstrapAddress to `162.159.36.5`.

11. Set network.trr.mode to **3**.

You should now be able to send queries through the DNS over HTTPS protocol.

### Google Chrome / Microsoft Edge / Brave

1.  Open **Settings**.
2.  In your address bar, type the following and hit **Enter**:
    `chrome://flags/#dns-over-https`. This will take you to Secure DNS lookups.
3.  Click on the **Secure DNS lookups** radio button to enable DoH.

Read more about [enabling DNS over HTTPS](https://www.chromium.org/developers/dns-over-https) on Chrome.

### Safari

As of today, Safari does not support DNS over HTTPS.

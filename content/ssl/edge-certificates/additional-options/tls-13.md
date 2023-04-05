---
pcx_content_type: how-to
title: TLS 1.3
weight: 12
---

# TLS 1.3

TLS 1.3 enables the latest version of the TLS protocol (when supported) for improved security and performance.

## What is TLS 1.3?

TLS 1.3 is the newest, fastest, and most secure version of the TLS protocol.
SSL/TLS is the protocol that encrypts communication between users and your website. When web traffic is encrypted with TLS, users will see the green padlock in their browser window.

By turning on the TLS 1.3 feature, traffic to and from your website will be served over the TLS 1.3 protocol when supported by clients. TLS 1.3 protocol has improved latency over older versions, has several new features, and is currently supported in both Chrome (starting with release 66), Firefox (starting with release 60), and in development for Safari and Edge browsers.

## Availability

{{<feature-table id="ssl.tls_13">}}

## Enable TLS 1.3

TLS 1.3 requires a two-step activation: in the Cloudflare dashboard and in the browser.

### Enable TLS 1.3 in Cloudflare settings

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable TLS 1.3 in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **SSL/TLS** > **Edge Certificates**.
3.  For **TLS 1.3**, switch the toggle to **On**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To adjust your TLS 1.3 settings with the API, send a [`PATCH`](/api/operations/zone-settings-change-tls-1.-3-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).
 
{{</tab>}}
{{</tabs>}}


### Enable TLS 1.3 in the browser

<details>
<summary>Chrome</summary>
<div>

1.  In the address bar, enter `chrome://flags` and press **Enter**.
2.  Scroll to locate the **TLS 1.3 Early Data** entry, and set it to _Enabled_. A message saying that the change will take effect the next time you relaunch Chrome will appear.
3.  Select **RELAUNCH NOW** to restart Chrome.

After enabling TLS 1.3, visit a site with TLS 1.3 enabled over HTTPS. Then:

1.  Open Chrome **Developer Tools**.
2.  Select the **Security** tab.
3.  Reload the page (Command-R in macOS, Ctrl-R in Windows).
4.  Select the site under **Main origin**.
5.  Under **Connection**, confirm that the protocol is **TLS 1.3**.

</div>
</details>

<details>
<summary>Firefox</summary>
<div>

1.  In the address bar, enter `about:config` and select to accept the warranty warning.
2.  Search for `security.tls.version.max` and change the value from `3` (the default) to `4`.

After enabling TLS 1.3, visit a site with TLS 1.3 enabled over HTTPS. Then:

1.  Select the lock icon in the address bar.
2.  Select **Connection secure** > **More information**.
3.  Under **Technical Details**, verify that the TLS version is TLS 1.3.

</div>
</details>

### Troubleshooting

Since TLS 1.3 implementations are relatively new, some failures may occur. If you experience errors, submit a Cloudflare Support ticket with the following information:

- Steps to replicate the issue (if possible)
- Client build version
- Client diagnostic information
- Packet captures

Chrome users should submit a [net-internals trace](https://dev.chromium.org/for-testers/providing-network-details) to Google. Firefox users should [report bugs to Mozilla](https://bugzilla.mozilla.org/home).

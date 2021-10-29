---
pcx-content-type: how-to
---

import TLS13Definition from "../../_partials/_tls-13-definition.md"

# TLS 1.3

<TLS13Definition/>

## Overview
TLS 1.3 is the newest, fastest, and most secure version of the TLS protocol.
SSL/TLS is the protocol that encrypts communication between users and your website. When web traffic is encrypted with TLS, users will see the green padlock in their browser window.

By turning on the TLS 1.3 feature, traffic to and from your website will be served over the TLS 1.3 protocol when supported by clients. TLS 1.3 protocol has improved latency over older versions, has several new features, and is currently supported in both Chrome (starting with release 66), Firefox (starting with release 60), and in development for Safari and Edge browsers.

## Enable TLS 1.3

Enable TLS 1.3 in the Cloudflare dashboard:

1. Log into your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
1. Navigate to **SSL/TLS** > **Edge Certificates**.
1. For **TLS 1.3**, switch the toggle to **On**.

To enable TLS 1.3 in the Chrome browser:

1. In the address bar, enter `chrome://flags` and press **Enter**.
1. Scroll to locate the **TLS 1.3 Early Data** entry, and set it to _Enabled_. A message saying that the change will take effect the next time you relaunch Chrome will appear.
1. Click **RELAUNCH NOW** to restart Chrome.

After enabling TLS 1.3, visit a site with TLS 1.3 enabled over HTTPS. Then:

1. Open Chrome **Developer Tools**.
2. Click the **Security** tab.
3. Reload the page (Command-R in Mac OS, Ctrl-R in Windows).
4. Click on the site under **Main origin**.
5. Look on the right-hand tab under Connection to confirm that TLS 1.3 is listed as the _protocol_.

For Firefox:

1. In the address bar, enter _about:config_ and click to accept the warranty warning.
1. Search for security.tls.version.max and set it from the default value of 3 to 4.

After enabling TLS 1.3, visit a site with TLS 1.3 enabled over HTTPS. Then:

1. Click the lock icon in the address bar.
2. Click on **Connection secure** > **More information**.
3. Under **Technical Details**, verify that the TLS version is TLS 1.3.

Since TLS 1.3 implementations are relatively new, some failures may occur.  If you experience errors, submit a Cloudflare Support ticket with the following information:

- Steps to replicate the issue (if possible)
- Client build version
- Client diagnostic information
- Packet captures

Chrome users should submit a [net-internals trace](https://dev.chromium.org/for-testers/providing-network-details) to Google. Firefox users should [report bugs to Mozilla](https://bugzilla.mozilla.org/home).
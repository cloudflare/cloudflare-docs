---
order: 3
pcx-content-type: faq
---

[❮ Back to FAQ](/faq)

# Troubleshooting

## I see a website is blocked, and it shouldn't be.

If you believe a domain has been incorrectly blocked, you can use [this form](https://radar.cloudflare.com/categorization-feedback/) to get the URL reviewed.

## I see an error saying `No Access-Control-Allow-Origin header is present on the requested resource`.

Cloudflare Access requires that the credentials: `same-origin parameter` be added to JavaScript when using the Fetch API (to include cookies). AJAX requests fail without this parameter present. For more information, see our documentation about [CORS settings](/policies/zero-trust/cors#list-of-cors-settings).

## I see untrusted certificate warnings for every page and I am unable to browse the Internet.

Advanced security features including HTTPS traffic inspection require users to install and trust the Cloudflare root certificate on their machine or device. If you are installing certificates manually on all of your devices, these steps will need to be performed on each new device that is to be subject to HTTP Filtering.
To install the Cloudflare root certificate, follow the steps found [here](/connections/connect-devices/warp/install-cloudflare-cert).

## I see a Cloudflare Gateway error page when browsing to a website.

<div class="medium-img">
<img alt="Questions" src="../static/documentation/faq/http-error-page.png"/>
</div>

We present an HTTP error page in the following cases:
1. ​**An untrusted certificate is presented from the origin to Gateway**. Gateway will consider a certificate is untrusted if any of these three conditions are true:
  * The server certificate issuer is unknown or is not trusted by the service.
  * The server certificate is revoked and fails a CRL check (OSCP checking coming soon)
  * There is at least one expired certificate in the certificate chain for the server certificate
​
1. **Common certificate errors occur**. For example,  in the event of a certificate common name mismatch.
1. **​Insecure cipher suite**. When the connection from Cloudflare Gateway to an upstream server is insecure (e.g, uses an insecure cipher such as rc4, rc4-md5, 3des, etc). We do support upstream connections that require a connection over TLS that is prior to TLS 1.3. We will support the ability for an administrator to configure whether to trust insecure connections in the very near future.

If you see this page, providing as much information as possible to the local IT administrator will be helpful as we troubleshoot with them, such as:
* Operating System (Windows 10, macOS 10.x, iOS 14.x)
* Web browser (Chrome, Firefox, Safari, Edge)
* URL of the request
* Screenshot or copy/paste of the content from the error page

## I see an error in the Gateway Overview page, and no analytics are displayed.

![Overview empty](../static/documentation/faq/gateway-dash-overview-empty.png)

You may not see analytics on the Overview page for the following reasons:

* **You are not sending DNS queries to Gateway**. Verify that the destination IP addresses you are sending DNS queries to are correct. You can check the destination IP addresses for your location by going to your locations page and then expanding the location.
* **You are using other DNS resolvers**. If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. Please make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.
* **The source IPv4 address for your location is incorrect**. If you are using IPv4, check the source IPv4 address that you entered for the location matches with the network's source IPv4 address.
* **Analytics is not available yet**. It takes some time to generate the analytics for Cloudflare Gateway. If you are not seeing anything even after 5 minutes, please file a support ticket.

## I see a `websocket: bad handshake` error.

If your Cloudflare account has Universal SSL enabled and the SSL/TLS encryption mode is set to Off, cloudflared will return a "websocket: bad handshake" error. To resolve, set the SSL/TLS encryption mode to any setting other than Off.

## ​I see a "No Browsers Available" alert.

If you encounter this error please [file feedback](https://developers.cloudflare.com/cloudflare-one/connections/connect-browsers/known-limitations#submitting-feedback) via the WARP client and we will investigate.

## ​I see a "Maximum Sessions Reached" alert.
This can occur if your device is attempting to establish a connection to more than two remote browser instances.
A browser isolation session is a connection from your local browser to a remote browser. Tabs and windows within the same browser share a single remote browser session. In practice, this generally means that you can open both Chrome and Firefox to use browser isolation concurrently, but attempting to open a third browser such as Opera will cause this alert to appear. To release a browser session, please close all tabs/windows in your local browser. The remote browser session will be automatically terminated within 15 minutes.

Safari is more susceptible to presenting this error. See [workaround](/connections/connect-browsers/known-limitations#safari).

## Mobile applications warn of an invalid certificate, even though I installed the Cloudflare certificate on my system.

These mobile applications may use [certificate pinning](/glossary#certificate-pinning). Cloudflare Gateway dynamically generates a certificate for all encrypted connections in order to inspect the content of HTTP traffic. This certificate will not match the expected certificate by applications that use certificate pinning.
To allow these applications to function normally, administrators can configure bypass rules to exempt traffic to hosts associated with the application from being intercepted and inspected.

## My tunnel fails to authenticate. 

To start using Cloudflare Tunnel, a super administrator in the Cloudflare account must first log in through `cloudflared login`. The client will launch a browser window and prompt the user to select a hostname in their Cloudflare account. Once selected, Cloudflare generates a certificate that consists of three components:

* The public key of the origin certificate for that hostname
* The private key of the origin certificate for that domain
* A token that is unique to Cloudflare Tunnel

Those three components are bundled into a single PEM file that is downloaded one time during that login flow. The host certificate is valid for the root domain and any subdomain one-level deep. Cloudflare uses that certificate file to authenticate `cloudflared` to create DNS records for your domain in Cloudflare.

The third component, the token, consists of the zone ID (for the selected domain) and an API token scoped to the user who first authenticated with the login command. When user permissions change (if that user is removed from the account or becomes an admin of another account, for example), Cloudflare rolls the user's API key. However, the certificate file downloaded through `cloudflared` retains the older API key and can cause authentication failures. The user will need to login once more through `cloudflared` to regenerate the certificate. Alternatively, the administrator can create a dedicated service user to authenticate.

## Firefox shows network protocol violation when using the WARP client

You may have to disable the DNS over HTTPs setting in Firefox. To do so, navigate to Firefox Preferences, scroll down to **Network Settings**, and uncheck **Enable DNS over HTTPS > OK**.
---
pcx-content-type: faq
title: Troubleshooting
weight: 4
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Troubleshooting

## I see a website is blocked, and it shouldn't be.

If you believe a domain has been incorrectly blocked, you can use [this form](https://radar.cloudflare.com/categorization-feedback/) to get the URL reviewed.

## I see an error saying `No Access-Control-Allow-Origin header is present on the requested resource`.

Cloudflare Access requires that the credentials: `same-origin parameter` be added to JavaScript when using the Fetch API (to include cookies). AJAX requests fail without this parameter present. For more information, refer to our documentation about [CORS settings](/cloudflare-one/policies/access/cors/#list-of-cors-settings).

## I see untrusted certificate warnings for every page and I am unable to browse the Internet.

Advanced security features including HTTPS traffic inspection require users to install and trust the Cloudflare root certificate on their machine or device. If you are installing certificates manually on all of your devices, these steps will need to be performed on each new device that is to be subject to HTTP Filtering.
To install the Cloudflare root certificate, follow the steps found [here](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/).

## I see a Cloudflare Gateway error page when browsing to a website.

<div class="medium-img">
  <img alt="Questions" src="/cloudflare-one/static/documentation/faq/http-error-page.png" />
</div>

We present an HTTP error page in the following cases:

1.  **An untrusted certificate is presented from the origin to Gateway**. Gateway will consider a certificate is untrusted if any of these three conditions are true:

    - The server certificate issuer is unknown or is not trusted by the service.
    - The server certificate is revoked and fails a CRL check (OSCP checking coming soon)
    - There is at least one expired certificate in the certificate chain for the server certificate

2.  **Common certificate errors occur**. For example, in the event of a certificate common name mismatch. The SSL certificate on the edge needs to cover the requested hostname or else a 526 Insecure upstream error will be presented.
3.  **Insecure cipher suite**. When the connection from Cloudflare Gateway to an upstream server is insecure (e.g, uses an insecure cipher such as rc4, rc4-md5, 3des, etc). We do support upstream connections that require a connection over TLS that is prior to TLS 1.3. We will support the ability for an administrator to configure whether to trust insecure connections in the very near future.

If you see this page, providing as much information as possible to the local IT administrator will be helpful as we troubleshoot with them, such as:

- Operating System (Windows 10, macOS 10.x, iOS 14.x)
- Web browser (Chrome, Firefox, Safari, Edge)
- URL of the request
- Screenshot or copy/paste of the content from the error page

## I see an error in the Gateway Overview page, and no analytics are displayed.

![Overview empty](/cloudflare-one/static/documentation/faq/gateway-dash-overview-empty.png)

You may not see analytics on the Overview page for the following reasons:

- **You are not sending DNS queries to Gateway**. Verify that the destination IP addresses you are sending DNS queries to are correct. You can check the destination IP addresses for your location by going to your locations page and then expanding the location.
- **You are using other DNS resolvers**. If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. Please make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.
- **The source IPv4 address for your location is incorrect**. If you are using IPv4, check the source IPv4 address that you entered for the location matches with the network's source IPv4 address.
- **Analytics is not available yet**. It takes some time to generate the analytics for Cloudflare Gateway. If you are not seeing anything even after 5 minutes, please file a support ticket.

## I see a "No Browsers Available" alert.

If you encounter this error please [file feedback](/cloudflare-one/policies/browser-isolation/known-limitations/) via the WARP client and we will investigate.

## I see a "Maximum Sessions Reached" alert.

This can occur if your device is attempting to establish a connection to more than two remote browser instances.
A browser isolation session is a connection from your local browser to a remote browser. Tabs and windows within the same browser share a single remote browser session. In practice, this generally means that you can open both Chrome and Firefox to use browser isolation concurrently, but attempting to open a third browser such as Opera will cause this alert to appear. To release a browser session, please close all tabs/windows in your local browser. The remote browser session will be automatically terminated within 15 minutes.

## I see `Error 400 admin_policy_enforced` when using GSuite as an identity provider.

<div class="small-img">
  <img alt="Google Error 400" src="/cloudflare-one/static/documentation/faq/google-error-400.png" />
</div>

This is due to a Google policy change requiring you to set your Google Admin console to trust your applications:

1.  In the Google Admin console, navigate to **Security** > **API controls**.
2.  Check the _Trust internal, domain-owned apps_ option.

## I see an error: x509: certificate signed by unknown authority.

This means the origin is using a certificate that `cloudflared` does not trust. For example, you may get this error if you are using SSL inspection in a proxy between your server and Cloudflare. To solve this:

- Add the certificate to the system certificate pool.
- Use the `--origin-ca-pool` flag and specify the path to the certificate.
- Use the `--no-tls-verify` flag to stop `cloudflared` checking the certificate for a trust chain.

## I see an error 1033 when attempting to run a tunnel.

An error 1033 indicates your tunnel is not connected to Cloudflare's edge. First, run `cloudflared tunnel list` to see whether your tunnel is listed as active. If it isn't, check the following:

1.  Make sure you correctly routed traffic to your tunnel (step 5 in the [Tunnel guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#5-start-routing-traffic)) by assigning a CNAME record to point traffic to your tunnel. Alternatively, check [this guide](/cloudflare-one/connections/connect-apps/routing-to-tunnel/lb/) to route traffic to your tunnel using load balancers.
2.  Make sure you run your tunnel (step 6 in the [Tunnel guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#6-run-the-tunnel).

For more information, here is a [comprehensive list](https://support.cloudflare.com/hc/en-us/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors#h_W81O7hTPalZtYqNYkIHgH) of Cloudflare 1xxx errors.

## I see `Error 0: Bad Request. Please create a ca for application.` when attempting to connect to SSH with a short-lived certificate.

This error will appear if a certificate has not been generated for the Access application users are attempting to connect to. For more information on how to generate a certificate for the application on the Access Service Auth SSH page, refer to [these instructions](/cloudflare-one/identity/users/short-lived-certificates/).

## Mobile applications warn of an invalid certificate, even though I installed the Cloudflare certificate on my system.

These mobile applications may use [certificate pinning](/cloudflare-one/glossary/#certificate-pinning). Cloudflare Gateway dynamically generates a certificate for all encrypted connections in order to inspect the content of HTTP traffic. This certificate will not match the expected certificate by applications that use certificate pinning.
To allow these applications to function normally, administrators can configure bypass rules to exempt traffic to hosts associated with the application from being intercepted and inspected.

## My tunnel fails to authenticate.

To start using Cloudflare Tunnel, a super administrator in the Cloudflare account must first log in through `cloudflared login`. The client will launch a browser window and prompt the user to select a hostname in their Cloudflare account. Once selected, Cloudflare generates a certificate that consists of three components:

- The public key of the origin certificate for that hostname
- The private key of the origin certificate for that domain
- A token that is unique to Cloudflare Tunnel

Those three components are bundled into a single PEM file that is downloaded one time during that login flow. The host certificate is valid for the root domain and any subdomain one-level deep. Cloudflare uses that certificate file to authenticate `cloudflared` to create DNS records for your domain in Cloudflare.

The third component, the token, consists of the zone ID (for the selected domain) and an API token scoped to the user who first authenticated with the login command. When user permissions change (if that user is removed from the account or becomes an admin of another account, for example), Cloudflare rolls the user's API key. However, the certificate file downloaded through `cloudflared` retains the older API key and can cause authentication failures. The user will need to login once more through `cloudflared` to regenerate the certificate. Alternatively, the administrator can create a dedicated service user to authenticate.

## Firefox shows network protocol violation when using the WARP client

You may have to disable the DNS over HTTPs setting in Firefox. To do so, navigate to Firefox Preferences, scroll down to **Network Settings**, and uncheck **Enable DNS over HTTPS > OK**.

## `cloudflared access` shows an error `websocket: bad handshake`

This means that your `cloudflared access` client is unable to reach your `cloudflared tunnel` origin.
To diagnose this, you should look at the `cloudflared tunnel` logs. A very often root cause is that the `cloudflared tunnel` is unable to proxy to your origin (e.g. because the ingress is mis-configured, or the origin is down, or because the origin HTTPS certificate cannot be validated by `cloudflared tunnel`).
If `cloudflared tunnel` has no logs, it means Cloudflare Edge is not even able to route the websocket traffic to it.

There are a few different possible root causes behind the `websocket: bad handshake` error:

- Your `cloudflared tunnel` is either not running or not connected to Cloudflare Edge.
- WebSockets are not enabled. To enable them, navigate to `dash.cloudflare.com` > **Network**.
- Your Cloudflare account has Universal SSL enabled and the SSL/TLS encryption mode is set to _Off_. To resolve, set the SSL/TLS encryption mode to any setting other than _Off_.
- Your requests are blocked by [Super Bot Fight Mode](/bots/get-started/pro/). To resolve, make sure you set **Definitely automated** to _Allow_ in the bot fight mode settings.

## Connections are timing out after 270 seconds

Cloudflare enforces a 270-second idle timeout on TCP connections that go through the gateway. If there is no new data to send in either direction for 270 seconds, the proxy process drops the connection. This cannot be mitigated by Keep-Alive packets, as TCP is terminated in the gateway and a new connection is made to the upstream sever.

## Tunnel connections fail with SSL error

If `cloudflared` returns error `error="remote error: tls: handshake failure"`, check to make sure the hostname in question is covered by a SSL certificate. If using a multi-level subdomain, an advanced certificate may be required as the Universal SSL will not cover more than one level of subdomain. This may surface in the browser as `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`.

## I see `Access api error auth_domain_cannot_be_updated_dash_sso`.

This error appears if you try to change your [team domain](/cloudflare-one/faq/teams-getting-started-faq/#whats-a-team-domainteam-name) while the [Cloudflare Dashboard SSO](/cloudflare-one/applications/configure-apps/dash-sso-apps/) feature is enabled on your account.
Cloudflare Dashboard SSO does not currently support team domain changes. Contact support for more details.

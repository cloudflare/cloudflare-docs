---
pcx_content_type: troubleshooting
title: Troubleshooting
weight: 4
meta:
  description: Review common troubleshooting scenarios for Cloudflare Zero Trust.
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Troubleshooting

## I tried to register the WARP client with my Zero Trust domain but received the following error messages: `Authentication Expired` and `Registration error. Please try again later`.

When a user logs into an organization, WARP will open a web page so the user can sign in via Cloudflare Access. Access then generates a JSON Web Token (JWT) that is passed from the web page to the WARP client to authenticate the device. This JWT has a timestamp indicating the exact time it was created, as well as a timestamp indicating it will expire 50 seconds into the future.

This error message means that when the JWT is finally passed to the WARP client, it has already expired. One of two things can be happening:

1. (Most likely): Your computer system clock is not properly synced using Network Time Protocol (NTP). Visit [https://time.is](https://time.is) on the affected machine to validate your clock is properly synchronized within 20 seconds of the actual time.

2. You are waiting more than one minute to open Cloudflare WARP from the time Cloudflare Access prompts you. Open the WARP client as soon as you get the prompt.

## I see a website is blocked, and it shouldn't be.

If you believe a domain has been incorrectly blocked, you can use [this form](https://radar.cloudflare.com/categorization-feedback/) to get the URL reviewed.

## I see an error saying `No Access-Control-Allow-Origin header is present on the requested resource`.

Cloudflare Access requires that the credentials: `same-origin parameter` be added to JavaScript when using the Fetch API (to include cookies). AJAX requests fail without this parameter present. For more information, refer to our documentation about [CORS settings](/cloudflare-one/identity/authorization-cookie/cors/).

## I see untrusted certificate warnings for every page and I am unable to browse the Internet.

Advanced security features including HTTPS traffic inspection require users to install and trust the Cloudflare root certificate on their machine or device. If you are installing certificates manually on all of your devices, these steps will need to be performed on each new device that is to be subject to HTTP Filtering.
To install the Cloudflare root certificate, follow the steps found [here](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/).

## I see error 526 when browsing to a website.

Gateway presents an **HTTP Response Code: 526** error page in the following cases:

- **An untrusted certificate is presented from the origin to Gateway.** Gateway will consider a certificate is untrusted if any of these conditions are true:

  - The server certificate issuer is unknown or is not trusted by the service.
  - The server certificate is revoked and fails a CRL check.
  - There is at least one expired certificate in the certificate chain for the server certificate.
  - The common name on the certificate does not match the URL you are trying to reach.
  - The common name on the certificate contains invalid characters (such as underscores). Gateway uses [BoringSSL](https://csrc.nist.gov/projects/cryptographic-module-validation-program/validated-modules/search?SearchMode=Basic&Vendor=Google&CertificateStatus=Active&ValidationYear=0) to validate certificates. Chrome's [validation logic](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/net/cert/x509_certificate.cc#429) allows non-RFC 1305 compliant certificates, which is why the website may load when you turn off WARP.

- **The connection from Gateway to the origin is insecure.** Gateway does not trust origins which:

  - Only offer insecure cipher suites (such as RC4, RC4-MD5, or 3DES). You can use the [SSL Server Test tool](https://www.ssllabs.com/ssltest/index.html) to check which ciphers are supported by the origin.
  - Do not support [FIPS-compliant ciphers](/cloudflare-one/policies/filtering/http-policies/tls-decryption/#cipher-suites) (if you have enabled [FIPS compliance mode](/cloudflare-one/policies/filtering/http-policies/tls-decryption/#fips-compliance)). In order to load the page, you can either disable FIPS mode or create a Do Not Inspect policy for this host (which has the effect of disabling FIPS compliance for this origin).
  - Redirect all HTTPS requests to HTTP.

If none of the above scenarios apply, contact Cloudflare support with the following information:

- Operating System (Windows 10, macOS 10.x, iOS 14.x)
- Web browser (Chrome, Firefox, Safari, Edge)
- URL of the request
- Screenshot or copy/paste of the content from the error page

For more troubleshooting information, refer to [Support](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-526-invalid-ssl-certificate).

## I see error 504 when browsing to a website.

Gateway presents an **HTTP response code: 504** error page when the website publishes an `AAAA` (IPv6) DNS record but does not respond over IPv6. When Gateway attempts to connect over IPv6, the connection will timeout. This issue is caused by a misconfiguration on the origin you are trying to reach. We are working on adding Happy Eyeballs support to Gateway, which will automatically fallback to IPv4 if IPv6 fails. In the meantime, you can either add the domain to your [split tunnel configuration](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) or create a [Gateway DNS policy](/cloudflare-one/policies/filtering/dns-policies/) to block the query record type `AAAA` for the specific domain. For example:

| Selector          | Operator | Value         | Action |
| ----------------- | -------- | ------------- | ------ |
| Host              | is       | `example.com` | Block  |
| Query Record Type | is       | `AAAA`        |        |

For more troubleshooting information, refer to [Support](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-502-bad-gateway-or-error-504-gateway-timeout).

## I see an error in the Gateway Overview page, and no analytics are displayed.

![An error displayed in the Gateway Overview page instead of analytics.](/cloudflare-one/static/documentation/faq/gateway-dash-overview-empty.png)

You may not see analytics on the Overview page for the following reasons:

- **You are not sending DNS queries to Gateway**. Verify that the destination IP addresses you are sending DNS queries to are correct. You can check the destination IP addresses for your DNS location by going to **Gateway** > **DNS Locations** and then expanding the location.
- **You are using other DNS resolvers**. If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. Please make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.
- **The source IPv4 address for your DNS location is incorrect**. If you are using IPv4, check the source IPv4 address that you entered for the DNS location matches with the network's source IPv4 address.
- **Analytics is not available yet**. It takes some time to generate the analytics for Cloudflare Gateway. If you are not seeing anything even after 5 minutes, please file a support ticket.

## I see a "No Browsers Available" alert.

If you encounter this error please [file feedback](/cloudflare-one/policies/browser-isolation/known-limitations/) via the WARP client and we will investigate.

## I see a "Maximum Sessions Reached" alert.

This can occur if your device is attempting to establish a connection to more than two remote browser instances.
A browser isolation session is a connection from your local browser to a remote browser. Tabs and windows within the same browser share a single remote browser session. In practice, this generally means that you can open both Chrome and Firefox to use browser isolation concurrently, but attempting to open a third browser such as Opera will cause this alert to appear. To release a browser session, please close all tabs/windows in your local browser. The remote browser session will be automatically terminated within 15 minutes.

## I see `SAML Verify: Invalid SAML response, SAML Verify: No certificate selected to verify` when testing a SAML identity provider.

This error occurs when the identity provider has not included the signing public key in the SAML response. While not required by the SAML 2.0 specification, Cloudflare Access always checks that the public key provided matches the **Signing certificate** uploaded to Zero Trust. For the integration to work, you will need to configure your identity provider to add the public key.

## I see an error: x509: certificate signed by unknown authority.

This means the origin is using a certificate that `cloudflared` does not trust. For example, you may get this error if you are using SSL inspection in a proxy between your server and Cloudflare. To solve this:

- Add the certificate to the system certificate pool.
- Use the `--origin-ca-pool` flag and specify the path to the certificate.
- Use the `--no-tls-verify` flag to stop `cloudflared` checking the certificate for a trust chain.

## I see an error 1033 when attempting to run a tunnel.

An error 1033 indicates your tunnel is not connected to Cloudflare's edge. First, run `cloudflared tunnel list` to see whether your tunnel is listed as active. If it isn't, check the following:

1.  Make sure you correctly routed traffic to your tunnel (step 5 in the [Tunnel guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/#5-start-routing-traffic)) by assigning a CNAME record to point traffic to your tunnel. Alternatively, check [this guide](/cloudflare-one/connections/connect-apps/routing-to-tunnel/lb/) to route traffic to your tunnel using load balancers.
2.  Make sure you run your tunnel (step 6 in the [Tunnel guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/#6-run-the-tunnel)).

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

## Firefox shows a network protocol violation when I use the WARP client.

If you see this warning, you may have to disable DNS over HTTPs setting in Firefox. If you need help doing that, see [these instructions](https://support.mozilla.org/en-US/kb/firefox-dns-over-https#w_manually-enabling-and-disabling-dns-over-https).

## `cloudflared access` shows an error `websocket: bad handshake`

This means that your `cloudflared access` client is unable to reach your `cloudflared tunnel` origin.
To diagnose this, you should look at the `cloudflared tunnel` logs. A very often root cause is that the `cloudflared tunnel` is unable to proxy to your origin (e.g. because the ingress is mis-configured, or the origin is down, or because the origin HTTPS certificate cannot be validated by `cloudflared tunnel`).
If `cloudflared tunnel` has no logs, it means Cloudflare Edge is not even able to route the websocket traffic to it.

There are a few different possible root causes behind the `websocket: bad handshake` error:

- Your `cloudflared tunnel` is either not running or not connected to Cloudflare Edge.
- WebSockets are not enabled. To enable them, navigate to `dash.cloudflare.com` > **Network**.
- Your Cloudflare account has Universal SSL enabled and the SSL/TLS encryption mode is set to _Off_. To resolve, set the SSL/TLS encryption mode to any setting other than _Off_.
- Your requests are blocked by [Super Bot Fight Mode](/bots/get-started/pro/). To resolve, make sure you set **Definitely automated** to _Allow_ in the bot fight mode settings.
- Your SSH or RDP Access application has the [Binding Cookie](/cloudflare-one/identity/authorization-cookie/#binding-cookie) enabled. To disable the cookie, go to **Access** > **Applications** and edit the application settings.

## My tunnel randomly disconnects

Long-lived connections initiated through the Cloudflare Zero Trust platform, such as SSH sessions, can last up to eight hours. However, disruptions along the service path may result in more frequent disconnects. Often, these disconnects are caused by regularly scheduled maintenance events such as data center, server, or service updates and restarts. If you believe these events are not the cause of disconnects in your environment, collect the relevant [WARP logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs/) and [Tunnel logs](/cloudflare-one/connections/connect-apps/monitor-tunnels/logs/) and contact Support.

## Tunnel connections fail with SSL error

If `cloudflared` returns error `error="remote error: tls: handshake failure"`, check to make sure the hostname in question is covered by a SSL certificate. If using a multi-level subdomain, an advanced certificate may be required as the Universal SSL will not cover more than one level of subdomain. This may surface in the browser as `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`.

## Tunnel connections fail with `Too many open files` error

If your [Cloudflare Tunnel logs](/cloudflare-one/connections/connect-apps/monitor-tunnels/logs/) returns a `socket: too many open files` error, it means that `cloudflared` has exhausted the open files limit on your machine. The maximum number of open files, or file descriptors, is an operating system setting that determines how many files a process is allowed to open. To increase the open file limit, you will need to configure system settings on the machine running `cloudflared`. This setting cannot be changed by `cloudflared`.

## I see `Access api error auth_domain_cannot_be_updated_dash_sso`.

This error appears if you try to change your [team domain](/cloudflare-one/faq/teams-getting-started-faq/#whats-a-team-domain/team-name) while the [Cloudflare dashboard SSO](/cloudflare-one/applications/configure-apps/dash-sso-apps/) feature is enabled on your account.
Cloudflare dashboard SSO does not currently support team domain changes. Contact your account team for more details.

## WARP on Linux shows `DNS connectivity check failed` with reason `DNSLookupFailed`.

This error means that the `systemd-resolved` service on Linux is not allowing WARP to resolve DNS requests. To solve the issue:

1. Add the following line to `/etc/systemd/resolved.conf`:

```txt
ResolveUnicastSingleLabel=yes
```

2. Restart the service:

```sh
$ sudo systemctl restart systemd-resolved.service
```

## Windows incorrectly shows `No Internet access` when WARP is enabled.

Windows runs network connectivity checks that can sometimes fail due to how the WARP client configures the local DNS proxy on the device. This can result in a cosmetic UI error where the user believes they have no Internet even though the device still has full connectivity. However, some apps (Outlook, JumpCloud) may refuse to connect because Windows is reporting there is no Internet connectivity.

There are two options to resolve the issue:

- **Option 1**: In Windows, configure the Network Connectivity Status Indicator (NCSI) to detect the WARP DNS server.
{{<tabs labels="Registry key | Group policy">}}
{{<tab label="registry key" no-code="true">}}

To fix the issue with a registry key:

```bash
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\POLICIES\MICROSOFT\Windows\NetworkConnectivityStatusIndicator" /v UseGlobalDNS /t REG_DWORD /d 1 /f
```

{{</tab>}}
{{<tab label="group policy" no-code="true">}}

To fix the issue with a local group policy:
1. Open `gpedit.msc`.
2. Go to **Computer Configuration** > **Administrative Templates** > **Network** > **Network Connectivity Status Indicator**.
3. Enable **Specify Global DNS**.
4. Update group policy settings on the device:
  ```bash
  gpupdate /force
  ```
5. Reboot the device.

{{</tab>}}
{{</tabs>}}

- **Option 2**: In Zero Trust, add `*.msftconnecttest.com` and `dns.msftncsi.com` to your [split tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) exclude list.

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
To install the Cloudflare root certificate, follow [this guide](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/).

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
  - Do not support [FIPS-compliant ciphers](/cloudflare-one/policies/gateway/http-policies/tls-decryption/#cipher-suites) (if you have enabled [FIPS compliance mode](/cloudflare-one/policies/gateway/http-policies/tls-decryption/#fips-compliance)). In order to load the page, you can either disable FIPS mode or create a Do Not Inspect policy for this host (which has the effect of disabling FIPS compliance for this origin).
  - Redirect all HTTPS requests to HTTP.

If none of the above scenarios apply, contact Cloudflare support with the following information:

- Operating System (Windows 10, macOS 10.x, iOS 14.x)
- Web browser (Chrome, Firefox, Safari, Edge)
- URL of the request
- Screenshot or copy/paste of the content from the error page

For more troubleshooting information, refer to [Support](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-526-invalid-ssl-certificate).

## I see error 504 or timeouts when browsing to a website.

Gateway may present an **HTTP response code: 504** error page - or your browser may display generic timeout errors - when a website publishes an `AAAA` (IPv6) DNS record but does not respond over IPv6. When Gateway attempts to connect over IPv6, the connection will timeout. This issue is caused by a misconfiguration on the origin you are trying to reach. We are working on adding Happy Eyeballs support to Gateway, which will automatically fallback to IPv4 if IPv6 fails. In the meantime, you can either add the domain to your [split tunnel configuration](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) or create a [Gateway DNS policy](/cloudflare-one/policies/gateway/dns-policies/) to block the query record type `AAAA` for the specific domain. For example:

| Selector          | Operator | Value         | Logic | Action |
| ----------------- | -------- | ------------- | ----- | ------ |
| Host              | is       | `example.com` | And   | Block  |
| Query Record Type | is       | `AAAA`        |       |        |

For more troubleshooting information, refer to [Support](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-502-bad-gateway-or-error-504-gateway-timeout).

## I see an error in the Gateway Overview page, and no analytics are displayed.

![An error displayed in the Gateway Overview page instead of analytics.](/images/cloudflare-one/faq/gateway-dash-overview-empty.png)

You may not see analytics on the Overview page for the following reasons:

- **You are not sending DNS queries to Gateway**. Verify that the destination IP addresses you are sending DNS queries to are correct. You can check the destination IP addresses for your DNS location by going to **Gateway** > **DNS Locations** and then expanding the location.
- **You are using other DNS resolvers**. If you have other DNS resolvers in your DNS settings, your device could be using IP addresses for resolvers that are not part of Gateway. Make sure to remove all other IP addresses from your DNS settings and only include Gateway's DNS resolver IP addresses.
- **The source IPv4 address for your DNS location is incorrect**. If you are using IPv4, check the source IPv4 address that you entered for the DNS location matches with the network's source IPv4 address.
- **Analytics is not available yet**. It takes some time to generate the analytics for Cloudflare Gateway. If you are not seeing anything even after 5 minutes, file a support ticket.

## I see a "No Browsers Available" alert.

If you encounter this error, [file feedback](/cloudflare-one/policies/browser-isolation/known-limitations/) via the WARP client and we will investigate.

## I see a "Maximum Sessions Reached" alert.

This can occur if your device is attempting to establish a connection to more than two remote browser instances.
A browser isolation session is a connection from your local browser to a remote browser. Tabs and windows within the same browser share a single remote browser session. In practice, this generally means that you can open both Chrome and Firefox to use browser isolation concurrently, but attempting to open a third browser such as Opera will cause this alert to appear. To release a browser session, close all tabs/windows in your local browser. The remote browser session will be automatically terminated within 15 minutes.

## I see `SAML Verify: Invalid SAML response, SAML Verify: No certificate selected to verify` when testing a SAML identity provider.

This error occurs when the identity provider has not included the signing public key in the SAML response. While not required by the SAML 2.0 specification, Cloudflare Access always checks that the public key provided matches the **Signing certificate** uploaded to Zero Trust. For the integration to work, you will need to configure your identity provider to add the public key.

## I see `Error 0: Bad Request. Please create a ca for application.` when attempting to connect to SSH with a short-lived certificate.

This error will appear if a certificate has not been generated for the Access application users are attempting to connect to. For more information on how to generate a certificate for the application on the Access Service Auth SSH page, refer to [these instructions](/cloudflare-one/identity/users/short-lived-certificates/).

## Mobile applications warn of an invalid certificate, even though I installed the Cloudflare certificate on my system.

These mobile applications may use {{<glossary-tooltip term_id="certificate pinning">}}certificate pinning{{</glossary-tooltip>}} Cloudflare Gateway dynamically generates a certificate for all encrypted connections in order to inspect the content of HTTP traffic. This certificate will not match the expected certificate by applications that use certificate pinning.
To allow these applications to function normally, administrators can configure bypass rules to exempt traffic to hosts associated with the application from being intercepted and inspected.

## Firefox shows a network protocol violation when I use the WARP client.

If you see this warning, you may have to disable DNS over HTTPS setting in Firefox. If you need help doing that, see [these instructions](https://support.mozilla.org/en-US/kb/firefox-dns-over-https#w_manually-enabling-and-disabling-dns-over-https).

## Chrome shows `NET::ERR_CERT_AUTHORITY_INVALID` when I use the WARP client.

Advanced security features including HTTPS traffic inspection require you to deploy a [root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on the device. If [**Install CA to system certificate store**](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cert-with-warp/) is enabled, the WARP client will automatically install a new root certificate whenever you install or update WARP.

Certain web browsers (such as Chrome and Microsoft Edge) load and cache root certificates when they start. Therefore, if a root certificate is installed while the browser is already running, your browser may not detect the new certificate. To resolve the error, restart the browser.

## I see `Access api error auth_domain_cannot_be_updated_dash_sso`.

This error appears if you try to change your [team domain](/cloudflare-one/faq/teams-getting-started-faq/#whats-a-team-domain/team-name) while the [Cloudflare dashboard SSO](/cloudflare-one/applications/configure-apps/dash-sso-apps/) feature is enabled on your account.
Cloudflare dashboard SSO does not currently support team domain changes. Contact your account team for more details.

## WARP on Linux shows `DNS connectivity check failed`.

This error means that the `systemd-resolved` service on Linux is not allowing WARP to resolve DNS requests.

To solve the issue:

1. Add the following line to `/etc/systemd/resolved.conf`:

```txt
ResolveUnicastSingleLabel=yes
```

2. Make sure that no other DNS servers are configured in `/etc/systemd/resolved.conf`. For example, if the file contains `DNS=X.Y.Z.Q`, comment out the line.

3. Restart the service:

```sh
$ sudo systemctl restart systemd-resolved.service
```

## Windows incorrectly shows `No Internet access` when WARP is enabled.

[NCSI](https://learn.microsoft.com/en-us/windows-server/networking/ncsi/ncsi-overview) is a Windows feature for determining network quality and connectivity. When WARP is enabled, NCSI checks can sometimes fail and cause a cosmetic UI error where the user believes they have no Internet even though the device still has full connectivity. Some apps (Outlook, JumpCloud) may refuse to connect because Windows is reporting there is no Internet connectivity.

To resolve the issue, you will need to edit two Windows registry keys:

1. Configure NCSI to detect WARP's [local DNS proxy](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/#dns-traffic).
    ```txt
    HKEY_LOCAL_MACHINE\SOFTWARE\POLICIES\MICROSOFT\Windows\NetworkConnectivityStatusIndicator
    Type: DWORD
    Value: UseGlobalDNS
    Data: 1
    ```
2. Configure NCSI to use active probing mode, as WARP may be obscuring the number of hops expected by the [passive probe](https://learn.microsoft.com/en-us/windows-server/networking/ncsi/ncsi-frequently-asked-questions#how-does-passive-probing-determine-connectivity).
    ```txt
    HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet
    Type: DWORD
    Value: EnableActiveProbing
    Data: 1
    ```

## I see Storage Partitioned Error.

Chrome is rolling out an [experimental feature](https://developer.chrome.com/en/docs/privacy-sandbox/storage-partitioning/) that partitions local storage in browsers. When third-party storage partitioning is enabled, Cloudflare Browser Isolation can inadvertently store data in the wrong remote browser instance, most notably when rapidly switching between tabs.

To determine if your browser is impacted:

1. Go to `chrome://version/?show-variations-cmd`.
2. Search for `ThirdPartyStoragePartitioning/Enabled`.
3. If you find a match, you likely need to disable this feature (see below).

To disable third-party storage partitioning:

1. Go to `chrome://flags/#third-party-storage-partitioning`.
2. Set **Experimental third-party storage partitioning** to _Disabled_.
3. Select **Relaunch** to apply the change.

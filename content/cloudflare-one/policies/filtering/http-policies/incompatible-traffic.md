---
pcx-content-type: concept
title: Incompatible traffic
weight: 5
layout: single
---

# Traffic incompatible with Gateway inspection

The following types of HTTP traffic are incompatible with Gateway inspection.

## Do Not Inspect applications

Gateway does not support TLS decryption for applications which use:

- Embedded certificates
- Self-signed certificates
- Mutual TLS (mTLS) authentication

To allow these types of requests through Gateway, you must add a [*Do Not Inspect*](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) HTTP policy for these applications and domains.

## HTTP/3 traffic in Google Chrome

Gateway does not currently support inspection of HTTP/3 traffic in Google Chrome. This is because Chrome does not trust any certificate signed by a custom root CA even if the certificate is installed on the user's device.

Google Chrome by default enables support for QUIC, which is used to connect to HTTP/3 capable webpages. In order to filter HTTP traffic, you will need to disable QUIC in Chrome. This forces the browser to fall back to HTTP/2, allowing you to apply HTTP policies.

### Disable QUIC in Google Chrome

To manually disable QUIC in the Google Chrome browser:

1. In the address bar, type: `chrome://flags#enable-quic`.
2. Set the **Experimental QUIC protocol** flag to `Disabled`.
3. Relaunch Chrome for the setting to take effect.

The following Windows registry key (or Mac/Linux preference) can be used to disable QUIC in Chrome, and can be enforced via GPO or equivalent:

- **Data type:** `Boolean [Windows:REG_DWORD]`
- **Windows registry location for Windows clients:** `Software\Policies\Google\Chrome\QuicAllowed`
- **Windows registry location for Google Chrome OS clients:** `Software\Policies\Google\ChromeOS\QuicAllowed`
- **Mac/Linux preference name:** `QuicAllowed`
- **Description:** If this policy is set to true (or not set), usage of QUIC is allowed. If the policy is set to false, usage of QUIC is not allowed.
- **Recommended value:** `Windows: 0x00000000`, `Linux: false`, `Mac: <false />`

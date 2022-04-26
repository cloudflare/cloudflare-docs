---
pcx-content-type: concept
title: Configuration guidelines
weight: 5
---

# Configuration guidelines

This section provides tips on configuring the Gateway proxy.

## Enabling access to Google services

Google Chrome uses the QUIC protocol to connect to all Google-related services. Since Gateway does not currently support inspection of QUIC traffic, you will need to disable QUIC within Google Chrome.

To manually disable QUIC in the Google Chrome browser:

1.  In the address bar, type:  `chrome://flags#enable-quic`.
2.  Set the **Experimental QUIC protocol** flag to `Disabled`.
3.  Relaunch Chrome for the setting to take effect.

The following Windows registry key (or Mac/Linux preference) can be used to disable QUIC in Chrome, and can be enforced via GPO or equivalent:

*   **Data type:** `Boolean [Windows:REG_DWORD]`
*   **Windows registry location for Windows clients:** `Software\Policies\Google\Chrome\QuicAllowed`
*   **Windows registry location for Google Chrome OS clients:** `Software\Policies\Google\ChromeOS\QuicAllowed`
*   **Mac/Linux preference name:** `QuicAllowed`
*   **Description:** If this policy is set to true (or not set), usage of QUIC is allowed. If the policy is set to false, usage of QUIC is not allowed.
*   **Recommended value:** `Windows: 0x00000000`, `Linux: false`, `Mac: <false />`

## Enabling mTLS authentication

Applications which enforce mutual TLS are incompatible with TLS decryption. To allow mTLS requests through Gateway, add a [*Do Not Inspect*](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) HTTP policy for the mTLS-protected domain.

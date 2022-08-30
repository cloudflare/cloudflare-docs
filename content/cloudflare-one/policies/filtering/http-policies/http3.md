---
pcx_content_type: concept
title: HTTP/3
weight: 5
---

## HTTP/3 inspection

Gateway does not currently support inspection of HTTP/3 traffic.

### Disable QUIC in Google Chrome

Google Chrome by default enables support for QUIC, which is used to connect to HTTP/3 capable webpages. In order to apply HTTP policies to Google Chrome traffic, you will need to disable QUIC in the browser. This forces the browser to fall back to HTTP/2.

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
